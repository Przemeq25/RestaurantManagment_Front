import React from "react";
import AuthContainer from "../../components/AuthContainer";
import {Box, Button, TextField, Typography} from "@material-ui/core";
import ProgressButton from "../../components/ProgressButton";
import {Formik} from "formik";
import {login} from '../../services/auth.service';


const Login =({history})=>{
    return(
        <AuthContainer title = "Zaloguj się" >
            <Formik
                initialValues={{ login: '', password: '' }}
                validate={(values) => {
                    const errors = {};
                    if (!values.login) {
                        errors.login = 'Pole wymagane';
                    }
                    if(!values.password){
                        errors.password = 'Pole wymagane';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting,setErrors }) => {
                    setTimeout(()=>{
                        login(values.login,values.password)
                            .then((response)=>{
                                history.push('/');
                            })
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
                                label = "Password"
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
                            <Box mt={3} mb={1} width="100%">
                                <ProgressButton label = "Zaloguj się" loading={isSubmitting} />
                            </Box>
                            <Box display = "flex" justifyContent="center" alignItems = "center">
                                <Typography variant = "subtitle2">Nie masz konta? </Typography>
                                <Button variant = "text" color="secondary" onClick = {()=>history.push('/register')}>
                                    <Typography variant = "subtitle2" color="secondary">Zarejestruj się!</Typography>
                                </Button>
                            </Box>
                        </form>
                    </>
                )}
            </Formik>
        </AuthContainer>
    )
}
export default Login;
