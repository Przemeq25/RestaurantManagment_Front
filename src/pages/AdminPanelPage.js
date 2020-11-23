import React, {useEffect} from 'react'
import AdminPanel from "../components/Admin/AdminPanel/AdminPanel";
import {useDispatch, useSelector} from "react-redux";
import {routes} from "../config/routes";
import DelayedRedirect from "../components/DelayedRedirect";
import {authorization} from "../redux/actions/auth";
import {getSingleRestaurantForAdmin} from "../redux/actions/restaurant";



const AdminPanelPage = ({children,location,match}) => {
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
    const userType = useSelector(state=>state.auth.userType);
    const selectedRestaurant = useSelector(state=>state.restaurant.selectedRestaurant)
    const dispatch = useDispatch();

    useEffect(()=>{
        isLoggedIn && !userType && authorization(localStorage.getItem("access_token"),dispatch);
        // eslint-disable-next-line react-hooks/exhaustive-deps

    },[isLoggedIn])

    useEffect(()=>{
        !selectedRestaurant && match.params && match.params.restaurantId && dispatch(getSingleRestaurantForAdmin(match.params.restaurantId))
    },[])


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
