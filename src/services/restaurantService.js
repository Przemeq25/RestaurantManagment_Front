import axios from 'axios';
import {appUrl} from "../config/app.config";


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
            Authorization:`bearer ${localStorage.getItem('access_token')}`
        }
    }
    )
};
const deleteRestaurant = (restaurantID) =>{
    return axios.delete(`${appUrl}/restaurant-api/restaurants/${restaurantID}`,{
        headers: {
            Authorization: `bearer ${localStorage.getItem('access_token')}`
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
                Authorization:`bearer ${ localStorage.getItem('access_token')}`
            }
        }
    )

};

const getRestaurantsForAdmin = () =>{
    return axios.get(`${appUrl}/restaurant-api/restaurants?size=99`,
{
            headers: {
                Authorization: `bearer ${localStorage.getItem('access_token')}`
            }
        })

}
const addWorker = (email,restaurantID)=>{
    return axios.post(`${appUrl}/user-api/restaurants/${restaurantID}/workers`,{},
        {
            headers:{
                Authorization:`bearer ${localStorage.getItem('access_token')}`
            },
            params:{
                "email": email,
            }
        })
};

const getWorkers = (restaurantID) =>{
    return axios.get(`${appUrl}/user-api/restaurants/${restaurantID}/workers`,
        {
            headers: {
                Authorization: `bearer ${localStorage.getItem('access_token')}`
            }
        })

}
const deleteWorker = (restaurantID, workerID)=>{
    return axios.delete(`${appUrl}/user-api/restaurants/${restaurantID}/workers/${workerID}`,{
        headers: {
            Authorization: `bearer ${localStorage.getItem('access_token')}`
        }
    })
};
const addPicture = async(picture) =>{
    const fd = new FormData();
    fd.append("file", picture);
    fd.append("tags", `przemeq`);
    fd.append("upload_preset", `itsfqhtq`);
    fd.append("api_key", "247926998118615");
    fd.append("timestamp", (Date.now() / 1000) || 0);
    return await axios.post("https://api.cloudinary.com/v1_1/przemeq25/image/upload", fd);
}

const getAllRestaurants = ({page,name,category,city,open,rate,sort}) =>{
    return axios.get(`${appUrl}/restaurant-api/restaurants/public`,{
        params:{
            page:page,
            name:name,
            category:category,
            city:city,
            rate:rate,
            open:open,
            sort:sort,
        }})
}
const getSingleRestaurant = (restaurantID) =>{
    return axios.get(`${appUrl}/restaurant-api/restaurants/${restaurantID}/public`)
}
const getSingleRestaurantForAdmin = (restaurantID) =>{
    return axios.get(`${appUrl}/restaurant-api/restaurants/${restaurantID}`,{
        headers: {
            Authorization: `bearer ${localStorage.getItem('access_token')}`
        }
    });
}

const addPaymentOnline = (paymentData,restaurantID)=>{
    return axios.post(`${appUrl}/order-api/restaurants/${restaurantID}/payment`,paymentData,
        {
            headers:{
                Authorization:`bearer ${ localStorage.getItem('access_token')}`
            }
        })
}
const deletePayment = (restaurantID)=>{
    return axios.delete(`${appUrl}/order-api/restaurants/${restaurantID}/payment`,{
        headers: {
            Authorization: `bearer ${localStorage.getItem('access_token')}`
        }
    })
}
const submitOrder = (order,restaurantID) =>{
    return axios.post(`${appUrl}/restaurant-api/restaurants/${restaurantID}/order`,order,
        {
            headers:{
                Authorization:`bearer ${ localStorage.getItem('access_token')}`
            }
        })
}
const submitPersonalOrder = (order,restaurantID) =>{
    return axios.post(`${appUrl}/restaurant-api/restaurants/${restaurantID}/order-personal`,order,
        {
            headers:{
                Authorization:`bearer ${ localStorage.getItem('access_token')}`
            }
        })
}
const getRestaurantOpeningHours = (restaurantId) =>{
    return axios.get(`${appUrl}/restaurant-api/restaurants/${restaurantId}/time/public`)
}
const getMenuCatogory = (restaurantId) =>{
    return axios.get(`${appUrl}/restaurant-api/restaurants/${restaurantId}/meals/category/public`)
}
const getRestaurantOpinions = (restaurantId) =>{
    return axios.get(`${appUrl}/restaurant-api/restaurants/${restaurantId}/opinions/public`)
}
const submitOpinionOfRestaurant = (restaurantId,opinion) =>{
    return axios.post(`${appUrl}/restaurant-api/restaurants/${restaurantId}/opinions`,opinion,{
        headers:{
            Authorization:`bearer ${ localStorage.getItem('access_token')}`
        }
    })
}


export const restaurantService ={
    addRestaurant,
    getRestaurantsForAdmin,
    editRestaurant,
    deleteRestaurant,
    addWorker,
    getWorkers,
    deleteWorker,
    addPicture,
    getAllRestaurants,
    getSingleRestaurant,
    submitOrder,
    getSingleRestaurantForAdmin,
    submitPersonalOrder,
    getRestaurantOpeningHours,
    addPaymentOnline,
    deletePayment,
    getMenuCatogory,
    getRestaurantOpinions,
    submitOpinionOfRestaurant
}
