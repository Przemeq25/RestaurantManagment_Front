import React from "react";
import {Box, Divider, Slide, Paper, Typography} from "@material-ui/core";
import AppLogo from "../AppLogo";
import Rating from "@material-ui/lab/Rating/Rating";
import {makeStyles} from "@material-ui/core/styles";
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
import {getCuisineTypeValue, history} from "../../helpers/_helpers";
import {routes} from "../../config/routes";

const useStyles = makeStyles((theme)=>({
    restaurantsPaperStyle: {
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.1)",
        borderRadius: theme.spacing(2),
        "&:hover": {
            boxShadow: "-1px 10px 29px 0px rgba(0,0,0,0.2)"
        },
        height: 200,
        cursor: 'pointer',
        marginBottom: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            height: 120,
        },
        overflow: 'hidden',
    },
    cardMedia: {
        display: 'flex',
        backgroundColor: '#ededed',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        [theme.breakpoints.down('xs')]: {
            maxWidth: 120,
            height: 120,
        },
    },
    restaurantsPaperContentStyle: {
        display: "flex",
        flexDirection: "column",
        alignItems:"space-between",
        padding: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            padding: `${theme.spacing(1)}px ${theme.spacing(1)}px 3px`,
        },
    },
    iconPadding:{
        paddingRight:'3px',
    },
    contactBox:{
        display:'flex',
        marginTop:theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            marginTop:'3px',
        },
    }
}));
const RestaurantCard = ({name,category,phoneNumber,street,city,houseNumber,id,rate}) =>{
    const classes = useStyles();
    return (
        <Slide in={true} direction="left" timeout={300}>
        <Paper className={classes.restaurantsPaperStyle} variant="outlined" onClick={()=>history.push(`${routes.SINGLERESTAURANTMENU}/${id}`)}>
            <Box display ="flex"  height="100%" >
                <Box className={classes.cardMedia}>
                    <AppLogo size={12}/>
                </Box>
                <Divider orientation='vertical'/>
                <Box className={classes.restaurantsPaperContentStyle}>
                    <Box flex="1">
                        <Typography variant="h4" color="primary">{name}</Typography>
                        <Typography variant="subtitle2" gutterBottom>{getCuisineTypeValue(category).map(e => e.label).join(", ")}</Typography>
                        <Rating readOnly value={rate ? Number(rate) : 0} size="small"/>
                    </Box>
                    <Divider/>
                    <Box className={classes.contactBox}>
                        <Box mr={1} display="flex" alignItems="center">
                            <HomeIcon fontSize="small" className={classes.iconPadding}/>
                            <Typography variant="subtitle2">{city} - {street} {houseNumber}</Typography>
                        </Box>
                        <Box mr={1} display="flex" alignItems="center">
                            <PhoneIcon fontSize="small" className={classes.iconPadding}/>
                            <Typography variant="subtitle2">{phoneNumber}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Paper>
        </Slide>
    )
}
export default RestaurantCard;
