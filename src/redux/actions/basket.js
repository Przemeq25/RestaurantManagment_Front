import {basketConstants} from "../types";

export const addProduct = (product)=>{
    return dispatch => {
        dispatch(addProduct(product));
        dispatch(countProductsAndPrice());
    }
    function addProduct(product){return {type:basketConstants.ADD_PRODUCT, payload:product}}

}
export const deleteProduct = (productId) =>{
    return dispatch => {
        dispatch(deleteProduct(productId));
        dispatch(countProductsAndPrice());
    }
    function deleteProduct(productId){return{type:basketConstants.DELETE_PRODUCT, payload:productId}}
}
export const incrementProduct = (productId)=>{
    return dispatch =>{
        dispatch(incrementProduct(productId));
        dispatch(countProductsAndPrice());
    }
    function incrementProduct(productId){return{type:basketConstants.INCREMENT_PRODUCT, payload:productId}}
}
export const decrementProduct = (productId)=>{
    return dispatch =>{
        dispatch(decrementProduct(productId));
        dispatch(countProductsAndPrice());
    }
    function decrementProduct(productId){return{type:basketConstants.DECREMENT_PRODUCT, payload:productId}}
}
const countProductsAndPrice =()=>{
    return dispatch => dispatch({type:basketConstants.COUNT_PRODUCTS_AND_PRICE})
}
