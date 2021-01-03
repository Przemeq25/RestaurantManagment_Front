import {alertConstants} from "../types";

const initialState = {
    message:'',
    error:false,
    success:false,
}

export const alertReducer = (state=initialState, action)=>{
    switch(action.type){
        case alertConstants.SUCCESS_ALERT:
            return{
                ...state,
                message: action.payload.message,
                success: action.payload.success,
            }
        case alertConstants.RESET_ALERT:
            return initialState;

        case alertConstants.ERROR_ALERT:
            return{
                ...state,
                message: action.payload.message,
                error: action.payload.error,
            }
        default :
            return state
    }
}

