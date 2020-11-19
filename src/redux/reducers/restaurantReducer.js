import {restaurantConstants} from '../types';


const initialState = {
    isRequesting:false,
    isStepperOpen:false,
    restaurants:[],
    error:null,
    selectedRestaurant:null
};

export const restaurantReducer = (state = initialState, action)=>{
    switch(action.type){
        case restaurantConstants.ADD_RESTAURANT_OPEN_STEPPER:
            return {
                ...state,
                isStepperOpen: true,
            }
        case restaurantConstants.ADD_RESTAURANT_CLOSE_STEPPER:
            return {
                ...state,
                isStepperOpen: false,
            }
        case restaurantConstants.RESTAURANT_REQUEST:
            return {
                ...state,
                isRequesting: true,
                error: null,
            }
        case restaurantConstants.ADD_RESTAURANT_SUCCESS:
            return {
                ...state,
                isRequesting: false,
                restaurants: [...state.restaurants, action.payload],
                isStepperOpen: false,
            }
        case restaurantConstants.ADD_RESTAURANT_ERROR:
            return {
                ...state,
                isRequesting: false,
                error: action.payload,
            }
        case restaurantConstants.GET_RESTAURANTS_FOR_ADMIN_SUCCESS:
            return {
                ...state,
                isRequesting:false,
                restaurants: action.payload,
            }
        case restaurantConstants.GET_RESTAURANTS_FOR_ADMIN_ERROR:
            return {
                ...state,
                isRequesting:false,
                error: action.payload,
            }

        default:
            return {...state}
    }

}

