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
import {useDispatch} from "react-redux";
import {checkIsLoggedIn} from "./redux/actions/auth";


const App =()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(checkIsLoggedIn());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
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

