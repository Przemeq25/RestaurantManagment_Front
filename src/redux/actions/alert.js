import {alertConstants} from "../types";

export const successAlert = (message) => dispatch => {
    dispatch(resetAlert());
    dispatch({type:alertConstants.SUCCESS_ALERT, payload:{message:message,success:true}});
}

export const errorAlert = (message) => dispatch => dispatch({type:alertConstants.ERROR_ALERT, payload:{message:message,error:true}});

export const resetAlert = () => dispatch => dispatch({type:alertConstants.RESET_ALERT});
