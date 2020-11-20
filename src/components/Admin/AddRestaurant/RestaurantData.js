import React from "react";
import {Box, Button, TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import {onlyNumbers} from "../../../helpers/_validation";
import {useFormikContext} from "formik";
import {makeStyles} from "@material-ui/core/styles";
import {cuisineType} from "../../../helpers/_helpers";

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

const RestaurantData = ({withPhoto})=>{
    const classes = useStyles();
    const {values, handleChange,errors,handleBlur,touched,setFieldValue } = useFormikContext();

    return(
        <Box display="flex" flexDirection="column">
                <TextField
                    label="Nazwa restauracji:"
                    fullWidth
                    margin="dense"
                    name="name"
                    onChange={handleChange}
                    value={values.name}
                    error = { errors.name && touched.name ? true : false }
                    helperText={touched.name && errors.name}
                    onBlur={handleBlur}
                />
                <Autocomplete
                    multiple
                    style={{maxHeight:400}}
                    onChange={(item,value)=>{
                        setFieldValue("category",value)
                    }}
                    onBlur={handleBlur}
                    noOptionsText="Brak opcji"
                    options={cuisineType}
                    getOptionLabel={option => option.label}
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
                />
                <Box mt={2}/>
            {
                withPhoto &&
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

                    <Box mt={2}>
                        {values.image && <img src = {URL.createObjectURL(values.image)} alt = "Logo" className={classes.addedImagePreview}/>}
                    </Box>
                    </div>
                }

        </Box>
    )
}
export default RestaurantData;
