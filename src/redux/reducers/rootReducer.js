import {combineReducers} from "redux";
import {authReducer} from './authReducer';
import {registerReducer} from "./registerReducer";
import {restaurantReducer} from "./restaurantReducer";
import {mealsReducer} from './mealsReducer';


export const rootReducer = combineReducers(
    {
                auth: authReducer,
                register:registerReducer,
                restaurant:restaurantReducer,
                meals:mealsReducer,
            })
