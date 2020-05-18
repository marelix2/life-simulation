function createPlant(X, Y, energy) {
    function draw(ctx) {
        ctx.fillStyle = "#00FF00";
        ctx.globalAlpha = 0.6;
        var centerX = this.X * (ctx.canvas.width-4)/settings.mapSize.X;
        var centerY = this.Y * (ctx.canvas.height-4)/settings.mapSize.Y;
        var rectWidth = (ctx.canvas.width-4)/settings.mapSize.X;
        var rectHeight = (ctx.canvas.height-4)/settings.mapSize.Y;
        ctx.fillRect(centerX+rectWidth/2, centerY+rectHeight/2, rectWidth, rectHeight);
    }

    return {
        X: X,
        Y: Y,
        energy: energy,
        draw: draw,
    };
}

function sow() {
    var plantNumber = Math.floor((settings.worldEnergy-getCreaturesTotalEnergy()-getPlantsEnergyTotal()) / settings.plantsEnergy);
    if (plantNumber < 1) {
        return 0;
    }
    if (settings.plantBreedMethod == "random") {
        for (var i=0; i<plantNumber; i++) {
            plants.push(createPlant(getRandomInt(0, settings.mapSize.X-1), getRandomInt(0, settings.mapSize.Y-1), settings.plantsEnergy));
        }
    }
    if (settings.plantBreedMethod == "sparse") {
    }
    if (settings.plantBreedMethod == "dense") {
        var plantsCount = plants.length;
        if ((plantNumber <= 2) || (plantsCount <5)) {
            for (var i=0; i<5; i++) {
                plants.push(createPlant(getRandomInt(0, settings.mapSize.X-1), getRandomInt(0, settings.mapSize.Y-1), settings.plantsEnergy));
                plantNumber -= 1;
                plantsCount += 1;
            }
        }        
        for (var i=0; i<plantNumber; i++) {
            var randomPlantid = getRandomInt(0, plantsCount-1);
            var originPlant = plants[randomPlantid];
            var newX = originPlant.X+2-getRandomInt(0, 6);
            var newY = originPlant.Y+2-getRandomInt(0, 6);
            if (newX < 0) { newX = 0; }
            if (newX >= settings.mapSize.X) { newX = settings.mapSize.X-1; }
            if (newY < 0) { newY = 0; }
            if (newY >= settings.mapSize.Y) { newY = settings.mapSize.Y-1; }
            plants.push(createPlant(newX, newY, settings.plantsEnergy));
            plantsCount += 1;
        }
    }
    if (settings.plantBreedMethod == "semirandom") {
    }
}