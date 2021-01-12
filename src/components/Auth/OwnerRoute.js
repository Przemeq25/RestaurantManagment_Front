import React from 'react';
import {useSelector} from "react-redux";
import {Route} from 'react-router-dom';
import DelayedRedirect from "./DelayedRedirect";
import {routes} from "../../config/routes";

const OwnerRoute = ({ children, ...rest}) =>{
    const role = useSelector(state=>state.restaurant.role);
    return (
        <Route {...rest} render={(props) => (
            role === "OWNER"
                ? React.cloneElement(children, {...props})
                : <DelayedRedirect path={routes.ADMIN_PANEL}/>
            )}
        />
    )
}
export default OwnerRoute;
