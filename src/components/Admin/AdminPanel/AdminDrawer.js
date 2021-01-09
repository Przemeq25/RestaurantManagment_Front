import React from "react";
import clsx from "clsx";
import {List,ListItem, Typography,ListItemIcon,ListItemText,Drawer} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DashboardIcon from '@material-ui/icons/Dashboard';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PeopleIcon from '@material-ui/icons/People';
import {makeStyles} from "@material-ui/core/styles";
import {Desktop, Mobile} from "../../../helpers/_helpers";
import {routes} from "../../../config/routes";
import SettingsIcon from '@material-ui/icons/Settings';
import AppLogo from "../../AppLogo";



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        backgroundColor:'#ededed',
        color:theme.palette.text.disabled,
        //boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",

    },
    icon:{
        width: open=> !open.isDrawerOpen && '100%',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'center',

    },
    drawerOpen: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(11) ,
    },
    toolbar:theme.mixins.toolbar,
    logo:{
        backgroundColor:'var(--admin-first-color)',
        padding:theme.spacing(2),
    },
    iconText:{
        fontWeight:600,
        fontSize:'0.6rem'
    },
    drawerMobile:{
        width:300,
    }
}));

const AdminDrawer = ({isDrawerOpen,closeDrawer,match}) =>{
    const classes = useStyles({isDrawerOpen:isDrawerOpen});
    const restaurantId = match.params.restaurantId;
    const drawerList = ()=> {
        return (
            <List>
                <ListItem disableGutters button component={NavLink} to={`${routes.RESTAURANT_DASHBOARD}/${restaurantId}`} activeClassName="Mui-selected">
                    <ListItemIcon className={classes.icon}>
                        <DashboardIcon/>
                        <Desktop>
                            {!isDrawerOpen && <Typography className={classes.iconText}>GŁÓWNA</Typography>}
                        </Desktop>
                    </ListItemIcon>
                    <ListItemText>Strona startowa</ListItemText>
                </ListItem>
                <ListItem disableGutters button component={NavLink} to={`${routes.RESTAURANT_MENU}/${restaurantId}`} activeClassName="Mui-selected">
                    <ListItemIcon className={classes.icon}>
                        <MenuBookIcon/>
                        <Desktop>
                            {!isDrawerOpen && <Typography className={classes.iconText}>MENU</Typography>}
                        </Desktop>
                    </ListItemIcon>
                    <ListItemText>Menu</ListItemText>
                </ListItem>
                <ListItem disableGutters button component={NavLink} to={`${routes.RESTAURANT_ORDERS}/${restaurantId}`} activeClassName="Mui-selected">
                    <ListItemIcon className={classes.icon}>
                        <RestaurantMenuIcon/>
                        <Desktop>
                            {!isDrawerOpen && <Typography className={classes.iconText}>ZAMÓWIENIA</Typography>}
                        </Desktop>
                    </ListItemIcon>
                    <ListItemText>Zamówienia</ListItemText>
                </ListItem>
                <ListItem disableGutters button component={NavLink} to={`${routes.RESTAURANT_RESERVATION}/${restaurantId}`} activeClassName="Mui-selected">
                    <ListItemIcon className={classes.icon}>
                        <AssignmentIcon/>
                        <Desktop>
                            {!isDrawerOpen && <Typography className={classes.iconText}>REZERWACJE</Typography>}
                        </Desktop>
                    </ListItemIcon>
                    <ListItemText>Rezerwacje</ListItemText>
                </ListItem>
                <ListItem disableGutters button component={NavLink} to={`${routes.SINGLERESTAURANTMENU}/${restaurantId}`} activeClassName="Mui-selected">
                    <ListItemIcon className={classes.icon}>
                        <VisibilityIcon/>
                        <Desktop>
                            {!isDrawerOpen && <Typography className={classes.iconText}>PODGLĄD</Typography>}
                        </Desktop>
                    </ListItemIcon>
                    <ListItemText>Podgląd</ListItemText>
                </ListItem>
                <ListItem disableGutters button component={NavLink} to={`${routes.RESTAURANT_WORKERS}/${restaurantId}`} activeClassName="Mui-selected">
                    <ListItemIcon className={classes.icon}>
                        <PeopleIcon/>
                        <Desktop>
                            {!isDrawerOpen && <Typography className={classes.iconText}>PRACOWNICY</Typography>}
                        </Desktop>
                    </ListItemIcon>
                    <ListItemText>Pracownicy</ListItemText>
                </ListItem>
                <ListItem disableGutters button component={NavLink} to={`${routes.RESTAURANT_EDIT}/${restaurantId}`} activeClassName="Mui-selected">
                    <ListItemIcon className={classes.icon}>
                        <SettingsIcon/>
                        <Desktop>
                            {!isDrawerOpen && <Typography className={classes.iconText}>EDYTUJ</Typography>}
                        </Desktop>
                    </ListItemIcon>
                    <ListItemText>Edytuj</ListItemText>
                </ListItem>
            </List>
        )
    }


    return(
        <>
            <Desktop>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: isDrawerOpen,
                        [classes.drawerClose]: !isDrawerOpen,
                    })}
                    classes={{
                        paper: clsx(classes.drawer,{
                            [classes.drawerOpen]: isDrawerOpen,
                            [classes.drawerClose]: !isDrawerOpen,
                        }),
                    }}
                >
                    <div className={classes.toolbar}/>
                    {drawerList()}
                </Drawer>
            </Desktop>
            <Mobile>
                <Drawer
                    variant="temporary"
                    open={isDrawerOpen}
                    onClose={closeDrawer}
                    classes={{paperAnchorLeft:classes.drawerMobile}}
                >
                    <div className={classes.logo}>
                        <AppLogo push color="secondary" size={12}/>
                    </div>
                    {drawerList()}
                </Drawer>
            </Mobile>
    </>
    );
}
export default AdminDrawer;
