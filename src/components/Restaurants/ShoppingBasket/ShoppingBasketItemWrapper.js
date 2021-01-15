import React from 'react';
import {Box, Divider, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {history} from "../../../helpers/_helpers";
import {routes} from "../../../config/routes";

const useStyles = makeStyles(theme=>({
    basketPaperItem:{
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.1)",
        borderRadius: theme.spacing(2),
        overflow: 'hidden',
        position: 'relative',
        padding:theme.spacing(2),
        marginBottom: theme.spacing(1),
        [theme.breakpoints.down('xs')]:{
            padding:theme.spacing(1),
        }
    },
    textButton:{
        cursor:'pointer',
        textDecoration:'underline',
        color:theme.palette.secondary.main,
    },
    titleBar:{
        marginTop:theme.spacing(1),
        marginBottom:theme.spacing(2),
        [theme.breakpoints.down('xs')]:{
            marginBottom:theme.spacing(1),
            marginTop:theme.spacing(0),
        }
    }
}))

const ShoppingBasketItemWrapper = ({children,restaurantName,restaurantId})=>{
    const classes = useStyles();
    return(
        <Paper className={classes.basketPaperItem} variant="outlined">
            <Typography variant="body2" display = "inline">Restauracja: </Typography>
            <Typography
                variant="button"
                display = "inline"
                classes={{button:classes.textButton}}
                onClick={()=>history.push(`${routes.SINGLERESTAURANTMENU}/${restaurantId}`)}
            >
                {restaurantName}
            </Typography>
            <Box className={classes.titleBar}>
                <Divider />
            </Box>
            {children}
        </Paper>
    )
}
export default ShoppingBasketItemWrapper;
