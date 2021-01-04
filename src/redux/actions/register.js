import {userService} from "../../services/userService";
import {registerConstants} from "../types";

export const register = (email,login,password) =>{
    return dispatch =>{
        dispatch(request());
        userService.register(email,login,password)
            .then(()=>{
                dispatch(success());
            })
            .catch(errorMessage=>{
                if(errorMessage.response && errorMessage.response.status === 409){
                    dispatch(error("Taki login lub email jest już zajęty"));
                }
                else if(errorMessage.response && errorMessage.response.status === 401){
                    dispatch(error("Wpisz poprawne dane"));
                }else{
                    dispatch(error(500));
                }
            })
    }

    function request(){return {type:registerConstants.REGISTER_REQUEST}};
    function success(){return {type:registerConstants.REGISTER_SUCCESS}};
    function error(error){return {type:registerConstants.REGISTER_ERROR, payload:error}}
}

export const activateAccount = (login,activationKey)=>{
    return dispatch =>{
        dispatch(request());
        setTimeout(()=>
            userService.activateAccount(login,activationKey)
            .then(()=>{
                dispatch(success());
            })
            .catch(errorMessage=>{
                if(errorMessage.response && errorMessage.response.status === 409){
                    dispatch(success());
                }else{
                    dispatch(error("Brak połączenia z serwerem, spróbuj jeszcze raz"));
                }
            }),1000)

    }

    function request(){return {type:registerConstants.REGISTER_REQUEST}};
    function success(){return {type:registerConstants.CONFIRM_REGISTER_SUCCESS}};
    function error(error){return {type:registerConstants.CONFIRM_REGISTER_ERROR, payload:error}}
}
