import React, {useState} from "react";
import {Box, Button, TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import {onlyNumbers} from "../../../helpers/_validation";
import {useFormikContext} from "formik";
import {makeStyles} from "@material-ui/core/styles";
import {cuisineType, getCuisineTypeKey} from "../../../helpers/_helpers";

const useStyles = makeStyles(() => ({
    input: {
        display: 'none',
    },
    addedImagePreview:{
        objectFit:'cover',
        maxHeight:200,
        maxWidth:"100%",
    }


}));

const RestaurantData = ()=>{
    const classes = useStyles();
    const {values, handleChange,errors,handleBlur,touched,setFieldValue } = useFormikContext();

    return(
        <Box display="flex" flexDirection="column" p={2}>
                <TextField
                    label="Nazwa restauracji:"
                    fullWidth
                    margin="dense"
                    name="restaurantName"
                    onChange={handleChange}
                    value={values.restaurantName}
                    error = { errors.restaurantName && touched.restaurantName ? true : false }
                    helperText={touched.restaurantName && errors.restaurantName}
                    onBlur={handleBlur}
                />
                <Autocomplete
                    multiple
                    style={{maxHeight:400}}
                    onChange={(item,value)=>{
                        setFieldValue("category",value)
                        setFieldValue("categoryEnum",getCuisineTypeKey(value))
                    }}
                    onBlur={handleBlur}
                    noOptionsText="Brak opcji"
                    options={cuisineType.cusineTypeOptions}
                    value={values.category}

                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error = { errors.category && touched.category ? true : false }
                            helperText={touched.category  && errors.category}
                            name="category"
                            variant="standard"
                            label="Typ kuchni:"
                        />
                    )}
                />
                <TextField
                    label="NIP"
                    fullWidth
                    margin="dense"
                    onChange={handleChange}
                    value={values.nip}
                    name="nip"
                    onInput={(e)=>onlyNumbers(e)}
                    error = { errors.nip && touched.nip ? true : false }
                    helperText={touched.nip  && errors.nip}
                    onBlur={handleBlur}
                    inputProps={{maxLength:10}}

                />
                <TextField
                    label="REGON"
                    fullWidth
                    margin="dense"
                    onChange={handleChange}
                    value={values.regon}
                    name="regon"
                    onInput={(e)=>onlyNumbers(e)}
                    inputProps={{maxLength:9}}
                    error = { errors.regon && touched.regon ? true : false }
                    helperText={touched.regon  && errors.regon}
                    onBlur={handleBlur}

                />
                <TextField
                    label="Opis"
                    fullWidth
                    margin="dense"
                    multiline
                    onChange={handleChange}
                    value={values.description}
                    name="description"
                    inputProps={{style:{textTransform:"capitalize"}}}
                />
                <Box mt={2}/>
                <div>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        type="file"
                        onChange={e=> setFieldValue("image",e.target.files[0])}
                        name="image"
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" color="secondary" component="span">
                            {values.image ? "Zmień zdjęcie" : "Dodaj zdjęcie"}
                        </Button>
                    </label>
                </div>
                <Box mt={2}>
                    {values.image && <img src = {URL.createObjectURL(values.image)} alt = "Logo" className={classes.addedImagePreview}/>}
                </Box>

        </Box>
    )
}
export default RestaurantData;
