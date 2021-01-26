import React from 'react';
import {Box, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme=>({
    smallCard:{
        padding:theme.spacing(2),
        position:'relative',
        borderBottomWidth:`8px`,
        borderBottomStyle:'solid',
        borderBottomColor: color=>color.color === "secondary" ? `${theme.palette.secondary.main}` : `${theme.palette.primary.main}`,
        color:'black',
    },
    iconStyle:{
        position:'absolute',
        top:10,
        right:10,
        color:'#e7e7e7',
        fontSize:50
    }

}));


const SmallCard = ({title, firstLabel, secondLabel, firstValue, secondValue, icon, color, iconValue, tertiaryValue, tertiaryLabel}) =>{
    const classes = useStyles({color:color});
    return (
        <Paper elevation={3} className={classes.smallCard}>
            <Typography variant="h4" paragraph>{title}</Typography>
            <Box display = "flex" alignItems = "center" justifyContent="space-between" mt={4} mb={2} flexWrap="wrap">
                <Box mr={4}>
                    <Typography variant="subtitle2">{firstLabel}</Typography>
                    <Box display = "flex" alignItems = "center">
                        {iconValue}
                        <Box m={1}/>
                        <Typography variant="h6" color="secondary">{firstValue}</Typography>
                    </Box>
                </Box>
                {secondValue &&
                    <Box>
                        <Typography variant="subtitle2">{secondLabel}</Typography>
                        <Box display = "flex" alignItems = "center">
                            {iconValue}
                            <Box mr={1}/>
                            <Typography variant="h6" color="secondary">{secondValue}</Typography>
                        </Box>
                    </Box>
                }
                {tertiaryValue &&
                <Box>
                    <Typography variant="subtitle2">{tertiaryLabel}</Typography>
                    <Box display = "flex" alignItems = "center">
                        {iconValue}
                        <Box mr={1}/>
                        <Typography variant="h6" color="secondary">{tertiaryValue}</Typography>
                    </Box>
                </Box>
                }
            </Box>
            <Box className={classes.iconStyle}>
               {icon}
            </Box>
        </Paper>
    )
}
export default SmallCard;

SmallCard.defaultProps={
    color:'secondary',

}
