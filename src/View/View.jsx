import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Form from '../Form/Form';
import { DEFAULT_SETTINGS } from './constants';
import { makeStyles } from '@material-ui/core/styles';
import { handleStart, handleStop, handleReset } from './utils.js'

const useStyles = makeStyles((theme) => ({
    wrapper: {
        width: '100%'
    },
    form: {
        width: '25%'
    },
    canvas: {
        width: '70%'
    }


}));


const View = () => {

    const classes = useStyles()
    const [context, setContext] = useState(null)

    const [started, setStarted] = useState(false)
    const [creaturesInitCount, setCreaturesInitCount] = useState(DEFAULT_SETTINGS.creaturesInitCount)
    const [creaturesMinCount, setCreaturesMinCount] = useState(DEFAULT_SETTINGS.creaturesMinCount)
    const [creaturesLifespan, setCreaturesLifespan] = useState(DEFAULT_SETTINGS.creaturesLifespan)
    const [creaturesStartingEnergy, setCreaturesStartingEnergy] = useState(DEFAULT_SETTINGS.creaturesStartingEnergy)

    const [worldMaxEnergy, setWorldMaxEnergy] = useState(DEFAULT_SETTINGS.worldMaxEnergy)
    const [plantsEnergy, setPlantsEnergy] = useState(DEFAULT_SETTINGS.plantsEnergy)

    const [mapSize, setMapSize] = useState(DEFAULT_SETTINGS.mapSizeValue)
    const [speed, setSpeed] = useState(DEFAULT_SETTINGS.speed)

    const onStart = () => {
        setStarted(true)
        handleStart({
            creaturesInitCount,
            creaturesMinCount,
            creaturesLifespan,
            creaturesStartingEnergy,
            worldMaxEnergy,
            plantsEnergy,
            mapSize,
            speed,
            context
        })
    }

    const onStop = () => {
        handleStop()
    }

    const onReset = (window) => {
        setStarted(false)
        handleReset(window)
    } 

    const creatureFields = [
        {
            id: 'creaturesInitCount',
            label: 'poczatkowa liczba stworzen',
            value: creaturesInitCount,
            onChange: ({ target }) => setCreaturesInitCount(target.value)
        },
        {
            id: 'creaturesMinCount',
            label: 'minimalna liczba stworzen',
            value: creaturesMinCount,
            onChange: ({ target }) => setCreaturesMinCount(target.value)
        },
        {
            id: 'creaturesStartingEnergy',
            label: 'poczatkowa energia stworzen',
            value: creaturesStartingEnergy,
            onChange: ({ target }) => setCreaturesStartingEnergy(target.value)
        },
        {
            id: 'creaturesLifespan',
            label: 'dlugosc zycia stworzen',
            value: creaturesLifespan,
            onChange: ({ target }) => setCreaturesLifespan(target.value)
        }
    ]

    const energyFields = [
        {
            id: 'worldMaxEnergy',
            label: 'energia swiata',
            value: worldMaxEnergy,
            onChange: ({ target }) => setWorldMaxEnergy(target.value)
        },
        {
            id: 'plantsEnergy',
            label: 'energia nowej rosliny',
            value: plantsEnergy,
            onChange: ({ target }) => setPlantsEnergy(target.value)
        },
    ]

    const rangeFields = [
        {
            id: 'mapSize',
            min: DEFAULT_SETTINGS.minMapSize,
            max: DEFAULT_SETTINGS.maxMapSize,
            label: 'rozmiar planszy',
            value: mapSize,
            onChange: (evt, val) => setMapSize(val)
        },
        {
            id: 'speed',
            min: DEFAULT_SETTINGS.minSpeed,
            max: DEFAULT_SETTINGS.maxSpeed,
            label: 'predkosc',
            value: speed,
            onChange: (evt, val) => setSpeed(val)
        }
    ]

    useEffect(() => {
        setContext(document.getElementById('canvas').getContext('2d'))
    }, [])


    return (
        <Grid container className={classes.wrapper}>
            <Grid item className={classes.form}>
                <Form
                    creatureFields={creatureFields}
                    rangeFields={rangeFields}
                    energyFields={energyFields}
                    started={started}
                    handleStart={onStart}
                    handleStop={onStop}
                    handleReset={onReset}
                />
            </Grid>
            <Grid item className={classes.canvas}>
                <canvas id="canvas" width="600" height="600"></canvas>
            </Grid>
        </Grid>

    );
};

export default View;