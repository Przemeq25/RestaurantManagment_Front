import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import {AccountCircle} from "@material-ui/icons";
import appLogo from "../../../_helpers";
import {Link} from "react-router-dom";
import AdminDrawer from "./AdminDrawer";


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
        }
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
    space:{
        marginLeft:theme.spacing(2)
    },
    toolbar:theme.mixins.toolbar,
}));

const AdminPanel = (props) => {
    const classes = useStyles();
    const [isMenuOpen,setOpenMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuToggle = ()=>{
        setOpenMenu(!isMenuOpen);
    }

    const switchTitlePage = (title)=>{
        //const splitedTitle = title.split("/")[2] ? props.location.pathname.split("/")[2]: "admin";
        switch(title){
            case 'admin':
                return 'Strona startowa';
            case 'menu':
                return 'Menu';
            case 'orders':
                return 'Zamówienia';
            case 'workers':
                return 'Pracownicy';
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
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleMenuToggle}
                            edge="start"
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap className={classes.space}>
                            {switchTitlePage(props.location)}
                        </Typography>
                    </div>
                    <div className={classes.logo}>
                        <Link to="/">
                            <img src = {appLogo} alt="Logo"/>
                        </Link>
                    </div>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                            className={classes.menuButton}
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu

                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem >Profile</MenuItem>
                            <MenuItem onClick={()=>props.history.push('/')}>My account</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
           <AdminDrawer isMenuOpen={isMenuOpen} closeMenu={handleMenuToggle}/>
           <main className={classes.content}>
                <Toolbar />
               {props.children}
            </main>
        </div>
    );
}
export default AdminPanel;
