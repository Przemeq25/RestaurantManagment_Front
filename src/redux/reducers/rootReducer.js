import {combineReducers} from "redux";
import {authReducer} from './authReducer';
import {registerReducer} from "./registerReducer";
import {restaurantReducer} from "./restaurantReducer";
import {mealsReducer} from './mealsReducer';
import {workersReducer} from "./workersReducer";
import {basketReducer} from "./basketReducer";
import {alertReducer} from "./alertReducer";
import {paymentReducer} from "./paymentReducer";


export const rootReducer = combineReducers(
    {
                auth: authReducer,
                register:registerReducer,
                restaurant:restaurantReducer,
                meals:mealsReducer,
                workers:workersReducer,
                basket:basketReducer,
                alert:alertReducer,
                payment:paymentReducer,
            })
