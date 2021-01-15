import {workersConstants} from '../types';


const initialState = {
    isFetching:false,
    isAddRequesting:false,
    isDeleteRequesting:false,
    workers:[],
    error:null,

};

export const workersReducer = (state = initialState, action)=> {
    switch (action.type) {
        case workersConstants.ADD_REQUEST:
            return {
                ...state,
                isAddRequesting: true
            }
        case workersConstants.ADD_WORKER_SUCCESS:
            return {
                ...state,
                isAddRequesting:false,
                workers: [...state.workers, action.payload]
            }
        case workersConstants.ADD_WORKER_ERROR:
            return {
                ...state,
                isAddRequesting: false,
                error: action.payload,
            }
        case workersConstants.WORKERS_REQUEST:
            return {
                ...state,
                isFetching: true,
            }
        case workersConstants.GET_WORKERS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                workers: action.payload,
            }
        case workersConstants.GET_WORKERS_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
        case workersConstants.DELETE_REQUEST:
            return {
                ...state,
                isDeleteRequesting: true
            }
        case workersConstants.DELETE_WORKER_SUCCESS:
            const foundMatchIndexDeletingWorker = state.workers.findIndex(worker=>worker.id === action.payload);
            const newWorkersArray = [...state.workers];
            newWorkersArray.splice(foundMatchIndexDeletingWorker,1)
            return {
                ...state,
                isDeleteRequesting:false,
                workers: newWorkersArray,
            }
        case workersConstants.DELETE_WORKER_ERROR:
            return {
                ...state,
                isDeleteRequesting: false,
                error: action.payload,
            }
        case workersConstants.RESET:
            return initialState;
        default:
            return state
    }
}
