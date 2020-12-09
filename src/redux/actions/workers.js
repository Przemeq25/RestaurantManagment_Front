import {workersConstants} from "../types";
import {restaurantService} from "../../services/restaurantService";

export const getWorkers = (restaurantID)=>{
    return dispatch =>{
        dispatch(request());
        restaurantService.getWorkers(restaurantID)
            .then(response=>dispatch(success(response.data.content)))
            .catch(errorMessage=>dispatch(error(errorMessage)));
    };
    function request () {return{ type:workersConstants.WORKERS_REQUEST}}
    function success(workers) { return{ type:workersConstants.GET_WORKERS_SUCCESS, payload:workers}}
    function error(error) { return{ type:workersConstants.GET_WORKERS_ERROR, payload:error}}
};


export const addWorker = (email,restaurantID) =>{
    return dispatch =>{
        dispatch(request());
        restaurantService.addWorker(email,restaurantID)
            .then(response=>dispatch(success(response.data)))
            .catch(errorMessage=>dispatch(error(errorMessage)));
    };
    function request () {return{ type:workersConstants.ADD_REQUEST}}
    function success(worker) { return{ type:workersConstants.ADD_WORKER_SUCCESS, payload:worker}}
    function error(error) { return{ type:workersConstants.ADD_WORKER_ERROR, payload:error}}
};

export const deleteWorker = (workerID,restaurantID)=>{
    return dispatch =>{
        dispatch(request());
        restaurantService.deleteWorker(restaurantID,workerID)
            .then(response=>dispatch(success(response.data)))
            .catch(errorMessage=>dispatch(error(errorMessage)));
    };
    function request () {return{ type:workersConstants.DELETE_REQUEST}}
    function success(worker) { return{ type:workersConstants.DELETE_WORKER_SUCCESS, payload:worker}}
    function error(error) { return{ type:workersConstants.DELETE_WORKER_ERROR, payload:error}}
};

