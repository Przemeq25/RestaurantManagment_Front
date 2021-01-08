import {ordersConstants} from "../types";
import {orderService} from "../../services/ordersService";
import {errorAlert} from "./alert";


export const getOrders = (restaurantID,orderStatus) => {
    return dispatch =>{
        dispatch(request());
        orderService.getOrdersForRestaurants(restaurantID,orderStatus)
            .then(response=>dispatch(success(response.data.content)))
            .catch(()=>dispatch(errorAlert("Coś poszło nie tak")))
    }
    function request(){return{type:ordersConstants.GET_ORDERS_REQUEST}}
    function success(data){return{type:ordersConstants.GET_ORDERS_SUCCESS, payload:data}}
}

export const switchOrderStatus = (orderStatus) =>{
    return dispatch =>dispatch({type:ordersConstants.SWITCH_ORDER_STATUS, payload: orderStatus})
}
export const changeMealStatus = (mealID,orderID,isChecked) =>{
    return dispatch=>dispatch({type:ordersConstants.CHECK_MEAL,payload:{id:mealID,orderIndex:orderID,isFinished:isChecked}})
}
export const changeAllMealsStatus = (orderID,isChecked)=>{
    return dispatch=>dispatch({type:ordersConstants.CHECK_ALL_MEALS,payload:{orderIndex:orderID, isFinished:isChecked}})
}
