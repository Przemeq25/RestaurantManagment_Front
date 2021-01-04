import {mealsService} from "../../services/mealsService";
import {mealsConstants} from "../types";
import {restaurantService} from "../../services/restaurantService";
import {scaleImageByUrl} from "../../helpers/_helpers";
import {errorAlert, successAlert} from "./alert";


export const getMeals = (restaurantID) =>{
    return dispatch =>{
        dispatch(request());
        mealsService.getMeals(restaurantID)
            .then(response=>dispatch(success(response.data.content)))
            .catch(()=>dispatch(error(500)));
    }
    function request(){ return{type:mealsConstants.MEALS_REQUEST}}
    function success(meals){ return {type:mealsConstants.GET_MEALS_SUCCESS, payload:meals}}
    function error(error) { return {type:mealsConstants.GET_MEALS_ERROR, payload:error}}
}

export const addMeal = (meal,restaurantID)=>{
    return dispatch =>{
        dispatch(request());
        if(meal.image){
            restaurantService.addPicture(meal.image)
                .then(res=>{
                    mealsService.addMeal(Object.assign(meal,{image:scaleImageByUrl(res.data.secure_url)}),restaurantID)
                        .then(response=>{
                            dispatch(successAlert(`Pomyślnie dodano ${response.data.name} do menu`));
                            dispatch(success(response.data));
                            dispatch(closeDrawer());
                        })
                        .catch(()=>dispatch(errorAlert("Wystąpił błąd podczas dodawania posiłku, spróbuj ponownie!")));
                })
                .catch(()=>{
                    dispatch(errorAlert("Wystąpił błąd podczas dodawania zdjęcia, spróbuj ponownie"));
                })
        }else{
            mealsService.addMeal(Object.assign(meal),restaurantID)
                .then(response=>{
                    dispatch(successAlert(`Pomyślnie dodano ${response.data.name} do menu`));
                    dispatch(success(response.data))
                    dispatch(closeDrawer());
                })
                .catch(()=>dispatch(errorAlert("Wystąpił błąd podczas dodawania posiłku, spróbuj ponownie!")));
        }


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
        if(meal.image['type'].split('/')[0] === 'image'){
            restaurantService.addPicture(meal.image)
                .then(res=> {
                    mealsService.editMeal(Object.assign(meal, {image:res.data.secure_url}), restaurantID, meal.id)
                        .then(response => {
                            dispatch(successAlert(`Pomyślnie edytowano ${response.data.name}`));
                            dispatch(success(response.data));
                            dispatch(closeDrawer())
                        })
                        .catch(()=>dispatch(errorAlert("Wystąpił błąd podczas edycji posiłku, spróbuj ponownie!")));
                })
                .catch(()=>dispatch(errorAlert("Wystąpił błąd podczas edycji posiłku, spróbuj ponownie!")));
        }else{
            mealsService.editMeal(meal, restaurantID, meal.id)
                .then(response => {
                    dispatch(successAlert(`Pomyślnie edytowano ${response.data.name}`));
                    dispatch(success(response.data));
                    dispatch(closeDrawer())
                })
                .catch(()=>dispatch(errorAlert("Wystąpił błąd podczas dodawania posiłku, spróbuj ponownie!")));
        }

    };
    function request(){ return{type:mealsConstants.EDIT_MEAL_REQUEST}}
    function success(meal){ return {type:mealsConstants.EDIT_MEAL_SUCCESS, payload:meal}}
    function error(error) { return {type:mealsConstants.EDIT_MEAL_ERROR, payload:error}}
}

export const deleteMeal = (mealID,restaurantID,name)=>{
    return dispatch=>{
        dispatch(request());
        mealsService.deleteMeal(mealID,restaurantID)
            .then(()=>{
                dispatch(successAlert(`Pomyślnie usunięto ${name} z menu`));
                dispatch(success(mealID));
                dispatch(closeDrawer());
            })
            .catch(()=>dispatch(errorAlert("Wystąpił błąd podczas usuwania posiłku, spróbuj ponownie!")));
    };
    function request(){ return{type:mealsConstants.DELETE_MEAL_REQUEST}}
    function success(meal){ return {type:mealsConstants.DELETE_MEAL_SUCCESS, payload:meal}}
    function error(error) { return {type:mealsConstants.DELETE_MEAL_ERROR, payload:error}}
}

