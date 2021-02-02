import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {
    Fab,
    Typography,
    Backdrop, CircularProgress, Box,
    Button, Container
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AddTables from "../../components/Admin/Reservation/AddTables";
import {getTablesForRestaurant, toggleAddTablesDrawer} from "../../redux/actions/tables";
import {useDispatch, useSelector} from "react-redux";
import Jumbotron from "../../components/Jumbotron";
import TableRow from '../../components/Admin/Reservation/TableRow';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ReservationDialog from "../../components/Admin/Reservation/ReservationDialog";
import {toggleReservationDialog} from "../../redux/actions/reservations";
import {ownerPermision} from "../../helpers/_helpers";

const useStyles = makeStyles(theme=>({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const TablesAndReservation = ({match}) =>{
    const classes = useStyles();
    const role = useSelector(state=>state.restaurant.role);
    const dispatch = useDispatch();
    const isFetching = useSelector(state=>state.tables.isFetching);
    const tables = useSelector(state=>state.tables.tables);


    useEffect(()=>{
        dispatch(getTablesForRestaurant(match.params.restaurantId))
    },[dispatch,match.params.restaurantId])

    return(
        <>
            <ReservationDialog restaurantId={match.params.restaurantId}/>
            <Box display = "flex" justifyContent="space-between">
                <Typography variant="h3">Stoliki i rezerwacje:</Typography>
                <Button
                    color="secondary"
                    variant="contained"
                    size="small"
                    startIcon={<AssignmentIcon/>}
                    onClick={()=>dispatch(toggleReservationDialog())}
                >
                    Rezerwacje
                </Button>
            </Box>

            <Typography variant="subtitle2" paragraph >Dodaj stoliki i zarządzaj rezerwacjami!</Typography>
            {isFetching ? (
                <Backdrop open={isFetching} invisible>
                    <CircularProgress color="inherit" />
                </Backdrop>
            ):(
                <Container>
                    {
                    tables.length ? (
                        Object.values(tables.reduce(
                            (acc, current)=> ({
                                ...acc,
                                [current['numberOfSeats']] :[
                                    ...(acc[current['numberOfSeats']] || []),current]
                            })
                            ,{})).map(table=>(
                                        <TableRow table={table} key ={table[0].id} restaurantId={match.params.restaurantId}/>
                                    ))
                        ):(
                            <Jumbotron text ="Brak stolików w restauracji" buttonText="Dodaj stoliki" icon={<AssignmentIcon fontSize="inherit"/>} handleClick={()=>dispatch(toggleAddTablesDrawer())}/>
                        )
                    }
                </Container>
            )
            }
            {ownerPermision(role) &&
                <>
                    <Fab color="primary" aria-label="add" className={classes.fab} onClick={()=>dispatch(toggleAddTablesDrawer())} variant="extended" size="small">
                    <AddIcon/>
                    Dodaj stoliki
                        </Fab>
                    <AddTables restaurantId={match.params.restaurantId}/>
                </>
            }
        </>
    )
};
export default TablesAndReservation;
