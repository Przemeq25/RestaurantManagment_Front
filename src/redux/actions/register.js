import {userService} from "../../services/userService";
import {registerConstants} from "../types";
import {history} from "../../helpers/_helpers";
import {routes} from "../../config/routes";

export const register = (email,login,password,role) =>{
    return dispatch =>{
        dispatch(request());
        userService.register(email,login,password,role)
            .then(()=>{
                dispatch(success());
                history.push(routes.LOGIN)
            })
            .catch(errorMessage=>{
                if(errorMessage.response && errorMessage.response.status === 409){
                    dispatch(error("Taki login lub email jest już zajęty"));
                }
                else if(errorMessage.response && errorMessage.response.status === 401){
                    dispatch(error("Wpisz poprawne dane"));
                }else{
                    dispatch(error("Brak połączenia z serwerem, spróbuj jeszcze raz"));
                }
            })
    }

    function request(){return {type:registerConstants.REGISTER_REQUEST}};
    function success(){return {type:registerConstants.REGISTER_SUCCESS}};
    function error(error){return {type:registerConstants.REGISTER_ERROR, payload:error}}
}
