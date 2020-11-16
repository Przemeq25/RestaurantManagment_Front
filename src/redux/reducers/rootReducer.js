import {combineReducers} from "redux";
import {authReducer} from './authReducer';
import {registerReducer} from "./registerReducer";
import {restaurantReducer} from "./restaurantReducer";


export const rootReducer = combineReducers(
    {
                auth: authReducer,
                register:registerReducer,
                restaurant:restaurantReducer,
            })
