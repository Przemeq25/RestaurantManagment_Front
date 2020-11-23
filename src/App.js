import React, {useEffect} from 'react';
import "./App.css";
import Home from "./pages/HomePage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import {Switch,Route,Router} from "react-router-dom";
import AdminPanelPage from "./pages/AdminPanelPage";
import Menu from "./pages/Admin/Menu";
import Orders from "./pages/Admin/Orders";
import Workers from "./pages/Admin/Workers";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import {history} from "./helpers/_helpers";
import {useDispatch} from "react-redux";
import {checkIsLoggedIn} from "./redux/actions/auth";
import RestaurantDashboard from "./pages/Admin/RestaurantDashboard";
import {routes} from "./config/routes";
import Edit from "./pages/Admin/Edit";
import RegisterConfirmation from "./pages/Auth/RegisterConfirmation";


const App =()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(checkIsLoggedIn());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <Router history = {history}>
            <Switch>
                <Route exact path={routes.HOMEPAGE} component={Home}/>
                <Route path={routes.LOGIN} component={Login}/>
                <Route exact path={routes.REGISTER} component={Register}/>
                <Route exact path={routes.CONFIRM} component = {RegisterConfirmation}/>
                <AdminPanelPage>
                    <Route path={routes.ADMIN_PANEL} exact render={(props)=>(
                        <AdminDashboard {...props}/>
                    )}
                    />
                    <Route path={`${routes.RESTAURANT_DASHBOARD}/:restaurantId`} exact render={(props)=>(
                        <RestaurantDashboard {...props}/>
                    )}
                    />
                    <Route path={`${routes.RESTAURANT_MENU}/:restaurantId`} exact render={(props)=>(
                        <Menu {...props}/>
                        )}
                    />
                    <Route path={`${routes.RESTAURANT_ORDERS}/:restaurantId`} exact render={(props)=>(
                        <Orders {...props}/>
                    )}
                    />
                    <Route path={`${routes.RESTAURANT_WORKERS}/:restaurantId`} exact render={(props)=>(
                        <Workers {...props}/>
                    )}
                    />
                    <Route path={`${routes.RESTAURANT_EDIT}/:restaurantId`} exact render={(props)=>(
                        <Edit {...props}/>
                    )}
                    />
                </AdminPanelPage>
            </Switch>
        </Router>

    );
}

export default App;

