import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Navbar from "../components/Navbar";
import {Box, Button, Container, Divider, Grid, Hidden, Paper, ButtonGroup,useTheme, Typography} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import Rating from "@material-ui/lab/Rating/Rating";
import {NavLink} from "react-router-dom";
import MenuRowCard from "../components/Admin/Menu/MenuRowCard";
import MenuFilters from "../components/Restaurants/MenuFilters";
import MenuCard from "../components/Restaurants/MenuCard";

const useStyles = makeStyles((theme)=>({
    pageBackground: {
        backgroundColor: 'rgba(248,248,248)',
    },
    restaurantJumbotron:{
        [theme.breakpoints.down('xs')]:{
            clipPath: 'ellipse(80% 70% at 50% 30%)',
        },
        clipPath: 'ellipse(60% 70% at 50% 30%)',
        backgroundColor: theme.palette.secondary.dark,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
        padding:theme.spacing(10),
    },
    rating:{
        color:theme.palette.secondary.contrastText
    },
    activeButton:{
        background: theme.palette.primary.main,
        color: theme.palette.secondary.dark,
        '&:hover':{
            color: theme.palette.primary.main,
        }
    }
}));
const SingleRestaurant = () =>{
    const classes = useStyles();
    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));
    return(
        <Box className={classes.pageBackground}>
            <Navbar/>
            <Box className={classes.restaurantJumbotron}>
                <Typography variant = "h3" gutterBottom>Nazwa restauracji</Typography>
                <Typography variant="subtitle2" paragraph>Kuchnia tajska, sushi</Typography>
                <Box style={{cursor:'pointer'}}>
                    <Rating readOnly value={4} className={classes.rating} size="large"/>
                </Box>
                <Box mt={4}>
                    <ButtonGroup variant="text" color="primary" >
                        <Button component={NavLink} to="/menu/id" activeClassName={classes.activeButton} >Menu</Button>
                        <Button  component={NavLink} to="/menu/reservations" activeClassName={classes.activeButton} >Rezerwacje</Button>
                        <Button component={NavLink} to="/menu/contact" activeClassName={classes.activeButton}>Kontakt</Button>
                    </ButtonGroup>
                </Box>
            </Box>
            <Container>
                <Box mt={mdDown ? 5 : 10}/>
                <Grid container spacing={3}>
                    <Grid item md = {3} >
                        <Hidden mdDown>
                            <Box style={{position:'sticky' ,top: 30}}>
                                <MenuFilters/>
                            </Box>
                        </Hidden>
                    </Grid>
                    <Grid item md = {mdDown ? 12 : 9} xs={12}>
                        <MenuCard/>
                        <MenuCard/>
                        <MenuCard/>
                        <MenuCard/>
                        <MenuCard/>
                        <MenuCard/>

                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
export default SingleRestaurant;
