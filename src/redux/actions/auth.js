import {authConstants} from "../types";
import {userService} from "../../services/userService";
import {history} from "../../helpers/_helpers";

export const login = (username, password)=>{
    return dispatch =>{
        dispatch(request());
        userService.login(username,password)
            .then(response =>{
                dispatch(success(response.data))
                history.push('/');
            })
            .catch(errorMessage=>{
                if(errorMessage.response.status === 401){
                    dispatch(error(errorMessage.response.data.error_description))
                }
                else{
                    dispatch(error("Brak połączenia z serwerem, spróbuj jeszcze raz"))
                }

            })
    };

    function request(){return {type:authConstants.LOGIN_REQUEST}};
    function success(authData){return {type:authConstants.LOGIN_SUCCESS, payload:authData}};
    function error(error){return {type:authConstants.LOGIN_ERROR, payload:error}};
}

export const logout = () =>{
    return dispatch => {
        dispatch({type:authConstants.LOGOUT})
    }
}
