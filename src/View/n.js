import { NEURON_SETTINGS} from './constants'

export const createNeuron = (weights) =>  {
    const stimulate = (stimulation) =>  {
        let stimulantsNumber = stimulation.length;
        let e = weights[0];
        for (let i=0; i<stimulantsNumber; i++) {
            e += weights[i+1]*stimulation[i];
        }
        if (e > NEURON_SETTINGS.neuronStimulationThreshold) {
            return 1;
        }
        else {
            return 0;
        } 
    }
    return {
        weights,
        stimulate: stimulate
    };
}