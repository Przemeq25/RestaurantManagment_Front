import React from "react";
import {CircularProgress as Progress,Box} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme=>({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    progressPosition:{
        height:'calc(100vh - 115px)',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',

    }
}));

const CircularProgress = () =>{
    const classes = useStyles();
    return(
        <Box className={classes.progressPosition}>
            <Progress color="secondary" />
        </Box>
    )
}
export default CircularProgress;
