import axios from 'axios';
import {appUrl} from "../config/app.config";

const getMyOrders = () =>{
    return axios.get(`${appUrl}/order-api/restaurants/my-orders`,{
        params:{
            sort:'time,desc',
            size:500,
        },
        headers:{
            Authorization:`bearer ${ localStorage.getItem('access_token')}`
        }
    })
}

const getOrdersForRestaurants = (restaurantId,orderStatus) =>{
    return axios.get(`${appUrl}/order-api/restaurants/${restaurantId}/orders`,{
        params:{
            archived: orderStatus === "DONE" ? true : "",
            sort:'time,asc',
            orderStatus:orderStatus,
        },
        headers:{
            Authorization:`bearer ${ localStorage.getItem('access_token')}`
        }
    })
}
const changeOrderStatus = (restaurantId,order)=>{
    return axios.put(`${appUrl}/order-api/restaurants/${restaurantId}/orders/${order.id}`,
        order,
{
        headers:{
            Authorization:`bearer ${ localStorage.getItem('access_token')}`
        }
    })
}

export const orderService = {
    getMyOrders,
    getOrdersForRestaurants,
    changeOrderStatus
}