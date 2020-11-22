import {registerConstants} from "../types";

const initialState = {
    isRequesting:false,
    registerSuccess:false,
    error:null,
    confirmationSuccess:false,
}

export const registerReducer = (state = initialState,action) =>{
    switch (action.type) {
        case registerConstants.RETURN_INITIAL_STATE:
            return {
                ...state,
                error: null
            }
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
        case registerConstants.CONFIRM_REGISTER_SUCCESS:
            return {
                ...state,
                confirmationSuccess: true,
                isRequesting: false,
            }
        case registerConstants.CONFIRM_REGISTER_ERROR:
            return {
                ...state,
                confirmationSuccess: false,
                error: action.payload,
                isRequesting: false,
            }
        default:
            return {...state}
    }
}
