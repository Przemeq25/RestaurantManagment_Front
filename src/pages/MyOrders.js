import React, {useEffect,useState} from 'react';
import Navbar from "../components/Navbar";
import {
    Box,
    Container,
    Typography,
    useTheme,
    TableContainer,
    TableCell,
    TableRow,
    TableBody,
    Paper,
    Table,
    TableHead,
    CircularProgress,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import {makeStyles} from "@material-ui/core/styles";
import OrderTableRow from "../components/Orders&Reservations/OrderTableRow";
import {useDispatch, useSelector} from "react-redux";
import {orderService} from "../services/ordersService";
import {errorAlert} from "../redux/actions/alert";
import Jumbotron from "../components/Jumbotron";
import LayersClearIcon from '@material-ui/icons/LayersClear';
import {ordersConstants} from "../redux/types";

const useStyle = makeStyles(theme=>({
    pageBackground:{
        backgroundColor:'rgba(248,248,248)',
        minHeight:'100vh',
        overflow:'hidden',
    },
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
    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));
    const classes = useStyle();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
    const [isLoading,setIsLoading] = useState(true);
    const [myOrders,setMyOrders] = useState([]);

    useEffect(()=>{

        const fetchData = () =>{
            setIsLoading(true);
            orderService.getMyOrders()
                .then(response => {
                    setMyOrders(response.data.content)
                    setIsLoading(false);
                })
                .catch(()=>{
                    dispatch(errorAlert("Wystąpił błąd"))
                    setIsLoading(false);
                })
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
        <Box className={classes.pageBackground}>
            <Navbar/>
            <Container>
                <Box mt={mdDown ? 2 : 5} mb={mdDown ? 2 : 5}>
                    <Typography variant="h3" color="secondary">Twoje zamówienia</Typography>
                </Box>
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
            </Container>
        </Box>
    )
}
export default MyOrders;
