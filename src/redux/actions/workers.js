import {workersConstants} from "../types";
import {restaurantService} from "../../services/restaurantService";
import {errorAlert, successAlert} from "./alert";

export const getWorkers = (restaurantID)=>{
    return dispatch =>{
        dispatch(request());
        restaurantService.getWorkers(restaurantID)
            .then(response=>dispatch(success(response.data.content)))
            .catch((errorMessage)=> {
                if (errorMessage.response && errorMessage.response.status === 500) {
                    dispatch(error(500))
                } else if (errorMessage.response && (errorMessage.response.status === 400 || errorMessage.response.status === 404)) {
                    dispatch(error(404))
                }
            })
    };
    function request () {return{ type:workersConstants.WORKERS_REQUEST}}
    function success(workers) { return{ type:workersConstants.GET_WORKERS_SUCCESS, payload:workers}}
    function error(error) { return{ type:workersConstants.GET_WORKERS_ERROR, payload:error}}
};


export const addWorker = (email,restaurantID) =>{
    return dispatch =>{
        dispatch(request());
        restaurantService.addWorker(email,restaurantID)
            .then(response=>{
                dispatch(successAlert(`Wysłano zaproszenie na email : ${email}`))
                dispatch(success(response.data))
            })
            .catch((errorMessage)=>{
                if(errorMessage.response && errorMessage.response.status === 500) {
                    dispatch(error(500))
                }else{
                    dispatch(errorAlert("Wystąpił błąd podczas dodawania pracownika, spróbuj ponownie!"))
                }
            })
    };
    function request () {return{ type:workersConstants.ADD_REQUEST}}
    function success(worker) { return{ type:workersConstants.ADD_WORKER_SUCCESS, payload:worker}}
    function error(error) { return{ type:workersConstants.ADD_WORKER_ERROR, payload:error}}
};

export const deleteWorker = (workerID,restaurantID)=>{
    return dispatch =>{
        dispatch(request());
        restaurantService.deleteWorker(restaurantID,workerID)
            .then(response=>{
                dispatch(success(response.data))
                dispatch(successAlert("Pomyślnie usunięto tego pracownika!"))
            })
            .catch((errorMessage)=>{
                if(errorMessage.response && errorMessage.response.status === 500) {
                    dispatch(error(500))
                }else{
                    dispatch(errorAlert("Wystąpił błąd podczas usuwania pracownika, spróbuj ponownie!"))
                }
            })
    };
    function request () {return{ type:workersConstants.DELETE_REQUEST}}
    function success(worker) { return{ type:workersConstants.DELETE_WORKER_SUCCESS, payload:worker}}
    function error(error) { return{ type:workersConstants.DELETE_WORKER_ERROR, payload:error}}
};

