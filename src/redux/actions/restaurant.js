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
                setTimeout(()=>{
                    refreshLogin(refreshToken,dispatch)
                        .then(()=> {
                            dispatch(success(response.data))
                        }).catch((errorMessage)=>dispatch(error(errorMessage)))
                },30000)

            })
            .catch(errorMessage=>{
                dispatch(error(errorMessage));
            })
    }

    function request(){return {type:restaurantConstants.RESTAURANT_REQUEST}};
    function success(restaurant){return {type:restaurantConstants.ADD_RESTAURANT_SUCCESS, payload:restaurant}}
    function error(error){return {type:restaurantConstants.ADD_RESTAURANT_ERROR, payload:error}}
};

export const deleteRestaurant = (restaurantID)=>{
    return dispatch=>{
        dispatch(request());
        restaurantService.deleteRestaurant(restaurantID)
            .then(()=> {
                dispatch(success());
                history.push(routes.ADMIN_PANEL);
            })
            .catch((errorMessage)=> {
                dispatch(error(errorMessage))
                history.push(routes.ADMIN_PANEL);
            })

    }
    function request(){return {type:restaurantConstants.DELETE_RESTAURANT_REQUEST}};
    function success(){return {type:restaurantConstants.DELETE_RESTAURANT_SUCCESS}}
    function error(error){return {type:restaurantConstants.DELETE_RESTAURANT_ERROR, payload:error}}
}

export const editRestaurant = (restaurantData, restaurantID) =>{
    return dispatch =>{
        dispatch(request());
        restaurantService.editRestaurant(restaurantData,restaurantID)
            .then(response =>{
                dispatch(success(response.data))
            })
            .catch(errorMessage=>{
                dispatch(error(errorMessage));
            })
    }

    function request(){return {type:restaurantConstants.RESTAURANT_REQUEST}};
    function success(restaurant){return {type:restaurantConstants.EDIT_RESTAURANT_SUCCESS, payload:restaurant}}
    function error(error){return {type:restaurantConstants.EDIT_RESTAURANT_ERROR, payload:error}}
}

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
        restaurantService.getRestaurantsForAdmin()
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
        restaurantService.getSingleRestaurantForAdmin(restaurantId)
            .then(response=>dispatch(success(response.data)))
            .catch(errorMessage=>dispatch(error(errorMessage)))
    }
    function request(){return {type:restaurantConstants.RESTAURANT_REQUEST}};
    function success(restaurant){return {type:restaurantConstants.GET_SINGLE_RESTAURANT_FOR_ADMIN_SUCCESS, payload:restaurant}}
    function error(error){return {type:restaurantConstants.GET_SINGLE_RESTAURANT_FOR_ADMIN_ERROR, payload:error}}
}

