import React from 'react';
import {Box, Divider, Typography} from "@material-ui/core";
import AppLogo from "../../AppLogo";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme=>({
    basketPaperStyle: {
        height: 100,
        cursor: 'pointer',
        overflow: 'hidden',
        position: 'relative',
        marginTop:theme.spacing(1),
    },
    cardMedia: {
        display: 'flex',
        backgroundColor: '#ededed',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
    },
    basketPaperContentStyle: {
        display: "flex",
        alignItems:'center',
        justifyContent:'space-between',
        padding: theme.spacing(1),
        width: 300,
    },
}))
const AppBarShoppingBasketItem =({id,amount,totalPrice,unitPrice,name})=>{
    const classes = useStyles();
    return(
        <Box className={classes.basketPaperStyle}>
            <Box display ="flex"  height="100%" >
                <Box className={classes.cardMedia}>
                    <AppLogo size={8}/>
                </Box>
                <Box className={classes.basketPaperContentStyle}>
                    <Box flex="1">
                        <Typography variant="body2" color="primary"> {name}</Typography>
                    </Box>
                    <Divider orientation="vertical"/>
                    <Box ml = {1} minWidth="70px">
                        <Typography variant="body2"> x{amount}</Typography>
                        <Typography variant="h6" paragraph> {totalPrice} zł</Typography>
                        <Divider/>
                        <Typography variant="subtitle2"> 1 szt: <b>{unitPrice} zł</b></Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
export default AppBarShoppingBasketItem;
