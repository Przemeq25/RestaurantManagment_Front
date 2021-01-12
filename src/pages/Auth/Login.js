import React from "react";
import AuthContainer from "../../components/Auth/AuthContainer";
import {Box, Button, TextField, Typography} from "@material-ui/core";
import ProgressButton from "../../components/ProgressButton";
import {Formik} from "formik";
import {useDispatch,useSelector} from "react-redux";
import {login} from "../../redux/actions/auth";
import {history} from "../../helpers/_helpers";
import {routes} from "../../config/routes";
import Page500 from "../Page500";


const Login =()=>{
    const dispatch = useDispatch();
    const error = useSelector(state => state.auth.error);
    const isLoading = useSelector(state =>state.auth.isLoading);

    if(error === 500){
        return <Page500/>
    }

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
                onSubmit={(values) => {
                    setTimeout(()=>{
                        dispatch(login(values.login,values.password));
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
                            <Box mt={3} mb={1} width="100%">
                                <ProgressButton label = "Zaloguj się" loading={isLoading}/>
                            </Box>
                            <Box display = "flex" justifyContent="center" alignItems = "center">
                                <Typography variant = "subtitle2">Nie masz konta? </Typography>
                                <Button variant = "text" color="secondary" onClick = {()=>history.push(routes.REGISTER)}>
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
