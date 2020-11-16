import React from "react";
import {
    Box,
    Button,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@material-ui/core";
import {useFormikContext} from "formik";


const RestaurantOpeningHours = ()=>{
    const {values,handleChange,setFieldValue } = useFormikContext();


    const handleClear = (nameFrom,nameTo) =>{
        setFieldValue(nameFrom,"");
        setFieldValue(nameTo,"");
    }
    return(
        <Box  p={2}>
            <TableContainer >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Dzień</TableCell>
                            <TableCell>Od</TableCell>
                            <TableCell>Do</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            values.openingHours.map(({label},index)=>(
                                <TableRow key ={label}>
                                    <TableCell>{label}</TableCell>
                                    <TableCell>
                                        <TextField
                                            type="time"
                                            name={`openingHours[${index}].from`}
                                            value={values.openingHours[index].from}
                                            onChange={handleChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{
                                                step: 60,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            type="time"
                                            name={`openingHours[${index}].to`}
                                            value={values.openingHours[index].to}
                                            onChange={handleChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{
                                                step: 60,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            color="primary"
                                            variant="outlined"
                                            onClick={()=>handleClear(`openingHours[${index}].from`, `openingHours[${index}].to`)}
                                        >Zamknięte</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }


                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
export default RestaurantOpeningHours;
