import React from 'react';
import {Box, Divider, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme=>({
    basketPaperItem:{
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.1)",
        borderRadius: theme.spacing(2),
        overflow: 'hidden',
        position: 'relative',
        padding:theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
    textButton:{
        cursor:'pointer',
        textDecoration:'underline',
        color:theme.palette.secondary.main,
    },
}))

const ShoppingBasketItemWrapper = ({children,restaurantName})=>{
    const classes = useStyles();
    return(
        <Paper className={classes.basketPaperItem} variant="outlined">
            <Typography variant="body2" display = "inline">Restauracja: </Typography>
            <Typography
                variant="button"
                display = "inline"
                classes={{button:classes.textButton}}
            >
                {restaurantName}
            </Typography>
            <Box mt={1} mb={2}>
                <Divider />
            </Box>
            {children}
        </Paper>
    )
}
export default ShoppingBasketItemWrapper;
