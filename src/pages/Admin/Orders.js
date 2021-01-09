import React, {useEffect, useState} from "react";
import {
    BottomNavigation,
    BottomNavigationAction,
    Typography,
    Box,
    Fab,
    Hidden,
    Backdrop,
    CircularProgress,
} from "@material-ui/core";
import {makeStyles,withStyles} from "@material-ui/core/styles";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import OrderRow from "../../components/Admin/Orders/OrderRow";
import Search from "../../components/Search";
import AddIcon from "@material-ui/icons/Add";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {useDispatch, useSelector} from "react-redux";
import {orderStatus} from "../../helpers/_helpers";
import {getMenu, getOrders, switchOrderStatus} from "../../redux/actions/orders";
import Jumbotron from "../../components/Jumbotron";
import AddOrder from "../../components/Admin/Orders/AddOrder";

const useStyles = makeStyles(theme=>({
    root: {
        position:'fixed',
        [theme.breakpoints.up('md')]:{
            height:'auto',
            top:'50%',
            right:0,
            transform:'translate(0,-50%)',
            flexDirection:'column',
            background:'transparent',
        },
        [theme.breakpoints.down('sm')]:{
            bottom:'0',
            right:'50%',
            transform:'translate(50%,0)',
            background:'#ebebeb',
            width:'100%',

        },
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        [theme.breakpoints.down('sm')]:{
            bottom: theme.spacing(7),
        }
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    ordersContainerPadding:{
        [theme.breakpoints.down('md')]:{
            padding: theme.spacing(1)
        },
        padding: `${theme.spacing(8)}px ${theme.spacing(16)}px`
    },

}));
const MyBottomNavigationAction = withStyles(theme=>({
    root: {
        [theme.breakpoints.down('sm')]:{
          padding:'6px 0px 8px',
        },
        color: theme.palette.primary.main,
        "&.Mui-selected": {
            color: theme.palette.secondary.main,
            transform:'translateX(-10px)',
            transition: 'all 200ms ease-in-out',
                [theme.breakpoints.down('sm')]:{
                    transform:'translateX(0px)',
                    width:130,
                    transition: 'all 200ms ease-in-out',
                }
        },
        '&:focus':{
            outline: 'none'
        }
    }
}))(BottomNavigationAction);

const Orders = ({match}) =>{
    const classes = useStyles();
    const restaurantID = match.params.restaurantId;
    const dispatch = useDispatch();
    const isFetching = useSelector(state=>state.orders.isFetching);
    const currentOrderStatus = useSelector(state=>state.orders.orderStatus);
    const orders = useSelector(state=>state.orders.orders);
    const [addOrderIsOpen, setAddOrderIsOpen] = useState(false);
    const menu = useSelector(state=>state.orders.menu);

    useEffect(()=>{
        const fetchData = () =>{
            dispatch(getOrders(restaurantID,currentOrderStatus))
        }
        fetchData();
    },[currentOrderStatus]);
    useEffect(()=>{
        const fetchMenu = () =>{
            dispatch(getMenu(restaurantID));
        }
        !menu.length && fetchMenu()
    },[]);

    const handleChange = (event, newValue) => {
        dispatch(switchOrderStatus(newValue));
    };
    const handleToggleAddOrder = () =>{
        setAddOrderIsOpen(!addOrderIsOpen);
    }

    return(
        <>
            <Box display = "flex" justifyContent="space-between">
                <Typography variant="h3">Zamówienia:</Typography>
                <Search/>
            </Box>
            <Typography variant="subtitle2" paragraph >Przejmij kontrolę nad zamówieniami!</Typography>
            <div className={classes.ordersContainerPadding}>

                {isFetching ? (
                    <Backdrop open={isFetching} invisible>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                ):(
                    orders.length ? orders.map((order,index) => (
                        <OrderRow
                            key={order.id}
                            orderIndex={index}
                            restaurantId={restaurantID}
                            {...order}
                        />
                    )
                    ) : (
                        <Jumbotron text={
                            currentOrderStatus === orderStatus.DONE ? "Brak historii zamówień" :
                                currentOrderStatus === orderStatus.IN_DELIVERY ? "Brak zamówień do wydania" :
                                    "Brak aktualnych zamówień"
                        }/>
                    )
                )
                }
                <BottomNavigation
                    showLabels
                    classes={{root:classes.root}}
                    value={currentOrderStatus}
                    onChange={handleChange}
                >
                    <MyBottomNavigationAction label="Aktywne" value={orderStatus.IN_PROGRESS} icon={<MenuBookIcon/>} />
                    <MyBottomNavigationAction label="W dostawie" value={orderStatus.IN_DELIVERY} icon={<DirectionsCarIcon />} />
                    <MyBottomNavigationAction label="Zrealizowane" value={orderStatus.DONE} icon={<CheckCircleOutlineIcon />} />
                    <Hidden mdUp>
                        <MyBottomNavigationAction label="Dodaj zamówienie" icon={<AddCircleOutlineIcon />} showLabel onClick={handleToggleAddOrder}/>
                    </Hidden>
                </BottomNavigation>

            </div>
            <Hidden smDown>
                <Fab color="primary" size="small" variant = "extended" className={classes.fab} onClick={handleToggleAddOrder}>
                    <AddIcon className={classes.extendedIcon}/>
                Dodaj zamówienie
                </Fab>
            </Hidden>
            <AddOrder addOrderIsOpen={addOrderIsOpen} handleToggleAddOrder={handleToggleAddOrder} menu = {menu} restaurantId={restaurantID}/>
        </>
    )
};
export default Orders;
