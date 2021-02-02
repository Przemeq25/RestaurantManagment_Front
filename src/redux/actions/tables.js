import {tablesConstants} from "../types";
import {restaurantService} from "../../services/restaurantService";
import {errorAlert} from "./alert";

export const getTablesForRestaurant = (restaurantId) =>{
    return dispatch =>{
        dispatch(request())
        restaurantService.getTablesForRestaurant(restaurantId)
            .then(response=>dispatch(success(response.data.tables)))
            .catch(()=>dispatch(errorAlert("Nie udało się pobrać stolików")))
    }
    function request(){return {type:tablesConstants.GET_TABLES_REQUEST}}
    function success(data){return {type:tablesConstants.GET_TABLES_SUCCESS, payload:data}}
    //function error(error) {return {type:tablesConstants.GET_TABLES_ERROR, payload:error}}
}

export const addTablesToRestaurant =(restaurantId,tablesArray) =>{
    return dispatch =>{
        dispatch(request());
        restaurantService.addTablesToRestaurant(restaurantId,tablesArray)
            .then(response=>dispatch(success(response.data.tables)))
            .catch(()=>dispatch(errorAlert("Nie udało się ")))
    }
    function request(){return {type:tablesConstants.ADD_TABLES_REQUEST}}
    function success(data){return {type:tablesConstants.ADD_TABLES_SUCCESS, payload:data}}
    //function error(error) {return {type:tablesConstants.ADD_TABLES_ERROR, payload:error}}
}
export const toggleAddTablesDrawer = () =>{
    return dispatch => dispatch({type:tablesConstants.FORM_TOGGLE_OPEN})
}
export const removeTableInForm = () =>{
    return dispatch =>dispatch({type:tablesConstants.FORM_REMOVE_TABLE})
}
export const addTableInForm = () =>{
    return dispatch =>dispatch({type:tablesConstants.FORM_ADD_TABLE})
}
export const changeNumberOfSeats = (index,value) =>{
    return dispatch =>dispatch({type:tablesConstants.FORM_CHANGE_NUMBER_OF_SEATS, payload:{index,value}})
}
export const changeNumberOfTables = (index,value) =>{
    return dispatch =>dispatch({type:tablesConstants.FORM_CHANGE_NUMBER_OF_TABLES, payload:{index,value}})
}
export const toggleCollapseInForm = (index)=> {
    return dispatch =>dispatch({type:tablesConstants.FORM_TOGGLE_COLLAPSE, payload:index})
}
export const changeNameOfTableInForm = (index,id,value)=> {
    return dispatch =>dispatch({type:tablesConstants.FORM_CHANGE_NAME_OF_TABLE, payload:{id,index,value}})
}
