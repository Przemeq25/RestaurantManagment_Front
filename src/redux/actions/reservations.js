import {reservationsConstants} from "../types";
import {restaurantService} from "../../services/restaurantService";
import {errorAlert} from "./alert";

export const toggleReservationDialog = () =>{
    return dispatch =>dispatch({type:reservationsConstants.TOGGLE_RESERVATION_DIALOG})
}

export const getReservations = (restaurantId) =>{
    return dispatch=>{
        dispatch(request())
        restaurantService.getReservationsForRestaurant(restaurantId)
            .then((response)=>{
                dispatch(success(response.data.content))
            })
            .catch(()=>errorAlert("Nie udało się pobrać restauracji! Spróbuj odswieżyć stronę"))
    }
    function request(){return {type:reservationsConstants.GET_RESERVATIONS_REQUEST}}
    function success(data) {return {type:reservationsConstants.GET_RESERVATIONS_SUCCESS, payload:data}}
}
