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
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
}));

const RestaurantOpeningHours = ()=>{
    const classes = useStyles();
    const {values,handleSubmit, handleChange,errors,handleBlur,touched,setFieldValue } = useFormikContext();
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
                        <TableRow>
                            <TableCell>Poniedziałek</TableCell>
                            <TableCell>
                                <TextField
                                    type="time"
                                    defaultValue="07:00"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300,
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    type="time"
                                    defaultValue="20:00"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300,
                                    }}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <Button color="primary" variant="outlined">Zamknięte</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Wtorek</TableCell>
                            <TableCell>
                                <TextField
                                    type="time"
                                    defaultValue="07:00"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300,
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    type="time"
                                    defaultValue="20:00"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300,
                                    }}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <Button color="primary" variant="outlined">Zamknięte</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Środa</TableCell>
                            <TableCell>
                                <TextField
                                    type="time"
                                    defaultValue="07:00"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300,
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    type="time"
                                    defaultValue="20:00"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300,
                                    }}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <Button color="primary" variant="outlined">Zamknięte</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Czwartek</TableCell>
                            <TableCell>
                                <TextField
                                    type="time"
                                    defaultValue="07:00"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300,
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    type="time"
                                    defaultValue="20:00"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300,
                                    }}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <Button color="primary" variant="outlined">Zamknięte</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Piątek</TableCell>
                            <TableCell>
                                <TextField
                                    type="time"
                                    defaultValue="07:00"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300,
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    type="time"
                                    defaultValue="20:00"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300,
                                    }}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <Button color="primary" variant="outlined">Zamknięte</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Sobota</TableCell>
                            <TableCell>
                                <TextField
                                    type="time"
                                    defaultValue="07:00"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300,
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    type="time"
                                    defaultValue="20:00"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300,
                                    }}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <Button color="primary" variant="outlined">Zamknięte</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Niedziela</TableCell>
                            <TableCell>
                                <TextField
                                    type="time"
                                    defaultValue="07:00"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300,
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    type="time"
                                    defaultValue="20:00"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300,
                                    }}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <Button color="primary" variant="outlined">Zamknięte</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
export default RestaurantOpeningHours;
