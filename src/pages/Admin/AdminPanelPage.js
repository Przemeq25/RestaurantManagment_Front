import React, {useEffect} from 'react'
import AdminPanel from "../../components/Admin/AdminPanel/AdminPanel";
import {useDispatch, useSelector} from "react-redux";
import {routes} from "../../config/routes";
import DelayedRedirect from "../../components/DelayedRedirect";
import {authorization} from "../../redux/actions/auth";
import {getSingleRestaurantForAdmin} from "../../redux/actions/restaurant";
import Page500 from "../Page500";



const AdminPanelPage = ({children,location,match}) => {
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
    const userType = useSelector(state=>state.auth.userType);
    const selectedRestaurant = useSelector(state=>state.restaurant.selectedRestaurant);
    const authError = useSelector(state=>state.auth.error);
    const restaurantError = useSelector(state=>state.restaurant.error);
    const mealError = useSelector(state=>state.meals.error);
    const workersError = useSelector(state=>state.workers.error);
    const dispatch = useDispatch();

    useEffect(()=>{
        isLoggedIn && !userType && authorization(dispatch);
        // eslint-disable-next-line react-hooks/exhaustive-deps

    },[isLoggedIn])

    useEffect(()=>{
        !selectedRestaurant && match.params && match.params.restaurantId && dispatch(getSingleRestaurantForAdmin(match.params.restaurantId))
    },[])

    if(authError || restaurantError || mealError || workersError === 500){
        return <Page500/>
    }


        return (
            <>
                {
                    isLoggedIn ? (
                         <AdminPanel match={match}>
                             {children}
                         </AdminPanel>
                    ) : (
                        <DelayedRedirect path = {routes.LOGIN} from={location.pathname}/>
                    )
                }
            </>

        )

};
export default AdminPanelPage;
