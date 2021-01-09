import React from "react";
import {
    Drawer,
    Typography,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme=>({
    drawerStyle:{
        top: 64,
        padding:20,
        alignItems:'center',
        height:'calc(100% - 64px)',
        maxWidth:380,
        minWidth:350,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    closeIconPosition:{
        position:'absolute',
        top: 10,
        right:10,
        cursor:'pointer',
    },
    input:{
        display:'none',
    },
    accordionSummary:{
        padding: 0,
    }
}));

const AddOrder =({addOrderIsOpen,handleToggleAddOrder})=>{
    const classes = useStyles();

    return(
        <>
            <Drawer open={addOrderIsOpen} anchor="right" variant="persistent" classes={{paper:classes.drawerStyle}}>
                <CloseIcon className={classes.closeIconPosition} onClick={handleToggleAddOrder}/>
                <Typography variant="h4" paragraph>Dodaj zamówienie:</Typography>

            </Drawer>
        </>
    );

}
export default AddOrder;
