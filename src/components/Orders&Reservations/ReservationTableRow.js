import React from 'react';
import {
    TableRow,
    TableCell,
} from "@material-ui/core";


const ReservationTableRow = ({row}) =>{
    return (
        <>
            <TableRow hover>
                <TableCell>
                    {row.day}
                </TableCell>
                <TableCell>
                    {row.from}
                </TableCell>
                <TableCell>
                    {row.to}
                </TableCell>
                <TableCell>
                    {row.sizeOfTable}
                </TableCell>
                <TableCell>
                    {row.restaurantName}
                </TableCell>
            </TableRow>
        </>
    )
}
export default ReservationTableRow;
