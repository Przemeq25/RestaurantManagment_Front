import React,{useState, useRef} from "react";
import {
    AppBar,
    Toolbar,
    Box,
    Paper,
    MenuList,
    MenuItem,
    Popper,
    Grow,
    ClickAwayListener,
    ListItemIcon,
    Typography,
    useTheme,
    Divider,
    Button,
    Badge,
    Container, IconButton
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AppLogo from "./AppLogo";
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import {NavLink} from "react-router-dom";
import {routes} from "../config/routes";
import RestaurantIcon from '@material-ui/icons/Restaurant';
import {useSelector,useDispatch} from "react-redux";
import {history} from "../helpers/_helpers";
import {logout} from '../redux/actions/auth';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import AppBarShoppingBasketItem from "./Restaurants/ShoppingBasket/AppBarShoppingBasketItem";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";

const useStyles = makeStyles(theme=>({
    toolbarStyle:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
    },
    paperRoot:{
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        borderBottomLeftRadius:theme.spacing(2),
        borderBottomRightRadius:theme.spacing(2),
        overflow:'hidden',

    },
    selectedItem:{
        color:theme.palette.primary.main,

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
    growStyle:{
        transformOrigin: " right top",
        transform: 'translate(10px,9px)'
    },
    menuButton: {
        "&:focus, &:active":{
            outline:'none',
        },
        '&:hover':{
            color: theme.palette.primary.main,
            backgroundColor:'transparent',
        },
        transition:'color 200ms ease-in'
    },
    menuButtonText:{
        fontWeight:600,
        fontSize:'0.6rem',
    },
}));

const Navbar = () =>{
    const classes = useStyles();
    const theme = useTheme();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isBasketOpen, setBasketOpen] = useState(false);
    const anchorRef = useRef(null);
    const shoppingBasketRef = useRef(null);
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));


    const handleToggleMenu = (e) => {
        setMenuOpen((prevOpen) => !prevOpen);
        handleCloseBasket(e)
    };

    const handleCloseMenu = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setMenuOpen(false);
    };

    const handleToggleBasket = (e) =>{
        setBasketOpen(prev=>!prev)
        handleCloseMenu(e)
    };


    const handleCloseBasket = (event) =>{
        if (shoppingBasketRef.current && shoppingBasketRef.current.contains(event.target)) {
            return;
        }
        setBasketOpen(false);
    }
    return(
        <AppBar position="relative" color="secondary" elevation={2} >
            <Container>
                <Toolbar className={classes.toolbarStyle} disableGutters>
                    <AppLogo push size={12}/>
                    <Box>
                        <Button
                            ref={shoppingBasketRef}
                            onMouseEnter={(e)=>mdUp ? handleToggleBasket(e)  : function () {
                                return undefined
                            } }
                            onClick={()=>history.push(routes.SHOPPINGBASKET)}
                            color="inherit"
                            disableRipple
                            className={classes.menuButton}
                        >
                            <Box display="flex" alignItems ='center' flexDirection = "column">
                                <Badge
                                    color="primary"
                                    badgeContent={0}
                                    variant="dot"
                                >
                                    <ShoppingCartOutlinedIcon color="inherit"/>
                                </Badge>
                                <Typography color="inherit" className={classes.menuButtonText}>Koszyk</Typography>
                            </Box>
                        </Button>
                        <Popper
                            onMouseLeave={handleCloseBasket}
                            open={isBasketOpen}
                            anchorEl={shoppingBasketRef.current}
                            placement="bottom-end"
                            transition
                            disablePortal
                            style={{zIndex:100}}
                        >
                            {({ TransitionProps }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{ zIndex:100, transformOrigin: " right top", transform: window.innerWidth >= theme.breakpoints.width('md') ? 'translate(10px,9px)' : 'translate(16px,5px)' }}
                                >
                                    <Paper square elevation={2} classes={{root: classes.paperRoot}} >
                                        <Box p={2} zIndex="100">
                                            {/*  <Box display ='flex' alignItems = 'center' flexDirection ="column" p={6} zIndex="100">
                                            <Typography
                                                variant="h4"
                                                color="primary"
                                                gutterBottom
                                            >
                                                Twój koszyk jest pusty
                                            </Typography>
                                            <Typography
                                                variant="subtitle2"
                                                color="primary"
                                                paragraph
                                            >
                                                Szukasz restauracji?
                                            </Typography>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={()=>history.push(routes.RESTAURANTS)}
                                            >
                                                Przejdź do restauracji
                                            </Button>
                                            */}
                                            <Box display="flex" alignItems ="center" justifyContent="space-between" pb={2}>
                                                <Typography variant = "h4"> Twój koszyk </Typography>
                                                <Box>
                                                    <Typography variant= "subtitle2"> Wartość koszyka: </Typography>
                                                    <Typography variant= "h4"> 155zł </Typography>
                                                </Box>

                                            </Box>
                                            <Divider/>
                                            <Box display="flex" flexDirection="column">
                                                <AppBarShoppingBasketItem product="Frytki z serem" price='12' amount="3"/>
                                                <AppBarShoppingBasketItem product="Frytki z serem32" price='158' amount="2"/>
                                                <AppBarShoppingBasketItem product="Frytki z serem" price='124' amount="1"/>

                                            </Box>
                                            <Box mt={1}/>
                                            <Divider/>
                                            <Box display="flex" alignItems ="center" justifyContent="space-between" pt={2}>
                                                <Button
                                                    variant="text"
                                                    onClick={()=>history.push(routes.SHOPPINGBASKET)}
                                                >
                                                    Pokaż koszyk
                                                </Button>
                                                <Button variant="contained" color="secondary">Do kasy</Button>
                                            </Box>

                                        </Box>

                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                        <Button ref={anchorRef}  onMouseEnter={handleToggleMenu} color="inherit" disableRipple className={classes.menuButton}>
                                <Box display="flex" alignItems ='center' flexDirection = "column">
                                    <PersonOutlineIcon color="inherit"/>
                                    <Typography color="inherit" className={classes.menuButtonText}>Twoje konto</Typography>
                                </Box>
                        </Button>

                        <Popper
                            onMouseLeave={handleCloseMenu}
                            open={isMenuOpen}
                            anchorEl={anchorRef.current}
                            placement="bottom-end"
                            transition
                            disablePortal
                            style={{zIndex:100}}
                        >
                            {({ TransitionProps }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{ transformOrigin: " right top", transform: window.innerWidth >= theme.breakpoints.width('md') ? 'translate(10px,9px)' : 'translate(16px,5px)' }}
                                >
                                    <Paper square elevation={2} classes={{root: classes.paperRoot}} >
                                        <ClickAwayListener onClickAway={handleCloseMenu}>
                                            <MenuList autoFocusItem={isMenuOpen} disablePadding>
                                                <MenuItem
                                                    onClick={handleCloseMenu}
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
                                                    onClick={handleCloseMenu}
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
                                                    onClick={handleCloseMenu}
                                                    component={NavLink}
                                                    to={routes.ADMIN_PANEL}
                                                    activeClassName={classes.selectedItem}
                                                    className={classes.menuItem}
                                                >
                                                    <ListItemIcon className={classes.menuIcon}>
                                                        <RestaurantIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    <Typography variant="h5" color = "inherit">Panel zarządzania</Typography>
                                                </MenuItem>
                                                <Divider/>
                                                {
                                                    isLoggedIn ? (
                                                        <MenuItem
                                                            onClick={(e)=>{
                                                                handleCloseMenu(e);
                                                                dispatch(logout());
                                                            }}
                                                            className={classes.authButton}
                                                        >
                                                            <Typography variant="h5" color = "inherit">Wyloguj się</Typography>
                                                        </MenuItem>
                                                    ):(
                                                        <MenuItem
                                                            onClick={(e)=>{
                                                                handleCloseMenu(e);
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
            </Container>
        </AppBar>
    )
}
export default Navbar;
