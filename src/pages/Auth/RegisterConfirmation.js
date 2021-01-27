import React, {useEffect} from "react";
import AuthContainer from "../../components/Auth/AuthContainer";
import {Box,Typography, Button,Backdrop,CircularProgress} from "@material-ui/core";
import {history} from "../../helpers/_helpers";
import {routes} from "../../config/routes";
import {useDispatch, useSelector} from "react-redux";
import {activateAccount} from "../../redux/actions/register";
import {makeStyles} from "@material-ui/core/styles";
import queryString from 'query-string'
import Page500 from "../Page500";


const useStyles = makeStyles((theme)=>({
    backdrop:{
        backgroundColor:'#fff',
        flexDirection:'column'
    }
}))

const RegisterConfirmation = ({location}) =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const isRequesting = useSelector(state=>state.register.isRequesting);
    const error = useSelector(state=>state.register.error);
    const confirmationSuccess = useSelector(state=>state.register.confirmationSuccess);

    useEffect(()=>{
        const query = queryString.parse(location.search);
        query.login && query.key ? (
            dispatch(activateAccount(query.login,query.key))
        ) : (
            history.push(routes.LOGIN))

    },[dispatch,location.search])

    if(error === 500){
        return <Page500/>
    }

    return(
        <>
            {
                isRequesting ? (
                <Backdrop classes={{root:classes.backdrop}} open={isRequesting}>
                    <Typography variant="h3" color="primary" paragraph>
                        Proszę czekać, trwa aktywacja konta ...
                    </Typography>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            ) : (
                <AuthContainer title={confirmationSuccess ? "Gratulacje!": "Błąd"}>
                    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                        <Typography variant="h5" gutterBottom>
                            {confirmationSuccess ? 'Twoje konto zostało pomyślnie aktywowane!' : "Wystąpił błąd z aktywacją konta..."}
                        </Typography>
                        <Typography variant="h5" paragraph>
                            {confirmationSuccess ? 'Zaloguj się i zacznij korzystać z naszych usług!' : 'Spróbuj jeszcze raz lub utwórz nowe konto!'}
                        </Typography>
                        {confirmationSuccess ? (
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => history.push(routes.LOGIN)}
                            >
                                Zaloguj się
                            </Button>
                            ):(
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => history.push(routes.REGISTER)}
                                >
                                    Zarejestruj się
                                </Button>
                            )}
                    </Box>
                </AuthContainer>
                )
            }
        </>
    )
}
export default RegisterConfirmation;
