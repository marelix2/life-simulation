function distance(creatureA, creatureB) {
    return Math.sqrt(Math.pow(creatureA.X-creatureB.X, 2) + Math.pow(creatureA.Y-creatureB.Y, 2)) / settings.mapSize.diagonal;
}

function sin(creatureA, creatureB) {
    return (creatureB.Y-creatureA.Y)/distance(creatureA, creatureB)/settings.mapSize.diagonal;
}

function cos(creatureA, creatureB) {
    return (creatureB.X-creatureA.X)/distance(creatureA, creatureB)/settings.mapSize.diagonal;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawWorld() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    var plantsCount = plants.length;
    for (var i=0; i<plantsCount; i++) {
        plants[i].draw(ctx);
    }
    var creaturesCount = creatures.length; 
    for (var i=0; i<creaturesCount; i++) {
        creatures[i].draw(ctx);
    }
}

function getCreaturesTotalEnergy() {
    var creaturesCount = creatures.length;
    var energy = 0;
    for (var i=0; i<creaturesCount; i++) {
        energy += creatures[i].energy;
    }
    return energy;
}

function getPlantsEnergyTotal() {
    var plantsCount = plants.length;
    var energy = 0;
    for (var i=0; i<plantsCount; i++) {
        energy += plants[i].energy;
    }
    return energy;
}

function updateVariables() {
    creatures = [];
    plants = [];
    settings.mapSize.X = parseInt(document.getElementById('mapSize').value);
    settings.mapSize.Y = parseInt(document.getElementById('mapSize').value);
    settings.mapSize.diagonal = Math.sqrt(Math.pow(settings.mapSize.X, 2) + Math.pow(settings.mapSize.Y, 2));
    settings.creaturesInitialCount = parseInt(document.getElementById('creaturesInitialCount').value);
    settings.creaturesMinimalCount = parseInt(document.getElementById('creaturesMinimalCount').value);
    settings.worldEnergy = parseInt(document.getElementById('worldMaxEnergy').value);
    settings.plantsEnergy = parseInt(document.getElementById('plantsEnergy').value);
    settings.creatureStartEnergy = parseInt(document.getElementById('creatureStartEnergy').value);
    settings.creatureLifespan = parseInt(document.getElementById('creatureLifespan').value);
    settings.plantBreedMethod = document.getElementById('plantBreedMethod').value;
    settings.interval = (101-parseInt(document.getElementById("interval").value))+6;
}

function getClosestCreature(id) {
    var closestCreatureid = -1;
    var smallestDistance = 999999
    var creaturesCount = creatures.length;
    for (var i=0; i<creaturesCount; i++) {
        if (i != id) {
            if(distance(creatures[i], creatures[id]) < smallestDistance) {
                smallestDistance = distance(creatures[i], creatures[id]);
                closestCreatureid = i;
                closestCreature = creatures[i];
            }
        }
    }
    return closestCreatureid;
}

function getClosestPlant(id) {
    var closestPlantid = -1;
    var smallestDistance = 999999;
    var plantsCount = plants.length;
    for (var i=0; i<plantsCount; i++) {
        if(distance(plants[i], creatures[id]) < smallestDistance) {
            smallestDistance = distance(plants[i], creatures[id]);
            closestPlantid = i;
        }
    }
    return closestPlantid;
}