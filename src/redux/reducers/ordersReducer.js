import {orderStatus} from "../../helpers/_helpers";
import {ordersConstants} from "../types";

const initialState = {
    isFetching:false,
    orderStatus: orderStatus.IN_PROGRESS,
    orders:[],
}

export const ordersReducer = (state=initialState, action) =>{
    switch (action.type) {

        case ordersConstants.GET_ORDERS_REQUEST:
            return {
                ...state,
                isFetching: true,
            }
        case ordersConstants.GET_ORDERS_SUCCESS:
            let ordersWithCheckedValue = [];
            if(orderStatus.IN_PROGRESS){
                ordersWithCheckedValue = action.payload.map(order=> Object.assign(order, {meals:order.meals.map(meal=> ({...meal, isFinished:false})), isAllMealsFinished:false}))
            }
            return {
                ...state,
                isFetching: false,
                orders: ordersWithCheckedValue
            }
        case ordersConstants.SWITCH_ORDER_STATUS:
            return {
                ...state,
                isFetching:true,
                orders:[],
                orderStatus: action.payload
            }
        case ordersConstants.CHECK_MEAL:
            const indexOfCheckedMeal = state.orders[action.payload.orderIndex].meals.findIndex(meal=>meal.id === action.payload.id);
            const newOrders = [...state.orders];
            newOrders[action.payload.orderIndex].meals.splice(indexOfCheckedMeal,1,{...state.orders[action.payload.orderIndex].meals[indexOfCheckedMeal], isFinished:action.payload.isFinished});
            const isOrderReady = newOrders[action.payload.orderIndex].meals.every(meal=>meal.isFinished === true);
            if(isOrderReady){
                newOrders[action.payload.orderIndex].isAllMealsFinished = true;
            }else{
                newOrders[action.payload.orderIndex].isAllMealsFinished = false;
            }
            return {
                ...state,
                orders: newOrders,
            }
        case ordersConstants.CHECK_ALL_MEALS:
            const newArrayOfMeals = state.orders[action.payload.orderIndex].meals.map(meals => ({...meals,isFinished: action.payload.isFinished}))
            const readyOrders = [...state.orders];
            readyOrders[action.payload.orderIndex].meals = newArrayOfMeals;
            readyOrders[action.payload.orderIndex].isAllMealsFinished = action.payload.isFinished;
            return {
                ...state,
                orders: readyOrders,
            }
        default:
            return state
    }
}
