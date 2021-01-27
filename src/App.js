import React, {useEffect} from 'react';
import "./App.css";
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
import SingleRestaurantContact from "./pages/SingleRestaurantContact";
import ShoppingBasket from "./pages/ShoppingBasket";
import SingleRestaurantWrapper from "./components/Restaurants/SingleRestaurantWrapper";
import {getBasket} from "./redux/actions/basket";
import DeliveryAndPayment from "./pages/DeliveryAndPayment";
import UserAccount from "./pages/UserAccount";
import Alert from "./components/Alert";
import Page404 from "./pages/Page404";
import MyOrders from "./pages/MyOrders";
import AuthProvider from "./components/Auth/AuthProvider";
import OwnerRoute from "./components/Auth/OwnerRoute";
import {Redirect} from 'react-router-dom';
import TablesAndReservation from "./pages/Admin/TablesAndReservations";
import SingleRestaurantReservation from "./pages/SingleRestaurantReservation";
import MyReservations from "./pages/MyReservations";


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
                    <Redirect exact from='/' to = {routes.RESTAURANTS}/>
                    <Route path={routes.RESTAURANTS} component = {Restaurants}/>
                    <Route exact path={routes.LOGIN} component={Login}/>
                    <Route exact path={routes.REGISTER} component={Register}/>
                    <Route exact path={routes.CONFIRM} component = {RegisterConfirmation}/>
                    <Route path={`${routes.SINGLERESTAURANTMENU}/:restaurantId`} exact render={(props)=>(
                        <SingleRestaurantWrapper {...props}>
                            <SingleRestaurantMenu {...props} />
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
                        <Route path={`${routes.SINGLERESTAURANTRESERVATION}/:restaurantId`} exact render={(props)=>(
                            <SingleRestaurantWrapper {...props}>
                                <SingleRestaurantReservation {...props} />
                            </SingleRestaurantWrapper>
                        )}
                        />
                        <Route path={routes.DELIVERYANDPAYMENT} component = {DeliveryAndPayment}/>
                        <Route exact path={routes.PROFILE} component = {UserAccount}/>
                        <Route exact path={routes.MY_RESERVATIONS} component={MyReservations}/>
                        <Route exact path={`${routes.MY_ORDERS}/:refresh?`} component = {MyOrders}/>
                        <Route path={routes.ADMIN_PANEL} exact render={(props)=>(
                                <AdminDashboard {...props} />
                            )}
                            />

                            <OwnerRoute path={`${routes.RESTAURANT_DASHBOARD}/:restaurantId`} exact>
                                <AdminPanelPage>
                                    <RestaurantDashboard />
                                </AdminPanelPage>
                            </OwnerRoute>

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
                            <OwnerRoute path={`${routes.RESTAURANT_WORKERS}/:restaurantId`} exact>
                                <AdminPanelPage>
                                    <Workers/>
                                </AdminPanelPage>
                            </OwnerRoute>
                            <OwnerRoute path={`${routes.RESTAURANT_EDIT}/:restaurantId`} exact >
                                <AdminPanelPage>
                                    <Edit/>
                                </AdminPanelPage>
                            </OwnerRoute>
                    </AuthProvider>
                    <Route component={Page404}/>
                </Switch>
            </Router>
        </>
    );
}

export default App;

