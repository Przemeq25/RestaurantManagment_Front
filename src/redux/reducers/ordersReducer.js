import {orderStatus, orderType, paymentType} from "../../helpers/_helpers";
import {ordersConstants} from "../types";

const initialState = {
    isFetching:false,
    isRequesting:false,
    orderStatus: orderStatus.IN_PROGRESS,
    orders:[],
    menu:[],
    currentOrder:{
        meals:[],
        paymentMethod:paymentType.CASH,
        orderType:orderType.IN_LOCAL,
        totalPrice:0,
        comment:"",
    },
    error:null,
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

        case ordersConstants.GET_ORDERS_ERROR:{
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
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

        case ordersConstants.REQUESTING:
            return {
                ...state,
                isRequesting: true,
            }

        case ordersConstants.MOVE_ORDER_TO_NEXT_STATUS:
            const orderIndex = state.orders.findIndex(order=>order.id === action.payload.id)
            const orders = [...state.orders];
            orders.splice(orderIndex,1);
            return {
                ...state,
                orders: orders,
                isRequesting: false,
            };

        case ordersConstants.CHANGE_ORDER_PAY_STATUS: {
            const orderIndex = state.orders.findIndex(order => order.id === action.payload.id);
            const orders = [...state.orders];
            orders[orderIndex].payed = action.payload.isPayed;
            return {
                ...state,
                orders: orders,
            };
        }
        case ordersConstants.GET_MENU_SUCCESS:{
            return {
                ...state,
                menu: action.payload,
            }
        }
        case ordersConstants.GET_MENU_ERROR:{
            return {
                ...state,
                error: action.payload,
            }
        }

        case ordersConstants.ADD_PRODUCT_TO_ORDER:{
            return {
                ...state,
                currentOrder: {...state.currentOrder,meals: [...state.currentOrder.meals, {...action.payload, price: Number(action.payload.price), quantity:1}]},
            }
        }
        case ordersConstants.REMOVE_PRODUCT_FROM_ORDER:{
            const productIndex = state.currentOrder.meals.findIndex(meal=>meal.id === action.payload);
            const newOrder = [...state.currentOrder.meals];
            newOrder.splice(productIndex,1)
            return {
                ...state,
                currentOrder: {...state.currentOrder,meals: newOrder}
            }
        }
        case ordersConstants.COUNT_TOTAL_PRICE:{
            const totalPrice = state.currentOrder.meals.map(item=>(item.price * item.quantity)).reduce((total,productPrice)=> total += productPrice, 0);
            return {
                ...state,
                currentOrder: {...state.currentOrder,totalPrice: totalPrice}
            }
        }
        case ordersConstants.INCREMENT_PRODUCT_IN_ORDER:{
            const productIndex = state.currentOrder.meals.findIndex(meal=>meal.id === action.payload);
            const product = state.currentOrder.meals.find(item => item.id === action.payload);
            product.quantity += 1;
            const newOrder = [...state.currentOrder.meals];
            newOrder.splice(productIndex,1,product)
            return {
                ...state,
                currentOrder: {...state.currentOrder,meals:newOrder}
            }
        }
        case ordersConstants.DECREMENT_PRODUCT_IN_ORDER:{
            const productIndex = state.currentOrder.meals.findIndex(meal=>meal.id === action.payload);
            const product = state.currentOrder.meals.find(item => item.id === action.payload);
            product.quantity -= 1;
            const newOrder = [...state.currentOrder.meals];
            if(product.quantity === 0){
                newOrder.splice(productIndex,1)
            }else{
                newOrder.splice(productIndex,1,product)
            }
            return {
                ...state,
                currentOrder: {...state.currentOrder,meals:newOrder}
            }
        }
        case ordersConstants.SUBMIT_ORDER_SUCCESS:{
            const mealsInNewOrder = state.currentOrder.meals.map(meal=> ({...meal, isFinished:false}));
            return{
                ...state,
                isRequesting:false,
                orders: [...state.orders, {...state.currentOrder, id:action.payload.orderId, price:state.currentOrder.totalPrice, isAllMealsFinished:false, meals:mealsInNewOrder, orderStatus:orderStatus.IN_PROGRESS}],
                currentOrder: initialState.currentOrder,
            }
        }
        case ordersConstants.CHANGE_ORDER_COMMENT:{
            return {
                ...state,
                currentOrder: {...state.currentOrder,comment:action.payload}
            }
        }

        default:
            return state
    }
}
