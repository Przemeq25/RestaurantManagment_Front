import React from 'react';
import {Paper, Box, Divider, Typography, Button, Grow} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

const useStyles = makeStyles((theme)=>({
    cardStyle:{
        width:'100%',
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        borderRadius:theme.spacing(2),
        "&:hover": {
            boxShadow: "-1px 10px 29px 0px rgba(0,0,0,0.4)"
        },
    },
    titleText:{
        fontWeight:600
    }
}))

const WorkerCard = ({city,email,forename,surname,houseNumber,street,phoneNumber,postCode}) =>{
    const classes = useStyles();
    return (
        <Grow in={true} timeout={500}>
            <Paper elevation={2} className={classes.cardStyle}>
                <Box display = "flex" alignItems="center" justifyContent="center" flexDirection="column" p={4}>
                    <Typography variant="h4" className={classes.titleText}>{forename} {surname}</Typography>
                    <Box display="flex" justifyContent = "space-between" mt={4} mb ={4}>
                        <Box display="flex" justifyContent="center" flexDirection="column" alignItems="flex-start" pr={3}>
                            <Box display="flex" alignItems="center" pb={1}>
                                <PhoneIcon color="secondary" fontSize="small"/>
                                <Box mr={1}/>
                                <Typography variant="body2"> {phoneNumber}</Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <MailIcon color="secondary" fontSize="small"/>
                                <Box mr={1}/>
                                <Typography variant="body2"> {email}</Typography>
                            </Box>
                        </Box>
                        <Divider orientation="vertical" />
                        <Box display="flex" justifyContent="flex-start" flexDirection="column" pl={3}>
                            <Typography
                                variant="body2"
                                gutterBottom
                            >
                                {city}
                            </Typography>
                            <Typography
                                variant="body2"
                                gutterBottom
                            >
                                {postCode}
                            </Typography>
                            <Box display="flex" alignItems ="center">
                                <Typography
                                    variant="body2"
                                >
                                   {street}
                                </Typography>

                                <Typography
                                    variant="body2"
                                >
                                    {houseNumber}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box>
                        <Button variant="outlined" color="primary" startIcon={<AssignmentIndIcon/>}>Zwolnij pracownika</Button>
                    </Box>

                </Box>
            </Paper>
        </Grow>
    );
}
export default WorkerCard;
