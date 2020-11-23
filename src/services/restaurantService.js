import axios from 'axios';
import {appUrl} from "../config/app.config";

const token = localStorage.getItem('access_token')

const addRestaurant = (restaurantData)=>{
    return axios.post(`${appUrl}/restaurant-api/restaurants`,{
        name:restaurantData.name,
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
        worksTime:restaurantData.worksTime,
    },
{
        headers:{
            Authorization:`bearer ${token}`
        }
    }
    )
};
const deleteRestaurant = (restaurantID) =>{
    return axios.delete(`${appUrl}/restaurant-api/restaurants/${restaurantID}`,{
        headers: {
            Authorization: `bearer ${token}`
        }
    })
}
const editRestaurant = (restaurantData,restaurantID)=>{
    return axios.put(`${appUrl}/restaurant-api/restaurants/${restaurantID}`,{
            name:restaurantData.name,
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
            worksTime:restaurantData.worksTime,
        },
        {
            headers:{
                Authorization:`bearer ${token}`
            }
        }
    )

};
const addMeal = (restaurantID,meal) =>{
    return axios.post(`${appUrl}/restaurant-api/restaurants/${restaurantID}/meals`,{
        "name": meal.name,
        "price": meal.price,
        "image": meal.image,
        "ingredients": meal.ingredients,
        "timeToDo": meal.timeToDo
    },
    {
        headers:{
            Authorization:`bearer ${token}`
        }
    })
}

const getRestaurants = () =>{
    return axios.get(`${appUrl}/restaurant-api/restaurants?size=99`,
{
            headers: {
                Authorization: `bearer ${token}`
            }
        })

}
const getSingleRestaurant = (restaurantID) =>{
    return axios.get(`${appUrl}/restaurant-api/restaurants/${restaurantID}`,
        {
            headers: {
                Authorization: `bearer ${token}`
            }
        })

}


export const restaurantService ={
    addRestaurant,
    getRestaurants,
    getSingleRestaurant,
    addMeal,
    editRestaurant,
    deleteRestaurant
}
