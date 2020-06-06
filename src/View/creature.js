import {
    MAX_NEURON_COUNT,
    NEURON_SETTINGS,
    ACTION_BREED,
    ACTION_UP,
    ACTION_DOWN,
    ACTION_LEFT,
    ACTION_RIGHT,
    ACTION_NO_ACTION,
    PLANT_SETTINGS,
} from './constants'

import { createNN } from './nn'



const randomInt = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min)

const distance = (creatureA, creatureB, diagonal) => Math.sqrt(Math.pow(creatureA.X - creatureB.X, 2) + Math.pow(creatureA.Y - creatureB.Y, 2)) / diagonal

const sin = (creatureA, creatureB,diagonal) => (creatureB.Y - creatureA.Y) / distance(creatureA, creatureB,diagonal) / diagonal

const cos = (creatureA, creatureB,diagonal) => (creatureB.X - creatureA.X) / distance(creatureA, creatureB,diagonal) / diagonal


export const populate = ({ creatures,
    creaturesInitCount,
    mapSize,
    creaturesStartingEnergy,
    ...rest }) => {
    creatures = new Array(creaturesInitCount);
    for (let i = 0; i < creaturesInitCount; i++) {
        creatures[i] = createCreature({
            locationCoordinateX: randomInt(0, mapSize),
            locationCoordinateY: randomInt(0, mapSize),
            mapSize,
            creaturesStartingEnergy,
            ...rest
        });
        creatures[i].nn.randomize();
        creatures[i].energy = creaturesStartingEnergy;
    }
    return creatures
}

const createCreature = ({ locationCoordinateX, locationCoordinateY, mapSize, creaturesStartingEnergy }) => {
    
    let X = locationCoordinateX
    let Y = locationCoordinateY
    let energy = creaturesStartingEnergy
    let nn = createNN(MAX_NEURON_COUNT, NEURON_SETTINGS.neuronInputCount)

    const randomizeLocation = () => {
        X = randomInt(0, mapSize);
        Y = randomInt(0, mapSize);
    }

    const clone = () => {
        let locationX = X + randomInt(0, 2) - 1
        let locationY = Y + randomInt(0, 2) - 1
        if (locationX < 0) { locationX = 0 }
        if (locationX >= mapSize) { locationX = mapSize - 1 }
        if (locationY < 0) { locationY = 0; }
        if (locationY >= mapSize.Y) { locationY = mapSize - 1; }

        let child = createCreature({locationCoordinateX: locationX, locationCoordinateY: locationY, mapSize,
            creaturesStartingEnergy,
            });
        child.nn = nn.cloneWithMutation();
        child.energy = creaturesStartingEnergy
        energy -= creaturesStartingEnergy
        return child;
    }

    const breed = (partner) => {
        const locationX = Math.floor((X + partner.X) / 2);
        const locationY = Math.floor((Y + partner.Y) / 2);
        let child = createCreature({locationCoordinateX: locationX, locationCoordinateY: locationY, mapSize,
            creaturesStartingEnergy,
            });
        child.nn = nn.cross(partner.nn);
        child.energy = creaturesStartingEnergy;
        energy -= creaturesStartingEnergy;
        return child;
    }

    const normalizeEnergy = () => {
        return energy / (3 * creaturesStartingEnergy);
    }

    const react = (plantSin, plantCos) => {
        let stimulations = new Array(NEURON_SETTINGS.creatureNeuronCount);

        for (let i = 0; i < NEURON_SETTINGS.creatureNeuronCount; i++) {
            stimulations[i] = new Array(NEURON_SETTINGS.neuronInputCount);
            stimulations[i][0] = normalizeEnergy();
            stimulations[i][1] = plantSin;
            stimulations[i][2] = plantCos;
        }
        let decision = nn.decide(stimulations);
        if ((decision === ACTION_BREED) && (energy < creaturesStartingEnergy)) {
            energy -= 1;
            return ACTION_NO_ACTION;
        }
        if ((decision === ACTION_RIGHT) && (X < mapSize - 1)) {
            X += 1;
        }
        if ((decision === ACTION_LEFT) && (X > 0)) {
            X -= 1;
        }
        if ((decision === ACTION_UP) && (Y < mapSize - 1)) {
            Y += 1;
        }
        if ((decision === ACTION_DOWN) && (Y > 0)) {
            Y -= 1;
        }
        return {decision, X, Y} ;
    }

    const draw = (ctx) => {
        ctx.fillStyle = "#FF0000";
        let centerX = X * ctx.canvas.width / mapSize;
        let centerY = Y * ctx.canvas.height / mapSize;
        let rectWidth = ctx.canvas.width / mapSize;
        let rectHeight = ctx.canvas.height / mapSize;
        ctx.fillRect(centerX, centerY, rectWidth, rectHeight);
    }

    return {
        energy,
        age: 0,
        X,
        Y,
        nn,
        clone: clone,
        breed: breed,
        react: react,
        draw: draw,
        normalizeEnergy: normalizeEnergy,
        randomizeLocation: randomizeLocation,
    };
}

export const createCreaturesTillMinimum = ({creatures, creaturesMinCount, mapSize, creaturesStartingEnergy}) => {
    var fillCount = creaturesMinCount - creatures.length;
    if (fillCount > 0) {
        for (var i=0; i<fillCount; i++) {
            let creature = createCreature({locationCoordinateX: 0, locationCoordinateY: 0, mapSize,
                creaturesStartingEnergy,
                })
            creature.randomizeLocation()
            creature.nn.randomize()
            creatures.push(creature)
        }
    }
    return creatures
}

const getClosestCreature = ({ creatures, id ,diagonal}) =>{
    let closestCreatureid = -1
    let smallestDistance = 999999
    for (let i = 0; i < creatures.length; i++) {
        if (i !== id) {
            if (distance(creatures[i], creatures[id],diagonal) < smallestDistance) {
                smallestDistance = distance(creatures[i], creatures[id],diagonal);
                closestCreatureid = i;
            }
        }
    }
    return closestCreatureid;
}

const getClosestPlant = ({ creatures, plants, id,diagonal }) => {
    let closestPlantid = -1
    let smallestDistance = 999999
    for (let i = 0; i < plants.length; i++) {
        if (distance(plants[i], creatures[id],diagonal) < smallestDistance) {
            smallestDistance = distance(plants[i], creatures[id], diagonal);
            closestPlantid = i;
        }
    }
    return closestPlantid;
}

export const moveCreature = ({ creatures, plants,mapSize, id, creaturesLifespan }) => {
    const diagonal = Math.sqrt(Math.pow(mapSize, 2) + Math.pow(mapSize, 2));
    let closestPlantid = getClosestPlant({ id, creatures, plants,diagonal });

    if (closestPlantid !== -1) {
        
        let reaction = creatures[id].react(sin(creatures[id], plants[closestPlantid],diagonal), cos(creatures[id], plants[closestPlantid], diagonal));
        let distanceToClosestPlant = distance(creatures[id], plants[closestPlantid], diagonal);
        
        creatures[id].X = reaction.X
        creatures[id].Y = reaction.Y
       
        if (reaction === ACTION_BREED) {
            if (Math.random() < 0.5) {
                creatures.push(creatures[id].clone());
            }
            else if (creatures.length > 1) {
                creatures.push(creatures[id].breed(creatures[getClosestCreature({creatures,id, diagonal})]));
            }
        }
        
        if (distanceToClosestPlant < PLANT_SETTINGS.feedingDistance) {
            creatures[id].energy += plants[closestPlantid].energy;
            plants.splice(closestPlantid, 1);
        }
    }

    creatures[id].energy -= 1;
    creatures[id].age += 1;
    if ((creatures[id].energy <= 0) || (creatures[id].age > creaturesLifespan)) {
        creatures.splice(id, 1);
    }

    return { newCreatures: creatures , newPlants: plants}
}
