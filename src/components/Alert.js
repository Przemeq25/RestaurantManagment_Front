import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import {useDispatch, useSelector} from "react-redux";
import {number} from "prop-types";
import {resetAlert} from "../redux/actions/alert";


function slideLeft(props){
    return (<Slide {...props} direction="left"/>)
}

const Alert = ({hideDuration}) =>{
    const isAlertOpen = useSelector(state=>state.alert.isOpen);
    const isError = useSelector(state=>state.alert.error);
    const message = useSelector(state=>state.alert.message);
    const dispatch = useDispatch();


    return(
        <Snackbar
            open={isAlertOpen}
            autoHideDuration={hideDuration}
            anchorOrigin={{
                vertical: 'top', horizontal: 'right'
            }}
            TransitionComponent={slideLeft}
            onClose={()=>{
                setTimeout(()=>{
                    dispatch(resetAlert())
                },hideDuration)
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
