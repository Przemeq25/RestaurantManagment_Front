import {restaurantService} from "../../services/restaurantService";
import {restaurantConstants} from "../types";
import {refreshLogin} from "./auth";
import {history} from "../../helpers/_helpers";
import {routes} from "../../config/routes";

export const addRestaurant = (restaurant,refreshToken)=>{
    return dispatch =>{
        dispatch(request());
        restaurantService.addRestaurant(restaurant)
            .then(response =>{
                refreshLogin(refreshToken,dispatch)
                    .then(()=> {
                        dispatch(success(response.data))
                    }).catch(()=>console.log("error"))

            })
            .catch(err=>{
                dispatch(error(err));
                console.log(err);
            })
    }

    function request(){return {type:restaurantConstants.RESTAURANT_REQUEST}};
    function success(restaurant){return {type:restaurantConstants.ADD_RESTAURANT_SUCCESS, payload:restaurant}}
    function error(error){return {type:restaurantConstants.ADD_RESTAURANT_ERROR, payload:error}}
};

export const openAddRestaurantStepper = () =>{
    return dispatch => dispatch(openStepper());

    function openStepper(){return {type:restaurantConstants.ADD_RESTAURANT_OPEN_STEPPER}}
}
export const closeAddRestaurantStepper = () =>{
    return dispatch => dispatch(close());

    function close(){return {type:restaurantConstants.ADD_RESTAURANT_CLOSE_STEPPER}}
}

export const getRestaurantsForAdmin =()=>{
    return dispatch =>{
        dispatch(request());
        restaurantService.getRestaurants()
            .then(response => dispatch(success(response.data.content)))
            .catch(errorMessage => dispatch(error(errorMessage)))
    }
    function request(){return {type:restaurantConstants.RESTAURANT_REQUEST}};
    function success(restaurants){return {type:restaurantConstants.GET_RESTAURANTS_FOR_ADMIN_SUCCESS, payload:restaurants}}
    function error(error){return {type:restaurantConstants.GET_RESTAURANTS_FOR_ADMIN_ERROR, payload:error}}
}

export const selectRestaurant = (restaurant) =>{
    return dispatch =>{
        dispatch(select(restaurant));
        history.push(`${routes.RESTAURANT_DASHBOARD}/${restaurant.id}`)
    }
    function select(restaurant){return{type:restaurantConstants.SELECT_RESTAURANT, payload:restaurant}}
}
export const unselectRestaurant = () =>{
    return dispatch =>{
        dispatch(unselect())
    }
    function unselect(){return{type: restaurantConstants.UNSELECT_RESTAURANT}}
}

export const getSingleRestaurantForAdmin = (restaurantId) =>{
    return dispatch =>{
        dispatch(request());
        restaurantService.getSingleRestaurant(restaurantId)
            .then(response=>dispatch(success(response.data)))
            .catch(errorMessage=>dispatch(error(errorMessage)))
    }
    function request(){return {type:restaurantConstants.RESTAURANT_REQUEST}};
    function success(restaurant){return {type:restaurantConstants.GET_SINGLE_RESTAURANT_FOR_ADMIN_SUCCESS, payload:restaurant}}
    function error(error){return {type:restaurantConstants.GET_SINGLE_RESTAURANT_FOR_ADMIN_ERROR, payload:error}}
}

