import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const RangeInput = ({label, ...otherProps}) => {
    return (
        <>
        <Typography variant='overline'>
           {label}
        </Typography>
        <Slider {...otherProps}/>
        </>
    );
};

export default RangeInput;