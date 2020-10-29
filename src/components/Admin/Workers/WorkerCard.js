import React from 'react';
import {Paper, Box, Avatar, Typography, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

const useStyles = makeStyles((theme)=>({
    cardStyle:{
        width:'100%',
    },
    avatarStyle:{
        width: 120,
        height: 120,
    }
}))

const WorkerCard = () =>{
    const classes = useStyles();
    return (
        <Paper elevation={2} className={classes.cardStyle}>
            <Box display = "flex" alignItems="center" justifyContent="center" pt={5} pb = {10}>
                <Avatar className={classes.avatarStyle}>

                </Avatar>
            </Box>
            <Box display = "flex" alignItems="center" justifyContent="center" flexDirection="column">
                <Typography variant="h4">Jan Kowalski</Typography>
                <Typography variant="subtitle1" paragraph>Kelner</Typography>
                <Box display="flex" justifyContent="flex-start" flexDirection="column">
                    <Box display="flex" alignItems="center">
                        <PhoneIcon color="secondary" fontSize="small"/>
                        <Box mr={1}/>
                        <Typography variant="subtitle1"> 675 928 192</Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <MailIcon color="secondary" fontSize="small"/>
                        <Box mr={1}/>
                        <Typography variant="subtitle1"> poczta@wp.pl</Typography>
                    </Box>
                </Box>
                <Box m={3}>
                    <Button variant="outlined" color="primary" startIcon={<AssignmentIndIcon/>}>Zarządzaj</Button>
                </Box>

            </Box>
        </Paper>
    );
}
export default WorkerCard;
