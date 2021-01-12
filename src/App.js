import React, {useEffect} from 'react';
import "./App.css";
import Home from "./pages/HomePage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import {Switch,Route,Router} from "react-router-dom";
import AdminPanelPage from "./pages/Admin/AdminPanelPage";
import Menu from "./pages/Admin/Menu";
import Orders from "./pages/Admin/Orders";
import Workers from "./pages/Admin/Workers";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import {history} from "./helpers/_helpers";
import {useDispatch} from "react-redux";
import RestaurantDashboard from "./pages/Admin/RestaurantDashboard";
import {routes} from "./config/routes";
import Edit from "./pages/Admin/Edit";
import RegisterConfirmation from "./pages/Auth/RegisterConfirmation";
import Restaurants from "./pages/Restaurants";
import SingleRestaurantMenu from "./pages/SingleRestaurantMenu";
import SingleRestaurantReservation from "./pages/SingleRestaurantReservation";
import SingleRestaurantContact from "./pages/SingleRestaurantContact";
import ShoppingBasket from "./pages/ShoppingBasket";
import SingleRestaurantWrapper from "./components/Restaurants/SingleRestaurantWrapper";
import {getBasket} from "./redux/actions/basket";
import DeliveryAndPayment from "./pages/DeliveryAndPayment";
import UserAccount from "./pages/UserAccount";
import TablesAndReservation from "./pages/Admin/TablesAndReservation";
import Alert from "./components/Alert";
import Page404 from "./pages/Page404";
import MyOrders from "./pages/MyOrders";
import AuthProvider from "./components/Auth/AuthProvider";
import OwnerProvider from "./components/Auth/OwnerRoute";


const App =()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getBasket());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <>
        <Alert hideDuration={4000}/>
            <Router history = {history}>
                <Switch>
                    <Route exact path={routes.HOMEPAGE} component={Home}/>
                    <Route exact path={routes.LOGIN} component={Login}/>
                    <Route exact path={routes.REGISTER} component={Register}/>
                    <Route exact path={routes.CONFIRM} component = {RegisterConfirmation}/>
                    <Route exact path={routes.RESTAURANTS} component = {Restaurants}/>
                    <Route path={`${routes.SINGLERESTAURANTMENU}/:restaurantId`} exact render={(props)=>(
                        <SingleRestaurantWrapper {...props}>
                            <SingleRestaurantMenu {...props} />
                        </SingleRestaurantWrapper>
                    )}
                    />
                    <Route path={`${routes.SINGLERESTAURANTRESERVATION}/:restaurantId`} exact render={(props)=>(
                        <SingleRestaurantWrapper {...props}>
                            <SingleRestaurantReservation {...props} />
                        </SingleRestaurantWrapper>
                    )}
                    />
                    <Route path={`${routes.SINGLERESTAURANTCONTACT}/:restaurantId`} exact render={(props)=>(
                        <SingleRestaurantWrapper {...props}>
                            <SingleRestaurantContact {...props} />
                        </SingleRestaurantWrapper>
                    )}
                    />
                    <Route path={routes.SHOPPINGBASKET} component={ShoppingBasket}/>

                    <AuthProvider>
                        <Route path={routes.DELIVERYANDPAYMENT} component = {DeliveryAndPayment}/>
                        <Route exact path={routes.PROFILE} component = {UserAccount}/>
                        <Route exact path={routes.MY_ORDERS} component = {MyOrders}/>
                        <Route path={routes.ADMIN_PANEL} exact render={(props)=>(
                                <AdminDashboard {...props} />
                            )}
                            />

                            <OwnerProvider path={`${routes.RESTAURANT_DASHBOARD}/:restaurantId`} exact>
                                <AdminPanelPage>
                                    <RestaurantDashboard />
                                </AdminPanelPage>
                            </OwnerProvider>

                            <Route path={`${routes.RESTAURANT_MENU}/:restaurantId`} exact render={(props)=>(
                                <AdminPanelPage {...props}>
                                    <Menu {...props}/>
                                </AdminPanelPage>
                                )}
                            />
                            <Route path={`${routes.RESTAURANT_ORDERS}/:restaurantId`} exact render={(props)=>(
                                <AdminPanelPage {...props}>
                                    <Orders {...props}/>
                                </AdminPanelPage>
                            )}
                            />
                            <Route path={`${routes.RESTAURANT_RESERVATION}/:restaurantId`} exact render={(props)=>(
                                <AdminPanelPage {...props}>
                                    <TablesAndReservation {...props}/>
                                </AdminPanelPage>
                            )}
                            />
                            <OwnerProvider path={`${routes.RESTAURANT_WORKERS}/:restaurantId`} exact>
                                <AdminPanelPage>
                                    <Workers/>
                                </AdminPanelPage>
                            </OwnerProvider>
                            <OwnerProvider path={`${routes.RESTAURANT_EDIT}/:restaurantId`} exact >
                                <AdminPanelPage>
                                    <Edit/>
                                </AdminPanelPage>
                            </OwnerProvider>
                    </AuthProvider>
                    <Route component={Page404}/>
                </Switch>
            </Router>
        </>
    );
}

export default App;

