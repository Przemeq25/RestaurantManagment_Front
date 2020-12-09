import React from 'react';
import {Box, Divider, Typography, useTheme} from "@material-ui/core";
import AppLogo from "../../AppLogo";
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import {makeStyles} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";

const useStyles = makeStyles(theme=>({
    basketBoxItem:{
        height: 100,
        overflow: 'hidden',
        position: 'relative',
        marginBottom:theme.spacing(1),
    },
    cardMedia: {
        display: 'flex',
        backgroundColor: '#ededed',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
    },
    basketContent:{
        display: "flex",
        alignItems:'center',
        justifyContent:'space-between',
        padding: theme.spacing(1),
        width: '100%',
    },
    buttonActions:{
        cursor:'pointer',
        transition:'all 100ms ease-in-out',
        '&:hover':{
            color: theme.palette.secondary.dark,
        },
        '&:active':{
            transform:'scale(0.95)'
        }
    }
}))

const ShoppingBasketItem = ({product, handleDelete, handleAdd, handleSubtract, amount, price}) =>{
    const classes = useStyles();
    const theme = useTheme();
    const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
    return (
        <Box className={classes.basketBoxItem}>
            <Box display ="flex"  height="100%" >
                <Box className={classes.cardMedia}>
                    <AppLogo size={8}/>
                </Box>
                <Box className={classes.basketContent}>
                    <Box flex="1">
                        <Typography variant="body2" color="primary"> {product}</Typography>
                    </Box>
                    <Box display="flex" alignItems = "center" justifyContent="space-around" flexDirection={xsDown ? "column" : "row"} mr={1} ml={1}>
                        <IndeterminateCheckBoxIcon fontSize={xsDown ? "medium" :"large"} color="secondary" className={classes.buttonActions}/>
                        <AddBoxIcon fontSize={xsDown ? "medium" :"large"} color="secondary" className={classes.buttonActions}/>
                        <Box ml={xsDown ? 0 : 2} mt={xsDown ? 2 : 0}>
                            <DeleteIcon fontSize={xsDown ? "small" :"medium"} color="action" className={classes.buttonActions}/>
                        </Box>
                    </Box>
                    <Divider orientation="vertical"/>
                    <Box ml = {1} minWidth="70px">
                        <Typography variant="body2"> x{amount}</Typography>
                        <Typography variant="h6"> {price} zł</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
export default ShoppingBasketItem;
