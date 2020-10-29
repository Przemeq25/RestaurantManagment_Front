import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    AccordionActions,
    Typography,
    Chip,
    Button,
    Divider,
    Box,
    Grid,
    Hidden,
    TableHead,
    TableCell,
    TableRow,
    Checkbox,
    TableContainer,
    Table,
    TableBody,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import MapIcon from '@material-ui/icons/Map';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import TimerOffIcon from '@material-ui/icons/TimerOff';
import PhoneIcon from '@material-ui/icons/Phone';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginBottom:theme.spacing(1),
        [theme.breakpoints.up('md')]:{
            width:'calc(100% - 103px)'
        }
    },
    accordionSummary:{
        height: 80
    },
    accordionActions:{
        justifyContent:'space-between',
    },
    dividerStyle:{
        padding:'20px 0',
    }
}));

const OrderRow = () =>{
    const classes = useStyles();

    const [rows] = useState([
        { id: 1, meal: 'Frytki', amount: 'x2'},
        { id: 2, meal: 'Kebab', amount: 'x1'},
        { id: 3, meal: 'Hamburger', amount: 'x1'},
    ]);
    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    classes={{root:classes.accordionSummary}}
                >
                    <Grid container spacing={1}>
                        <Grid item xs = {4} md = {2}>
                            <Typography variant = "h4">#1</Typography>
                        </Grid>
                        <Hidden smDown>
                            <Grid container wrap="nowrap" item md = {6} >
                                <Grid item xs zeroMinWidth>
                                    <Typography variant = "subtitle1" noWrap>Polędwica w sosie własnym, frytki, ziemniaki frytki frytki frytki frytki frytki </Typography>
                                </Grid>
                            </Grid>
                        </Hidden>
                        <Grid item xs = {4} md = {2}>
                            <Chip
                                icon={<DirectionsCarIcon />}
                                label="Dostawa"
                                variant="outlined"
                                color="secondary"
                            />
                        </Grid>
                        <Grid container item xs = {3} md = {2} justify="flex-end" alignItems="center">
                            <AlarmOnIcon color="primary" fontSize="small"/>
                            <Typography variant="h5" color="primary">30 min</Typography>
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing ={5} direction="row">
                        <Grid item xs = {12} md = {8}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={true}
                                                    color="primary"
                                                />
                                            </TableCell>
                                                <TableCell>ID</TableCell>
                                            <TableCell>Nazwa</TableCell>
                                            <TableCell>Ilosc</TableCell>
                                            <TableCell></TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map(row=>(
                                            <TableRow>
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={false}
                                                    />
                                                </TableCell>
                                                <TableCell padding="checkbox" align="center">{row.id}</TableCell>
                                                <TableCell>{row.meal}</TableCell>
                                                <TableCell padding="checkbox" align="center">{row.amount}</TableCell>
                                                <TableCell padding="checkbox" align="center">
                                                    <Button variant="outlined" color="primary">Przepis</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Box mt={2}/>
                            <Typography variant='h4'> Komentarz do zamówienia: </Typography>
                            <Typography variant='subtitle2'> Frytki bez keczupu </Typography>
                            <Hidden mdUp>
                                <Box mb={2}/>
                                <Divider variant="horizontal"/>

                            </Hidden>
                        </Grid>
                        <Hidden smDown>
                            <Grid container item xs = {12} md ={1} justify="center" className={classes.dividerStyle}>
                                <Divider variant="vertical"/>
                            </Grid>
                        </Hidden>
                        <Grid item xs = {12} md ={3} direction="column" >
                            <Box display="flex" alignItems="center" >
                                <Box mr={1}>
                                    <MapIcon color="secondary"/>
                                </Box>
                                <Box>
                                    <Typography variant="h5">Przemysław Cichoń</Typography>
                                    <Typography variant="h5">32-432 Tarnów</Typography>
                                    <Typography variant="h5" gutterBottom>ul. Mickiewicza 123</Typography>
                                </Box>

                            </Box>
                            <Box display="flex" alignItems="center">
                                <Box mr={1}>
                                    <PhoneIcon color="secondary"/>
                                </Box>
                                <Typography variant="h5">828 827 912</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </AccordionDetails>
                <Divider />
                <AccordionActions classes={{root:classes.accordionActions}}>
                    <Typography variant = "subtitle2">2020-10-12 15:00</Typography>
                    <Box>
                        <Button size="small" color="primary" startIcon={<TimerOffIcon/>} variant="outlined">Opóźnienie</Button>
                        <Button size="small" color="secondary" startIcon={<DoubleArrowIcon/>} variant="outlined">
                            Gotowe
                        </Button>
                    </Box>
                </AccordionActions>
            </Accordion>
        </div>
    );
}
export default OrderRow;
