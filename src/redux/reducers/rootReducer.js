import {combineReducers} from "redux";
import {authReducer} from './authReducer';
import {registerReducer} from "./registerReducer";


export const rootReducer = combineReducers(
    {
                auth: authReducer,
                register:registerReducer
            })
