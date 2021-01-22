import {combineReducers} from "redux";
import {authReducer} from './authReducer';
import {registerReducer} from "./registerReducer";
import {restaurantReducer} from "./restaurantReducer";
import {mealsReducer} from './mealsReducer';
import {workersReducer} from "./workersReducer";
import {basketReducer} from "./basketReducer";
import {alertReducer} from "./alertReducer";
import {paymentReducer} from "./paymentReducer";
import {ordersReducer} from "./ordersReducer";
import {tablesReducer} from "./tablesReducer";
import {reservationsReducer} from "./reservationsReducer";


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
                orders:ordersReducer,
                tables:tablesReducer,
                reservations: reservationsReducer,
            })
