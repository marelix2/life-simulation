import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import RangeInput from './RangeInput';
import { DEFAULT_SETTINGS } from './constants';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        '& .MuiTextField-root, .MuiSlider-root, .MuiTypography-root': {
            margin: theme.spacing(1),
            width: '96%',
        },

        background: '#c1c1c1',
        width: '25%'
    },
    controlButtons: {
        '& .MuiButtonBase-root': {
            width: '96%',
        },

        '& .MuiGrid-item': {
            width: 200
        },

        width: '100%',
        marginBottom: theme.spacing(1)
    },
    divider: {
        margin: theme.spacing(2)
    }
}));



const Form = () => {
    const classes = useStyles()
    const [started, setStarted] = useState(false)
    const [creaturesInitCount, setCreaturesInitCount] = useState(DEFAULT_SETTINGS.creaturesInitCount)
    const [creaturesMinCount, setCreaturesMinCount] = useState(DEFAULT_SETTINGS.creaturesMinCount)
    const [creaturesLifespan, setCreaturesLifespan] = useState(DEFAULT_SETTINGS.creaturesLifespan)
    const [creaturesStartingEnergy, setCreaturesStartingEnergy] = useState(DEFAULT_SETTINGS.creaturesStartingEnergy)

    const [worldMaxEnergy, setWorldMaxEnergy] = useState(DEFAULT_SETTINGS.worldMaxEnergy)
    const [plantsEnergy, setPlantsEnergy] = useState(DEFAULT_SETTINGS.plantsEnergy)

    const [mapSize, setMapSize] = useState(DEFAULT_SETTINGS.mapSizeValue)
    const [speed, setSpeed] = useState(DEFAULT_SETTINGS.speed)

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

    return (
        <Grid
            container
            direction='column'
            justify='center'
            className={classes.wrapper}>
            {creatureFields.map(fieldProps => (
                <Grid item key={fieldProps.id}>
                    <TextField
                        type='number'
                        required
                        disabled={started}
                        {...fieldProps}
                    />
                </Grid>
            ))}
            <Divider className={classes.divider} />
            {energyFields.map(fieldProps => (
                <Grid item key={fieldProps.id}>
                    <TextField
                        type='number'
                        required
                        disabled={started}
                        {...fieldProps}
                    />
                </Grid>
            ))}
            <Divider className={classes.divider} />
            {rangeFields.map((fieldProps) => (
                <Grid item key={fieldProps.id}>
                    <RangeInput {...fieldProps} disabled={started}/>
                </Grid>
            ))}

            <Grid container alignItems='center' justify='space-around' className={classes.controlButtons}>
                {!started ? (
                    <Grid item>
                        <Button variant='contained' color='primary' onClick={() => setStarted(true)}> START</Button>
                    </Grid>
                ) : (
                        <>
                            <Grid item>
                                <Button variant='contained' color='primary' onClick={() => window.location.reload()}> RESET</Button>
                            </Grid>
                            <Grid item>
                                <Button variant='contained' color='primary' onClick={() => console.log('stop !!!')}> STOP</Button>
                            </Grid>
                        </>
                    )
                }
            </Grid>

        </Grid>
    );
};

export default Form;