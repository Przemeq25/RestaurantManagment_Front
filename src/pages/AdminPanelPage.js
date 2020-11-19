import React, {useEffect} from 'react'
import AdminPanel from "../components/Admin/AdminPanel/AdminPanel";
import {useDispatch, useSelector} from "react-redux";
import {routes} from "../config/routes";
import DelayedRedirect from "../components/DelayedRedirect";
import {authorization} from "../redux/actions/auth";



const AdminPanelPage = ({children,location}) => {
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
    const userType = useSelector(state=>state.auth.userType);
    const dispatch = useDispatch();

    useEffect(()=>{
        isLoggedIn && !userType && authorization(localStorage.getItem("access_token"),dispatch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isLoggedIn])


        return (
            <>
                {
                    isLoggedIn ? (
                         <AdminPanel>
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
