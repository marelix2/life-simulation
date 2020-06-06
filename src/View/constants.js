export const DEFAULT_SETTINGS = {
    creaturesInitCount: 100,
    creaturesMinCount: 80,
    creaturesStartingEnergy: 120,
    creaturesLifespan: 300,

    worldMaxEnergy: 50000,
    plantsEnergy: 50,

    minMapSize: 50,
    maxMapSize: 200,
    mapSizeValue: 100,

    speed: 50,
    minSpeed: 1,
    maxSpeed: 100,

    frame: "every",
    interval: 50,
};

export const NEURON_SETTINGS = {
    creatureNeuronCount : 5,
    neuronInputCount: 3,
    neuronStimulationThreshold: 5,
    mutation1: 0.1,
    mutation2: 0.7,
    mutation1Probability: 0.01,
    mutation2Probability: 0.01,
}

export const PLANT_SETTINGS = {
    plantBreedMethod : 'random',
    feedingDistance: 0.01,
    diagonal: 141,
}

export const MAX_NEURON_COUNT = 5;

export const ACTION_BREED = 0;
export const ACTION_UP = 1;
export const ACTION_DOWN = 2;
export const ACTION_LEFT = 3;
export const ACTION_RIGHT = 4;
export const ACTION_NO_ACTION = 5;
