import React, {useEffect, useState} from "react";
import {Box, Divider, Hidden, Table, TableBody, TableCell, TableRow, Typography} from "@material-ui/core";
import PhoneIcon from '@material-ui/icons/Phone';
import {makeStyles} from "@material-ui/core/styles";
import {restaurantService} from "../services/restaurantService";
import {toLocalTime, worksTimeDaysTranslate} from "../helpers/_helpers";

const useStyles = makeStyles(theme=>({
    contactBox:{
        display:"flex",
        alignItems:"center",
        justifyContent:'space-around',
        paddingBottom:theme.spacing(6),
        marginTop:theme.spacing(4),
        [theme.breakpoints.down('xs')]:{
            flexDirection:'column',
        }

    }
}))


const SingleRestaurantContact = ({match,restaurant}) =>{
    const classes = useStyles();
    const [openingHours, setOpeningHours] = useState([]);

    useEffect(()=>{
        const getOpeningHours = () =>{
            restaurantService.getRestaurantOpeningHours(match.params.restaurantId)
                .then(response=>setOpeningHours(response.data))
                .catch(()=>setOpeningHours([]));
        }
        getOpeningHours();
    },[match.params.restaurantId])
    return (
        <>
            <Box className={classes.contactBox}>
                <Box display="flex" alignItems="center" flexDirection="column" m={2}>
                    <Typography variant="h4" paragraph>Godziny otwarcia:</Typography>
                    <Table size="small">
                        <TableBody>
                            {openingHours.length ? openingHours.map((row) => (
                                <TableRow key={row.day}>
                                    <TableCell>
                                        {worksTimeDaysTranslate(row.day)}
                                    </TableCell>
                                    <TableCell align="right">{row.from ? toLocalTime(row.from) : "Zamknięte"}</TableCell>
                                    <TableCell align="right">{row.to ? toLocalTime(row.to) : "Zamknięte"}</TableCell>
                                </TableRow>
                            )):null}
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
                       {restaurant.name}
                    </Typography>
                    <Typography
                       variant="h5"
                        gutterBottom
                    >
                        {restaurant.postCode}
                    </Typography>
                    <Typography
                      variant="h5"
                      paragraph
                    >
                        {restaurant.street} {restaurant.houseNumber}
                    </Typography>
                    {restaurant.phoneNumber && (
                        <Box display="flex" alignItems="center">
                            <PhoneIcon/>
                            <Box mr={1}/>
                            <Typography
                                variant="h5"
                            >
                                {restaurant.phoneNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                            </Typography>
                        </Box>
                    )}
                </Box>

            </Box>
        </>
    )
}
export default SingleRestaurantContact;
