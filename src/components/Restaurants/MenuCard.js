import React from "react";
import {Box, Divider, Paper, Typography, IconButton, useTheme} from "@material-ui/core";
import AppLogo from "../AppLogo";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import {makeStyles} from "@material-ui/core/styles";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";

const useStyles = makeStyles((theme)=>({
    menuPaperStyle: {
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.1)",
        borderRadius: theme.spacing(2),
        "&:hover": {
            boxShadow: "-1px 10px 29px 0px rgba(0,0,0,0.2)"
        },
        height: 200,
        cursor: 'pointer',
        marginBottom: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            height: 120,
        },
        overflow: 'hidden',
        position: 'relative'
    },
    cardMedia: {
        display: 'flex',
        backgroundColor: '#ededed',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        [theme.breakpoints.down('xs')]: {
            maxWidth: 120,
            height: 120,
        },
    },
    menuPaperContentStyle: {
        width:'calc(100% - 250px)',
        display: "flex",
        flexDirection: "column",
        alignItems:"space-between",
        padding: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            padding: `${theme.spacing(1)}px ${theme.spacing(1)}px 3px`,
            width:'calc(100% - 160px)',
        },
    },
    iconPadding:{
        paddingRight:'3px',
    },
    contactBox:{
        display:'flex',
        marginTop:theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            marginTop:'3px',
        },
    },
    buyButton:{
        position:'absolute',
        bottom:10,
        right:10,
    }
}));
const MenuCard = ({name,id,ingredients,price,timeToDo}) =>{
    const classes = useStyles();
    const theme = useTheme();
    const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
    return (
        <Paper className={classes.menuPaperStyle} variant="outlined" >
            <Box display ="flex"  height="100%" >
                <Box className={classes.cardMedia}>
                    <AppLogo size={12}/>
                </Box>
                <Divider orientation='vertical'/>
                <Box className={classes.menuPaperContentStyle}>
                    <Box flex="1">
                        <Typography variant="h4" color="primary"> {name}</Typography>
                        <Typography variant="subtitle2" gutterBottom>{ingredients}</Typography>
                    </Box>
                    <Typography variant="h4" color="secondary">{price} zł </Typography>
                    <Divider/>
                    <Box className={classes.contactBox}>
                        <Box mr={1} display="flex" alignItems="center" >
                            <AccessTimeIcon fontSize="small" className={classes.iconPadding}/>
                            <Typography variant="subtitle2">{timeToDo}min</Typography>
                        </Box>

                    </Box>
                </Box>
            </Box>
            <IconButton className={classes.buyButton} size={xsDown ? "small" : "medium"}>
                <ShoppingCartOutlinedIcon color="secondary" fontSize={xsDown ? "small" : "medium"}/>
            </IconButton>
        </Paper>
    )
}
export default MenuCard;

