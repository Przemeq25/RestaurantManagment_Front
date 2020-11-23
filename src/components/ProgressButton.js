import React from "react";
import {Button} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from "@material-ui/core/Box";
import * as PropTypes from "prop-types";

const useStyles = makeStyles(()=>({
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}))

const ProgressButton = ({label, loading, variant, color,startIcon, size}) =>{
    const classes = useStyles();
    return(
        <Box position="relative">
            <Button variant= {variant} color={color} fullWidth disabled={loading} type="submit" startIcon={startIcon} size={size}> {label}</Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress}/>}
        </Box>
    )
}
export default ProgressButton;

ProgressButton.defaultProps = {
    variant: 'outlined',
    color:'primary',
    loading: false,
    startIcon:null,
    size:'medium',
}
ProgressButton.propTypes = {
    label: PropTypes.string.isRequired
};
