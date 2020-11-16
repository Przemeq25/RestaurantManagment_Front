import {restaurantConstants} from '../types';


const initialState = {
    isRequesting:true,
    restaurants:[],
    error:null,
    selectedRestaurant:null
};

export const restaurantReducer = (state = initialState, action)=>{
    switch(action.type){
        case restaurantConstants.ADD_RESTAURANT_REQUEST:
            return {
                ...state,
                isRequesting: true,
                error: null,
            }
        case restaurantConstants.ADD_RESTAURANT_SUCCESS:
            return {
                ...state,
                isRequesting: false,
                restaurants: state.restaurants.push(action.payload)
            }
        case restaurantConstants.ADD_RESTAURANT_ERROR:
            return {
                ...state,
                isRequesting: false,
                error: action.payload,
            }
        default:
            return {...state}
    }

}

