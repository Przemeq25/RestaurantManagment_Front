import React,{useState, useRef} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from "@material-ui/core/MenuItem";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import AdminDrawer from "./AdminDrawer";
import AppLogo from "../../AppLogo";
import {useDispatch, useSelector} from "react-redux";
import {Box,Button, ClickAwayListener, Grow, Hidden, ListItemIcon, MenuList, Paper, Popper} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import {routes} from "../../../config/routes";
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import {logout} from "../../../redux/actions/auth";
import {history} from "../../../helpers/_helpers";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    icon:{
        [theme.breakpoints.up('sm')]:{
            paddingLeft:7
        }
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    spaceBetween:{
        justifyContent:'space-between',
    },
    menuButton: {
        "&:focus, &:active":{
            outline:'none',
        },
        '&:hover':{
            color: theme.palette.secondary.main,
        },
        transition:'color 200ms ease-in'
    },
    menuButtonText:{
        fontWeight:600,
        fontSize:'0.6rem',
    },
    inline:{
        display: 'flex',
        alignItems: 'center',
    },
    logo:{
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),
        [theme.breakpoints.down('sm')]:{
            padding: theme.spacing(1),
        }
    },
    toolbar:theme.mixins.toolbar,
    paperRoot:{
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        borderBottomLeftRadius:theme.spacing(2),
        borderBottomRightRadius:theme.spacing(2),
        overflow:'hidden'
    },
    menuItem:{
        padding: '20px 20px',
        [theme.breakpoints.down('md')]:{
            padding: '12px 12px',
        }
    },
    menuIcon:{
        color : "inherit",
        minWidth:'35px'
    },
    authButton:{
        backgroundColor:theme.palette.secondary.main,
        justifyContent:'center',
        padding: '10px 16px',
        [theme.breakpoints.down('md')]:{
            padding: '5px 8px',
        },
        minHeight:30,

    },
}));

const AdminPanel = ({children,match}) => {
    const classes = useStyles();
    const [isDrawerOpen,setDrawerOpen] = useState(false);
    const [isMenuOpen, setMenuOpen] = React.useState(false);
    const anchorRef = useRef(null);
    const theme = useTheme();
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
    const dispatch = useDispatch();

    const handleDrawerToggle = ()=>{
        setDrawerOpen(!isDrawerOpen);
    };
    const handleMenuToggle = () => {
        setMenuOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setMenuOpen(false);
    };

    const switchTitlePage = (title)=>{
        const splitedTitle = title.split("/")[2] ? title.split("/")[2]: "admin";
        switch(splitedTitle){
            case "admin":
                return "Admin panel";
            case 'dashboard':
                return 'Strona główna';
            case 'menu':
                return 'Menu';
            case 'orders':
                return 'Zamówienia';
            case 'workers':
                return 'Pracownicy';
            case 'reservations':
                return 'Rezerwacje';
            default:
                return 'Strona startowa';
        }
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.spaceBetween}>
                    <div className={classes.inline}>
                        {
                            match.path !== routes.ADMIN_PANEL &&
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerToggle}
                                    edge="start"
                                    className={classes.menuButton}
                                >
                                    <MenuIcon/>
                                </IconButton>
                        }
                        <Typography variant="h6" noWrap>
                            {switchTitlePage(match.path)}
                        </Typography>
                    </div>
                    <Hidden xsDown>
                        <AppLogo color="secondary" push size={12}/>
                    </Hidden>
                    <div>
                        <Button ref={anchorRef}  onClick={handleMenuToggle} color="inherit" disableRipple className={classes.menuButton}>
                            <Box display="flex" alignItems ='center' flexDirection = "column">
                                <PersonOutlineIcon color="inherit"/>
                                <Typography color="inherit" className={classes.menuButtonText}>Twoje konto</Typography>
                            </Box>
                        </Button>
                        <Popper
                            open={isMenuOpen}
                            anchorEl={anchorRef.current}
                            placement="bottom-end"
                            transition
                            disablePortal
                        >
                            {({ TransitionProps }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{ transformOrigin: " right top", transform: window.innerWidth >= theme.breakpoints.width('md') ? 'translate(10px,7px)' : 'translate(16px,0px)' }}
                                >
                                    <Paper square elevation={2} classes={{root: classes.paperRoot}} >
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList autoFocusItem={isMenuOpen} disablePadding>
                                                <MenuItem
                                                    onClick={handleClose}
                                                    component={NavLink}
                                                    to={routes.PROFILE}
                                                    activeClassName={classes.selectedItem}
                                                    className={classes.menuItem}
                                                >
                                                    <ListItemIcon className={classes.menuIcon}>
                                                        <PersonOutlineIcon fontSize="small" />
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
                                                        <AssignmentOutlinedIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    <Typography variant="h5" color = "inherit">Zamówienia</Typography>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={(e)=> {
                                                        handleClose(e);
                                                    }}
                                                    component={NavLink}
                                                    to={routes.ADMIN_PANEL}
                                                    activeClassName={classes.selectedItem}
                                                    className={classes.menuItem}
                                                >
                                                    <ListItemIcon className={classes.menuIcon}>
                                                        <RestaurantIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    <Typography variant="h5" color = "inherit">Twoje restauracje</Typography>
                                                </MenuItem>
                                                {
                                                    isLoggedIn ? (
                                                        <MenuItem
                                                            onClick={(e)=>{
                                                                handleClose(e);
                                                                dispatch(logout());
                                                            }}
                                                            classes={{root:classes.authButton}}
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
                    </div>
                </Toolbar>
            </AppBar>
            {match.path !== routes.ADMIN_PANEL && <AdminDrawer isDrawerOpen={isDrawerOpen} closeDrawer={handleDrawerToggle} match={match}/>}
            <main className={classes.content}>
                <Toolbar />
               {children}
            </main>
        </div>
    );
}
export default AdminPanel;
