import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {history} from "../helpers/_helpers";
import {Box, Typography} from "@material-ui/core";
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme=>({
    logoText:{
        fontSize:size=>size.size,
        fontWeight:700,
        letterSpacing: '0.085rem',
    },
    boxStyle:{
        cursor:'pointer'
    }
}))

const AppLogo = ({size, marginTop, marginBottom,color}) =>{
    const classes = useStyles({size:size});
    return (
        <Box
            mt={marginTop}
            mb = {marginBottom}
            onClick={()=>history.push('/')}
            className={classes.boxStyle}
        >
            <Typography variant = "h2" className ={classes.logoText} color={color}>management</Typography>
            <Typography variant = "h2" className ={classes.logoText} color={color}>restaurant.</Typography>
        </Box>
    )
}
export default AppLogo;

AppLogo.propTypes = {
    size: PropTypes.number,
    marginTop:PropTypes.number,
    marginBottom:PropTypes.number,
    color: PropTypes.string,
};
AppLogo.defaultProps = {
    size: 18,
    marginTop:0,
    marginBottom:0,
    color:"primary",
}
