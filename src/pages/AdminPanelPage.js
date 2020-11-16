import React from 'react'
import AdminPanel from "../components/Admin/AdminPanel/AdminPanel";
import {useSelector} from "react-redux";
import {routes} from "../config/routes";
import AddRestaurantStepper from "../components/Admin/AddRestaurant/AddRestaurantStepper";
import DelayedRedirect from "../components/DelayedRedirect";



const AdminPanelPage = ({children,location}) => {

    const isLoggedIn = true ;//useSelector(state=>state.auth.isLoggedIn);
    const userType = useSelector(state=>state.auth.userType);

        return (
            <>

                {
                    isLoggedIn ? (
                         (userType === "OWNER" || userType === "WORKER") ? (
                             <AdminPanel>
                                 {children}
                             </AdminPanel>
                         )
                         :(
                             <AddRestaurantStepper isDialogOpen firstRegister/>
                         )
                    ) : (
                        <DelayedRedirect path = {routes.LOGIN} from={location.pathname}/>
                    )
                }
            </>

        )

};
export default AdminPanelPage;
