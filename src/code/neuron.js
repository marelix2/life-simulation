function createNeuron(weights) {
    var weights = weights;
    function stimulate(stimulation) {
        var stimulantsNumber = stimulation.length;
        var e = weights[0];
        for (var i=0; i<stimulantsNumber; i++) {
            e += weights[i+1]*stimulation[i];
        }
        if (e > settings.neuronStimulationThreshold) {
            return 1;
        }
        else {
            return 0;
        } 
    }
    return {
        weights: weights,
        stimulate: stimulate
    };
}