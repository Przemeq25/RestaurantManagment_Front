import {mealsService} from "../../services/mealsService";
import {mealsConstants} from "../types";
import {restaurantService} from "../../services/restaurantService";
import {scaleImageByUrl} from "../../helpers/_helpers";


export const getMeals = (restaurantID) =>{
    return dispatch =>{
        dispatch(request());
        mealsService.getMeals(restaurantID)
            .then(response=>dispatch(success(response.data.content)))
            .catch(errorMessage=>dispatch(error(errorMessage)));
    }
    function request(){ return{type:mealsConstants.MEALS_REQUEST}}
    function success(meals){ return {type:mealsConstants.GET_MEALS_SUCCESS, payload:meals}}
    function error(error) { return {type:mealsConstants.GET_MEALS_ERROR, payload:error}}
}

export const addMeal = (meal,restaurantID)=>{
    return dispatch =>{
        dispatch(request());
        restaurantService.addPicture(meal.image)
            .then(res=>{
                mealsService.addMeal(Object.assign(meal,{image:scaleImageByUrl(res.data.secure_url)}),restaurantID)
                    .then(response=>{
                        dispatch(success(response.data))
                        dispatch(closeDrawer());
                    })
                    .catch(errorMessage=>dispatch(error(errorMessage)));
            })
            .catch(err=>{
                dispatch(error(err));
            })

    };
    function request(){ return{type:mealsConstants.ADD_MEAL_REQUEST}}
    function success(meal){ return {type:mealsConstants.ADD_MEAL_SUCCESS, payload:meal}}
    function error(error) { return {type:mealsConstants.ADD_MEAL_ERROR, payload:error}}
};

export const openDrawer = () =>{
    return dispatch => dispatch({type:mealsConstants.OPEN_DRAWER})
}
export const closeDrawer = () =>{
    return dispatch => dispatch({type:mealsConstants.CLOSE_DRAWER})
}

export const openDrawerToEditMeal = (meal) =>{
    return dispatch =>dispatch({type:mealsConstants.EDIT_MEAL, payload:meal})
}

export const editMeal =(meal,restaurantID)=>{
    return dispatch=>{
        dispatch(request());
        if(meal.image instanceof FormData){
            restaurantService.addPicture(meal.image)
                .then(res=> {

                })
                .catch(errorMessage => dispatch(error(errorMessage)));
        }else{
            mealsService.editMeal(meal, restaurantID, meal.id)
                .then(response => {
                    dispatch(success(response.data));
                    dispatch(closeDrawer())
                })
                .catch(errorMessage => dispatch(error(errorMessage)));
        }

    };
    function request(){ return{type:mealsConstants.EDIT_MEAL_REQUEST}}
    function success(meal){ return {type:mealsConstants.EDIT_MEAL_SUCCESS, payload:meal}}
    function error(error) { return {type:mealsConstants.EDIT_MEAL_ERROR, payload:error}}
}

export const deleteMeal = (mealID,restaurantID)=>{
    return dispatch=>{
        dispatch(request());
        mealsService.deleteMeal(mealID,restaurantID)
            .then(()=>{
                dispatch(success(mealID));
                dispatch(closeDrawer());
            })
            .catch(errorMessage=>dispatch(error(errorMessage)));
    };
    function request(){ return{type:mealsConstants.DELETE_MEAL_REQUEST}}
    function success(meal){ return {type:mealsConstants.DELETE_MEAL_SUCCESS, payload:meal}}
    function error(error) { return {type:mealsConstants.DELETE_MEAL_ERROR, payload:error}}
}

