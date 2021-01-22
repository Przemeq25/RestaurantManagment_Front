import React, {useEffect} from "react";
import {
    Typography,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Fab,
    Backdrop,
    CircularProgress,
    Divider,
    CardActions,
    Button,
    Chip,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Grow
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import {getAdminType, toLocalTime, worksTimeDaysTranslate} from '../../helpers/_helpers';
import AddRestaurantStepper from "../../components/Admin/AddRestaurant/AddRestaurantStepper";
import {useDispatch, useSelector} from "react-redux";
import {
    openAddRestaurantStepper,
    closeAddRestaurantStepper,
    selectRestaurant, unselectRestaurant, getOpeningHours, getRestaurantForEmploee, setUserRole
} from "../../redux/actions/restaurant";
import PhoneIcon from '@material-ui/icons/Phone';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AppLogo from "../../components/AppLogo";
import AdminPanel from "../../components/Admin/AdminPanel/AdminPanel";

const useStyles = makeStyles(theme=>({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    progressPosition:{
        height:'calc(100vh - 115px)',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    },
    cardChecked:{
            border: `5px solid ${theme.palette.secondary.main}`
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    card:{
        position:'relative',
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        },
        borderRadius:theme.spacing(2),
        maxWidth:450,
        width: '100%',
    },
    cardChip:{
        position:'absolute',
        top: theme.spacing(2),
        left: theme.spacing(2),
        textTransform: 'uppercase',
    },
    accordion:{
        width:'100%',
    },
    accordionSummary:{
        padding:`0px ${theme.spacing(1)}px`
    }
}));

const AdminDashboard = ({match}) =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const isDialogOpen = useSelector(state=>state.restaurant.isStepperOpen);
    const isLoading = useSelector(state=>state.auth.isLoading);
    const isRequesting = useSelector(state=>state.restaurant.isRequesting);
    const userType = useSelector(state=>state.auth.userType);
    const restaurants = useSelector(state=>state.restaurant.restaurants);

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(()=>{
        if(!restaurants.length){
            for(let i = 0; i< userType.length; i++){
                dispatch(getRestaurantForEmploee(userType[i].id));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch])

    useEffect(()=>{
        dispatch(unselectRestaurant())
    },[dispatch])

    const handleToggleDialog=()=>{
        isDialogOpen ? dispatch(closeAddRestaurantStepper()): dispatch(openAddRestaurantStepper()) ;
    }

    return(
        <AdminPanel match={match}>
        <Typography variant="h3">Twoje restauracje:</Typography>
        <Typography variant="subtitle2" paragraph >Kliknij w kartę i zarządzaj wybraną restauracją!</Typography>
            {(isLoading || isRequesting) && !isDialogOpen ? (
                <Backdrop open={isLoading || isRequesting} invisible>
                    <CircularProgress color="inherit" />
                </Backdrop>
            ):(
                <>
                    <AddRestaurantStepper isDialogOpen={isDialogOpen} setDialogOpen={handleToggleDialog} firstRegister={Boolean(userType && userType.length <= 0)}/>
                    <Grid container spacing={2} alignItems="flex-start">
                        {restaurants.length ? restaurants.map(restaurant=>(
                            <Grow in = {Boolean(restaurants.length > 0)} key={restaurant.id}>
                            <Grid container item xs={12} sm = {6} md = {6} lg = {4} xl = {3} key={restaurant.id}>
                                <Card className={classes.card}>
                                    <CardActionArea onClick={()=>{
                                        const userRole = userType.find(role=>restaurant.id === role.id).role;
                                        dispatch(selectRestaurant(restaurant,userRole));
                                        dispatch(setUserRole(userRole,restaurant.id))
                                    }}>
                                        <Chip
                                            label={ userType && getAdminType(userType,restaurant.id) }
                                            color="primary"
                                            className={classes.cardChip}
                                        />
                                        {restaurant.image ?
                                            <CardMedia
                                                component="img"
                                                alt="Logo"
                                                height="200"
                                                image={restaurant.image}
                                            />
                                            :
                                            <Box height="200px" width="100%" display="flex" alignItems="center" justifyContent="center">
                                                <AppLogo color="secondary"/>
                                            </Box>
                                        }
                                        <CardContent>

                                            <Typography
                                                className={"MuiTypography--heading"}
                                                variant={"h6"}
                                                gutterBottom
                                            >
                                                {restaurant.name}
                                            </Typography>
                                            <Typography
                                                className={"MuiTypography--subheading"}
                                                variant={"caption"}
                                                paragraph
                                            >
                                                {restaurant.description}
                                            </Typography>
                                            <Divider light />
                                            <Box display = "flex" alignItems = "center" justifyContent = "space-between" mt={2}>
                                                <Box display ="flex" flexDirection = "column" >
                                                    <Typography
                                                        className={"MuiTypography--subheading"}
                                                        variant={"caption"}
                                                        gutterBottom
                                                    >
                                                        {restaurant.city}
                                                    </Typography>
                                                    <Typography
                                                        className={"MuiTypography--subheading"}
                                                        variant={"caption"}
                                                        gutterBottom
                                                    >
                                                        {restaurant.postCode}
                                                    </Typography>
                                                    <Box display="flex" alignItems ="center">
                                                        <Typography
                                                            className={"MuiTypography--subheading"}
                                                            variant={"caption"}
                                                        >
                                                            {restaurant.street}
                                                        </Typography>

                                                        <Typography
                                                            className={"MuiTypography--subheading"}
                                                            variant={"caption"}
                                                        >
                                                            {restaurant.houseNumber}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Box height="100%" display="flex" alignItems="center">
                                                    <PhoneIcon/>
                                                    <Box mr={1}/>
                                                    <Typography
                                                        className={"MuiTypography--body1"}
                                                        variant="body1"
                                                    >
                                                        {restaurant.phoneNumber}
                                                    </Typography>
                                                </Box>
                                            </Box>

                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Accordion elevation={0} classes={{root:classes.accordion}} expanded={expanded === restaurant.id} onChange={handleChange(restaurant.id)}>
                                            <AccordionSummary classes={{root:classes.accordionSummary}}
                                                          aria-controls={restaurant.id}
                                                          id={restaurant.id}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    startIcon={<CalendarTodayIcon/>}
                                                    onClick={()=>{
                                                        if(!restaurant.worksTime){
                                                            dispatch(getOpeningHours(restaurant.id))
                                                        }
                                                    }}
                                                >
                                                    Godziny otwarcia
                                                </Button>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Box display = 'flex' justifyContent = "center" width="100%">
                                                    <Table size="small">
                                                        <TableBody>
                                                            {(restaurant.worksTime &&  restaurant.worksTime) ? restaurant.worksTime.map((row) => (
                                                                <TableRow key={row.day}>
                                                                    <TableCell>
                                                                        {worksTimeDaysTranslate(row.day)}
                                                                    </TableCell>
                                                                    <TableCell align="right">{row.from ? toLocalTime(row.from) : "Zamknięte"}</TableCell>
                                                                    <TableCell align="right">{row.to ? toLocalTime(row.to) : "Zamknięte"}</TableCell>
                                                                </TableRow>
                                                            )):null}
                                                        </TableBody>
                                                    </Table>
                                                    {!restaurant.worksTime &&
                                                        <CircularProgress color="secondary"/>
                                                    }
                                                </Box>
                                            </AccordionDetails>
                                        </Accordion>
                                    </CardActions>
                                </Card>
                            </Grid>
                            </Grow>
                        )): null}


                    </Grid>
                </>
            )}
            <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleToggleDialog} variant = "extended" size="small">
                <AddIcon className={classes.extendedIcon}/>
                Dodaj restaurację
            </Fab>
        </AdminPanel>
    );

}
export default AdminDashboard;
