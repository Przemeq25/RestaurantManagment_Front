import React from "react";
import {
    Button,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@material-ui/core";
import {useFormikContext} from "formik";
import {worksTimeDaysTranslate} from "../../../helpers/_helpers";


const RestaurantOpeningHours = ()=>{
    const {values,handleChange,setFieldValue } = useFormikContext();


    const handleClear = (nameFrom,nameTo) =>{
        setFieldValue(nameFrom,"");
        setFieldValue(nameTo,"");
    }
    return(
            <TableContainer>
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
                            values.worksTime.map(({day},index)=>(
                                <TableRow key ={day}>
                                    <TableCell>{worksTimeDaysTranslate(day)}</TableCell>
                                    <TableCell>
                                        <TextField
                                            type="time"
                                            name={`worksTime[${index}].from`}
                                            value={values.worksTime[index].from}
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
                                            name={`worksTime[${index}].to`}
                                            value={values.worksTime[index].to}
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
                                            onClick={()=>handleClear(`worksTime[${index}].from`, `worksTime[${index}].to`)}
                                        >Zamknięte</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }


                    </TableBody>
                </Table>
            </TableContainer>
    )
}
export default RestaurantOpeningHours;
