import React, {useEffect, useState} from "react";
import {
    Paper,
    Grid,
    Typography,
    Box,
    List,
    ListItem,
    Chip,
    Button,
    Divider,
    ListItemText,
    ListItemIcon,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    CircularProgress, Backdrop
} from "@material-ui/core";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {makeStyles} from "@material-ui/core/styles";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { Doughnut } from 'react-chartjs-2';
import SmallCard from "../../components/Admin/Dashboard/SmallCard";
import {orderService} from "../../services/ordersService";
import {orderType, orderTypeTranslate, paymentType, statsType} from "../../helpers/_helpers";
import {useDispatch} from "react-redux";
import moment from 'moment';
import {restaurantConstants} from "../../redux/types";
import SmallCardElement from "../../components/Admin/Dashboard/SmallCardElement";
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import PaymentIcon from '@material-ui/icons/Payment';
import MoneyIcon from '@material-ui/icons/Money';

const useStyles = makeStyles(theme=>({
    middleCart:{
        padding:theme.spacing(2),
    },
}));

const backgroundColors=[
    '#FF6384',
    '#36A2EB',
    '#FFCE56'
]

const RestaurantDashboard = ({match}) =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [popularMeals, setPopularMeals] = useState([]);
    const [popularMealsType, setPopularMealsType] = useState(statsType.TODAY)
    //
    useEffect(()=>{
        setIsLoading(true);
        orderService.getStats(match.params.restaurantId)
            .then((response)=>{
                setIsLoading(false);
                setStats(response.data)
            })
            .catch(()=>{
                setIsLoading(false);
                dispatch({type:restaurantConstants.GET_SINGLE_RESTAURANT_FOR_ADMIN_ERROR, payload:500})
            })
    },[match.params.restaurantId,dispatch])

    useEffect(()=>{
        const popularMealsArray = stats?.popularMeals.find(item=> item.time === popularMealsType).meals.sort((a,b)=> Number(a.count) < Number(b.count)).slice(0,3);
        setPopularMeals(popularMealsArray);
    },[stats,popularMealsType])

    return(
        <>
            <Box mb={4}>
                <Typography variant="h3">Strona główna:</Typography>
                <Typography variant="subtitle2" paragraph >Przejmij kontrolę nad wydatkami restauracji!</Typography>
            </Box>
            {isLoading ? (
                <Backdrop  open={isLoading} invisible>
                    <CircularProgress color="inherit" />
                </Backdrop>
            ):(
                <>
                    <Grid container spacing={2}>
                        <Grid item xs = {12} md = {6}>
                            <SmallCard
                                color="secondary"
                                icon={<ShoppingCartIcon fontSize="inherit"/>}
                                firstLabel="Dzisiejsze przychody"
                                firstChildren={
                                    <SmallCardElement
                                        value={`${stats?.profit.filter(item=>item.time === statsType.TODAY)[0].price} zł`}
                                        icon={<AttachMoneyIcon color="secondary"/>}
                                    />
                                }
                                secondLabel="Miesięczne przychody"
                                secondChildren={
                                    <SmallCardElement
                                        value={`${stats?.profit.filter(item=>item.time === statsType.MONTH)[0].price} zł`}
                                        icon={<AttachMoneyIcon color="secondary"/>}
                                    />
                                    }
                                title="Sprzedaż"
                                tertiaryLabel="Całkowite przychody"
                                tertiaryChildren={
                                    <SmallCardElement
                                        value={`${stats?.profit.filter(item=>item.time === statsType.TOTAL)[0].price} zł`}
                                        icon={<AttachMoneyIcon color="secondary"/>}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs = {12} md = {6}>
                            <SmallCard
                                color="primary"
                                icon={<MenuBookIcon fontSize="inherit"/>}
                                firstLabel="Dzisiejsze zamówienia"
                                firstChildren={
                                    <SmallCardElement
                                        value={`${stats?.counts.filter(item=>item.time === statsType.TODAY)[0].count}`}
                                        icon={<MenuBookIcon color="secondary"/>}
                                    />
                                }
                                secondLabel="Miesięczne zamówienia"
                                secondChildren={
                                    <SmallCardElement
                                        value={`${stats?.counts.filter(item=>item.time === statsType.MONTH)[0].count} `}
                                        icon={<MenuBookIcon color="secondary"/>}
                                    />
                                }
                                title="Zamówienia"
                                tertiaryLabel="Wszystkie zamówienia"
                                tertiaryChildren={
                                    <SmallCardElement
                                        value={`${stats?.counts.filter(item=>item.time === statsType.TOTAL)[0].count}`}
                                        icon={<MenuBookIcon color="secondary"/>}
                                    />
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs = {12} md = {6}>
                            <SmallCard
                                color="primary"
                                icon={<RestaurantIcon fontSize="inherit"/>}
                                firstLabel="Dzisiejsze rodzaje dostaw"
                                firstChildren={
                                    <>
                                        <SmallCardElement
                                            value={`${stats?.typedCounts.filter(item=>item.time === statsType.TODAY && item.type=== orderType.DELIVERY)[0].count}`}
                                            icon={<DirectionsCarIcon color="secondary"/>}
                                        />
                                        <SmallCardElement
                                        value={`${stats?.typedCounts.filter(item=>item.time === statsType.TODAY && item.type=== orderType.IN_LOCAL)[0].count}`}
                                        icon={<RestaurantIcon color="secondary"/>}
                                        />
                                        <SmallCardElement
                                        value={`${stats?.typedCounts.filter(item=>item.time === statsType.TODAY && item.type=== orderType.TAKE_AWAY)[0].count}`}
                                        icon={<LocalMallIcon color="secondary"/>}
                                        />
                                    </>
                                }
                                secondLabel="Miesięczne rodzaje dostaw"
                                secondChildren={
                                    <>
                                        <SmallCardElement
                                            value={`${stats?.typedCounts.filter(item=>item.time === statsType.MONTH && item.type=== orderType.DELIVERY)[0].count}`}
                                            icon={<DirectionsCarIcon color="secondary"/>}
                                        />
                                        <SmallCardElement
                                            value={`${stats?.typedCounts.filter(item=>item.time === statsType.MONTH && item.type=== orderType.IN_LOCAL)[0].count}`}
                                            icon={<RestaurantIcon color="secondary"/>}
                                        />
                                        <SmallCardElement
                                            value={`${stats?.typedCounts.filter(item=>item.time === statsType.MONTH && item.type=== orderType.TAKE_AWAY)[0].count}`}
                                            icon={<LocalMallIcon color="secondary"/>}
                                        />
                                    </>
                                }
                                title="Rodzaje dostaw"
                                tertiaryLabel="Całkowite rodzaje dostaw"
                                tertiaryChildren={
                                    <>
                                        <SmallCardElement
                                            value={`${stats?.typedCounts.filter(item=>item.time === statsType.TOTAL && item.type=== orderType.DELIVERY)[0].count}`}
                                            icon={<DirectionsCarIcon color="secondary"/>}
                                        />
                                        <SmallCardElement
                                            value={`${stats?.typedCounts.filter(item=>item.time === statsType.TOTAL && item.type=== orderType.IN_LOCAL)[0].count}`}
                                            icon={<RestaurantIcon color="secondary"/>}
                                        />
                                        <SmallCardElement
                                            value={`${stats?.typedCounts.filter(item=>item.time === statsType.TOTAL && item.type=== orderType.TAKE_AWAY)[0].count}`}
                                            icon={<LocalMallIcon color="secondary"/>}
                                        />
                                    </>
                                }
                            />
                        </Grid>
                        <Grid item xs = {12} md = {6} >
                            <SmallCard
                                color="secondary"
                                icon={<PaymentIcon fontSize="inherit"/>}
                                firstLabel="Lb. dzisiejszych płatności"
                                firstChildren={
                                    <>
                                        <SmallCardElement
                                            value={`${stats?.paymentCount.filter(item=>item.time === statsType.TODAY && item.paymentMethod=== paymentType.CASH)[0].count}`}
                                            icon={<MoneyIcon color="secondary"/>}
                                        />
                                        <SmallCardElement
                                            value={`${stats?.paymentCount.filter(item=>item.time === statsType.TODAY && item.paymentMethod=== paymentType.ONLINE)[0].count}`}
                                            icon={<PaymentIcon color="secondary"/>}
                                        />
                                    </>
                                }
                                secondLabel="Lb. miesięcznych płatności"
                                secondChildren={
                                    <>
                                        <SmallCardElement
                                            value={`${stats?.paymentCount.filter(item=>item.time === statsType.MONTH && item.paymentMethod=== paymentType.CASH)[0].count}`}
                                            icon={<MoneyIcon color="secondary"/>}
                                        />
                                        <SmallCardElement
                                            value={`${stats?.paymentCount.filter(item=>item.time === statsType.MONTH && item.paymentMethod=== paymentType.ONLINE)[0].count}`}
                                            icon={<PaymentIcon color="secondary"/>}
                                        />
                                    </>
                                }
                                title="Rodzaje płatności"
                                tertiaryLabel="Lb. wszystkich płatności"
                                tertiaryChildren={
                                    <>
                                        <SmallCardElement
                                            value={`${stats?.paymentCount.filter(item=>item.time === statsType.TOTAL && item.paymentMethod=== paymentType.CASH)[0].count}`}
                                            icon={<MoneyIcon color="secondary"/>}
                                        />
                                        <SmallCardElement
                                            value={`${stats?.paymentCount.filter(item=>item.time === statsType.TOTAL && item.paymentMethod=== paymentType.ONLINE)[0].count}`}
                                            icon={<PaymentIcon color="secondary"/>}
                                        />
                                    </>
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} style={{marginTop:8}}>
                        <Grid item lg={4} md ={6} xs={12}>
                            <Paper elevation={3} className={classes.middleCart}>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Typography variant="h4" paragraph>Popularne posiłki</Typography>
                                    <ButtonGroup size="small">
                                        <Button
                                            onClick={()=>setPopularMealsType(statsType.TODAY)}
                                            {...(popularMealsType === statsType.TODAY ?
                                                {
                                                    variant:"contained",
                                                    color:"primary"
                                                } : {}
                                            )}
                                        >
                                            Dzisiaj
                                        </Button>
                                        <Button
                                            onClick={()=>setPopularMealsType(statsType.MONTH)}
                                            {...(popularMealsType === statsType.MONTH ?
                                                    {
                                                        variant:"contained",
                                                        color:"primary"
                                                    } : {}
                                            )}
                                        >
                                            W miesiącu
                                        </Button>
                                        <Button
                                            onClick={()=>setPopularMealsType(statsType.TOTAL)}
                                            {...(popularMealsType === statsType.TOTAL ?
                                                    {
                                                        variant:"contained",
                                                        color:"primary"
                                                    } : {}
                                            )}
                                        >
                                            Całkowite
                                        </Button>
                                    </ButtonGroup>
                                </Box>
                                <Box mb={6}/>
                                {popularMeals?.length ? (
                                    <Doughnut data={{
                                        labels: popularMeals.map(meal=>meal.meal),
                                        datasets: [{
                                            data: popularMeals.map(meal=>Number(meal.count)),
                                            backgroundColor: backgroundColors
                                        }]
                                    }}/>
                                ) : (
                                    <Box minHeight="250px" display="flex" alignItems="center" justifyContent="center">
                                        <Typography variant="h3" style={{color: "#e7e7e7"}}>Brak danych</Typography>
                                    </Box>
                                )
                                }
                                <Box mb={6}/>
                                <List component="nav">
                                    {popularMeals?.map((meal,index)=>(
                                        <Box key = {index}>
                                            <ListItem >
                                                <ListItemIcon>
                                                    <Chip style={{backgroundColor:backgroundColors[index], color:"white",minWidth:70}} label={`${meal.count} szt`}/>
                                                </ListItemIcon>
                                                <ListItemText primary={meal.meal}  inset/>
                                            </ListItem>
                                            <Divider />
                                        </Box>
                                    ))}
                                </List>
                            </Paper>
                        </Grid>
                        <Grid item lg={8} md ={6} xs={12}>
                            <Paper elevation={3} className={classes.middleCart}>
                                <Typography variant="h4" paragraph>Ostatnie zamówienia</Typography>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Zamówienie</TableCell>
                                            <TableCell align="right">Data</TableCell>
                                            <TableCell align="right">Cena(zł)</TableCell>
                                            <TableCell align="right">Dostawa</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        { stats?.lastOrders.length ? (
                                             stats.lastOrders.map((row,index) => {
                                                    if(index < 9){
                                                        return(
                                                            <TableRow key={row.id}>
                                                                <TableCell align="left"> {row.meals}</TableCell>
                                                                <TableCell align="right">{moment(row.time).format("YYYY-MM-DD HH:mm")}</TableCell>
                                                                <TableCell align="right">{row.price}</TableCell>
                                                                <TableCell align="right">{orderTypeTranslate(row.orderType)}</TableCell>
                                                            </TableRow>
                                                        )
                                                    }else{
                                                        return null
                                                    }
                                                }
                                            )
                                        ):(
                                                <TableRow>
                                                    <TableCell colSpan={4}>
                                                        <Box minHeight="250px" display="flex" alignItems="center" justifyContent="center">
                                                            <Typography variant="h3" style={{color: "#e7e7e7"}}>Brak danych</Typography>
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }
                                        </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                    </Grid>
                </>
            )}

        </>
    )
}
export default RestaurantDashboard;
