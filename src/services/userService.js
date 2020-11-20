import axios from 'axios';
import {appUrl} from "../config/app.config";


const login = (login, password) =>{
    return axios.post(`${appUrl}/user-api/login`,{},{
        params:{
            "grant_type": "password",
            "username": login,
            "password": password,
        }
    ,
        auth: {
                'username': 'app',
                'password': '1234'
            }
    })
}
const refreshLogin = (refreshToken)=>{
    return axios.post(`${appUrl}/user-api/login`,{},{
        params:{
            "grant_type": "refresh_token",
            "refresh_token":refreshToken
        }
        ,
        auth: {
            'username': 'app',
            'password': '1234'
        }
    })
}
const register = (email,login,password) =>{
    return axios.post(`${appUrl}/user-api/register`,{
        email,
        password,
        login,
    })
}
const postPersonalData = (personalData,login) =>{
    const {forename,surname,city,street,postCode,houseNumber,phoneNumber} = personalData;
    return axios.post(`${appUrl}/${login}/personal-data`,{
        forename,
        surname,
        city,
        street,
        postCode,
        houseNumber,
        phoneNumber,
    })
}
const getUserData = (access_token) =>{
    return axios.get(`${appUrl}/resource-api/me`,{
        headers:{
            Authorization:`bearer ${access_token}`
        }
    })
}
export const userService = {
    login,
    register,
    postPersonalData,
    getUserData,
    refreshLogin
};
