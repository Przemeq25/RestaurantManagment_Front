import React from 'react';
import {Box, Paper, Typography} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating/Rating";
import { makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme=>({
    paperStyle:{
        padding:theme.spacing(2),
        borderRadius:theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            padding:theme.spacing(1),
        },
        marginBottom:theme.spacing(2),
        width:'100%',
    },
}))

const OpinionsCard = ({comment, nick, opinionValue = 0}) =>{
    const classes = useStyles();


    return (
        <Paper variant='outlined' className={classes.paperStyle}>
            <Box display = "flex"  justifyContent = "space-between">
                <Typography variant="h4" paragraph color="secondary">{nick} </Typography>
                <Rating readOnly value={opinionValue} precision={0.5}/>
            </Box>
            <Typography variant="subtitle2">
               {comment}
            </Typography>
        </Paper>
    )
}
export default OpinionsCard;
