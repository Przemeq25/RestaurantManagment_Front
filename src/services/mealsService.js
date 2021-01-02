import axios from 'axios';
import {appUrl} from "../config/app.config";


const getMeals = (restaurantID,query={}) =>{
    const {category,fromPrice,toPrice,fromTime,toTime} = query;
    return axios.get(`${appUrl}/restaurant-api/restaurants/${restaurantID}/meals/public`,{
        params:{
            category,fromPrice,toPrice,fromTime,toTime
        }
    })
}

const addMeal = (meal,restaurantID)=>{
    const {image, name, price, ingredients, timeToDo,category } = meal;
    return axios.post(`${appUrl}/restaurant-api/restaurants/${restaurantID}/meals`,{
        name,
        price,
        image,
        ingredients,
        timeToDo,
        category
    },
        {
            headers:{
                Authorization:`bearer ${ localStorage.getItem('access_token')}`
            }
        })
}

const editMeal = (meal,restaurantID,mealID)=>{
    const {image, name, price, ingredients, timeToDo,category } = meal;
    return axios.put(`${appUrl}/restaurant-api/restaurants/${restaurantID}/meals/${mealID}`,{
            name,
            price,
            image,
            ingredients,
            timeToDo,
            category
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

export const mealsService = {
    getMeals,
    addMeal,
    editMeal,
    deleteMeal,
}
