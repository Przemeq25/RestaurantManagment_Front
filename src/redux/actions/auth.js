import {authConstants, mealsConstants, restaurantConstants, workersConstants} from "../types";
import {userService} from "../../services/userService";
import {history} from "../../helpers/_helpers";
import {routes} from "../../config/routes";
import moment from 'moment';

export const login = (username, password)=>{
    return dispatch =>{
        dispatch(request());
        userService.login(username,password)
            .then(response =>{
                localStorage.setItem('access_token',response.data.access_token);
                localStorage.setItem('refresh_token',response.data.refresh_token);
                localStorage.setItem('expires_in',moment().add(response.data.expires_in, 'seconds').format("YYYY-MM-DD HH:mm"));
                localStorage.setItem('refresh_expires_in',moment().add(response.data.expires_in*2, 'seconds').format("YYYY-MM-DD HH:mm"));
                dispatch(success(response.data));
                history.location.from ? (
                    history.push(history.location.from)
                    ):(
                    history.push(routes.HOMEPAGE)
                    )
            })
            .catch(errorMessage=>{
                if(errorMessage?.response.status === 400 || errorMessage?.response.status === 401){
                    dispatch(error("Błędne dane logowania"))
                }
                else{
                    dispatch(error(500))
                }

            })
    };

    function request(){return {type:authConstants.LOGIN_REQUEST}};
    function success(authData){return {type:authConstants.LOGIN_SUCCESS, payload:authData}};
    function error(error){return {type:authConstants.LOGIN_ERROR, payload:error}};
}
export const refreshLogin = (refreshToken,dispatch) => new Promise((resolve, reject) => {
        dispatch(request());
        userService.refreshLogin(refreshToken)
            .then(response => {
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('refresh_token', response.data.refresh_token);
                localStorage.setItem('expires_in',moment().add(response.data.expires_in, 'seconds').format("YYYY-MM-DD HH:mm"));
                localStorage.setItem('refresh_expires_in',moment().add(response.data.expires_in*2, 'seconds').format("YYYY-MM-DD HH:mm"));
                dispatch(success(response.data))
                resolve();

            })
            .catch(errorMessage => {
                if (errorMessage?.response.status === 400 || errorMessage?.response.status === 401) {
                    dispatch(error("Błędne dane logowania"))
                } else {
                    dispatch(error(500))
                }
                reject();
            });

    function request(){return {type:authConstants.LOGIN_REQUEST}};
    function success(authData){return {type:authConstants.LOGIN_SUCCESS, payload:{access_token: authData.access_token, refresh_token:authData.refresh_token}}};
    function error(error){return {type:authConstants.LOGIN_ERROR, payload:error}};
})


export const logout = () =>{
    return dispatch => {
        dispatch({type:authConstants.LOGOUT});
        dispatch({type:restaurantConstants.RESET});
        dispatch({type:mealsConstants.RESET});
        dispatch({type:workersConstants.RESET});
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('expires_in');
        localStorage.removeItem('refresh_expires_in');
        history.push(routes.LOGIN)
    }
}
export const checkIsLoggedIn =(dispatch)=> new Promise((resolve,reject)=> {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');
        const expires = localStorage.getItem('expires_in');
        const refresh_expires = localStorage.getItem('refresh_expires_in');

        if (accessToken && refreshToken && expires && refresh_expires) {
            if (moment(expires).isAfter(moment())) {
                dispatch(isLoggedIn({
                    access_token: localStorage.getItem('access_token'),
                    refresh_token: localStorage.getItem('refresh_token')
                }))
                resolve();
            } else if (moment(refresh_expires).isAfter(moment())) {
                refreshLogin(refreshToken, dispatch).then(()=>resolve()).catch(()=>reject())
            } else {
                dispatch(error());
                dispatch(logout());
                reject();
            }

        } else {
            dispatch(error());
            dispatch(logout());
            reject();
        }
    function isLoggedIn(authData){return {type:authConstants.LOGIN_SUCCESS, payload:authData}};
    function error() {return{type:authConstants.LOGIN_ERROR, error: 401}}
});
export const authorization = (dispatch) => new Promise((resolve, reject) =>{
        dispatch(request());
        userService.getUserData()
            .then(response=>{
                dispatch(getUserType(response.data))
                resolve();
            })
            .catch((errorMessage)=>{
                if(errorMessage?.response.status === 400 || errorMessage?.response.status === 401) {
                    reject();
                    history.push(routes.LOGIN)
                }else{
                    dispatch(errorAuthorization(500))
                }
            })
        userService.getPersonalData()
            .then(response=>{
                dispatch(getPersonalData(response.data))
                resolve();
            })
            .catch((errorMessage)=>{
                if(errorMessage?.response.status === 400 || errorMessage?.response.status === 401) {
                    reject();
                    history.push(routes.LOGIN)
                }else{
                    dispatch(errorPersonalData(500))
                }
            })

    function request(){return {type:authConstants.LOGIN_REQUEST}};
    function getUserType(user){ return {type:authConstants.AUTHORIZATION_SUCCESS, payload:{role: user.authorities}}}
    function getPersonalData(userData){return {type:authConstants.PERSONAL_DATA_SUCCESS, payload:userData}}
    function errorAuthorization(errorMessage){return{type:authConstants.AUTHORIZATION_ERROR, payload:errorMessage}}
    function errorPersonalData(errorMessage){return{type:authConstants.PERSONAL_DATA_ERROR, payload:errorMessage}}
});
export const changePersonalData =(personalData)=>{
    return dispatch=>{
        dispatch(request());
        userService.changePersonalData(personalData)
            .then(response=>{
                dispatch(success(response.data));
            })
            .catch((errorMessage)=>{
                if(errorMessage?.response.status === 400 || errorMessage?.response.status === 401) {
                    history.push(routes.LOGIN)
                }else{
                    dispatch(error(500))
                }
            })
    }
    function request(){return {type:authConstants.PERSONAL_DATA_REQUEST}};
    function success(personalData){return {type:authConstants.PERSONAL_DATA_SUCCESS, payload:personalData}};
    function error(error){return {type:authConstants.PERSONAL_DATA_ERROR, payload:error}};
}

export const changePersonalDataToDelivery = (personalData)=> dispatch => dispatch({type:authConstants.PERSONAL_DATA_SUCCESS, payload:personalData})

