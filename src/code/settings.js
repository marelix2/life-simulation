var settings = {
    neuronStimulationThreshold: 10,
    mutation1: 0.1,
    mutation2: 0.5,
    mutation1Probability: 0.01,
    mutation2Probability: 0.01,
    creatureStartEnergy: 120,
    creatureLifespan: 300,
    creatureNeuronCount: 5,
    neuronInputCount: 3,
    worldMaxEnergy: 50000,
    worldEnergy: 50000,
    creaturesInitialCount: 100,
    creaturesMinimalCount: 80,
    plantsEnergy: 50,
    mapSize: {
        X: 100,
        Y: 100,
        diagonal: 141,
    },
    plantBreedMethod: "random",
    frame: "every",
    feedingDistance: 0.01,
    interval: 50,
};

CREATURE_NEURON_COUNT = 5;
ACTION_NO_ACTION = 5;
ACTION_BREED = 0;
ACTION_UP = 1;
ACTION_DOWN = 2;
ACTION_LEFT = 3;
ACTION_RIGHT = 4;