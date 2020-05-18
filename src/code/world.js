var ctx;
var creatures = [];
var plants = [];

var labelsPL = {
    plantBreedMethodLabel : "Sposób rozmnażania roślin",
    mapSizeLabel : "Rozmiar planszy: ",
    creaturesInitialCountLabel : "Początkowa liczba stworzeń",
    creaturesMinimalCountLabel : "Minimalna liczba stworzeń",
    worldMaxEnergyLabel : "Energia świata",
    plantsEnergyLabel : "Energia nowej rośliny",
    creatureStartEnergyLabel: "Początkowa energia stworzenia",
    creatureLifespanLabel: "Długość życia stworzenia",
    displayLabel: "Prędkość: ",
}

function init() {
    var lang = location.search.split("=")[1]; 
    document.getElementById("continue").style.display="none";
    document.getElementById("stop").style.display="none";
    document.getElementById("restart").style.display="none";
    document.getElementById("start").style.display="block";
    document.getElementById("mapSize").disabled=false;
    ctx = document.getElementById('canvas').getContext('2d');
    if (lang == "pl"){
        for(label in labelsPL){
          get(label).innerHTML = labelsPL[label];
        }
        get("continue").value = "Kontynuuj";
        get("restart").value = "Wyczyść";
        get("stop").value = "Pauza";
        document.getElementById("random").innerHTML = "Losowo";
        document.getElementById("dense").innerHTML = "Gęste grupy";
    }
}

function setCanvasSize(width, height, maxWidth) {
    if (width < 50) { settings.mapSize.X = 50; }
    if (width > 200) { settings.mapSize.X = 200; }
    if (height < 50) { settings.mapSize.Y = 50; }
    if (height > 200) { settings.mapSize.Y = 200; }

    ratio = settings.mapSize.X / settings.mapSize.Y;
}

function moveCreature(id) {
    var closestPlantid = getClosestPlant(id);
    if (closestPlantid != -1) {
        reaction = creatures[id].react(sin(creatures[id], plants[closestPlantid]), cos(creatures[id], plants[closestPlantid]));
        var distanceToClosestPlant = distance(creatures[id], plants[closestPlantid]);
        if (reaction == ACTION_BREED) {
            if (Math.random() < 0.5) {
                creatures.push(creatures[id].clone());
            }
            else if (creatures.length > 1) {
                creatures.push(creatures[id].breed(creatures[getClosestCreature(id)]));
            }
        }
        if (distanceToClosestPlant < settings.feedingDistance) {
            creatures[id].energy += plants[closestPlantid].energy;
            plants.splice(closestPlantid, 1);
        }
    }

    creatures[id].energy -= 1;
    creatures[id].age += 1;
    if ((creatures[id].energy <= 0) || (creatures[id].age > settings.creatureLifespan)) {
        creatures.splice(id, 1);
    }
}

function loop() {
    var creaturesCount = creatures.length;
    for (var i=creaturesCount-1; i>=0; i--) {
        moveCreature(i);
    }
    drawWorld();
    if (creatures.length == 0) {
        clearInterval(intervalid);
    }
    createCreaturesTillMinimum();
    sow();
}

var intervalid;

function choosePlantLocation() {

}

function startSimulation() {
    document.getElementById("restart").style.display="block";
    document.getElementById("start").style.display="none";
    clearInterval(intervalid);
    disableInputsOnStart();
    updateVariables();
    setCanvasSize(settings.mapSize.X, settings.mapSize.Y, 600);
    resize();
    populate();
    sow();
    intervalid = setInterval(loop, settings.interval);
}

function restartSimulation() {
    stopSimulation();
    init();
    updateVariables();
    disableInputsOnStart();
    setCanvasSize(settings.mapSize.X, settings.mapSize.Y, 600);
    resize();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function continueSimulation() {
    disableInputsOnStart();
    intervalid = setInterval(loop, settings.interval);
}

function stopSimulation() {
    clearInterval(intervalid);
    enableInputsOnStop();
}

function disableInputsOnStart() {
    document.getElementById("continue").style.display="none";
    document.getElementById("stop").style.display="block";

    document.getElementById("creaturesInitialCount").disabled=true;
    document.getElementById("creaturesMinimalCount").disabled=true;
    document.getElementById("worldMaxEnergy").disabled=true;
    document.getElementById("plantsEnergy").disabled=true;
    document.getElementById("creatureStartEnergy").disabled=true;
    document.getElementById("creatureLifespan").disabled=true;
    document.getElementById("interval").disabled=true;
    document.getElementById("mapSize").disabled=true;
    document.getElementById("plantBreedMethod").disabled=true;
    settings.creaturesMinimalCount = parseInt(document.getElementById("creaturesMinimalCount").value);
    settings.worldEnergy = parseInt(document.getElementById("worldMaxEnergy").value);
    settings.creatureStartEnergy = parseInt(document.getElementById('creatureStartEnergy').value);
    settings.creatureLifespan = parseInt(document.getElementById("creatureLifespan").value);
    settings.plantBreedMethod = document.getElementById("plantBreedMethod").value;
    settings.interval = (101-parseInt(document.getElementById("interval").value))+6;
}

function enableInputsOnStop() {
    document.getElementById("continue").style.display="block";
    document.getElementById("stop").style.display="none";

    document.getElementById("creaturesMinimalCount").disabled=false;
    document.getElementById("worldMaxEnergy").disabled=false;
    document.getElementById("creatureStartEnergy").disabled=false;
    document.getElementById("creatureLifespan").disabled=false;
    document.getElementById("interval").disabled=false;
    document.getElementById("plantBreedMethod").disabled=false;
    document.getElementById("plantsEnergy").disabled=false;
}

function resize(){
  //we add 10 px margin to avoid showing scroll bars too fast
  var x = Math.min(Math.max(200, window.innerWidth - get("menu").offsetWidth - 10), Math.max(200, window.innerHeight - 10))
  ctx.canvas.width  = x;
  ctx.canvas.height = x;
  ctx.save();
}

window.onresize = function() {
  resize();
  drawWorld();
};

function get(what){
    return document.getElementById(what);
}

// I'm sorry it's such a mess - JJ