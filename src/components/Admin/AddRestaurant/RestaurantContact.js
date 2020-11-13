import React from "react";
import {Box,TextField} from "@material-ui/core";
import {useFormikContext} from "formik";
import {onlyLetters, onlyNumbers} from "../../../helpers/_validation";


const RestaurantContact = ()=>{
    const {values, handleChange,errors,handleBlur,touched } = useFormikContext();
    return(
        <Box display="flex" flexDirection="column" p={2}>
                <TextField
                    label="Miasto"
                    fullWidth
                    margin="dense"
                    name="city"
                    onChange={handleChange}
                    value={values.city}
                    error = { errors.city && touched.city  ? true : false }
                    helperText={touched.city && errors.city}
                    onBlur={handleBlur}
                    onInput={(e)=>onlyLetters(e)}
                    inputProps={{style:{textTransform:"capitalize"}}}
                />
                <TextField
                    label="Kod pocztowy"
                    fullWidth
                    margin="dense"
                    name="postCode"
                    onChange={handleChange}
                    value={values.postCode}
                    error = { errors.postCode && touched.postCode  ? true : false }
                    helperText={touched.postCode && errors.postCode}
                    onBlur={handleBlur}
                    inputProps={{maxLength:6,}}
                    onInput={(e)=>{
                        onlyNumbers(e);
                    }}
                />
                <TextField
                    label="Ulica"
                    fullWidth
                    margin="dense"
                    name="street"
                    onChange={handleChange}
                    value={values.street}
                    error = { errors.street && touched.street  ? true : false }
                    helperText={touched.street && errors.street}
                    onBlur={handleBlur}
                    onInput={(e)=>onlyLetters(e)}
                    inputProps={{style:{textTransform:"capitalize"}}}
                />
                <TextField
                    label="Numer lokalu"
                    fullWidth
                    margin="dense"
                    name="houseNumber"
                    onChange={handleChange}
                    value={values.houseNumber}
                    error = { errors.houseNumber && touched.houseNumber  ? true : false }
                    helperText={touched.houseNumber && errors.houseNumber}
                    onBlur={handleBlur}
                />
                <TextField
                    label="Numer telefonu"
                    fullWidth
                    margin="dense"
                    name="phoneNumber"
                    onChange={handleChange}
                    value={values.phoneNumber}
                    error = { errors.phoneNumber && touched.phoneNumber  ? true : false }
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    onBlur={handleBlur}
                    onInput={(e)=>onlyNumbers(e)}
                />
        </Box>
    )
}
export default RestaurantContact;
