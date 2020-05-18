function populate() {
    creatures = new Array(settings.creaturesInitialCount);
    for (var i=0; i<settings.creaturesInitialCount; i++) {
        creatures[i] = createCreature(getRandomInt(0, settings.mapSize.X), getRandomInt(0, settings.mapSize.Y));
        creatures[i].nn.randomize();
        creatures[i].energy = settings.creatureStartEnergy;
    }
}

function createCreaturesTillMinimum() {
    var fillCount = settings.creaturesMinimalCount - creatures.length;
    if (fillCount > 0) {
        for (var i=0; i<fillCount; i++) {
            creature = createCreature(0, 0);
            creature.randomizeLocation();
            creature.nn.randomize();
            creatures.push(creature);
        }
    }
}

function createCreature(locationCoordinateX, locationCoordinateY) {    
    var nn = createNN(CREATURE_NEURON_COUNT, settings.neuronInputCount)
    
    function randomizeLocation(){
        self.X = getRandomInt(0, settings.mapSize.X);
        self.Y = getRandomInt(0, settings.mapSize.Y);
    }

    function clone() {
        var locationX = this.X + getRandomInt(0, 2) - 1;
        var locationY = this.Y + getRandomInt(0, 2) - 1;
        if (locationX < 0) { locationX = 0; }
        if (locationX >= settings.mapSize.X) { locationX = settings.mapSize.X - 1; }
        if (locationY < 0) { locationY = 0; }
        if (locationY >= settings.mapSize.Y) { locationY = settings.mapSize.Y - 1; }

        var child = createCreature(locationX, locationY);
        child.nn = this.nn.cloneWithMutation();
        child.energy = settings.creatureStartEnergy;
        this.energy -= settings.creatureStartEnergy;
        return child;
    }

    function breed(partner) {
        var locationX = Math.floor((this.X + partner.X)/2);
        var locationY = Math.floor((this.Y + partner.Y)/2);
        var child = createCreature(locationX, locationY);
        child.nn = this.nn.cross(partner.nn);
        child.energy = settings.creatureStartEnergy;
        this.energy -= settings.creatureStartEnergy;
        return child;
    }

    function normalizeEnergy() {
        return this.energy/(3*settings.creatureStartEnergy);
    }

    function react(plantSin, plantCos) {
        var stimulations = new Array(settings.creatureNeuronCount);
        
        for (var i=0; i<settings.creatureNeuronCount; i++) {
            stimulations[i] = new Array(settings.neuronInputCount);
            // How ugly is that
            stimulations[i][0] = this.normalizeEnergy();
            stimulations[i][1] = plantSin;
            stimulations[i][2] = plantCos;
        }
        var decision = this.nn.decide(stimulations);
        if ((decision == ACTION_BREED) && (this.energy < settings.creatureStartEnergy)) {
            this.energy -= 1;
            return ACTION_NO_ACTION;
        }
        if ((decision == ACTION_RIGHT) && (this.X < settings.mapSize.X-1)) {
            this.X += 1;
        }
        if ((decision == ACTION_LEFT) && (this.X > 0)) {
            this.X -= 1;
        }
        if ((decision == ACTION_UP) && (this.Y < settings.mapSize.Y-1)) {
            this.Y += 1;
        }
        if ((decision == ACTION_DOWN) && (this.Y > 0)) {
            this.Y -= 1;
        }
        return decision;
    }

    function draw(ctx) {
        ctx.fillStyle = "#FF0000";
        var centerX = this.X * ctx.canvas.width/settings.mapSize.X;
        var centerY = this.Y * ctx.canvas.height/settings.mapSize.Y;
        var rectWidth = ctx.canvas.width/settings.mapSize.X;
        var rectHeight = ctx.canvas.height/settings.mapSize.Y;
        ctx.fillRect(centerX, centerY, rectWidth, rectHeight);
    }

    return {
        energy: settings.creatureStartEnergy,
        age: 0,
        X: locationCoordinateX,
        Y: locationCoordinateY,
        nn: nn,
        clone: clone,
        breed: breed,
        react: react,
        draw: draw,
        normalizeEnergy: normalizeEnergy,
        randomizeLocation: randomizeLocation,
    };
}