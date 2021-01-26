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
import {orderTypeTranslate, statsType} from "../../helpers/_helpers";
import {useDispatch} from "react-redux";
import {errorAlert} from "../../redux/actions/alert";
import moment from 'moment';

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
                dispatch(errorAlert("Błąd pobierania danych!"))
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
                                iconValue={<AttachMoneyIcon color="secondary"/>}
                                icon={<ShoppingCartIcon fontSize="inherit"/>}
                                firstLabel="Dzisiejsze przychody"
                                firstValue={`${stats?.profit.filter(item=>item.time === statsType.TODAY)[0].price} zł`}
                                secondLabel="Miesięczne przychody"
                                secondValue={`${stats?.profit.filter(item=>item.time === statsType.MONTH)[0].price} zł`}
                                title="Sprzedaż"
                                tertiaryLabel="Całkowite przychody"
                                tertiaryValue={`${stats?.profit.filter(item=>item.time === statsType.TOTAL)[0].price} zł`}
                            />
                        </Grid>
                        <Grid item xs = {12} md = {6}>
                            <SmallCard
                                color="secondary"
                                iconValue={<MenuBookIcon color="secondary"/>}
                                icon={<MenuBookIcon fontSize="inherit"/>}
                                firstLabel="Dzisiejsze zamówienia"
                                firstValue={stats?.counts.filter(item=>item.time === statsType.TODAY)[0].count}
                                secondLabel="Miesięczne zamówienia"
                                secondValue={`${stats?.counts.filter(item=>item.time === statsType.MONTH)[0].count}`}
                                title="Zamówienia"
                                tertiaryLabel="Wszystkie zamówienia"
                                tertiaryValue={`${stats?.counts.filter(item=>item.time === statsType.TOTAL)[0].count} `}
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
                                        {stats?.lastOrders.map((row,index) => {
                                            if(index < 9){
                                                return(
                                                    <TableRow key={row.id}>
                                                        <TableCell align="left" component="th" scope="row"> {row.meals}</TableCell>
                                                        <TableCell align="right">{moment(row.time).format("YYYY-MM-DD HH:mm")}</TableCell>
                                                        <TableCell align="right">{row.price}</TableCell>
                                                        <TableCell align="right">{orderTypeTranslate(row.orderType)}</TableCell>
                                                    </TableRow>
                                                )
                                            }
                                        }
                                        )}
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
