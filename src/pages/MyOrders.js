import React, {useEffect,useState} from 'react';
import {
    Box,
    TableContainer,
    TableCell,
    TableRow,
    TableBody,
    Paper,
    Table,
    TableHead,
    CircularProgress,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import OrderTableRow from "../components/Orders&Reservations/OrderTableRow";
import {useDispatch, useSelector} from "react-redux";
import {orderService} from "../services/ordersService";
import {errorAlert} from "../redux/actions/alert";
import Jumbotron from "../components/Jumbotron";
import LayersClearIcon from '@material-ui/icons/LayersClear';
import {ordersConstants} from "../redux/types";
import UserPageWrapper from "../components/UserPageWrapper";

const useStyle = makeStyles(theme=>({
    paperStyle:{
        overflowX:'auto',
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.1)",
        borderRadius: theme.spacing(2),
        padding:theme.spacing(2),
        [theme.breakpoints.down('xs')]:{
            padding:theme.spacing(1),
        },
        marginBottom:theme.spacing(4),
    },
}));

const MyOrders = ({match}) =>{
    const classes = useStyle();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
    const [isLoading,setIsLoading] = useState(true);
    const [myOrders,setMyOrders] = useState([]);

    useEffect(()=>{

        const fetchData = () =>{
            setIsLoading(true);
            setTimeout(()=>{
                orderService.getMyOrders()
                    .then(response => {
                        setMyOrders(response.data.content)
                        setIsLoading(false);
                    })
                    .catch(()=>{
                        dispatch(errorAlert("Wystąpił błąd"))
                        setIsLoading(false);
                    })
            },1000)
        }
        if(match.params.refresh){
            orderService.refreshOrders(match.params.refresh)
                .then(()=>fetchData())
                .catch(()=>{
                    dispatch({type:ordersConstants.GET_ORDERS_ERROR, payload:404})
                })
        }else{
            isLoggedIn && fetchData();
        }

    },[isLoggedIn,dispatch,match.params.refresh]);

    return(
            <UserPageWrapper title="Twoje zamówienia">
                <TableContainer component={Paper} className={classes.paperStyle} >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell >Data</TableCell>
                                <TableCell >Status zamówienia</TableCell>
                                <TableCell >Sposób dostawy</TableCell>
                                <TableCell >Zamówienie</TableCell>
                                <TableCell >Cena</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!isLoading && (
                                myOrders.map(orderRow => (
                                    <OrderTableRow row={orderRow} key={orderRow.id}/>
                                ))
                            )}
                        </TableBody>
                    </Table>
                    {isLoading ? (
                        <Box display="flex" justifyContent="center" m={4}>
                            <CircularProgress color="secondary"/>
                        </Box>
                        ):(
                            !myOrders.length &&
                                <Box position="relative" minHeight="300px" mt={4}>
                                    <Jumbotron size={30} text="Brak historii zamówień" icon={<LayersClearIcon fontSize="inherit"/> }/>
                                </Box>
                        )
                    }
                </TableContainer>
            </UserPageWrapper>
    )
}
export default MyOrders;
