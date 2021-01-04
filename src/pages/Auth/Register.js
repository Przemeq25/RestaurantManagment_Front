import React from "react";
import AuthContainer from "../../components/AuthContainer";
import {Box, Button, TextField, Typography} from "@material-ui/core";
import ProgressButton from "../../components/ProgressButton";
import {Formik} from "formik";
import {history} from "../../helpers/_helpers";
import {register} from "../../redux/actions/register";
import {useDispatch, useSelector} from "react-redux";
import {routes} from "../../config/routes";
import Page500 from "../Page500";

const Register =()=>{
    const error = useSelector(state => state.register.error);
    const isLoading = useSelector(state =>state.register.isRequesting);
    const registerSuccess = useSelector(state=>state.register.registerSuccess);
    const dispatch = useDispatch();

    if(error === 500){
        return <Page500/>
    }

    return(
        <AuthContainer title = {registerSuccess ? "Potwierdzenie" : "Zarejestruj się"} error="">
            {registerSuccess ? (
                    <Box display="flex" alignItems="flex-start" justifyContent = "center" flexDirection = "column">
                        <Typography variant="h5">
                            Twoje konto zostało zarejestrowane w systemie!
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            Aby aktywować konto postępuj zgodnie z instrukcją, którą otrzymasz na skrzynkę pocztową!
                        </Typography>
                    </Box>
                ):(
                <Formik
                    initialValues={{ login: '', email:'',password: '', confirmPassword:'' }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.login) {
                            errors.login = 'Pole wymagane';
                        }
                        if(!values.email){
                            errors.email = 'Pole wymagane';
                        }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
                            errors.email = 'Niepoprawny adres email';
                        }
                        if(!values.password){
                            errors.password = 'Pole wymagane';
                        }else if(values.password.length <4){
                            errors.password = "Hasło powinno zawierać minimum 4 znaki"
                        }
                        if(!values.confirmPassword){
                            errors.confirmPassword = 'Pole wymagane';
                        }
                        else if(values.password !== values.confirmPassword){
                            errors.confirmPassword = 'Wprowadzone hasła róźnią się od siebie';
                        }
                        return errors;
                    }}
                    onSubmit={(values) => {
                        dispatch(register(values.email,values.login,values.password));
                    }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                      }) => (
                        <>
                            {error &&
                                <Box mt={1} mb={1}>
                                    <Typography variant="subtitle2" color="error">{error}</Typography>
                                </Box>
                            }
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label = "Login"
                                    margin="dense"
                                    fullWidth
                                    error = { errors.login && touched.login ? true : false }
                                    helperText={touched.login && errors.login}
                                    value={values.login}
                                    onChange = {handleChange}
                                    onBlur={handleBlur}
                                    name="login"
                                />
                                <TextField
                                    label = "Email"
                                    margin="dense"
                                    fullWidth
                                    error = { errors.email && touched.email ? true : false }
                                    helperText={touched.email && errors.email}
                                    value={values.email}
                                    onChange = {handleChange}
                                    onBlur={handleBlur}
                                    name="email"
                                />
                                <TextField
                                    label = "Hasło"
                                    margin="dense"
                                    fullWidth
                                    error = { errors.password && touched.password ? true : false }
                                    helperText={touched.password && errors.password}
                                    value={values.password}
                                    onChange = {handleChange}
                                    onBlur={handleBlur}
                                    name="password"
                                    type="password"
                                />
                                <TextField
                                    label = "Potwierdź hasło"
                                    margin="dense"
                                    fullWidth
                                    error = { errors.confirmPassword && touched.confirmPassword ? true : false }
                                    helperText={touched.confirmPassword && errors.confirmPassword}
                                    value={values.confirmPassword}
                                    onChange = {handleChange}
                                    onBlur={handleBlur}
                                    name="confirmPassword"
                                    type="password"
                                />

                                <Box mt={3} mb={1} width="100%">
                                   <ProgressButton label = "Zarejestruj się" loading={isLoading}/>
                                </Box>
                                <Box display = "flex" alignItems="center" justifyContent="center">
                                    <Typography variant = "subtitle2">Masz już konto? </Typography>
                                    <Button variant = "text" color="secondary" onClick = {()=>history.push(routes.LOGIN)}>
                                        <Typography variant = "subtitle2" color="secondary">Zaloguj się!</Typography>
                                    </Button>
                                </Box>
                            </form>
                        </>
                        )}
                </Formik>
                )}
        </AuthContainer>
    )
}
export default Register;
