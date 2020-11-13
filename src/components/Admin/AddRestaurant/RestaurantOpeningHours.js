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
                            values.openingHours.map(({label,openFrom,openTo},index)=>(
                                <TableRow key ={label}>
                                    <TableCell>{label}</TableCell>
                                    <TableCell>
                                        <TextField
                                            type="time"
                                            name={`openingHours[${index}].openFrom`}
                                            value={values.openingHours[index].openFrom}
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
                                            name={`openingHours[${index}].openUntil`}
                                            value={values.openingHours[index].openUntil}
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
                                            onClick={()=>handleClear(`openingHours[${index}].openFrom`, `openingHours[${index}].openUntil`)}
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
