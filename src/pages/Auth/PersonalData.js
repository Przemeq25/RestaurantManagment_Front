import React from "react";
import AuthContainer from "../../components/AuthContainer";
import {Box, Button, TextField, Typography} from "@material-ui/core";
import ProgressButton from "../../components/ProgressButton";
import {Formik} from "formik";
import {onlyLetters, onlyNumbers, phoneIsValid, postCodeIsValid} from "../../helpers/_validation";
import {postPersonalData} from "../../services/auth.service";



const PersonalData = ({history,match})=>{
    return(
        <AuthContainer title = "Dane kontaktowe">
            <Formik
                initialValues={{
                    forename: '',
                    surname: '',
                    street:'',
                    city:'',
                    postCode:'',
                    phoneNumber:'',
                    houseNumber:'',
                }}
                validate={(values) => {
                    const errors = {};
                    if (!phoneIsValid(values.phoneNumber)) {
                        errors.phoneNumber = 'Podany numer jest niepoprawny';
                    }
                    if(!postCodeIsValid(values.postCode)){
                        errors.postCode = "Podany kod pocztowy jest niepoprawny"
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting,setErrors }) => {
                    const personalData = {
                        forename: values.forename,
                        surname: values.surname,
                        street: values.street,
                        city: values.city,
                        postCode: values.postCode,
                        phoneNumber: values.phoneNumber,
                        houseNumber:values.houseNumber
                    }
                    setTimeout(()=>{
                        postPersonalData(personalData, match.params.login)
                            .then(()=>history.push('/login'))
                            .catch(()=>{
                                setErrors( {response:"Podane login lub hasło są niepoprawne" });
                                setSubmitting(false);
                            });
                    },200)

                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                  }) => (
                    <>
                        {errors.responseError &&
                        <Box mt={1} mb={1}>
                            <Typography variant="subtitle2" color="error">{errors.responseError}</Typography>
                        </Box>
                        }
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label = "Imię"
                                margin="dense"
                                fullWidth
                                value={values.forename}
                                onChange = {handleChange}
                                name="forename"
                                onInput={(e)=>onlyLetters(e)}
                            />
                            <TextField
                                label = "Nazwisko"
                                margin="dense"
                                fullWidth
                                value={values.surname}
                                onChange = {handleChange}
                                name="surname"
                                onInput={(e)=>onlyLetters(e)}
                            />
                            <TextField
                                label = "Miasto"
                                margin="dense"
                                fullWidth
                                value={values.city}
                                onChange = {handleChange}
                                name="city"
                                onInput={(e)=>onlyLetters(e)}
                            />
                            <TextField
                                label = "Kod pocztowy"
                                margin="dense"
                                fullWidth
                                error = { errors.postCode && touched.postCode ? true : false }
                                helperText={touched.postCode && errors.postCode}
                                value={values.postCode}
                                onChange = {handleChange}
                                onBlur={handleBlur}
                                name="postCode"
                                inputProps={{maxLength:6}}
                                onInput={(e)=>onlyNumbers(e)}
                            />
                            <TextField
                                label = "Ulica"
                                margin="dense"
                                fullWidth
                                value={values.street}
                                onChange = {handleChange}
                                name="street"
                                onInput={(e)=>onlyLetters(e)}
                            />
                            <TextField
                                label = "Nr domu/ lokalu"
                                margin="dense"
                                fullWidth
                                value={values.password}
                                onChange = {handleChange}
                                name="houseNumber"
                            />
                            <TextField
                                label = "Nr telefonu"
                                margin="dense"
                                fullWidth
                                error = { errors.phoneNumber && touched.phoneNumber ? true : false }
                                helperText={touched.phoneNumber && errors.phoneNumber}
                                value={values.phoneNumber}
                                onChange = {handleChange}
                                onBlur={handleBlur}
                                name="phoneNumber"
                                type="text"
                                inputProps={{maxLength:16}}
                                onInput={(e)=>onlyNumbers(e)}

                            />
                            <Box mt={3} mb={1} width="100%">
                                <ProgressButton label = "Zatwierdź" loading={isSubmitting} />
                            </Box>
                            <Box display = "flex" justifyContent="center" alignItems = "center">
                                <Button variant = "text" color="secondary" onClick = {()=>history.push('/login')}>
                                    <Typography variant = "subtitle2" color="secondary">Uzupełnij później!</Typography>
                                </Button>
                            </Box>
                        </form>
                    </>
                )}
            </Formik>
        </AuthContainer>
    )
}
export default PersonalData;
