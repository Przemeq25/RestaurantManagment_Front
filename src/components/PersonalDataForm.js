import React, {useEffect, useState} from 'react';
import {Formik} from "formik";
import {personalDataValidationSchema} from "../helpers/_validation";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {Box, Checkbox, Typography} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import {useDispatch} from "react-redux";
import {changePersonalData, changePersonalDataToDelivery} from "../redux/actions/auth";

const PersonalDataForm = ({initial,update,handleClose, showUpdate}) =>{
    const [updatePersonalData, setUpdatePersonalData] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{
        update && setUpdatePersonalData(true)
    },[update])

    const handleChangeRadioStatus = () =>{
        setUpdatePersonalData(!updatePersonalData);
    }
    return(
        <Formik
            initialValues={JSON.parse(JSON.stringify(initial).replace(/null/g, '""'))}
            validationSchema={personalDataValidationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values)=>{
                updatePersonalData ? dispatch(changePersonalData(values)) : dispatch(changePersonalDataToDelivery(values))
                handleClose && handleClose()
            }}
        >
            {({
                    handleChange,
                    handleSubmit,
                    errors,
                    values,
              }) => (
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs = {12} md={6}>
                            <TextField
                                fullWidth
                                label = "Imię"
                                onChange={handleChange}
                                variant="outlined"
                                margin="dense"
                                name="forename"
                                value={values.forename}
                                error = { errors.forename ? true : false }
                                helperText={errors.forename}
                            />
                        </Grid>
                        <Grid item xs = {12} md={6}>
                            <TextField
                                fullWidth
                                label = "Nazwisko"
                                onChange={handleChange}
                                variant="outlined"
                                margin="dense"
                                name="surname"
                                value={values.surname}
                                error = { errors.surname ? true : false }
                                helperText={errors.surname}
                            />
                        </Grid>
                        <Grid item xs = {12} md = {10}>
                            <TextField
                                fullWidth
                                label = "Ulica"
                                onChange={handleChange}
                                variant="outlined"
                                margin="dense"
                                name="street"
                                value={values.street}
                                error = { errors.street ? true : false }
                                helperText={errors.street}
                            />
                        </Grid>
                        <Grid item xs = {4} md = {2}>
                            <TextField
                                fullWidth
                                label = "Nr domu"
                                onChange={handleChange}
                                variant="outlined"
                                margin="dense"
                                name="houseNumber"
                                value={values.houseNumber}
                                error = { errors.houseNumber ? true : false }
                                helperText={errors.houseNumber}
                            />
                        </Grid>
                        <Grid item xs = {8} md = {4}>
                            <TextField
                                fullWidth
                                label = "Kod pocztowy"
                                onChange={handleChange}
                                variant="outlined"
                                margin="dense"
                                name="postCode"
                                value={values.postCode}
                                error = { errors.postCode ? true : false }
                                helperText={errors.postCode}
                            />
                        </Grid>
                        <Grid item xs = {12} md = {8}>
                            <TextField
                                fullWidth
                                label = "Miasto"
                                onChange={handleChange}
                                variant="outlined"
                                margin="dense"
                                name="city"
                                value={values.city}
                                error = { errors.city ? true : false }
                                helperText={errors.city}
                            />
                        </Grid>
                        <Grid item xs = {12} md = {8}>
                            <TextField
                                fullWidth
                                label = "Nr telefonu"
                                onChange={handleChange}
                                variant="outlined"
                                margin="dense"
                                name="phoneNumber"
                                value={values.phoneNumber}
                                error = { errors.phoneNumber ? true : false }
                                helperText={errors.phoneNumber}
                            />
                        </Grid>
                        <Grid container item xs = {12} md = {4} alignItems="center">
                            <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                type="submit"
                            >
                                Zatwierdź
                            </Button>
                        </Grid>
                    </Grid>
                    {showUpdate && (
                        <FormControl size="small">
                            <Box display = "flex" alignItems = "center">
                                <Checkbox size="small" checked={updatePersonalData} onChange={handleChangeRadioStatus}/>
                                <Typography variant="subtitle2">Zaktualizuj dane konta</Typography>
                            </Box>
                        </FormControl>
                    )}
                </form>
            )}
        </Formik>
    )
}
export default PersonalDataForm;
