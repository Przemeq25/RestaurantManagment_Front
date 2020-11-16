import {restaurantService} from "../../services/restaurantService";
import {restaurantConstants} from "../types";
import {userService} from "../../services/userService";

export const addRestaurant = (restaurant,refreshToken)=>{
    return dispatch =>{
        dispatch(request());
        restaurantService.addRestaurant(restaurant)
            .then(response =>{
                userService.refreshLogin(refreshToken)
                    .then(r=>console.log(response.data))
                    .catch(err=>console.log(err))
            })
            .catch(err=>console.log(err))
    }

    function request(){return {type:restaurantConstants.ADD_RESTAURANT_REQUEST}}
}
