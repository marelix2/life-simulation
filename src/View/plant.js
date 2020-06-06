
import { PLANT_SETTINGS } from './constants'
const randomInt = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min)

export const createPlant = ({ X, Y, energy, mapSize }) => {
    function draw(ctx) {
        ctx.fillStyle = "#00FF00";
        ctx.globalAlpha = 0.6;
        var centerX = X * (ctx.canvas.width - 4) / mapSize;
        var centerY = Y * (ctx.canvas.height - 4) / mapSize;
        var rectWidth = (ctx.canvas.width - 4) / mapSize;
        var rectHeight = (ctx.canvas.height - 4) / mapSize;
        ctx.fillRect(centerX + rectWidth / 2, centerY + rectHeight / 2, rectWidth, rectHeight);
    }

    return {
        X,
        Y,
        energy: energy,
        draw: draw,
    };
}

export const sow = ({ worldMaxEnergy, creatures, plants, plantsEnergy, mapSize }) => {
    const getCreaturesTotalEnergy = () => {
        var energy = 0;
        for (var i = 0; i < creatures.length; i++) {
            energy += creatures[i].energy;
        }

        return energy;
    }

    const getPlantsEnergyTotal = () => {
        var plantsCount = plants.length;
        var energy = 0;
        for (var i = 0; i < plantsCount; i++) {
            energy += plants[i].energy;
        }
        return energy;
    }


    var plantNumber = Math.floor((worldMaxEnergy - getCreaturesTotalEnergy() - getPlantsEnergyTotal()) / plantsEnergy);

    if (plantNumber < 1) {
        return 0;
    }
    if (PLANT_SETTINGS.plantBreedMethod === "random") {
        for (var i = 0; i < plantNumber; i++) {
            plants.push(createPlant({X: randomInt(0, mapSize - 1), Y: randomInt(0, mapSize - 1), energy: plantsEnergy, mapSize}));
        }
    }
   
    return plants
}