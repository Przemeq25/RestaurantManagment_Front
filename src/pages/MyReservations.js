import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import UserPageWrapper from "../components/UserPageWrapper";
import {errorAlert} from "../redux/actions/alert";
import {useDispatch} from "react-redux";
import {restaurantService} from "../services/restaurantService";
import {
    Box,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import Jumbotron from "../components/Jumbotron";
import LayersClearIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ReservationTableRow from "../components/Orders&Reservations/ReservationTableRow";

const useStyles = makeStyles(theme=>({
    paperStyle:{
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.1)",
        borderRadius: theme.spacing(2),
        overflow: 'hidden',
        padding:theme.spacing(3),
        marginBottom:theme.spacing(2),
        [theme.breakpoints.down('xs')]:{
            padding:theme.spacing(2),
            marginBottom:theme.spacing(1),
        }
    },
}))

const MyReservations = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [isLoading,setIsLoading] = useState(true);
    const [myReserevtaions,setMyReservations] = useState([]);

    useEffect(()=> {

        const fetchData = () => {
            setIsLoading(true);
            restaurantService.getMyReservations()
                .then(response => {
                    setMyReservations(response.data.content)
                    setIsLoading(false);
                })
                .catch(() => {
                    dispatch(errorAlert("Wystąpił błąd"))
                    setIsLoading(false);
                })
        }
        fetchData()
    },[dispatch])

    return(
        <UserPageWrapper title="Twoje rezerwacje">
            <TableContainer component={Paper} className={classes.paperStyle} >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell >Dzień</TableCell>
                            <TableCell >Od</TableCell>
                            <TableCell >Do</TableCell>
                            <TableCell >Miejsca</TableCell>
                            <TableCell >Restauracja</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!isLoading && (
                            myReserevtaions.map((orderRow,index) => (
                                <ReservationTableRow row={orderRow} key={index}/>
                            ))
                        )}
                    </TableBody>
                </Table>
                {isLoading ? (
                    <Box display="flex" justifyContent="center" m={4}>
                        <CircularProgress color="secondary"/>
                    </Box>
                ):(
                    !myReserevtaions.length &&
                    <Box position="relative" minHeight="300px" mt={4}>
                        <Jumbotron size={30} text="Brak historii rezerwacji" icon={<LayersClearIcon fontSize="inherit"/> }/>
                    </Box>
                )
                }
            </TableContainer>
        </UserPageWrapper>
    )
}
export default MyReservations;
