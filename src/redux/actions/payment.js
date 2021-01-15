import {basketConstants, paymentConstants} from "../types";
import {history, orderType, paymentType} from "../../helpers/_helpers";
import {restaurantService} from "../../services/restaurantService";
import {routes} from "../../config/routes";
import {errorAlert, successAlert} from "./alert";
import {orderService} from "../../services/ordersService";


export const getPersonalDataToPayment = (personalData) =>{
    return dispatch=> {
        if(Object.values(personalData).every(x => (x !== null)) && Object.keys(personalData).length > 0){
            dispatch({type:paymentConstants.GET_PERSONAL_DATA_SUCCESS, payload:personalData});
        }else{
            dispatch({type:paymentConstants.GET_PERSONAL_DATA_ERROR});
        }
    }
}
export const getOrdersToPayment = (basket)=>{
    const result=[];
    basket.forEach(function (a) {
        if (!this[a.restaurantId]) {
            this[a.restaurantId] = { restaurantId: a.restaurantId,  meals: [], comment:'', paymentMethod: paymentType.CASH, orderType: orderType.TAKE_AWAY };
            result.push(this[a.restaurantId]);
        }
        this[a.restaurantId].meals.push({id:a.id, quantity:a.amount});
    }, Object.create(null));

    return dispatch =>{
        dispatch({type:paymentConstants.GET_BASKET_SUCCESS, payload: result})
    }
}
export const changeOrderDetail = (name,value,restaurantID) =>{
    return dispatch=>dispatch({type:paymentConstants.CHANGE_ORDER_DETAIL, payload:{id:restaurantID, [name]:value}})
}

export const submitOrder = (order) =>{
    return dispatch =>{
        dispatch({type:paymentConstants.SUBMIT_REQUEST});
        const {forename,surname,city,street,postCode,phoneNumber,houseNumber, email, login} = order;
        const personalData = { forename,surname,city,street,postCode,phoneNumber,houseNumber, email, login}
        const orders = order.order.map((order)=> ({...personalData, ...order}));

            let promises = [];
            for (let i = 0; i < orders.length; i++) {
                promises.push(
                    restaurantService.submitOrder(orders[i],orders[i].restaurantId)
                        .then((response)=> {
                            if (orders[i].paymentMethod === paymentType.ONLINE) {
                                orderService.payOnline(orders[i].restaurantId,response.data.orderId)
                                    .then((response)=>{
                                        window.open(response.data.payUUrl, '_blank');
                                    })
                            }
                        })
                        .then(()=>dispatch({type:paymentConstants.DELETE_SUCCESS_ORDER, payload:orders[i].restaurantId}))
                        .catch(()=>dispatch(errorAlert("Błąd w zamówieniu!")))
                )
            }

            Promise.all(promises)
                .then(() => {
                    dispatch({type:paymentConstants.PAYMENT_END})
                    history.push(routes.MY_ORDERS)
                    dispatch({type:basketConstants.RESET});
                    dispatch(successAlert("Zamówienie skompletowane!"))
                })
                .catch(()=>dispatch(errorAlert("Niektóre zamówienia nie zostały skompletowane! Spróbuj ponownie")))
    }



}
