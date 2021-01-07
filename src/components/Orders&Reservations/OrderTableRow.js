import React, {useState} from 'react';
import {TableRow,TableCell,IconButton,Collapse,Box,Typography,Table,TableHead,TableBody,Divider,Chip,Grid} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import PhoneIcon from '@material-ui/icons/Phone';

const OrderTableRow = ({row}) =>{
    const [open, setOpen] = useState(false);
    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    2020-01-16
                </TableCell>
                <TableCell>W realizacji</TableCell>
                <TableCell>Dostawa</TableCell>
                <TableCell>Pizza, Zupa</TableCell>
                <TableCell>15,50</TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h5" gutterBottom component="div">
                                Zamówienie
                            </Typography>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>Nazwa</TableCell>
                                        <TableCell align="right">Ilość</TableCell>
                                        <TableCell align="right">Cena</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/*{row.history.map((historyRow) => (*/}
                                    {/*    <TableRow key={historyRow.date}>*/}
                                    {/*        <TableCell component="th" scope="row">*/}
                                    {/*            {historyRow.date}*/}
                                    {/*        </TableCell>*/}
                                    {/*        <TableCell>{historyRow.customerId}</TableCell>*/}
                                    {/*        <TableCell align="right">{historyRow.amount}</TableCell>*/}
                                    {/*        <TableCell align="right">*/}
                                    {/*            {Math.round(historyRow.amount * row.price * 100) / 100}*/}
                                    {/*        </TableCell>*/}
                                    {/*    </TableRow>*/}
                                    {/*))}*/}
                                </TableBody>
                            </Table>
                            <Divider/>
                            <Box p={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs = {12} md = {8}>
                                        <Typography variant="h5" gutterBottom>
                                            Płatność:
                                        </Typography>
                                        <Typography variant="body2" display="inline" paragraph style={{marginRight:16}}>Gotówka</Typography>
                                        <Chip label="Zapłacono" color= "secondary"/>
                                        <Box mb={2}/>

                                        <Typography variant="h5" gutterBottom>
                                            Komentarz:
                                        </Typography>
                                        <Typography variant="subtitle2">Brak</Typography>
                                    </Grid>
                                    <Grid item xs = {12} md = {4}>
                                        <Box>
                                            <Typography variant="body2">Zbigniew Kicaj</Typography>
                                            <Typography variant="body2">32-432 Tarnów</Typography>
                                            <Typography variant="body2" gutterBottom>ul. Mickiewicza 123</Typography>
                                            <Box display="flex" alignItems="center">
                                                <Box mr={1}>
                                                    <PhoneIcon color="secondary"/>
                                                </Box>
                                                <Typography variant="body2">828 827 912</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>

                                </Grid>

                            </Box>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}
export default OrderTableRow;
