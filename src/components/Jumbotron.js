import React from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Box,Typography,Button} from "@material-ui/core";


const useStyles = makeStyles((theme)=>({
    jumbotronWrapper:{
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
    },
    textStyle:{
        color:'#e7e7e7',
        fontWeight:600,
        fontSize: 60,
        paddingBottom:theme.spacing(2),
        [theme.breakpoints.down('md')]:{
            fontSize: '1.5rem',
        }
    },
    iconStyle:{
        color:'#e7e7e7',
        fontSize: 150,
        paddingBottom:theme.spacing(4),
        [theme.breakpoints.down('md')]:{
            fontSize: 80,
            paddingBottom:theme.spacing(2),
        },

    }
}))
const Jumbotron =({text, icon, buttonText, handleClick})=>{
    const classes = useStyles();
    return(
        <Box className={classes.jumbotronWrapper}>
            <Typography className={classes.textStyle}>
                {text}
            </Typography>
            <Box className={classes.iconStyle}>
                {icon}
            </Box>
            <Button color="primary" variant="contained" onClick={handleClick}> {buttonText} </Button>
        </Box>
    )
}
export default Jumbotron;
