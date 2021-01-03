import React, {useEffect, useState} from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import {useDispatch, useSelector} from "react-redux";
import {number} from "prop-types";
import {resetAlert} from "../redux/actions/alert";

const useStyles = makeStyles(theme=>({
    alertPosition:{
        position:'fixed',
        top: 88,
    }
}));

function slideLeft(props){
    return (<Slide {...props} direction="left"/>)
}

const Alert = ({hideDuration}) =>{
    const classes = useStyles();
    const [isAlertOpen,setAlertOpen] = useState(false);
    const isError = useSelector(state=>state.alert.error);
    const isSuccess = useSelector(state=>state.alert.success);
    const message = useSelector(state=>state.alert.message);
    const dispatch = useDispatch();

    useEffect(()=>{
        setAlertOpen(true);
    },[message]);

    return(
        <Snackbar
            open={isAlertOpen}
            autoHideDuration={hideDuration}
            anchorOrigin={{
                vertical: 'top', horizontal: 'right'
            }}
            TransitionComponent={slideLeft}
            classes={{anchorOriginTopRight:classes.alertPosition}}
            onClose={()=>{
                setAlertOpen(false)
            }}
        >
            <MuiAlert elevation={3} variant="filled" severity={isError ? "error" : "success"}>
                {message}
            </MuiAlert>
        </Snackbar>
    )
}
export default Alert;

Alert.defaultProps={
    hideDuration:4000,
}
Alert.propTypes={
    hideDuration:number,
}
