import React, {useEffect, useState} from 'react';
import {Box, Container, Grid, Typography, useTheme,Paper,Button,List,ListItem,ListItemText,ListItemSecondaryAction,ListItemIcon,Radio,Divider,TextField} from "@material-ui/core";
import Navbar from "../components/Navbar";
import {makeStyles} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import ShoppingBasketItemWrapper from "../components/Restaurants/ShoppingBasket/ShoppingBasketItemWrapper";
import ShoppingBasketItem from "../components/Restaurants/ShoppingBasket/ShoppingBasketItem";
import {useDispatch, useSelector} from "react-redux";
import {history, personalDataInitialValues} from "../helpers/_helpers";
import {routes} from "../config/routes";
import {authorization} from "../redux/actions/auth";
import PersonalDataForm from "../components/PersonalDataForm";
import CircularProgress from "../components/CircularProgress";

const useStyles = makeStyles(theme=>({
    pageBackground:{
        backgroundColor:'rgba(248,248,248)',
        minHeight:'100vh',
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
    }

}));

const DeliveryAndPayment = () =>{
    const classes = useStyles();
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
    const userData = useSelector(state=>state.auth.userData);
    const isLoading = useSelector(state=>state.auth.isLoading);
    const dispatch = useDispatch();
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const basket = useSelector(state=>state.basket);
    const [updatePersonalData,setUpdatePersonalData] = useState(false);


    useEffect(()=>{
        isLoggedIn && authorization(dispatch);
        // eslint-disable-next-line react-hooks/exhaustive-deps

    },[isLoggedIn])

    const handleToggleUpdatePersonalData = () =>{
        setUpdatePersonalData(!updatePersonalData);
    }

    const renderBastekProducts = (basket) =>{
        const result = [];

        basket.forEach(function (a) {
            if (!this[a.restaurantId]) {
                this[a.restaurantId] = { restaurantId: a.restaurantId, restaurantName: a.restaurantName,  products: [] };
                result.push(this[a.restaurantId]);
            }
            this[a.restaurantId].products.push(a);
        }, Object.create(null));
        return result;
    }

    return(
        <Box className={classes.pageBackground}>
            <Navbar/>
            <Container>
                <Box mt={smDown ? 2 : 5} mb={smDown ? 2 : 5}>
                    <Typography variant="h3">Dostawa i płatność </Typography>
                </Box>
                <Grid container spacing={2}>
                    <Grid item md = {8} sm={12} xs={12}>
                        <Paper className={classes.paperStyle} variant="outlined">
                            <Typography variant="h4" paragraph>Dane odbiorcy</Typography>
                            {isLoading ? (
                                <CircularProgress />
                            ):(
                                isLoggedIn || Object.values(userData).length ? (
                                    Object.values(userData).every(x => (x !== null)) ? (
                                            updatePersonalData ? (
                                                    <Box p={2} >
                                                        <Typography variant="h5" paragraph> Zmień dane do wysyłki</Typography>
                                                        <PersonalDataForm initial={userData} update={isLoggedIn} handleClose={handleToggleUpdatePersonalData}/>
                                                    </Box>
                                                ):(
                                                    <Box display="flex" alignItems="center" justifyContent="space-between">
                                                        <Box>
                                                            <Typography variant="body2">{userData.forename} {userData.surname}</Typography>
                                                            <Typography variant="body2">{userData.street} {userData.houseNumber}</Typography>
                                                            <Typography variant="body2">{userData.postCode} {userData.city}</Typography>
                                                            <Typography variant="body2" paragraph>{userData.phoneNumber}</Typography>
                                                            <Button variant = "contained" color="secondary" onClick={handleToggleUpdatePersonalData}> Zmień adres </Button>
                                                        </Box>
                                                    </Box>
                                                )
                                        ):(
                                            <Box p={2} >
                                                <Typography variant="h5" paragraph> Uzupełnij swoje dane</Typography>
                                                <PersonalDataForm initial={personalDataInitialValues} update/>
                                            </Box>
                                    )
                                ):(
                                    <>
                                        <Box p={2} mb={2}>
                                            <Typography variant="h5"> Zamów bez logowania</Typography>
                                            <Typography variant="subtitle1" paragraph>Uzupełnij formularz dostawy</Typography>
                                            <PersonalDataForm initial={personalDataInitialValues} />
                                        </Box>
                                        <Typography variant="h5" align="center"> lub </Typography>
                                        <Box mt={4}/>
                                        <Button variant="contained" color="secondary" fullWidth onClick={()=>history.push({pathname:routes.LOGIN, from:routes.DELIVERYANDPAYMENT})}>Zaloguj się</Button>
                                    </>

                                )
                            )}
                        </Paper>
                        <Paper className={classes.paperStyle} variant="outlined">
                            <Typography variant="h4" paragraph>Produkty i dostawa</Typography>
                            {renderBastekProducts(basket.basket).map(restaurant=>(
                                <ShoppingBasketItemWrapper
                                    restaurantName={restaurant.restaurantName}
                                    restaurantId={restaurant.restaurantId}
                                    key={restaurant.restaurantId}
                                >
                                    {restaurant.products.map(product=>(
                                        <ShoppingBasketItem
                                            key={product.id}
                                            name={product.name}
                                            unitPrice={product.unitPrice}
                                            totalPrice={product.totalPrice}
                                            amount={product.amount}
                                            image={product.image}
                                            id={product.id}
                                        />
                                    ))}
                                    <Box mt={4} mb={4}>
                                        <Typography variant="h5" paragraph>Dostawa i płatność</Typography>
                                        <List style={{flex:1}}>
                                            <ListItem dense button>
                                                <ListItemIcon>
                                                    <Radio
                                                        edge="start"
                                                        tabIndex={-1}
                                                        disableRipple
                                                    />
                                                </ListItemIcon>
                                                <ListItemText primary="Obiór w restauracji" />
                                                <ListItemSecondaryAction>
                                                    <Typography variant="body2"> 0.00zł </Typography>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            <ListItem dense button>
                                                <ListItemIcon>
                                                    <Radio
                                                        edge="start"
                                                        tabIndex={-1}
                                                        disableRipple
                                                    />
                                                </ListItemIcon>
                                                <ListItemText primary="Dostawa na adres" />
                                                <ListItemSecondaryAction>
                                                    <Typography variant="body2"> 15.00zł </Typography>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        </List>
                                        <Divider />
                                        <List style={{flex:1}}>
                                            <ListItem dense button>
                                                <ListItemIcon>
                                                    <Radio
                                                        edge="start"
                                                        tabIndex={-1}
                                                        disableRipple
                                                    />
                                                </ListItemIcon>
                                                <ListItemText primary="Płatność online" />
                                            </ListItem>
                                            <ListItem dense button>
                                                <ListItemIcon>
                                                    <Radio
                                                        edge="start"
                                                        tabIndex={-1}
                                                        disableRipple
                                                    />
                                                </ListItemIcon>
                                                <ListItemText primary="Płatność przy odbiorze" />
                                            </ListItem>
                                        </List>
                                    </Box>
                                    <TextField
                                        multiline
                                        rows={3}
                                        variant="outlined"
                                        fullWidth
                                        label="Komentarz do zamówienia"
                                    />

                                </ShoppingBasketItemWrapper>
                            ))}
                        </Paper>
                    </Grid>
                    <Grid item md = {4} sm = {12} xs={12}>
                        <Paper className={classes.paperStyle} variant="outlined">
                            <Typography variant="h4" paragraph> Podsumowanie:</Typography>
                            <Box display="flex" alignItems="center" justifyContent = "space-between" mb={3}>
                                <Box>
                                    <Typography variant="body2"> Całkowity koszt:</Typography>
                                    <Typography variant="body2"> W tym dostawa:</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="h3" align="right"> {basket.totalPrice} zł </Typography>
                                    <Typography variant = "body2"align="right"> 15.00 zł </Typography>
                                </Box>
                            </Box>
                            <Box mt={5}>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    fullWidth
                                    onClick={()=>history.push(routes.SHOPPINGBASKET)}
                                >
                                    Wróć do koszyka
                                </Button>
                            </Box>
                            <Box mt={1} mb={1}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                >
                                    Kupuję i płacę
                                </Button>
                            </Box>
                            <Typography variant="subtitle2">Klikając ten przycisk potwierdzasz zakup.</Typography>

                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
export default DeliveryAndPayment;
