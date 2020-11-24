import {mealsConstants} from '../types';


const initialState = {
    isRequesting:false,
    isDeleteRequesting:false,
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
        case mealsConstants.ADD_MEAL_SUCCESS:
            return {
                ...state,
                isRequesting: false,
                meals: [...state.meals, action.payload],
            }
        case mealsConstants.ADD_MEAL_ERROR:
            return {
                ...state,
                isRequesting: false,
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
        case mealsConstants.EDIT_MEAL_SUCCESS:
            const foundMatchIndexOfEditingMeal = state.meals.findIndex(meal=>meal.id === action.payload.id);
            const newArrayOfMeals = [...state.meals];
            console.log(foundMatchIndexOfEditingMeal)
            newArrayOfMeals.splice(foundMatchIndexOfEditingMeal,1,action.payload);
            return {
                ...state,
                isRequesting:false,
                meals:newArrayOfMeals
            }
        case mealsConstants.EDIT_MEAL_ERROR:
            return {
                ...state,
                isRequesting:false,
                error: action.payload,
            }
        default:
            return state;
    }
};
