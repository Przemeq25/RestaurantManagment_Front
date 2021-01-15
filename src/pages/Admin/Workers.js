import React, {useEffect, useState} from "react";
import WorkerCard from "../../components/Admin/Workers/WorkerCard";
import {Typography, Grid, Fab, Backdrop, CircularProgress} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import Jumbotron from "../../components/Jumbotron";
import WorkIcon from '@material-ui/icons/Work';
import AddWorker from "../../components/Admin/Workers/AddWorker";
import {addWorker, getWorkers} from "../../redux/actions/workers";


const useStyles = makeStyles(theme=>({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

const Workers = ({match}) =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const workers = useSelector(state=>state.workers.workers);
    const isRequesting = useSelector(state=>state.workers.isFetching);
    const isAddRequesting = useSelector(state=>state.workers.isAddRequesting);
    const [isDialogOpen,setDialogOpen]=useState(false);

    const handleToggleDialog = () =>{
        setDialogOpen(!isDialogOpen);
    }
    const handleAddWorker = (email)=>{
        dispatch(addWorker(email,match.params.restaurantId))
    }

    useEffect(()=>{
        !workers.length && dispatch(getWorkers(match.params.restaurantId))
    },[dispatch,match.params.restaurantId,workers.length]);

    return(
        <>
        <Typography variant="h3">Pracownicy:</Typography>
        <Typography variant="subtitle2" paragraph >Zarządzaj swoimi pracownikami!</Typography>
            <Grid container spacing={2}>
                { isRequesting ? (
                    <Backdrop open={isRequesting} invisible>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                ):(
                    workers.length ? (

                        workers.map(worker=>(
                            <Grid item xs ={12} sm ={6} md = {4}  xl={3} key={worker.email}>
                                <WorkerCard {...worker} restaurantID={match.params.restaurantId}/>
                            </Grid>
                        ))
                    ):(
                        <Jumbotron text="Brak danych o pracownikach" buttonText="Dodaj pracownika" icon={<WorkIcon fontSize="inherit"/>} handleClick={handleToggleDialog}/>
                    )
                )}

            </Grid>
            <AddWorker isDialogOpen={isDialogOpen} handleToggleDialog={handleToggleDialog} addWorker={handleAddWorker} isAddRequesting={isAddRequesting}/>
            <Fab
                color="primary"
                variant = "extended"
                className={classes.fab}
                onClick={handleToggleDialog}
                size="small"
            >
                <AddIcon className={classes.extendedIcon}/>
                Dodaj pracownika
            </Fab>
        </>
    )
}
export default Workers;
