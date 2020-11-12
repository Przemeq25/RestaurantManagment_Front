import axios from 'axios';
import {appUrl} from "../config/app.config";

const addRestaurant = (restaurantData)=>{
    return axios.post(`${appUrl}/restaurant-api/addRestaurant`){

    }
}

export const restaurantService ={
    addRestaurant,
}
