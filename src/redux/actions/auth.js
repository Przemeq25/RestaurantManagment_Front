import {authConstants} from "../types";
import {userService} from "../../services/userService";
import {history} from "../../helpers/_helpers";
import {routes} from "../../config/routes";

export const login = (username, password)=>{
    return dispatch =>{
        dispatch(request());
        userService.login(username,password)
            .then(response =>{
                localStorage.setItem('access_token',response.data.access_token);
                localStorage.setItem('refresh_token',response.data.refresh_token);
                dispatch(success(response.data));
                console.log(response.data)
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
    function success(authData){return {type:authConstants.LOGIN_SUCCESS, payload:authData}};
    function error(error){return {type:authConstants.LOGIN_ERROR, payload:error}};
}
export const refreshLogin = (refreshToken)=>{
    return dispatch =>{
        dispatch(request());
        userService.refreshLogin(refreshToken)
            .then(response =>{
                localStorage.setItem('access_token',response.data.access_token);
                localStorage.setItem('refresh_token',response.data.refresh_token);
                dispatch(success(response.data));
                dispatch(authorization(response.data.access_token))
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
    function success(authData){return {type:authConstants.LOGIN_SUCCESS, payload:{access_token: authData.access_token, refresh_token:authData.refresh_token}}};
    function error(error){return {type:authConstants.LOGIN_ERROR, payload:error}};
}


export const logout = () =>{
    return dispatch => {
        dispatch({type:authConstants.LOGOUT});
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        history.push(routes.LOGIN)
    }
}
export const checkIsLoggedIn =()=>{
    return dispatch =>{
        localStorage.getItem('access_token') &&  dispatch(isLoggedIn( {access_token: localStorage.getItem('access_token'), refresh_token: localStorage.getItem('refresh_token')}))
    };
    function isLoggedIn(authData){return {type:authConstants.LOGIN_SUCCESS, payload:authData}};
}
export const authorization = (access_token) =>{
    return dispatch =>{
        userService.getUserData(access_token)
            .then(response=>{
                console.log(response.data)
                dispatch(getUserType(response.data))})
            .catch(()=>history.push(routes.LOGIN))
    }
    function getUserType(user){ return {type:authConstants.AUTHORIZATION, payload:{role: user.authorities, user:user.principal }}}
}
