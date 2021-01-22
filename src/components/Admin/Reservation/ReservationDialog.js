import React, {useEffect} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {useDispatch, useSelector} from "react-redux";
import {getReservations, toggleReservationDialog} from "../../../redux/actions/reservations";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Jumbotron from "../../Jumbotron";
import Box from "@material-ui/core/Box";
import {
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme=>({
    closeButton:{
        position:'absolute',
        top:theme.spacing(1),
        right:theme.spacing(1),
    }
}))


const ReservationDialog = ({restaurantId}) =>{
    const isOpen = useSelector(state=>state.reservations.isDialogOpen);
    const isFetching = useSelector(state=>state.reservations.isFetching);
    const reservations = useSelector(state=>state.reservations.reservations);
    const dispatch = useDispatch();
    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));
    const classes = useStyles();

    useEffect(()=>{
       isOpen &&  dispatch(getReservations(restaurantId))
    },[dispatch,restaurantId,isOpen])

    return(
        <Dialog
            open={isOpen}
            onClose={()=>dispatch(toggleReservationDialog())}
            scroll="paper"
            fullScreen={mdDown}
            maxWidth={false}
        >
            <MuiDialogTitle disableTypography>
                    <Typography variant="h6">Rezerwacje</Typography>
                    <IconButton onClick={()=>dispatch(toggleReservationDialog())} className={classes.closeButton}>
                        <CloseIcon/>
                    </IconButton>
            </MuiDialogTitle>

            <DialogContent dividers={true}>
                <Box minWidth={mdDown? "100%" :"800px"} minHeight="400px" position="relative">
                    {isFetching ? (
                        <Box alignItems="center" justifyContent="center" width='100%' display="flex">
                            <CircularProgress color="primary"/>
                        </Box>
                    ):(
                        reservations.length ? (
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Dzień</TableCell>
                                            <TableCell align="center">Lb.miejsc | Nazwa</TableCell>
                                            <TableCell>Od</TableCell>
                                            <TableCell>Do</TableCell>
                                            <TableCell>Dane</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {reservations.map((reservation,index)=>(
                                                <TableRow key = {index}>
                                                    <TableCell padding="checkbox" align="center">{reservation.day}</TableCell>
                                                    <TableCell align="center">{reservation.sizeOfTable} | {reservation.tableName}</TableCell>
                                                    <TableCell>{reservation.from}</TableCell>
                                                    <TableCell>{reservation.to}</TableCell>
                                                    <TableCell>
                                                        <Box display="flex">
                                                            <Typography variant='subtitle1'>{reservation.forename}</Typography>
                                                            <Typography variant='subtitle1'>{reservation.surname}</Typography>
                                                        </Box>
                                                        <Typography>{reservation.phoneNumber}</Typography>
                                                    </TableCell>
                                                </TableRow>
                                        ))}
                                    </TableBody>

                                </Table>
                            </TableContainer>
                        ):(
                            <Jumbotron text ="Brak rezerwacji" buttonText="Zamknij okno"  handleClick={()=>dispatch(toggleReservationDialog())} size={20}/>
                        )
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    )
}
export default ReservationDialog;
