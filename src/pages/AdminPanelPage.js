import React from 'react'
import AdminPanel from "../components/Admin/AdminPanel/AdminPanel";
import {useSelector} from "react-redux";
import {Redirect} from 'react-router-dom';
import {routes} from "../config/routes";



const AdminPanelPage = ({children,location}) => {
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
    const userType = useSelector(state=>state.auth.userType);

        return (
            <>

                {
                    isLoggedIn && (userType === "OWNER" || userType === "WORKER") ? (
                    <AdminPanel>
                        {children}
                    </AdminPanel>
                    ) : (
                        <Redirect
                            to={{
                                pathname: routes.LOGIN,
                                from: location.pathname
                            }}
                        />
                    )
                }
            </>

        )

};
export default AdminPanelPage;
