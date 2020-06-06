import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import RangeInput from './RangeInput';

import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        '& .MuiTextField-root, .MuiSlider-root, .MuiTypography-root': {
            margin: theme.spacing(1),
            width: '96%',
        },

        background: '#c1c1c1',
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



const Form = ({
    started,
    creatureFields,
    rangeFields,
    energyFields,
    handleStart,
    handleStop,
    handleReset
 }) => {
    const classes = useStyles()

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
                    <RangeInput {...fieldProps} disabled={started} />
                </Grid>
            ))}

            <Grid container alignItems='center' justify='space-around' className={classes.controlButtons}>
                {!started ? (
                    <Grid item>
                        <Button variant='contained' color='primary' onClick={handleStart}> START</Button>
                    </Grid>
                ) : (
                        <>
                            <Grid item>
                                <Button variant='contained' color='primary' onClick={() => handleReset(window)}> RESET</Button>
                            </Grid>
                            <Grid item>
                                <Button variant='contained' color='primary' onClick={handleStop}> STOP</Button>
                            </Grid>
                        </>
                    )
                }
            </Grid>

        </Grid>
    );
};

export default Form;