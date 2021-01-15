import {mealsConstants} from '../types';


const initialState = {
    isRequesting:true,
    isDeleteRequesting:false,
    isEditRequesting:false,
    isAddRequesting:false,
    meals:[],
    error:null,
    editedMeal:null,
    isDrawerOpen:false,

};

export const mealsReducer = (state=initialState, action)=>{
    switch(action.type){
        case mealsConstants.MEALS_REQUEST:
            return {
                ...state,
                isRequesting: true,
            }
        case mealsConstants.GET_MEALS_SUCCESS:
            return{
                ...state,
                isRequesting: false,
                meals: action.payload,
            }
        case mealsConstants.GET_MEALS_ERROR:
            return{
                ...state,
                isRequesting: false,
                error: action.payload,
            }
        case mealsConstants.ADD_MEAL_REQUEST:{
            return {
                ...state,
                isAddRequesting: true,
            }
        }
        case mealsConstants.ADD_MEAL_SUCCESS:
            return {
                ...state,
                isAddRequesting: false,
                meals: [...state.meals, action.payload],
            }
        case mealsConstants.ADD_MEAL_ERROR:
            return {
                ...state,
                isAddRequesting: false,
                error: action.payload,
            }
        case mealsConstants.OPEN_DRAWER:
            return {
                ...state,
                isDrawerOpen: true,
            }
        case mealsConstants.CLOSE_DRAWER:
            return {
                ...state,
                isDrawerOpen: false,
                editedMeal: null,
            }
        case mealsConstants.EDIT_MEAL:
            return {
                ...state,
                editedMeal: action.payload,
                isDrawerOpen: true,
            }
        case mealsConstants.EDIT_MEAL_REQUEST:
            return {
                ...state,
                isEditRequesting: true,
            }
        case mealsConstants.EDIT_MEAL_SUCCESS:
            const foundMatchIndexOfEditingMeal = state.meals.findIndex(meal=>meal.id === action.payload.id);
            const newArrayOfMeals = [...state.meals];
            newArrayOfMeals.splice(foundMatchIndexOfEditingMeal,1,action.payload);
            return {
                ...state,
                isEditRequesting:false,
                meals:newArrayOfMeals
            }
        case mealsConstants.EDIT_MEAL_ERROR:
            return {
                ...state,
                isEditRequesting:false,
                error: action.payload,
            }
        case mealsConstants.DELETE_MEAL_REQUEST:
            return {
                ...state,
                isDeleteRequesting: true,
            }
        case mealsConstants.DELETE_MEAL_SUCCESS:
            const foundMatchIndexOfDeletingMeal = state.meals.findIndex(meal=>meal.id === action.payload);
            const newMeals = [...state.meals];
            newMeals.splice(foundMatchIndexOfDeletingMeal,1);

            return {
                ...state,
                isDeleteRequesting:false,
                meals: newMeals
            }
        case mealsConstants.DELETE_MEAL_ERROR:
            return {
                ...state,
                isDeleteRequesting: false,
                error: action.payload,
            }
        case mealsConstants.RESET:
            return initialState;
        default:
            return state;
    }
};
