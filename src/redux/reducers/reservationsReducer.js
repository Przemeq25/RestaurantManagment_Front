import {reservationsConstants} from "../types";

const initialState={
    isDialogOpen:false,
    isFetching:false,
    reservations:[],
    error:'',
}

export const reservationsReducer = (state=initialState, action)=>{
    switch(action.type){
        case reservationsConstants.TOGGLE_RESERVATION_DIALOG:{
            return {
                ...state,
                isDialogOpen: !state.isDialogOpen,
            }
        }
        case reservationsConstants.GET_RESERVATIONS_REQUEST:{
            return {
                ...state,
                isFetching: true,
            }
        }
        case reservationsConstants.GET_RESERVATIONS_SUCCESS:{
            return {
                ...state,
                isFetching:false,
                reservations: action.payload
            }
        }
        case reservationsConstants.GET_RESERVATIONS_ERROR:{
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
        }
        default:
            return initialState
    }
}
