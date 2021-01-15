import {paymentConstants} from "../types";

const initialState = {
    city:'',
    street: '',
    postCode: '',
    houseNumber: '',
    phoneNumber: '',
    email:'',
    forename: '',
    surname: '',
    order:[],
    isRequesting:false,
}

export const paymentReducer = (state=initialState, action) =>{
    switch(action.type){
        case paymentConstants.GET_PERSONAL_DATA_SUCCESS:
            return Object.assign(state,action.payload);

        case paymentConstants.GET_PERSONAL_DATA_ERROR:
            return state;

        case paymentConstants.GET_BASKET_SUCCESS:
            return {
                ...state,
                order: action.payload
            }
        case paymentConstants.CHANGE_ORDER_DETAIL:
            const orderID = state.order.findIndex(order => order.restaurantId === action.payload.id);
            const orderWithDetails = [...state.order];
            Object.assign(orderWithDetails[orderID],{[Object.keys(action.payload)[1]]:Object.values(action.payload)[1]});
            return {
                ...state,
                order: orderWithDetails,
            }
        case paymentConstants.SUBMIT_REQUEST:
            return {
                ...state,
                isRequesting: true,
            }
        case paymentConstants.DELETE_SUCCESS_ORDER:
            const findedId = state.order.findIndex(order => order.restaurantId === action.payload);
            const notPaymentOrders = [...state.order];
            notPaymentOrders.splice(findedId,1);
            localStorage.removeItem('basket');
            return {
                ...state,
                order: notPaymentOrders,
            }
        case paymentConstants.PAYMENT_END:
            return {
                ...state,
                isRequesting: false,
            }

        default:
            return state
    }
}
