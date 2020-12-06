import React from 'react';
import Navbar from "../components/Navbar";
import {Box, Container, Grid, useTheme, Paper,Typography,Button} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import {makeStyles} from "@material-ui/core/styles";

import ShoppingBasketItemWrapper from "../components/Restaurants/ShoppingBasket/ShoppingBasketItemWrapper";
import ShoppingBasketItem from "../components/Restaurants/ShoppingBasket/ShoppingBasketItem";
import {history} from "../helpers/_helpers";
import {routes} from "../config/routes";

const useStyles = makeStyles(theme=>({
    pageBackground:{
        backgroundColor:'rgba(248,248,248)',
        minHeight:'100vh',
    },
    confirmPaper:{
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.1)",
        borderRadius: theme.spacing(2),
        overflow: 'hidden',
        padding:theme.spacing(3),
        position: 'sticky',
        top:30,
    }

}));

const ShoppingBasket = () =>{
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();
    return (
        <Box className={classes.pageBackground}>
            <Navbar/>
            <Container>
                <Box mt={smDown ? 2 : 5} mb={smDown ? 2 : 5}>
                    <Typography variant="h3">Twój koszyk</Typography>
                </Box>
                <Grid container spacing={3}>
                    <Grid item md = {8} sm={12} xs={12}>
                        <ShoppingBasketItemWrapper restaurantName="Restauracja u krzysia">
                            <ShoppingBasketItem product="Frytaski" price="124" amount={2} />
                            <ShoppingBasketItem product="Frytaski321" price="124" amount={5} />
                            <ShoppingBasketItem product="Frytaski321" price="124" amount={23} />

                        </ShoppingBasketItemWrapper>
                        <ShoppingBasketItemWrapper restaurantName="Restauracja u krzysia">
                            <ShoppingBasketItem product="Frytaski" price="124" amount={2} />
                            <ShoppingBasketItem product="Frytaski321" price="124" amount={5} />
                            <ShoppingBasketItem product="Frytaski321" price="124" amount={23} />

                        </ShoppingBasketItemWrapper>
                        <ShoppingBasketItemWrapper restaurantName="Restauracja u krzysia">
                            <ShoppingBasketItem product="Frytaski" price="124" amount={2} />
                            <ShoppingBasketItem product="Frytaski321" price="124" amount={5} />
                            <ShoppingBasketItem product="Frytaski321" price="124" amount={23} />

                        </ShoppingBasketItemWrapper>
                    </Grid>
                    <Grid item md = {4} sm = {12} xs={12}>
                        <Paper className={classes.confirmPaper} variant="outlined">
                            <Box display="flex" alignItems="center" justifyContent = "space-between" mb={3}>
                                <Typography variant="subtitle2"> Całkowity koszt:</Typography>
                                <Box>
                                    <Typography variant="h3"> 150zł </Typography>
                                    <Typography variant = "subtitle2"> + dostawa </Typography>
                                </Box>
                            </Box>
                            <Box m={3}/>
                            <Button
                                variant="contained"
                                color="secondary"
                                fullWidth
                            >
                                Do kasy
                            </Button>
                            <Box m={2}/>
                            <Button
                                variant = "text"
                                color="action"
                                fullWidth
                                onClick={()=>history.push(routes.RESTAURANTS)}
                            >
                                Kontynuuj zakupy
                            </Button>

                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
export default ShoppingBasket;
