import React from 'react';
import "./App.css";
import Home from "./pages/HomePage";
import Dashboard from "./pages/Admin/Dashboard";
import { Route, Switch,withRouter} from "react-router-dom";
import AdminPanelPage from "./pages/AdminPanelPage";
import Menu from "./pages/Admin/Menu";
import Orders from "./pages/Admin/Orders";
import Workers from "./pages/Admin/Workers";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PersonalData from "./pages/Auth/PersonalData";


const App =()=>{
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/:login/personal-data" component={PersonalData}/>
            <AdminPanelPage>
                <Route path="/admin" exact render={(props)=>(
                    <Dashboard {...props}/>
                )}
                />
                <Route path="/admin/menu"exact render={(props)=>(
                    <Menu {...props}/>
                    )}
                />
                <Route path="/admin/orders"exact render={(props)=>(
                    <Orders {...props}/>
                )}
                />
                <Route path="/admin/workers"exact render={(props)=>(
                    <Workers {...props}/>
                )}
                />
            </AdminPanelPage>
        </Switch>

    );
}

export default withRouter(App);

