import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Fab, Paper, Typography,Divider, Accordion, AccordionSummary, AccordionDetails, Button,Table,TableBody,TableHead,TableRow,TableCell,TextField} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AddTables from "../../components/Admin/Reservation/AddTables";
import Box from "@material-ui/core/Box";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Chip from "@material-ui/core/Chip";
import AssignmentIcon from '@material-ui/icons/Assignment';
import Collapse from "@material-ui/core/Collapse";
import moment from 'moment';

const useStyles = makeStyles(theme=>({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    accordion:{
        display:'flex',
        justifyContent:"space-between",
        alignItems:'center',
    },
    accordionRounder:{
        borderRadius:theme.shape.borderRadius,
        marginBottom:theme.spacing(2),
    },
    accordionRoot:{
        "&.MuiAccordion-root:before": {
            backgroundColor: "white"
        },
    },
    tableChip:{
        margin:`0px ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
        minWidth:80
    },
    accordionDetails:{
        flexWrap:'wrap',
    }

}));

const TablesAndReservation = () =>{
    const classes = useStyles();
    const [addTableIsOpen, setAddTableIsOpen] = useState(false);
    const [isCollapseOpen,setCollapseOpen] = useState(false);
    const [isReservationOpen, setReservationOpen] = useState(false);

    const handleToggleAddTableOpen = () =>{
        setAddTableIsOpen(!addTableIsOpen);
    }

    return(
        <>
            <Typography variant="h3">Stoliki i rezerwacje:</Typography>
            <Typography variant="subtitle2" paragraph >Dodaj stoliki i zarządzaj rezerwacjami!</Typography>
                {[4,5].map((sectionId) => (
                    <Accordion key = {sectionId} classes={{rounded:classes.accordionRounder, root:classes.accordionRoot}} expanded={isCollapseOpen} onChange={()=>setCollapseOpen(!isCollapseOpen)}>
                        <AccordionSummary classes={{content:classes.accordion}}>
                                <Typography className={classes.heading}>Stoliki {sectionId} osobowe</Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    endIcon={isCollapseOpen ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
                                >
                                    Szczegóły
                                </Button>
                        </AccordionSummary>
                        <Divider style={{margin:"0px 16px 8px"}}/>
                        <AccordionDetails classes={{root:classes.accordionDetails}}>
                            {[0, 1, 2, 3, 41, 2, 3, 4,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7].map((sec,index) =>(
                                <Chip key={index}
                                    className={classes.tableChip}
                                    variant="outlined"
                                    label={sec}
                                    color="primary"
                                    deleteIcon={<AssignmentIcon />}
                                    onDelete={()=>console.log('123')} />
                            ))}
                        </AccordionDetails>
                        <Box display="flex" justifyContent="center" pb={2}>
                            <Button
                                variant="contained"
                                color="secondary"
                                endIcon={isReservationOpen ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
                                onClick={()=>setReservationOpen(!isReservationOpen)}
                            >
                                Rezerwacje
                            </Button>
                        </Box>
                        <Collapse in={isReservationOpen}>
                            <Box display="flex" alignItems = "center" justifyContent="center" p={2}>
                                {/*<Typography variant="h4" color="primary" paragraph> Brak rezerwacji!</Typography>*/}
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Stolik</TableCell>
                                            <TableCell>Data</TableCell>
                                            <TableCell>Godzina (od - do)</TableCell>
                                            <TableCell align="right"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {[1,2,3].map((row) => (
                                            <TableRow key={row}>
                                                <TableCell>#{row}</TableCell>
                                                <TableCell component="th" scope="row">
                                                    {row + 10-20-30}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    15:00 - 20:00
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Button variant="contained" color="primary" >
                                                        Zmień
                                                    </Button>
                                                    <Button variant="contained" color="primary"style={{marginLeft:4}}>
                                                        Usuń
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                <TextField placeholder="Nazwa/numer"/>
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                <TextField
                                                    placeholder="Data"
                                                    defaultValue={moment().format('YYYY-MM-DD')}
                                                    type="date"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    placeholder="od"
                                                    value={moment().format("HH:mm")}
                                                    type="time"
                                                    inputProps={{
                                                        style: {
                                                            textAlign:'center',
                                                            maxWidth:70,
                                                        }

                                                    }}
                                                /> -
                                                <TextField
                                                    placeholder="do"
                                                    value={''}
                                                    type="time"
                                                    inputProps={{
                                                        style: {
                                                            textAlign:'center',
                                                            maxWidth:70,
                                                        }
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button variant="contained" color="primary">
                                                    Dodaj
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </Accordion>
                ))}
            <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleToggleAddTableOpen} variant="extended" size="small">
                <AddIcon/>
                Dodaj stoliki
            </Fab>
            <AddTables addTableIsOpen={addTableIsOpen} handleToggleAddTable={handleToggleAddTableOpen}/>
        </>
    )
}
export default TablesAndReservation;
