import React from "react";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import {Box, Divider, Hidden, Table, TableBody, TableCell, TableRow, Typography} from "@material-ui/core";
import PhoneIcon from '@material-ui/icons/Phone';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme=>({
    contactBox:{
        display:"flex",
        alignItems:"center",
        justifyContent:'space-around',
        paddingBottom:theme.spacing(6),
        [theme.breakpoints.down('xs')]:{
            flexDirection:'column',
        }
    }
}))

const containerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: -3.745,
    lng: -38.523
};


const SingleRestaurantContact = () =>{
    const classes = useStyles();
    return (
        <>
            <Box className={classes.contactBox}>
                <Box display="flex" alignItems="center" flexDirection="column" m={2}>
                    <Typography variant="h4" paragraph>Godziny otwarcia:</Typography>
                    <Table size="small">
                        <TableBody>
                                <TableRow>
                                    <TableCell>
                                        Poniedziałek
                                    </TableCell>
                                    <TableCell align="right">8:00</TableCell>
                                    <TableCell align="right">12:00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Wtorek
                                    </TableCell>
                                    <TableCell align="right">8:00</TableCell>
                                    <TableCell align="right">12:00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Środa
                                    </TableCell>
                                    <TableCell align="right">8:00</TableCell>
                                    <TableCell align="right">12:00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Czwartek
                                    </TableCell>
                                    <TableCell align="right">8:00</TableCell>
                                    <TableCell align="right">12:00</TableCell>
                                </TableRow>
                        </TableBody>
                    </Table>
                </Box>
                <Hidden xsDown>
                    <Divider orientation="vertical" flexItem/>
                </Hidden>
                <Box display="flex" alignItems="center" flexDirection="column" m={2}>
                    <Typography variant="h4" paragraph> Dane kontaktowe:</Typography>
                    <Typography
                       variant="h5"
                        gutterBottom
                    >
                       Tarnów
                    </Typography>
                    <Typography
                       variant="h5"
                        gutterBottom
                    >
                        32-700
                    </Typography>
                    <Typography
                      variant="h5"
                      paragraph
                    >
                        Mickiewicza 16
                    </Typography>
                    <Box display="flex" alignItems="center">
                        <PhoneIcon/>
                        <Box mr={1}/>
                        <Typography
                            variant="h5"
                        >
                            789 574 232
                        </Typography>
                    </Box>
                </Box>

            </Box>
        </>
    )
}
export default SingleRestaurantContact;
