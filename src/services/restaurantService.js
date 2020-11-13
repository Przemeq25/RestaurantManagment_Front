import axios from 'axios';
import {appUrl} from "../config/app.config";

const addRestaurant = (restaurantData)=>{
    return axios.post(`${appUrl}/restaurant-api/restaurants`,{
        name:restaurantData.restaurantName,
        category:restaurantData.category,
        image:restaurantData.image,
        description:restaurantData.description,
        nip:restaurantData.nip,
        regon:restaurantData.regon,
        city:restaurantData.city,
        street:restaurantData.street,
        postCode:restaurantData.postCode,
        houseNumber:restaurantData.houseNumber,
        phoneNumber:restaurantData.phoneNumber,

    })
}

export const restaurantService ={
    addRestaurant,
}
