import {ordersConstants} from "../types";
import {orderService} from "../../services/ordersService";
import {errorAlert, successAlert} from "./alert";
import {orderStatus} from "../../helpers/_helpers";


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
export const changeOrderStatus =(restaurantId,order,status = orderStatus.IN_DELIVERY)=>{
    return dispatch =>{
        dispatch(request());
        orderService.changeOrderStatus(restaurantId,{...order,orderStatus:status})
            .then(response=>{
                dispatch(successAlert("Przeniesiono zamówienie do kolejnego etapu!"));
                dispatch(success(response.data));
            })
            .catch(()=>{
                errorAlert("Nie udało się przenieść zamówienia do kolejnego etapu!")
            })
    }
    function request(){return{type:ordersConstants.REQUESTING}};
    function success(data){return{type:ordersConstants.MOVE_ORDER_TO_NEXT_STATUS, payload:data}}
}
export const changeOrderPayStatus = (orderID,isChecked) =>{
    return dispatch=>dispatch({type:ordersConstants.CHANGE_ORDER_PAY_STATUS,payload:{id:orderID,isPayed:isChecked}})
}
