import React, {useEffect, useState} from 'react';
import {Box, Button, Container, Paper, Typography, useTheme} from "@material-ui/core";
import Navbar from "../components/Navbar";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import {makeStyles} from "@material-ui/core/styles";
import PersonalDataForm from "../components/PersonalDataForm";
import {useDispatch, useSelector} from "react-redux";
import CircularProgress from "../components/CircularProgress";
import {routes} from "../config/routes";
import DelayedRedirect from "../components/DelayedRedirect";
import {authorization} from "../redux/actions/auth";

const useStyles = makeStyles(theme=>({
    pageBackground:{
        backgroundColor:'rgba(248,248,248)',
        minHeight:'100vh',
        overflow:'hidden',
    },
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

const UserAccount = () =>{
    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));
    const classes = useStyles();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
    const userData = useSelector(state=>state.auth.userData);
    const isLoading = useSelector(state=>state.auth.isLoading);
    const [updatePersonalData,setUpdatePersonalData] = useState(false);

    useEffect(()=>{
        isLoggedIn && authorization(dispatch);
        // eslint-disable-next-line react-hooks/exhaustive-deps

    },[isLoggedIn])

    const handleToggleUpdatePersonalData = () =>{
        setUpdatePersonalData(!updatePersonalData);
    }

    return (
        <Box className={classes.pageBackground}>
            <Navbar/>
            <Container>
                <Box mt={mdDown ? 2 : 5} mb={mdDown ? 2 : 5}>
                    <Typography variant="h3" color="secondary">Twoje konto</Typography>
                </Box>
                <Paper className={classes.paperStyle} variant="outlined">
                    <Typography variant="h4" paragraph>Dane osobowe</Typography>
                    {isLoading ? (
                        <CircularProgress />
                    ):(
                        isLoggedIn || Object.values(userData).length ? (
                            <>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Box>
                                    <Typography variant="body2" gutterBottom><b>Imię i nazwisko:</b>  {userData.forename} {userData.surname}</Typography>
                                    <Typography variant="body2" gutterBottom><b>Adres:</b>  {userData.street} {userData.houseNumber}</Typography>
                                    <Typography variant="body2" gutterBottom><b>Miejscowość:</b>  {userData.postCode} {userData.city}</Typography>
                                    <Typography variant="body2" gutterBottom paragraph><b>Numer telefonu:</b>  {userData.phoneNumber}</Typography>
                                    <Button variant = "contained" color="secondary" onClick={handleToggleUpdatePersonalData}> Zmień dane </Button>
                                </Box>
                            </Box>
                                {updatePersonalData &&
                                    <Box p={2}>
                                        <Typography variant="h5" paragraph> Zmień dane</Typography>
                                        <PersonalDataForm
                                            initial={userData}
                                            update
                                            handleClose={handleToggleUpdatePersonalData}
                                        />
                                    </Box>
                                }
                            </>
                        ):<DelayedRedirect from={routes.PROFILE} path={routes.LOGIN} />
                    )
                    }
                </Paper>
            </Container>
        </Box>
    )
}
export default UserAccount;
