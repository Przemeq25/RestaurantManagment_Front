import React from "react";
import WorkerCard from "../../components/Admin/Workers/WorkerCard";
import {Typography, Grid, Fab} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from "@material-ui/core/styles";


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

const Workers = () =>{
    const classes = useStyles();
    return(
        <>
        <Typography variant="h3">Pracownicy:</Typography>
        <Typography variant="subtitle2" paragraph >Zarządzaj swoimi pracownikami!</Typography>
            <Grid container spacing={2}>
                <Grid item xs ={12} sm ={6} md = {4}  xl={3}>
                    <WorkerCard/>
                </Grid>
                <Grid item xs ={12} sm ={6} md = {4}  xl={3}>
                    <WorkerCard/>
                </Grid>
                <Grid item xs ={12} sm ={6} md = {4}  xl={3}>
                    <WorkerCard/>
                </Grid>
                <Grid item xs ={12} sm ={6} md = {4}  xl={3}>
                    <WorkerCard/>
                </Grid>
                <Grid item xs ={12} sm ={6} md = {4}  xl={3}>
                    <WorkerCard/>
                </Grid>
                <Grid item xs ={12} sm ={6} md = {4}  xl={3}>
                    <WorkerCard/>
                </Grid>
                <Grid item xs ={12} sm ={6} md = {4}  xl={3}>
                    <WorkerCard/>
                </Grid>

            </Grid>
            <Fab color="primary" aria-label="add" variant = "extended" className={classes.fab}>
                <AddIcon className={classes.extendedIcon}/>
                Dodaj pracownika
            </Fab>
        </>
    )
}
export default Workers;
