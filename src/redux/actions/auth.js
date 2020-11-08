import {authConstants} from "../types";
import {userService} from "../../services/userService";
import {history} from "../../helpers/_helpers";
import {routes} from "../../config/routes";

export const login = (username, password)=>{
    return dispatch =>{
        dispatch(request());
        userService.login(username,password)
            .then(response =>{
                localStorage.setItem('access_token',response.data.access_token)
                dispatch(success(response.data));
                history.location.from ? (
                    history.push(history.location.from)
                    ):(
                    history.push(routes.HOMEPAGE)
                    )
            })
            .catch(errorMessage=>{
                if(errorMessage.response && errorMessage.response.status === 401){
                    dispatch(error("Błędne dane logowania"))
                }
                else{
                    dispatch(error("Brak połączenia z serwerem, spróbuj jeszcze raz"))
                }

            })
    };

    function request(){return {type:authConstants.LOGIN_REQUEST}};
    function success(authData){return {type:authConstants.LOGIN_SUCCESS, payload:authData.access_token}};
    function error(error){return {type:authConstants.LOGIN_ERROR, payload:error}};
}

export const logout = () =>{
    return dispatch => {
        dispatch({type:authConstants.LOGOUT});
        localStorage.removeItem('access_token');
        history.push(routes.LOGIN)
    }
}
export const checkIsLoggedIn =()=>{
    return dispatch =>{
        localStorage.getItem('access_token') &&  dispatch(isLoggedIn( localStorage.getItem('access_token')))
    }
    function isLoggedIn(authData){return {type:authConstants.LOGIN_SUCCESS, payload:authData}};
}
