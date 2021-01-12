import React, {useEffect} from 'react';
import {Typography, Box, Paper,Container } from '@material-ui/core';
import {makeStyles,useTheme} from "@material-ui/core/styles";
import authImage from '../../images/cheeseburger-34314_1280.png';
import Hidden from "@material-ui/core/Hidden";
import AppLogo from "../AppLogo";
import {useDispatch, useSelector} from "react-redux";
import {history} from "../../helpers/_helpers";
import {routes} from "../../config/routes";
import {authConstants, registerConstants} from "../../redux/types";

const useStyles = makeStyles(theme=>({
    authBackground:{
        position:'absolute',
        top:0,
        right:0,
        maxWidth:"60%",
        minWidth:"60%",
        overflow: 'hidden',
        height:'100vh',
    },
    titleText:{
        fontSize:28,
        fontWeight:700,
        letterSpacing: '0.085rem',
        color:theme.palette.primary.main,
    },
    logoPosition:{
        position:'absolute',
        top:theme.spacing(6)
    }

}));

const AuthContainer = ({title, children}) =>{
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);

    useEffect(()=>{
        isLoggedIn && !history.location.from && history.push(routes.HOMEPAGE)
        !isLoggedIn && dispatch({type:authConstants.RETURN_INITIAL_STATE})
        !isLoggedIn && dispatch({type:registerConstants.RETURN_INITIAL_STATE})
    },[isLoggedIn])
    return(
        <>
            <Hidden mdDown>
                <div className={classes.authBackground}>
                    <svg width="100%" height="100%" viewBox="0 0 1191 1080" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                        <path d="M1191 1080V0.0596153C1191 0.0596153 -253.519 -10.8788 118.669 263.581C490.856 538.041 0 1080 0 1080H1191Z" fill={theme.palette.secondary.main}/>
                        <path d="M503.259 306.101C288.309 111.001 541.852 139.647 1191 110V1080H288.309C288.309 1080 215.994 952.434 663.848 799.355C1111.7 646.276 718.209 501.201 503.259 306.101Z" fill={theme.palette.secondary.dark}/>
                    </svg>
                </div>
                <Container fixed>
                    <Box height="calc(100vh - 150px)">
                       <AppLogo size={28} marginBottom={4} marginTop={6} push/>
                        <Box display = "flex" height="100%" mt={-6}>
                            <Box width="40%" display="flex" alignItems = "center" justifyContent = "center">
                                <img src={authImage} alt="login" style={{width:'100%'}}/>
                            </Box>
                            <Box zIndex="10" width="60%" display="flex" alignItems = "center" justifyContent = "flex-end">
                                <Paper elevation={2}>
                                    <Box display = "flex" alignItems = "center" justifyContent = "center" p = {4} flexDirection = "column" maxWidth="500px">
                                        <Typography variant = "h2" className ={classes.titleText} paragraph> {title} </Typography>
                                        {children}
                                    </Box>
                                </Paper>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Hidden>
        <Hidden lgUp>
            <Box width="100%" height="100vh"  style={{backgroundColor:theme.palette.secondary.main}} p={2}>
                <Box display="flex" flexDirection ="column" alignItems = "center" >
                    <AppLogo size={28} marginBottom={4} marginTop={6} push/>
                    <Box zIndex="10" height="100%" width='100%' maxWidth='500px' mt={4} minWidth = "250px">
                        <Paper elevation={2} >
                            <Box display = "flex" alignItems = "center" justifyContent = "center" p = {4} flexDirection = "column">
                                <Typography variant = "h2" className ={classes.titleText} paragraph> {title} </Typography>
                                {children}
                            </Box>
                        </Paper>
                    </Box>
                </Box>
            </Box>
        </Hidden>
        </>
    )

}
export default AuthContainer;
