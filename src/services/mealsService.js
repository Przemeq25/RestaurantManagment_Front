import axios from 'axios';
import {appUrl} from "../config/app.config";


const getMeals = (restaurantID) =>{
    return axios.get(`${appUrl}/restaurant-api/restaurants/${restaurantID}/meals`,{
        headers: {
            Authorization: `bearer ${localStorage.getItem('access_token')}`
        }
    })
}

const addMeal = (meal,restaurantID)=>{
    const {image, name, price, ingredients, timeToDo } = meal;
    return axios.post(`${appUrl}/restaurant-api/restaurants/${restaurantID}/meals`,{
        name,
        price,
        image,
        ingredients,
        timeToDo
    },
        {
            headers:{
                Authorization:`bearer ${ localStorage.getItem('access_token')}`
            }
        })
}

const editMeal = (meal,restaurantID,mealID)=>{
    const {image, name, price, ingredients, timeToDo } = meal;
    return axios.put(`${appUrl}/restaurant-api/restaurants/${restaurantID}/meals/${mealID}`,{
            name,
            price,
            image,
            ingredients,
            timeToDo
        },
        {
            headers:{
                Authorization:`bearer ${ localStorage.getItem('access_token')}`
            }
        })
}

export const mealsService = {
    getMeals,
    addMeal,
    editMeal
}