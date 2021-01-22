import React, {useEffect, useRef, useState} from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {Box, Typography, useTheme, Divider} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import ProgressButton from "../components/ProgressButton";
import {Formik} from "formik";
import moment from "moment";
import {restaurantService} from "../services/restaurantService";
import Grow from "@material-ui/core/Grow";
import {
    onlyNumbers,
    reservationPersonalValidationSchema,
    reservationValidationSchema
} from "../helpers/_validation";
import {errorAlert, successAlert} from "../redux/actions/alert";
import {useDispatch, useSelector} from 'react-redux';


const SingleRestaurantReservation = ({match}) =>{
    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));
    const [result, setResult] = useState(null);
    const formRef = useRef(null);
    const dispatch = useDispatch();
    const userData = useSelector(state=>state.auth.userData);
    const [reservationPersonalData,setReservationPersonalData] = useState({
        forename:'',
        surname:'',
        phoneNumber:'',
    })

    useEffect(()=>{
        if(Object.values(userData).every(x => (x !== null))){
            setReservationPersonalData({
                forename:userData.forename,
                surname:userData.surname,
                phoneNumber:userData.phoneNumber,
            })
        }

    },[userData])

    return (
        <Box mt={mdDown ? 5 : 10} mb={mdDown ? 5 : 10}>
            <Formik
                innerRef={formRef}
                initialValues={{
                    numberOfSeats:'',
                    day:moment().format("YYYY-MM-DD"),
                    from: moment().format("HH:mm"),
                    to:moment().add(2, 'hours').format("HH:mm")
                }}
                validationSchema={reservationValidationSchema}
                onSubmit={(values,{setSubmitting})=>{
                    setSubmitting(true);
                    restaurantService.checkIfReservationAvailable(match.params.restaurantId,values)
                        .then(response => {
                            setSubmitting(false);
                            setResult(response.data);
                        })
                        .catch(()=>{setSubmitting(false)} )
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
                    <Grid container spacing={3} alignItems="center" direction = "column">
                        <Grid item>
                            <Typography variant="h3" color="secondary" paragraph>Wyszukaj termin rezerwacji!</Typography>
                        </Grid>
                        <Grid item xs = {12} md = {6}>
                            <TextField
                                size="small"
                                name="numberOfSeats"
                                type="number"
                                onInput={(e)=>onlyNumbers(e)}
                                value={values.numberOfSeats}
                                label="Liczba miejsc przy stoliku"
                                variant="outlined"
                                onChange={handleChange}
                                error = {errors.numberOfSeats && touched.numberOfSeats ? true : false}
                                helperText={touched.numberOfSeats  && errors.numberOfSeats}
                                onBlur={handleBlur}
                                InputProps={{
                                    inputProps: {
                                        min: 1
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs = {12} md = {6}>
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
                        <Grid container item xs = {12} direction="row" justify="center" spacing={3}>
                            <Grid container item xs = {6} justify="flex-end">
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
                            <Grid item xs = {6} >
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
                            <Grid item md={4} xs={10}>
                                <ProgressButton label="Sprawdź dostępność" variant="contained" color="secondary" loading={isSubmitting}/>
                            </Grid>
                        </Grid>

                    </Grid>
                </form>
                )}
            </Formik>
            {result ? (
                <Grow in = {true} timeout = {500}>
                    <Box mt={5} display="flex" flexDirection="column" alignItems="center">
                        {result.status ? (
                            <Formik
                                initialValues={reservationPersonalData}
                                validationSchema={reservationPersonalValidationSchema}
                                onSubmit={(values,{setSubmitting})=>{
                                    setSubmitting(true);
                                    restaurantService.submitReservations(match.params.restaurantId, Object.assign(values,formRef.current.values))
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
                                            <Typography variant ="h5">By zarezerwować stolik uzupełnij dane osobowe!</Typography>
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
                                        {result.reservations.map((reservation,index)=>(
                                            <Box mt={1} key = {index}>
                                                {reservation.times.map((time,index)=>( <Typography variant = "body2" gutterBottom align="center" key={index}>{time.from.slice(0, -3)} - {time.to.slice(0, -3)}</Typography>))}
                                                <Divider />
                                            </Box>
                                        ))}

                                    </>
                                ):(
                                    <Typography variant ="h5" paragraph>Wygląda na to że w tej restauracji nie ma stolików o podanej liczbie miejsc!</Typography>
                                )
                            )
                        }
                    </Box>
                </Grow>
            ):null}

        </Box>
    )
}
export default SingleRestaurantReservation;
