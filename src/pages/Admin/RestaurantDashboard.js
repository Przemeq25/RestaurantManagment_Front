import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSingleRestaurantForAdmin} from "../../redux/actions/restaurant";

const RestaurantDashboard = ({match}) =>{
    const dispatch = useDispatch();
    const selectedRestaurant = useSelector(state=>state.restaurant.selectedRestaurant)
    useEffect(()=>{
        !selectedRestaurant && dispatch(getSingleRestaurantForAdmin(match.params.restaurantId))
    },[])
    return(
        <div>
            Dashboard
        </div>
    )
}
export default RestaurantDashboard;
