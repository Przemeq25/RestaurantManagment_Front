import React from 'react';
import {Box, Divider, Typography, useTheme,IconButton} from "@material-ui/core";
import AppLogo from "../../AppLogo";
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import {makeStyles} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import {isValidUrl} from "../../../helpers/_helpers";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme=>({
    basketBoxItem:{
        height: 100,
        overflow: 'hidden',
        position: 'relative',
        margin:`${theme.spacing(1)}px 0px`
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
        flex:'auto',
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
    },
    avatar:{
        minHeight: "100%",
        minWidth:'100%'
    }
}))

const ShoppingBasketItem = ({id,name,image, handleDeleteProduct, handleIncrementProduct, handleDecrementProduct, amount, unitPrice,totalPrice}) =>{
    const classes = useStyles();
    const theme = useTheme();
    const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
    return (
        <Box className={classes.basketBoxItem}>
            <Box display ="flex"  height="100%" >
                <Box className={classes.cardMedia}>
                    {isValidUrl(image) ?
                        <Avatar variant="rounded" src={image} className={classes.avatar} />
                        :
                        <AppLogo size={8}/>
                    }
                </Box>
                <Box className={classes.basketContent}>
                    <Box flex="1">
                        <Typography variant="body2" color="primary"> {name}</Typography>
                    </Box>
                    {handleIncrementProduct && handleDecrementProduct && handleDeleteProduct && (
                        <Box display="flex" alignItems = "center" justifyContent="space-around" flexDirection={xsDown ? "column" : "row"} mr={1} ml={1}>
                            <IconButton
                                size="small"
                                onClick={()=>handleDecrementProduct(id)}
                                disabled={amount <= 1}
                                color="secondary"
                            >
                                <IndeterminateCheckBoxIcon
                                    fontSize={xsDown ? "default" :"large"}
                                    color="inherit"
                                    className={classes.buttonActions}
                                />
                            </IconButton>
                            <IconButton
                                size="small"
                                onClick={()=>handleIncrementProduct(id)}
                                color="secondary"
                            >
                                <AddBoxIcon
                                    fontSize={xsDown ? "default" :"large"}
                                    color="inherit"
                                    className={classes.buttonActions}
                                />
                            </IconButton>
                            <Box ml={xsDown ? 0 : 2} mt={xsDown ? 2 : 0}>
                                <DeleteIcon fontSize={xsDown ? "small" :"default"} color="action" className={classes.buttonActions} onClick={()=>handleDeleteProduct(id)}/>
                            </Box>
                        </Box>
                    )}
                    <Divider orientation="vertical"/>
                    <Box ml = {1} minWidth={xsDown ? "50px" : "70px"}>
                        <Typography variant="body2"> x{amount}</Typography>
                        <Typography variant="h6" paragraph> {totalPrice.toFixed(2)} zł</Typography>
                        <Divider/>
                        <Typography variant="subtitle2"> 1 szt: <b>{unitPrice.toFixed(2)} zł</b></Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
export default ShoppingBasketItem;
