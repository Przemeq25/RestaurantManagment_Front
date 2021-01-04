import {authConstants} from '../types';


const initialState = {
    isLoggedIn: false,
    token:null,
    refreshToken:null,
    isLoading: false,
    error: null,
    userType:null,
    userData:{},
};
export const authReducer = (state = initialState, action) =>{
    switch(action.type){
        case authConstants.RETURN_INITIAL_STATE:
            return {
                ...state,
                error: null
            }
        case authConstants.LOGIN_REQUEST :
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case authConstants.LOGIN_SUCCESS :
            return {
                ...state,
                isLoggedIn: true,
                token:action.payload.access_token,
                refreshToken:action.payload.refresh_token,
                isLoading: false,
                error: null,

            };
        case authConstants.LOGIN_ERROR :
            return {
                ...state,
                isLoading: false,
                error: action.payload,

            };
        case authConstants.LOGOUT :
            return initialState;

        case authConstants.AUTHORIZATION_SUCCESS:
            const restaurantRoles=[];
            action.payload.role.map(item => restaurantRoles.push({role:item.authority.split('_')[1], id:item.authority.split('_')[2]}) )
            return {
                ...state,
                userType: restaurantRoles,
            }

        case authConstants.AUTHORIZATION_ERROR:
            return {
                ...state,
                isLoading:false,
                error: action.payload
            }

        case authConstants.PERSONAL_DATA_REQUEST:
            return {
                ...state,
                isLoading:true,
            }
        case authConstants.PERSONAL_DATA_SUCCESS:
            return {
                ...state,
                userData: action.payload,
                isLoading: false,
            }
        case authConstants.PERSONAL_DATA_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        default:
            return state;

    }
};
