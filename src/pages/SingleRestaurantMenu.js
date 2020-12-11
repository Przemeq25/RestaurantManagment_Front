import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box, Button,Grid, Hidden, Paper, useTheme, Typography} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import MenuFilters from "../components/Restaurants/MenuFilters";
import MenuCard from "../components/Restaurants/MenuCard";
import Search from "../components/Search";
import ShortTextIcon from '@material-ui/icons/ShortText';
import MobileFiltersDialog from "../components/Restaurants/MobileFiltersDialog";
import Jumbotron from "../components/Jumbotron";

const useStyles = makeStyles((theme)=>({
    filtersBoxStyle:{
        [theme.breakpoints.down('md')]: {
            display :"flex" ,
            justifyContent :"space-between",
            alignItems :"center" ,
        },
    },
    filtersPaperStyle:{
        padding:theme.spacing(1),
        borderRadius:theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            padding:theme.spacing(1),
        },
        marginBottom:theme.spacing(3),
    },
    categoryPaperStyle:{
        padding:`${theme.spacing(1)}px ${theme.spacing(2)}px` ,
        borderRadius:theme.spacing(2),
        margin:`${theme.spacing(3)}px 0`,
        backgroundColor:theme.palette.secondary.dark,
    }
}));
const SingleRestaurantMenu = ({restaurant}) =>{
    const classes = useStyles();
    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));
    const [isToggleFiltersDialogOpen, setToggleFiltersDialogOpen] = useState(false);


    const handleToggleFiltersDialog = () =>{
        setToggleFiltersDialogOpen(!isToggleFiltersDialogOpen);
    }

    return(
        <>
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
                   <Paper className={classes.filtersPaperStyle} variant="outlined">
                       <Box className={classes.filtersBoxStyle}>
                           <Search width={'100%'}/>
                           <Box display="flex"  width="100%" justifyContent="flex-end" flex="2" ml={1}>
                               <Hidden lgUp>
                                   <Box mr={1}>
                                       <Button variant="contained" color="secondary" size="small" startIcon={<ShortTextIcon/>} onClick={handleToggleFiltersDialog}>
                                           Filtry
                                       </Button>
                                   </Box>
                               </Hidden>
                           </Box>
                       </Box>
                   </Paper>
                   <Paper className={classes.categoryPaperStyle} variant="outlined">
                       <Typography variant="h4">Kebaby</Typography>
                   </Paper>
                   {restaurant && restaurant.meals ? restaurant.meals.map(meal =>(
                       <MenuCard {...meal} key={meal.id}/>
                   )):(
                       <Jumbotron size={40} text="Brak posiłków"/>
                   )}

               </Grid>
           </Grid>
            <MobileFiltersDialog
                isToggleFiltersDialogOpen={isToggleFiltersDialogOpen}
                handleToggleFiltersDialog={handleToggleFiltersDialog}
            >
            <MenuFilters/>
            </MobileFiltersDialog>
        </>
    )
}
export default SingleRestaurantMenu;
