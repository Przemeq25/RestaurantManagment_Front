import axios from 'axios';
import {appUrl} from "../config/app.config";

const token = localStorage.getItem('access_token')

const addRestaurant = (restaurantData)=>{
    return axios.post(`${appUrl}/restaurant-api/restaurants`,{
        name:restaurantData.restaurantName,
        category:restaurantData.categoryEnum,
        image:restaurantData.image,
        description:restaurantData.description,
        nip:restaurantData.nip,
        regon:restaurantData.regon,
        city:restaurantData.city,
        street:restaurantData.street,
        postCode:restaurantData.postCode,
        houseNumber:restaurantData.houseNumber,
        phoneNumber:restaurantData.phoneNumber,
        worksTime:restaurantData.openingHours,
    },
{
        headers:{
            Authorization:`bearer ${token}`
        }
    }
    )
}

export const restaurantService ={
    addRestaurant,
}
