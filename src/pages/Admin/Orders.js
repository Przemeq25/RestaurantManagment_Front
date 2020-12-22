import React, {useEffect, useState} from "react";
import {BottomNavigation, BottomNavigationAction, Typography, Box, Fab,Hidden} from "@material-ui/core";
import {makeStyles,withStyles} from "@material-ui/core/styles";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import OrderRow from "../../components/Admin/Orders/OrderRow";
import Search from "../../components/Search";
import AddIcon from "@material-ui/icons/Add";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles(theme=>({
    root: {
        position:'fixed',
        [theme.breakpoints.up('md')]:{
            height:'auto',
            top:'50%',
            right:0,
            transform:'translate(0,-50%)',
            flexDirection:'column',
            background:'transparent',
        },
        [theme.breakpoints.down('sm')]:{
            bottom:'0',
            right:'50%',
            transform:'translate(50%,0)',
            background:'#ebebeb',
            width:'100%',

        },
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        [theme.breakpoints.down('sm')]:{
            bottom: theme.spacing(7),
        }
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
        ordersContainerPadding:{
            [theme.breakpoints.down("sm")]:{
                paddingBottom:60
            }
        },

}));
const MyBottomNavigationAction = withStyles(theme=>({
    root: {
        [theme.breakpoints.down('sm')]:{
          padding:'6px 0px 8px',
        },
        color: theme.palette.primary.main,
        "&.Mui-selected": {
            color: theme.palette.secondary.main,
            transform:'translateX(-10px)',
            transition: 'all 200ms ease-in-out',
                [theme.breakpoints.down('sm')]:{
                    transform:'translateX(0px)',
                    width:130,
                    transition: 'all 200ms ease-in-out',
                }
        },
        '&:focus':{
            outline: 'none'
        }
    }
}))(BottomNavigationAction);

const Orders = () =>{
    const [value, setValue] = React.useState('active');
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return(
        <>
            <div className={classes.ordersContainerPadding}>
                <Box display = "flex" justifyContent="space-between">
                    <Typography variant="h3">Zamówienia:</Typography>
                    <Search/>
                </Box>
                <Typography variant="subtitle2" paragraph >Przejmij kontrolę nad zamówieniami!</Typography>

                <OrderRow number="242" time="50" title="Polędwica w sosie własnym, frytki"/>
                <OrderRow number="243" time="20" title="Kotlet schabowy, ziemniaki, surówka"/>
                <BottomNavigation
                    showLabels
                    classes={{root:classes.root}}
                    value={value}
                    onChange={handleChange}
                >
                    <MyBottomNavigationAction label="Aktywne" value="active" icon={<MenuBookIcon/>} />
                    <MyBottomNavigationAction label="W dostawie" value="delivery" icon={<DirectionsCarIcon />} />
                    <MyBottomNavigationAction label="Zrealizowane" value="completed" icon={<CheckCircleOutlineIcon />} />
                    <Hidden mdUp>
                        <MyBottomNavigationAction label="Dodaj zamówienie" value="addorder" icon={<AddCircleOutlineIcon />} showLabel/>
                    </Hidden>
                </BottomNavigation>

            </div>
            <Hidden smDown>
                <Fab color="primary" aria-label="add" variant = "extended" className={classes.fab}>
                    <AddIcon className={classes.extendedIcon}/>
                Dodaj zamówienie
                </Fab>
            </Hidden>
        </>
    )
};
export default Orders;
