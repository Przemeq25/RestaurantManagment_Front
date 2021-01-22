import React, {useRef, useState} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Divider,
    TextField,
    Typography
} from "@material-ui/core";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Chip from "@material-ui/core/Chip";
import AssignmentIcon from '@material-ui/icons/Assignment';
import Box from "@material-ui/core/Box";
import moment from "moment";
import {makeStyles} from "@material-ui/core/styles";
import {reservationValidationSchema} from "../../../helpers/_validation";
import {restaurantService} from "../../../services/restaurantService";
import Grid from "@material-ui/core/Grid";
import ProgressButton from "../../ProgressButton";
import {Formik} from "formik";
import Grow from "@material-ui/core/Grow/Grow";
import {errorAlert, successAlert} from "../../../redux/actions/alert";
import {useDispatch} from "react-redux";

const useStyles = makeStyles(theme=>({
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
    },
    formStyle:{
        width:'40%',
        padding:`0px ${theme.spacing(3)}px`
    }

}));

const TableRow = ({table,restaurantId}) =>{
    const classes = useStyles();
    const [isCollapseOpen] = useState(false);
    const [result, setResult] = useState(null);
    const formRef = useRef(null);
    const dispatch = useDispatch();

    return(
        <>
        <Accordion key={table[0].id} classes={{rounded:classes.accordionRounder, root:classes.accordionRoot}}>
        <AccordionSummary classes={{content:classes.accordion}}>
            <Typography className={classes.heading}>Stoliki {table[0].numberOfSeats} osobowe</Typography>
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
            {table.map((singleTable) =>(
                <Chip key={singleTable.id}
                      className={classes.tableChip}
                      variant="outlined"
                      label={singleTable.name}
                      color="primary"
                      deleteIcon={<AssignmentIcon />}
                      onDelete={()=>console.log('123')} />
            ))}
        </AccordionDetails>
        <Box display="flex" justifyContent="center" pb={2}>
            <Formik
                innerRef={formRef}
                initialValues={{
                    numberOfSeats: table[0].numberOfSeats,
                    day:moment().format("YYYY-MM-DD"),
                    from: moment().format("HH:mm"),
                    to:moment().add(2, 'hours').format("HH:mm")
                }}
                validationSchema={reservationValidationSchema}
                onSubmit={(values,{setSubmitting})=>{
                    restaurantService.checkIfReservationAvailable(restaurantId,values)
                        .then(response => {
                            setSubmitting(false);
                            setResult(response.data);
                        })
                        .catch((err)=>{
                            if(err.response && err.response.status === 404){
                                dispatch(errorAlert("W tym czasie restauracja jest zamknięta!"))
                            }
                            setSubmitting(false)
                        } )
                }}
            >
                {({
                      handleChange,
                      handleSubmit,
                      values,
                      isSubmitting,
                      errors,
                      handleBlur,
                      touched

                  }) => (
                    <form onSubmit={handleSubmit} className={classes.formStyle}>
                            <Grid container item xs = {12} md = {4} spacing={2} alignItems="flex-start" direction = "column">
                                <Grid item>
                                    <Typography variant="h6" color="secondary">Wyszukaj termin rezerwacji!</Typography>
                                </Grid>
                                <Grid item >
                                    <TextField
                                        size="small"
                                        label="Data"
                                        type="date"
                                        name="day"
                                        value={values.day}
                                        InputLabelProps={{shrink: true}}
                                        variant="outlined"
                                        onChange={handleChange}
                                        error = {errors.day && touched.day ? true : false}
                                        helperText={touched.day  && errors.day}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid container item direction="row" justify="flex-start">
                                    <Grid item>
                                        <TextField
                                            size="small"
                                            label="Od"
                                            type="time"
                                            name="from"
                                            value={values.from}
                                            InputLabelProps={{ shrink: true}}
                                            variant="outlined"
                                            onChange={handleChange}
                                            error = {errors.from && touched.from ? true : false}
                                            helperText={touched.from  && errors.from}
                                            onBlur={handleBlur}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            size="small"
                                            label="Do"
                                            type="time"
                                            name="to"
                                            onChange={handleChange}
                                            value={values.to}
                                            InputLabelProps={{ shrink: true}}
                                            variant="outlined"
                                            error = {errors.to && touched.to ? true : false}
                                            helperText={touched.to  && errors.to}
                                            onBlur={handleBlur}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <ProgressButton label="Sprawdź dostępność" variant="contained" color="secondary" loading={isSubmitting} size="small"/>
                                </Grid>
                            </Grid>
                    </form>
                    )}
                </Formik>
                        <Grid container item xs = {12} md = {8} spacing={2} alignItems="center" direction = "column">
                            {result ? (
                                <Grow in = {true} timeout = {500}>
                                    <Box mt={5} display="flex" flexDirection="column" alignItems="center">
                                            {result.status ? (
                                                    <Formik
                                                        initialValues={{
                                                            forename:'',
                                                            surname:'',
                                                            phoneNumber:''
                                                        }}
                                                        onSubmit={(values,{setSubmitting})=>{
                                                            setSubmitting(true);
                                                            restaurantService.submitReservations(restaurantId, Object.assign(values,formRef.current.values))
                                                                .then(()=>{
                                                                    setResult(null);
                                                                    dispatch(successAlert("Zarezerwowano stolik!"));
                                                                })
                                                                .catch(()=>{
                                                                    dispatch(errorAlert("Nie udało się zarezerwować stolika! Spróbuj ponownie!"));
                                                                });
                                                        }}
                                                    >
                                                        {({
                                                              handleChange,
                                                              handleSubmit,
                                                              values,
                                                              isSubmitting,
                                                              errors,
                                                              handleBlur,
                                                              touched

                                                          }) => (
                                                            <form onSubmit={handleSubmit}>
                                                                <Box display="flex" flexDirection="column" alignItems="center">
                                                                    <TextField
                                                                        size="small"
                                                                        name="forename"
                                                                        value={values.forename}
                                                                        label="Imię"
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        onChange={handleChange}
                                                                        error = {errors.forename && touched.forename ? true : false}
                                                                        helperText={touched.forename  && errors.forename}
                                                                        onBlur={handleBlur}
                                                                    />
                                                                    <TextField
                                                                        size="small"
                                                                        label="Nazwisko"
                                                                        name="surname"
                                                                        margin="dense"
                                                                        value={values.surname}
                                                                        variant="outlined"
                                                                        onChange={handleChange}
                                                                        error = {errors.surname && touched.surname ? true : false}
                                                                        helperText={touched.surname  && errors.surname}
                                                                        onBlur={handleBlur}
                                                                    />
                                                                    <TextField
                                                                        size="small"
                                                                        label="Nr telefonu"
                                                                        name="phoneNumber"
                                                                        value={values.phoneNumber}
                                                                        variant="outlined"
                                                                        margin="dense"
                                                                        onChange={handleChange}
                                                                        error = {errors.phoneNumber && touched.phoneNumber ? true : false}
                                                                        helperText={touched.phoneNumber  && errors.phoneNumber}
                                                                        onBlur={handleBlur}
                                                                    />
                                                                    <Box mt={1}/>
                                                                    <ProgressButton label="Zarezerwuj!"loading={isSubmitting}/>
                                                                </Box>
                                                            </form>
                                                        )}
                                                    </Formik>
                                                ):(
                                                    result.reservations.length ? (
                                                        <>
                                                            <Typography variant ="h5">Wygląda na to że wszystkie stoliki o podanej liczbie miejsc są w tym czasie zajęte!</Typography>
                                                            <Typography variant = "subtitle2" paragraph>Wybierz inny termin, lub wymień stolik!</Typography>
                                                            <Typography variant ="body1" paragraph>Wolne terminy:</Typography>
                                                            <Box display="flex" justifyContent = "space-between" mb={2}>
                                                                {result.reservations.map((reservation,index)=>(
                                                                    <>
                                                                    <Box key = {index} display="flex" flexDirection = "column" flexWrap="wrap">
                                                                        {reservation.times.map((time,index)=>( <Typography variant = "body2" gutterBottom align="center" key={index}>{time.from.slice(0, -3)} - {time.to.slice(0, -3)}</Typography>))}
                                                                    </Box>
                                                                        <Box ml={1} mr={1}>
                                                                            <Divider orientation="vertical"/>
                                                                        </Box>
                                                                    </>
                                                                ))}
                                                            </Box>

                                                        </>
                                                    ):(
                                                        <Typography variant ="h5" paragraph>Wygląda na to że w tej restauracji nie ma stolików o podanej liczbie miejsc!</Typography>
                                                    )
                                            )
                                        }
                                    </Box>
                                </Grow>
                            ):null}
                        </Grid>
                     </Box>

        </Accordion>
        </>
    )
}
export default TableRow;
