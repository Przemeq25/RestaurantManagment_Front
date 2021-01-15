import React from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Box,Typography,Button} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";


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
        fontSize: font => font.size,
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
const Jumbotron =({text, icon, buttonText, handleClick, size})=>{
    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));
    const classes = useStyles({size:mdDown ? "1.5rem" :size});
    return(
        <Box className={classes.jumbotronWrapper}>
            <Typography className={classes.textStyle} align="center">
                {text}
            </Typography>
            <Box className={classes.iconStyle}>
                {icon}
            </Box>
            {buttonText && <Button color="primary" variant="contained" onClick={handleClick}> {buttonText} </Button>}
        </Box>
    )
}
export default Jumbotron;

Jumbotron.defaultProps={
    size:60,
}
