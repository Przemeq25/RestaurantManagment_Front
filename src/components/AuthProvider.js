import React, {useEffect, useState} from 'react';
import {authorization, checkIsLoggedIn} from "../redux/actions/auth";
import {useDispatch, useSelector} from "react-redux";
import DelayedRedirect from "./DelayedRedirect";
import {routes} from "../config/routes";
import {history} from "../helpers/_helpers";
import Page500 from "../pages/Page500";
import CircularProgress from "./CircularProgress";

const AuthProvider = ({children}) =>{
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
    const userType = useSelector(state=>state.auth.userType);
    const authError = useSelector(state=>state.auth.error);
    const restaurantError = useSelector(state=>state.restaurant.error);
    const mealError = useSelector(state=>state.meals.error);
    const workersError = useSelector(state=>state.workers.error);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(()=>{
        const checkAuth = () =>{
            checkIsLoggedIn(dispatch)
                .then(()=>{
                   authorization(dispatch)
                        .then(()=>setIsLoading(false))
                        .catch(()=>setIsLoading(false))
                })
                .catch(()=>setIsLoading(false));
        }
        checkAuth();
        return () => setIsLoading(false);
    },[]);

    if(authError || restaurantError || mealError || workersError === 500){
        return <Page500/>
    }

   return(
       <>
           {
               isLoading ? (
                   <CircularProgress/>
               ):(
                   isLoggedIn ?
                       <div>
                        {children}
                       </div>
                       :
                       <DelayedRedirect path={routes.LOGIN} from={history.pathname}/>
               )
           }
       </>
   )
}
export default AuthProvider;
