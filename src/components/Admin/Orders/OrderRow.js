import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    AccordionActions,
    Typography,
    Chip,
    Button,
    Divider,
    Box,
    Grid,
    Hidden,
    TableHead,
    TableCell,
    TableRow,
    Checkbox,
    TableContainer,
    Table,
    TableBody, Grow,
    FormGroup,FormControlLabel,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import MapIcon from '@material-ui/icons/Map';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import PaymentIcon from '@material-ui/icons/Payment';
import PhoneIcon from '@material-ui/icons/Phone';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import {
    orderStatus,
    orderType as selectOrderType,
    orderTypeTranslate, paymentType,
    paymentTypeTranslate
} from "../../../helpers/_helpers";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {
    changeAllMealsStatus,
    changeMealStatus,
    changeOrderPayStatus,
    changeOrderStatus
} from "../../../redux/actions/orders";
import {errorAlert} from "../../../redux/actions/alert";
import ProgressButton from "../../ProgressButton";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginBottom:theme.spacing(1),
        [theme.breakpoints.up('md')]:{
            width:'calc(100% - 103px)'
        }
    },
    accordionSummary:{
        height: 80
    },
    accordionActions:{
        justifyContent:'flex-end',
    },
    dividerStyle:{
        padding:'20px 0',
    },
    typographyHidden:{
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        width: "100%",
        display: "block",
        overflow: "hidden"
    }
}));

const OrderRow = ({restaurantId,orderIndex,time,meals,price,...order}) =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const isRequesting = useSelector(state=>state.orders.isRequesting);

    return (
        <Grow in={true} timeout={500}>
            <div className={classes.root}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        classes={{root:classes.accordionSummary}}
                    >
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs = {3} sm = {2}>
                                <Typography variant = "h5" >{moment(time).format("DD-MM-YYYY")}</Typography>
                                <Typography variant="subtitle2">
                                {moment(time).format("HH:mm")}
                            </Typography>

                            </Grid>
                            <Hidden xsDown>
                                <Grid container item sm = {5}>
                                    <Typography className={classes.typographyHidden}>
                                        {meals.map(meal=>meal.name).join(", ")}
                                    </Typography>
                                </Grid>
                            </Hidden>
                            <Grid item xs = {4} sm = {2}>
                                <Chip
                                    icon={order.orderType === selectOrderType.DELIVERY  ? <DirectionsCarIcon /> : order.orderType === selectOrderType.IN_LOCAL ? <RestaurantIcon/> : <LocalMallIcon/>}
                                    label={orderTypeTranslate(order.orderType) || "Na wynos"}
                                    variant="outlined"
                                    color="secondary"
                                />
                            </Grid>
                            <Grid container item xs = {5} sm = {3} justify="flex-end" alignItems="center">
                                <PaymentIcon color="primary" fontSize="small"/>
                                <Box ml={1} mr={1}>
                                <Typography variant="body1" style={{fontWeight:500}}> {price.toFixed(2)} zł</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="h5"  color="secondary">{paymentTypeTranslate(order.paymentMethod)}</Typography>
                                    <Typography variant="subtitle2">{order.payed ? "Zapłacono" : "Do zapłaty"}</Typography>

                                </Box>
                            </Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing ={5} direction="row">
                            <Grid item xs = {12} md = {8}>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                {
                                                    order.orderStatus === orderStatus.IN_PROGRESS &&
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            checked={order.isAllMealsFinished}
                                                            onChange={e => dispatch(changeAllMealsStatus(orderIndex, e.target.checked))}
                                                        />
                                                    </TableCell>
                                                }
                                                <TableCell>ID</TableCell>
                                                <TableCell>Nazwa</TableCell>
                                                <TableCell>Ilosc</TableCell>
                                                <TableCell align="left"></TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {meals.map((meal,id)=>(
                                                <TableRow key = {id}>
                                                    {
                                                        order.orderStatus === orderStatus.IN_PROGRESS &&
                                                            <TableCell padding="checkbox">
                                                                <Checkbox
                                                                    checked={meal.isFinished}
                                                                    onChange={(e) => dispatch(changeMealStatus(meal.id, orderIndex, e.target.checked))}
                                                                />
                                                            </TableCell>
                                                    }
                                                    <TableCell padding="checkbox" align="center">#{id}</TableCell>
                                                    <TableCell>{meal.name}</TableCell>
                                                    <TableCell>{meal.quantity}</TableCell>
                                                    <TableCell align="left">
                                                        <Typography variant="subtitle2">{meal.ingredients}</Typography>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Box mt={2}/>
                                <Typography variant='h4'> Komentarz do zamówienia: </Typography>
                                <Typography variant='subtitle2'>{order.comment ? order.comment : "Brak"} </Typography>
                                <Hidden mdUp>
                                    <Box mb={2}/>
                                    <Divider variant="horizontal"/>

                                </Hidden>
                            </Grid>
                            <Hidden smDown>
                                <Grid container item xs = {12} md ={1} justify="center" className={classes.dividerStyle}>
                                    <Divider orientation="vertical"/>
                                </Grid>
                            </Hidden>
                            <Grid container item xs = {12} md ={3} direction="column" >
                                {order.street ?
                                    <>
                                    <Box display="flex" alignItems="center">
                                        <Box mr={1}>
                                            <MapIcon color="secondary"/>
                                        </Box>
                                        <Box>
                                            <Typography variant="body2">{order.forename} {order.surname}</Typography>
                                            <Typography variant="body2">{order.postCode} {order.city}</Typography>
                                            <Typography variant="body2"
                                                        gutterBottom>ul. {order.street} {order.houseNumber}</Typography>
                                        </Box>

                                    </Box>
                                    < Box display = "flex" alignItems="center">
                                        <Box mr={1}>
                                            <PhoneIcon color="secondary"/>
                                        </Box>
                                        <Typography variant="body2">{order.phoneNumber}</Typography>
                                    </Box>
                                    </>
                                    :
                                    <Typography variant="subtitle2">Zamówienie w restauracji</Typography>
                                }
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                    <Divider />
                    <AccordionActions classes={{root:classes.accordionActions}}>
                        <Box>
                            { order.orderStatus === orderStatus.DONE ? (
                                <Button
                                    size="small"
                                    color="secondary"
                                    startIcon={<DoubleArrowIcon/>}
                                    variant="outlined"
                                >
                                    Gotowe
                                </Button>
                            ) : (
                                order.orderStatus ===  orderStatus.IN_DELIVERY ? (
                                    <Box display = "flex" alignItems = "center">
                                        <FormGroup row>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        disabled={order.paymentMethod === paymentType.ONLINE}
                                                        checked={order.payed}
                                                        onChange={(e)=>dispatch(changeOrderPayStatus(order.id,e.target.checked))}
                                                    />
                                                }
                                                label="Zapłacono"
                                            />
                                        </FormGroup>
                                        <ProgressButton
                                            label="Gotowe"
                                            size="small"
                                            color="secondary"
                                            startIcon={<DoubleArrowIcon/>}
                                            variant="outlined"
                                            loading={isRequesting}
                                            onClick={()=>{
                                                if(order.payed){
                                                    dispatch(changeOrderStatus(restaurantId,order,orderStatus.DONE))
                                                }else{
                                                    dispatch(errorAlert("Zamówienie musi zostać opłacone!"))
                                                }
                                            }}
                                        />
                                </Box>
                                    ):(
                                        <Box display="flex" alignItems="center">
                                            <Box mr={1}/>
                                            <ProgressButton
                                                label="Gotowe"
                                                size="small"
                                                color="secondary"
                                                startIcon={<DoubleArrowIcon/>}
                                                variant="outlined"
                                                loading={isRequesting}
                                                onClick={()=>{
                                                    if(order.isAllMealsFinished){
                                                        dispatch(changeOrderStatus(restaurantId,order,orderStatus.IN_DELIVERY))
                                                    }else{
                                                        dispatch(errorAlert("Wszystkie posiłki muszą być gotowe!"))
                                                    }
                                                }}
                                            />
                                        </Box>
                                    )
                                )
                            }
                        </Box>
                    </AccordionActions>
                </Accordion>
            </div>
        </Grow>
    );
}
export default OrderRow;
