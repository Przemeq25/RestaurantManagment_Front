import React from 'react';
import Navbar from "../components/Navbar";
import {Box, Container, Typography, useTheme, TableContainer, TableCell, TableRow, TableBody,Paper,Table,TableHead} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import {makeStyles} from "@material-ui/core/styles";
import OrderTableRow from "../components/Orders&Reservations/OrderTableRow";

const useStyle = makeStyles(theme=>({
    pageBackground:{
        backgroundColor:'rgba(248,248,248)',
        minHeight:'100vh',
        overflow:'hidden',
    },
    paperStyle:{
        overflowX:'auto',
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.1)",
        borderRadius: theme.spacing(2),
        padding:theme.spacing(2),
        [theme.breakpoints.down('xs')]:{
            padding:theme.spacing(1),
        }
    },
}));

const MyOrders = () =>{
    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));
    const classes = useStyle();
    return(
        <Box className={classes.pageBackground}>
            <Navbar/>
            <Container>
                <Box mt={mdDown ? 2 : 5} mb={mdDown ? 2 : 5}>
                    <Typography variant="h3" color="secondary">Twoje zamówienia</Typography>
                </Box>
                <TableContainer component={Paper} className={classes.paperStyle} variant="outlined">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell >Data</TableCell>
                                <TableCell >Status zamówienia</TableCell>
                                <TableCell >Sposób dostawy</TableCell>
                                <TableCell >Zamówienie</TableCell>
                                <TableCell >Cena</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <OrderTableRow row={[]}/>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    )
}
export default MyOrders;
