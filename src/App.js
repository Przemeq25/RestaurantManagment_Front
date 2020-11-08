import React, {useEffect} from 'react';
import "./App.css";
import Home from "./pages/HomePage";
import Dashboard from "./pages/Admin/Dashboard";
import {Switch,Route,Router} from "react-router-dom";
import AdminPanelPage from "./pages/AdminPanelPage";
import Menu from "./pages/Admin/Menu";
import Orders from "./pages/Admin/Orders";
import Workers from "./pages/Admin/Workers";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import {history} from "./helpers/_helpers";
import {useDispatch, useSelector} from "react-redux";
import {checkIsLoggedIn} from "./redux/actions/auth";
import {userService} from "./services/userService";


const App =()=>{
    const dispatch = useDispatch();
    const token = useSelector(state=>state.auth.token)

    useEffect(()=>{
        dispatch(checkIsLoggedIn());
        token && userService.getUserData(token).then(res=>console.log(res)).catch(err=>console.log(err));
    },[token])
    return (
        <Router history = {history}>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
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
        </Router>

    );
}

export default App;

