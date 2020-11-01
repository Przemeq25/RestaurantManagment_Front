import axios from 'axios';
import {appUrl} from "../config/app.config";


export const login = (login, password) =>{
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
export const register = (email,login,password,role) =>{
    return axios.post(`${appUrl}/user-api/register`,{
        email,
        login,
        password,
        role
    })
}
export const postPersonalData = (personalData,login) =>{
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
