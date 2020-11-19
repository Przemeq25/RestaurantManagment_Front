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
            return {
                ...state,
                isLoggedIn: false,
                token:null,
                refreshToken:null,
                isLoading: false,
                error: null,
            };
        case authConstants.AUTHORIZATION:
            const restaurantRoles=[];
            action.payload.role.map(item => restaurantRoles.push({role:item.authority.split('_')[1], id:item.authority.split('_')[2]}) )
            return {
                ...state,
                isLoading:false,
                userType: restaurantRoles,
                userData: action.payload.user
            }
        default:
            return state;

    }
};
