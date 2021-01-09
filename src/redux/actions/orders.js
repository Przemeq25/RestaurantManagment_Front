import {ordersConstants} from "../types";
import {orderService} from "../../services/ordersService";
import {errorAlert, successAlert} from "./alert";
import {orderStatus} from "../../helpers/_helpers";
import {mealsService} from "../../services/mealsService";
import axios from "axios";
import {appUrl} from "../../config/app.config";
import {restaurantService} from "../../services/restaurantService";


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
export const getMenu = (restaurantId) =>{
    return dispatch=>{
        mealsService.getMeals(restaurantId)
            .then(response=>dispatch({type:ordersConstants.GET_MENU, payload:response.data.meals}))
            .catch(()=>errorAlert("Coś poszło nie tak"))
    }
}
export const addProductToOrder = (product) =>{
    return dispatch=>{
        dispatch({type:ordersConstants.ADD_PRODUCT_TO_ORDER, payload:product})
        dispatch(countTotalPrice());
    }
}
export const removeProductFromOrder = (productId)=>{
    return dispatch=>{
        dispatch({type:ordersConstants.REMOVE_PRODUCT_FROM_ORDER, payload:productId})
        dispatch(countTotalPrice());
    }
}
export const countTotalPrice = () =>{
    return dispatch=>dispatch({type:ordersConstants.COUNT_TOTAL_PRICE})
}
export const incrementProduct = (productId) =>{
    return dispatch=>{
        dispatch({type:ordersConstants.INCREMENT_PRODUCT_IN_ORDER, payload:productId})
        dispatch(countTotalPrice());
    }
}
export const decrementProduct = (productId) =>{
    return dispatch=>{
        dispatch({type:ordersConstants.DECREMENT_PRODUCT_IN_ORDER, payload:productId})
        dispatch(countTotalPrice());
    }
}
export const submitPersonalOrder = (order,restaurantID) =>{
    return dispatch=>{
        dispatch(request());
        restaurantService.submitPersonalOrder(order,restaurantID)
            .then(response=>{
                dispatch(successAlert("Zamówienie skompletowane!"));
                dispatch(success(response.data));
            })
            .catch(()=>{
                errorAlert("Nie udało się skompletować zamówienia!")
            })
    }
    function request(){return{type:ordersConstants.REQUESTING}};
    function success(data){return{type:ordersConstants.SUBMIT_ORDER_SUCCESS, payload:data}}
}

export const changeOrderComment = (comment)=>{
    return dispatch=>dispatch({type:ordersConstants.CHANGE_ORDER_COMMENT, payload:comment})
}
