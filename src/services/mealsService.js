import axios from 'axios';
import {appUrl} from "../config/app.config";


const getMeals = (restaurantID) =>{
    return axios.get(`${appUrl}/restaurant-api/restaurants/${restaurantID}/meals/public`)
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

const deleteMeal = (mealID,restaurantID) =>{
    return axios.delete(`${appUrl}/restaurant-api/restaurants/${restaurantID}/meals/${mealID}`,{
        headers: {
            Authorization: `bearer ${localStorage.getItem('access_token')}`
        }
    })
}
const getMealsFromRestaurant = (restaurantID) =>{
    return axios.get(`${appUrl}/restaurant-api/restaurants/${restaurantID}/meals/public`);
}

export const mealsService = {
    getMeals,
    addMeal,
    editMeal,
    deleteMeal,
    getMealsFromRestaurant
}
