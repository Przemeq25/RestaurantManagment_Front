import {basketConstants} from "../types";

const initialState ={
    numberOfProducts:0,
    totalPrice:0,
    basket:[],
}

export const basketReducer = (state=initialState, action)=>{
    switch (action.type) {
        case basketConstants.ADD_PRODUCT:
            let itemExist = state.basket.some(item=>item.id === action.payload.id);
            if(itemExist){
                const existedProduct = state.basket.find(item=>item.id === action.payload.id);
                const existedProductIndex = state.basket.findIndex(item=>item.id === action.payload.id)
                existedProduct.amount +=1;
                existedProduct.totalPrice += existedProduct.unitPrice;
                const newBasket = [...state.basket];
                newBasket.splice(existedProductIndex,1,existedProduct);
                return {
                    ...state,
                    basket: newBasket,
                }
            }else{
                const newProduct = Object.assign(action.payload,{totalPrice: Number(action.payload.unitPrice), amount:1, unitPrice:Number(action.payload.unitPrice)});
                return {
                    ...state,
                    basket: [...state.basket, newProduct]
                }
            }

        case basketConstants.COUNT_PRODUCTS_AND_PRICE:
            const amount = state.basket.length;
            const totalPrice = state.basket.map(item=>item.totalPrice).reduce((total,productPrice)=> total += productPrice, 0);
            localStorage.setItem("basket", JSON.stringify(Object.assign(state,{numberOfProducts:amount,totalPrice:totalPrice})));
            return {
                ...state,
                numberOfProducts: amount,
                totalPrice: totalPrice,
            }


        case basketConstants.DELETE_PRODUCT:
            const foundProductIndex = state.basket.findIndex(product => product.id === action.payload);
            const newBasket = [...state.basket];
            newBasket.splice(foundProductIndex, 1)
            return {
                ...state,
                basket: newBasket
            }

        case basketConstants.INCREMENT_PRODUCT:
            const existedIncrementProduct = state.basket.find(item => item.id === action.payload);
            const existedIncrementProductIndex = state.basket.findIndex(item => item.id === action.payload)
            existedIncrementProduct.amount += 1;
            existedIncrementProduct.totalPrice += existedIncrementProduct.unitPrice;
            const newBasketWithIncrementProducts = [...state.basket];
            newBasketWithIncrementProducts.splice(existedIncrementProductIndex, 1, existedIncrementProduct);
            return {
                ...state,
                basket: newBasketWithIncrementProducts,
            }

        case basketConstants.DECREMENT_PRODUCT:
            const existedDecrementProduct = state.basket.find(item=>item.id === action.payload);
            const existedDecrementProductIndex = state.basket.findIndex(item=>item.id === action.payload);
            if(existedDecrementProduct.amount > 1){
                existedDecrementProduct.amount -=1;
                existedDecrementProduct.totalPrice -= existedDecrementProduct.unitPrice;
            }
            const newBasketWithDecrementProducts = [...state.basket];
            newBasketWithDecrementProducts.splice(existedDecrementProductIndex,1,existedDecrementProduct);

            return {
                ...state,
                basket: newBasketWithDecrementProducts,
            }
        case basketConstants.GET_BASKET:
            const basketFromLocalStorage = localStorage.getItem("basket");
            if(basketFromLocalStorage){
                return JSON.parse(basketFromLocalStorage);
            }
            else{
                return {...state}
            }
        case basketConstants.RESET:
            return initialState;

        default:
            return state;
    }
}
