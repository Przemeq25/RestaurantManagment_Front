import React from "react";
import {
    AppBar,
    Toolbar,
    Box,
    IconButton,
    Paper,
    MenuList,
    MenuItem,
    Popper,
    Grow,
    ClickAwayListener,
    ListItemIcon,
    Typography,
    useTheme,
    Divider
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AppLogo from "./AppLogo";
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {NavLink} from "react-router-dom";
import {routes} from "../config/routes";
import AssignmentIcon from '@material-ui/icons/Assignment';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import {useSelector,useDispatch} from "react-redux";
import {history} from "../helpers/_helpers";
import {logout} from '../redux/actions/auth';

const useStyles = makeStyles(theme=>({
    toolbarStyle:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
    },
    paperRoot:{
        backgroundColor:theme.palette.secondary.main,
        color:theme.palette.secondary.contrastText,
    },
    menuIcon:{
        color : "inherit",
        minWidth:'35px'
    },
    selectedItem:{
        backgroundColor: theme.palette.action.selected,
        color:theme.palette.secondary.dark,

    },
    menuItem:{
        padding: '12px 16px',
        [theme.breakpoints.down('md')]:{
            padding: '12px 12px',
        }

    },
    authButton:{
        backgroundColor:theme.palette.primary.main,
        justifyContent:'center',
        padding: '10px 16px',
        [theme.breakpoints.down('md')]:{
            padding: '12px 8px',
        },

    },
    growStyle:{
        transformOrigin: " right top",
        transform: 'translate(10px,9px)'
    }
}));

const Navbar = () =>{
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
    const userType = useSelector(state=>state.auth.userType)
    const dispatch = useDispatch();


    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    return(
        <AppBar position="static" color="secondary" elevation={2}>
            <Toolbar className={classes.toolbarStyle}>
                <AppLogo/>
                <Box>
                    <IconButton
                        color="inherit"
                    >
                        <ShoppingBasketIcon />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        ref={anchorRef}
                        aria-haspopup="true"
                        onClick={handleToggle}
                    >
                        <AccountCircle />
                    </IconButton>
                    <Popper open={open} anchorEl={anchorRef.current}  placement="bottom-end" transition disablePortal>
                        {({ TransitionProps }) => (
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: " right top", transform: window.innerWidth >= theme.breakpoints.width('md') ? 'translate(10px,9px)' : 'translate(16px,5px)' }}
                            >
                                <Paper square elevation={2} classes={{root: classes.paperRoot}} >
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList autoFocusItem={open} disablePadding>
                                            <MenuItem
                                                onClick={handleClose}
                                                component={NavLink}
                                                to={routes.PROFILE}
                                                activeClassName={classes.selectedItem}
                                                className={classes.menuItem}
                                            >
                                                <ListItemIcon className={classes.menuIcon}>
                                                <AccountCircle fontSize="small" />
                                            </ListItemIcon>
                                                <Typography variant="h5" color = "inherit">Twoje konto</Typography>
                                            </MenuItem>
                                            <MenuItem
                                                onClick={handleClose}
                                                component={NavLink}
                                                to={routes.CLIENT_ORDERS}
                                                activeClassName={classes.selectedItem}
                                                className={classes.menuItem}
                                            >
                                                <ListItemIcon className={classes.menuIcon}>
                                                    <AssignmentIcon fontSize="small" />
                                                </ListItemIcon>
                                                <Typography variant="h5" color = "inherit">Zamówienia</Typography>
                                            </MenuItem>
                                            {
                                                isLoggedIn && (userType === "OWNER" || userType === "WORKER") ? (
                                                    <MenuItem
                                                        onClick={handleClose}
                                                        component={NavLink}
                                                        to={routes.ADMIN_PANEL}
                                                        activeClassName={classes.selectedItem}
                                                        className={classes.menuItem}
                                                    >
                                                        <ListItemIcon className={classes.menuIcon}>
                                                            <RestaurantIcon fontSize="small" />
                                                        </ListItemIcon>
                                                        <Typography variant="h5" color = "inherit">Admin panel</Typography>
                                                    </MenuItem>
                                                ):null
                                            }
                                            <Divider/>
                                            {
                                                isLoggedIn ? (
                                                    <MenuItem
                                                        onClick={(e)=>{
                                                            handleClose(e);
                                                            dispatch(logout());
                                                        }}
                                                        className={classes.authButton}
                                                    >
                                                        <Typography variant="h5" color = "inherit">Wyloguj się</Typography>
                                                    </MenuItem>
                                                ):(
                                                    <MenuItem
                                                        onClick={(e)=>{
                                                            handleClose(e);
                                                            history.push(routes.LOGIN)
                                                        }}
                                                        className={classes.authButton}
                                                    >

                                                        <Typography variant="h5" color = "inherit">Zaloguj się</Typography>
                                                    </MenuItem>
                                                )
                                            }

                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>

                </Box>
            </Toolbar>
        </AppBar>
    )
}
export default Navbar;
