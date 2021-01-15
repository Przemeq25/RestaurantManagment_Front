import {restaurantService} from "../../services/restaurantService";
import {restaurantConstants} from "../types";
import {authorization, refreshLogin} from "./auth";
import {history, scaleImageByUrl} from "../../helpers/_helpers";
import {routes} from "../../config/routes";
import {errorAlert, successAlert} from "./alert";

export const addRestaurant = (restaurant,refreshToken)=>{
    return dispatch =>{
        dispatch(request());
        if(restaurant.image) {
            restaurantService.addPicture(restaurant.image)
                .then(res => {
                    restaurantService.addRestaurant(Object.assign(restaurant, {image: scaleImageByUrl(res.data.secure_url)}))
                        .then(response => {
                            setTimeout(() => {
                                refreshLogin(refreshToken, dispatch)
                                    .then(() => {
                                        dispatch(successAlert(`${response.data.name} - pomyślnie dodano do Twojej listy!`))
                                        dispatch(success(response.data))
                                        authorization(dispatch)
                                    }).catch(() => dispatch(error(500)))
                            }, 20000)

                        })
                        .catch((errorMessage) => {
                            if (errorMessage.response && errorMessage.response.status === 500) {
                                dispatch(error(500))
                            } else {
                                dispatch(errorAlert("Wystąpił błąd podczas dodawania restauracji, spróbuj ponownie!"))
                            }
                        })
                })
                .catch(() => {
                    dispatch(error(400));
                    dispatch(errorAlert("Wystąpił błąd podczas dodawania zdjęcia restauracji, spróbuj ponownie!"))
                })
        }else{
            restaurantService.addRestaurant(restaurant)
                .then(res => {
                    setTimeout(() => {
                        refreshLogin(refreshToken, dispatch)
                            .then(() => {
                                dispatch(successAlert(`${res.data.name} - pomyślnie dodano do Twojej listy!`))
                                dispatch(success(res.data))
                                authorization(dispatch)
                            }).catch(() => dispatch(error(500)))
                    }, 20000)

                })
                .catch((errorMessage) => {
                    if (errorMessage.response && errorMessage.response.status === 500) {
                        dispatch(error(500))
                    } else {
                        dispatch(errorAlert("Wystąpił błąd podczas dodawania restauracji, spróbuj ponownie!"))
                    }
                })
        }
    }
    function request(){return {type:restaurantConstants.RESTAURANT_REQUEST}};
    function success(restaurant){return {type:restaurantConstants.ADD_RESTAURANT_SUCCESS, payload:restaurant}}
    function error(error){return {type:restaurantConstants.ADD_RESTAURANT_ERROR, payload:error}}
};

export const deleteRestaurant = (restaurantID)=>{
    return dispatch=>{
        dispatch(request());
        restaurantService.deleteRestaurant(restaurantID)
            .then(()=> {
                dispatch(successAlert(`Pomyślnie usunięto restaurację!`))
                dispatch(success());
                history.push(routes.ADMIN_PANEL);
            })
            .catch((errorMessage)=>{
                if(errorMessage.response && errorMessage.response.status === 500) {
                    dispatch(error(500))
                }else{
                    dispatch(errorAlert("Wystąpił błąd podczas usuwania restauracji, spróbuj ponownie!"))
                    history.push(routes.ADMIN_PANEL);
                }
            })


    }
    function request(){return {type:restaurantConstants.DELETE_RESTAURANT_REQUEST}};
    function success(){return {type:restaurantConstants.DELETE_RESTAURANT_SUCCESS}}
    function error(error){return {type:restaurantConstants.DELETE_RESTAURANT_ERROR, payload:error}}
}

export const editRestaurant = (restaurantData, restaurantID) =>{
    return dispatch =>{
        dispatch(request());
        if(restaurantData.image.hasOwnProperty("type") && restaurantData.image['type'].split('/')[0] === 'image') {
            restaurantService.addPicture(restaurantData.image)
                .then(res => {
                    restaurantService.editRestaurant(Object.assign(restaurantData, {image: scaleImageByUrl(res.data.secure_url)}), restaurantID)
                        .then(response => {
                            dispatch(successAlert(`Uaktualniono dane restauracji!`))
                            dispatch(success(response.data))
                        })
                        .catch((errorMessage) => {
                            if (errorMessage.response && errorMessage.response.status === 500) {
                                dispatch(error(500))
                            } else {
                                dispatch(errorAlert("Wystąpił błąd podczas edytowania restauracji, spróbuj ponownie!"))
                            }
                        })
                })
                .catch(() => {
                    dispatch(error(400));
                    dispatch(errorAlert("Wystąpił błąd podczas dodawania restauracji, spróbuj ponownie!"))
                })
        }else{
            restaurantService.editRestaurant(restaurantData, restaurantID)
                .then(response => {
                    dispatch(successAlert(`Uaktualniono dane restauracji!`))
                    dispatch(success(response.data))
                })
                .catch((errorMessage) => {
                    if (errorMessage.response && errorMessage.response.status === 500) {
                        dispatch(error(500))
                    } else {
                        dispatch(errorAlert("Wystąpił błąd podczas edytowania restauracji, spróbuj ponownie!"))
                    }
                })
        }
    }

    function request(){return {type:restaurantConstants.RESTAURANT_REQUEST}};
    function success(restaurant){return {type:restaurantConstants.EDIT_RESTAURANT_SUCCESS, payload:restaurant}}
    function error(error){return {type:restaurantConstants.EDIT_RESTAURANT_ERROR, payload:error}}
}

export const openAddRestaurantStepper = () =>{
    return dispatch => dispatch(openStepper());

    function openStepper(){return {type:restaurantConstants.ADD_RESTAURANT_OPEN_STEPPER}}
}
export const closeAddRestaurantStepper = () =>{
    return dispatch => dispatch(close());

    function close(){return {type:restaurantConstants.ADD_RESTAURANT_CLOSE_STEPPER}}
}

export const getRestaurantsForAdmin =()=>{
    return dispatch =>{
        dispatch(request());
        restaurantService.getRestaurantsForAdmin()
            .then(response => dispatch(success(response.data.content)))
            .catch((errorMessage)=> {
                if (errorMessage.response && errorMessage.response.status === 500) {
                    dispatch(error(500))
                } else if (errorMessage.response && (errorMessage.response.status === 400 || errorMessage.response.status === 404)) {
                    dispatch(error(404))
                }
            })
    }
    function request(){return {type:restaurantConstants.RESTAURANT_REQUEST}};
    function success(restaurants){return {type:restaurantConstants.GET_RESTAURANTS_FOR_ADMIN_SUCCESS, payload:restaurants}}
    function error(error){return {type:restaurantConstants.GET_RESTAURANTS_FOR_ADMIN_ERROR, payload:error}}
}
export const getRestaurantForEmploee = (restaurantId)=> {
    return dispatch =>{
        dispatch(request());
        restaurantService.getSingleRestaurant(restaurantId)
            .then(response => dispatch(success(response.data)))
            .catch((errorMessage)=> {
                if (errorMessage.response && errorMessage.response.status === 500) {
                    dispatch(error(500))
                } else if (errorMessage.response && (errorMessage.response.status === 400 || errorMessage.response.status === 404)) {
                    dispatch(error(404))
                }
            })
    }
    function request(){return {type:restaurantConstants.RESTAURANT_REQUEST}};
    function success(restaurants){return {type:restaurantConstants.GET_RESTAURANTS_FOR_ADMIN_SUCCESS, payload:restaurants}}
    function error(error){return {type:restaurantConstants.GET_RESTAURANTS_FOR_ADMIN_ERROR, payload:error}}
}

export const selectRestaurant = (restaurant,role) =>{
    return dispatch =>{
        dispatch(select(restaurant));
        if(role === "OWNER"){
            history.push(`${routes.RESTAURANT_DASHBOARD}/${restaurant.id}`)
        }else{
            history.push(`${routes.RESTAURANT_MENU}/${restaurant.id}`)
        }

    }
    function select(restaurant){return{type:restaurantConstants.SELECT_RESTAURANT, payload:restaurant}}
}
export const unselectRestaurant = () =>{
    return dispatch =>{
        dispatch(unselect())
    }
    function unselect(){return{type: restaurantConstants.UNSELECT_RESTAURANT}}
}

export const getSingleRestaurantForAdmin = (restaurantId) =>{
    return dispatch =>{
        dispatch(request());
        restaurantService.getSingleRestaurantForAdmin(restaurantId)
            .then(response=>dispatch(success(response.data)))
            .catch((errorMessage)=> {
                if (errorMessage.response && errorMessage.response.status === 500) {
                    dispatch(error(500))
                } else if (errorMessage.response && (errorMessage.response.status === 400 || errorMessage.response.status === 404)) {
                    dispatch(error(404))
                }
            })
    }
    function request(){return {type:restaurantConstants.RESTAURANT_REQUEST}};
    function success(restaurant){return {type:restaurantConstants.GET_SINGLE_RESTAURANT_FOR_ADMIN_SUCCESS, payload:restaurant}}
    function error(error){return {type:restaurantConstants.GET_SINGLE_RESTAURANT_FOR_ADMIN_ERROR, payload:error}}
}

export const getOpeningHours = (restaurantId) =>{
    return dispatch =>{
        restaurantService.getRestaurantOpeningHours(restaurantId)
            .then(response=>dispatch(success(response.data)))
            .catch(()=> dispatch(errorAlert("Brak danych o godzinach otwarcia restauracji")));
    }
    function success(data){return{type:restaurantConstants.GET_OPENING_HOURS, payload:{worksTime:data, id:restaurantId}}}
};

export const getOpeningHoursForSelected = (restaurantId) =>{
    return dispatch =>{
        restaurantService.getRestaurantOpeningHours(restaurantId)
            .then(response=>dispatch(success(response.data)))
            .catch(()=> dispatch(errorAlert("Brak danych o godzinach otwarcia restauracji")));
    }
    function success(data){return{type:restaurantConstants.GET_OPENING_HOURS_FOR_SELECTED, payload:data}}
};

export const setUserRole = (role,restaurantId)=>{
    return dispatch =>dispatch({type:restaurantConstants.SET_USER_ROLE, payload:{role,restaurantId}})
}

export const addPaymentOnline = (paymentData,restaurantId)=>{
    return dispatch =>{
        dispatch(request());
        restaurantService.addPaymentOnline(paymentData,restaurantId)
            .then(response=>{
                dispatch(success(response.data))
                dispatch(successAlert("Dodano płatności online do restauracji!"));
            })
            .catch((errorMessage)=>{
                if(errorMessage.response && errorMessage.response.status === 409){
                    dispatch(errorAlert("Takie klucze konfiguracyjna są już zajęte"))
                    dispatch(error())
                }else{
                    dispatch(errorAlert("Nie udało się dodać płatności! Spróbuj ponownie"))
                    dispatch(error())
                }

            })
    }
    function request(){return {type:restaurantConstants.PAYMENT_REQUESTING}};
    function success(payment){return {type:restaurantConstants.ADD_PAYMENT_SUCCESS, payload:payment}}
    function error(){return {type:restaurantConstants.ADD_PAYMENT_ERROR}}
}

export const deletePaymentOnline = (restaurantId)=>{
    return dispatch =>{
        dispatch(request())
        restaurantService.deletePayment(restaurantId)
            .then(()=>{
                dispatch(success())
                dispatch(successAlert("Usunięto płatności online do restauracji!"));
            })
            .catch(()=>{
                dispatch(errorAlert("Nie udało się usunąć płatności! Spróbuj ponownie"))
            })
    }
    function request(){return {type:restaurantConstants.PAYMENT_REQUESTING}};
    function success(){return {type:restaurantConstants.DELETE_PAYMENT}}
}
