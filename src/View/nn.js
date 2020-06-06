import {
    NEURON_SETTINGS,
    ACTION_NO_ACTION
} from './constants'

import { createNeuron } from './n'

const randomInt = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min)

export const createNN = () =>  {
    let neurons = new Array(NEURON_SETTINGS.creatureNeuronCount)

    for (let i=0; i<NEURON_SETTINGS.creatureNeuronCount; i++) {
        let weights = new Array(NEURON_SETTINGS.neuronInputCount+1);
        for (let k=0; k<NEURON_SETTINGS.neuronInputCount+1; k++) {
            weights[k] = 0;
        }
        neurons[i] = createNeuron(weights);
    }
    
    const randomize = () => {
        for (let i=0; i<NEURON_SETTINGS.creatureNeuronCount; i++) {
            for (let k=0; k<NEURON_SETTINGS.neuronInputCount+1; k++) {
                neurons[i].weights[k] = (Math.random() - 0.5) * 100.0;
            }
        }
    }

    const decide = (stimulations) => {
        const indexes = [];
        for (let i=0; i<NEURON_SETTINGS.creatureNeuronCount; i++) {
            if(neurons[i].stimulate(stimulations[i]) === 1) {
                indexes.push(i);
            }
        }
        if (indexes.length === 0) {
            return ACTION_NO_ACTION;
        }
        else {
            return indexes[randomInt(0, indexes.length)];
        } 
    }

    const cloneWithMutation = () => {
        let child = createNN();
        for (let i=0; i<NEURON_SETTINGS.creatureNeuronCount; i++) {
            for (let k=0; k<NEURON_SETTINGS.neuronInputCount+1; k++) {
                let mutatedWeight = neurons[i].weights[k];
                if (Math.random() < NEURON_SETTINGS.mutation1Probability) {
                    if (Math.random() > 0.5) {
                        mutatedWeight *= 1 + NEURON_SETTINGS.mutation1;
                    }
                    else {
                        mutatedWeight *= 1 - NEURON_SETTINGS.mutation1;
                    }
                }
                child.neurons[i].weights[k] = mutatedWeight;
            }
        }
        return child;
    }

    const cross = (partner) => {
        let child = createNN();
        for (let i=0; i<NEURON_SETTINGS.creatureNeuronCount; i++) {
            for (let k=0; k<NEURON_SETTINGS.neuronInputCount+1; k++) {
                let mutatedWeight = 0.66*neurons[i].weights[k] + 0.34*partner.neurons[i].weights[k];
                if (Math.random() > NEURON_SETTINGS.mutation1Probability) {
                    if (Math.random() > 0.5) {
                        mutatedWeight *= 1 + NEURON_SETTINGS.mutation1;
                    }
                    else {
                        mutatedWeight *= 1 - NEURON_SETTINGS.mutation1;
                    }
                }
                if (Math.random() > NEURON_SETTINGS.mutation2Probability) {
                    if (Math.random() > 0.5) {
                        mutatedWeight *= 1 + NEURON_SETTINGS.mutation2;
                    }
                    else {
                        mutatedWeight *= 1 - NEURON_SETTINGS.mutation2;
                    }
                }
                child.neurons[i].weights[k] = mutatedWeight;
            }
        }        
        return child;
    }

    return {
        neurons,
        decide: decide,
        randomize: randomize,
        cloneWithMutation: cloneWithMutation,
        cross: cross,
    };
}