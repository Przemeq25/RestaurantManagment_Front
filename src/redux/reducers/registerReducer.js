import {registerConstants} from "../types";

const initialState = {
    isRequesting:false,
    registerSuccess:false,
    error:null,



}

export const registerReducer = (state = initialState,action) =>{
    switch (action.type) {
        case registerConstants.REGISTER_REQUEST:
            return {
                ...state,
                isRequesting: true,
                error: null,
            };
        case registerConstants.REGISTER_SUCCESS:
            return {
                ...state,
                isRequesting: false,
                registerSuccess:true,

            };
        case registerConstants.REGISTER_ERROR:
            return {
                ...state,
                error: action.payload,
                isRequesting: false,
            }
        default:
            return {...state}
    }
}
