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


const SmallCard = ({title, firstLabel, secondLabel, icon, color,tertiaryLabel,firstChildren,secondChildren, tertiaryChildren}) =>{
    const classes = useStyles({color:color});
    return (
        <Paper elevation={3} className={classes.smallCard}>
            <Typography variant="h4" paragraph>{title}</Typography>
            <Box display = "flex" alignItems = "center" justifyContent="space-between" mt={6} flexWrap="wrap">
                <Box mr={4}>
                    <Typography variant="subtitle2">{firstLabel}</Typography>
                    <Box display="flex" flexDirection="column">
                        {firstChildren}
                    </Box>
                </Box>
                {secondChildren &&
                    <Box>
                        <Typography variant="subtitle2">{secondLabel}</Typography>
                        {secondChildren}
                    </Box>
                }
                {tertiaryChildren &&
                <Box>
                    <Typography variant="subtitle2">{tertiaryLabel}</Typography>
                    {tertiaryChildren}
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
