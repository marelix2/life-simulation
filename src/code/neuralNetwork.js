function createNN() {
    var neurons = new Array(settings.creatureNeuronCount)
    for (var i=0; i<settings.creatureNeuronCount; i++) {
        var weights = new Array(settings.neuronInputCount+1);
        for (var k=0; k<settings.neuronInputCount+1; k++) {
            weights[k] = 0;
        }
        neurons[i] = createNeuron(weights);
    }
    
    function randomize() {
        for (var i=0; i<settings.creatureNeuronCount; i++) {
            for (var k=0; k<settings.neuronInputCount+1; k++) {
                this.neurons[i].weights[k] = (Math.random() - 0.5) * 100.0;
            }
        }
    }

    function decide(stimulations) {
        var indexes = [];
        for (var i=0; i<settings.creatureNeuronCount; i++) {
            if(this.neurons[i].stimulate(stimulations[i]) == 1) {
                indexes.push(i);
            }
        }
        if (indexes.length == 0) {
            return ACTION_NO_ACTION;
        }
        else {
            return indexes[getRandomInt(0, indexes.length)];
        } 
    }

    function cloneWithMutation() {
        var child = createNN();
        for (var i=0; i<settings.creatureNeuronCount; i++) {
            for (var k=0; k<settings.neuronInputCount+1; k++) {
                var mutatedWeight = this.neurons[i].weights[k];
                if (Math.random() < settings.mutation1Probability) {
                    if (Math.random() > 0.5) {
                        mutatedWeight *= 1 + settings.mutation1;
                    }
                    else {
                        mutatedWeight *= 1 - settings.mutation1;
                    }
                }
                child.neurons[i].weights[k] = mutatedWeight;
            }
        }
        return child;
    }

    function cross(partner) {
        var child = createNN();
        for (var i=0; i<settings.creatureNeuronCount; i++) {
            for (var k=0; k<settings.neuronInputCount+1; k++) {
                var mutatedWeight = 0.66*this.neurons[i].weights[k] + 0.34*partner.neurons[i].weights[k];
                if (Math.random() > settings.mutation1Probability) {
                    if (Math.random() > 0.5) {
                        mutatedWeight *= 1 + settings.mutation1;
                    }
                    else {
                        mutatedWeight *= 1 - settings.mutation1;
                    }
                }
                if (Math.random() > settings.mutation2Probability) {
                    if (Math.random() > 0.5) {
                        mutatedWeight *= 1 + settings.mutation2;
                    }
                    else {
                        mutatedWeight *= 1 - settings.mutation2;
                    }
                }
                child.neurons[i].weights[k] = mutatedWeight;
            }
        }        
        return child;
    }

    return {
        neurons: neurons,
        decide: decide,
        randomize: randomize,
        cloneWithMutation: cloneWithMutation,
        cross: cross,
    };
}