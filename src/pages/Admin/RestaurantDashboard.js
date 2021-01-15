import React from "react";
import {Paper,Grid,Typography,Box, List,ListItem,Chip,Button,Divider,ListItemSecondaryAction,ListItemText,ListItemIcon,Table,TableHead,TableCell,TableBody,TableRow} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { Doughnut } from 'react-chartjs-2';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SmallCard from "../../components/Admin/Dashboard/SmallCard";
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles(theme=>({
    middleCart:{
        padding:theme.spacing(2),
    },
}));

const RestaurantDashboard = ({match}) =>{
    const classes = useStyles();

    function createData(name, calories, fat, carbs) {
        return { name, calories, fat, carbs };
    }

    const rows = [
        createData('Hawajska,Meksykańska', '#159', '2020-12-15', 80.99),
        createData('Meksykańska', '#160', '2020-12-15', 35.00),
        createData('Meksykańska', '#161', '2020-12-16', 35.00),
        createData('Hawajska', '#162', '2020-12-16', 32.00),
        createData('Margherita', '#163', '2020-12-16', 25.00),
        createData('Margherita,Cola', '#164', '2020-12-16', 29.00),
        createData('Meksykańska,Pepsi', '#165', '2020-12-16', 39.00),
    ];

    return(
        <>
            <Box mb={4}>
                <Typography variant="h3">Strona główna:</Typography>
                <Typography variant="subtitle2" paragraph >Przejmij kontrolę nad wydatkami restauracji!</Typography>
            </Box>
            <Grid container spacing={2}>
               <Grid item xs = {12} md = {4} sm={6} lg={3}>
                    <SmallCard
                        color="secondary"
                        iconValue={<AttachMoneyIcon color="secondary"/>}
                        icon={<ShoppingCartIcon fontSize="inherit"/>}
                        firstLabel="Dzisiejsze przychody"
                        firstValue="150 zł"
                        secondLabel="Miesięczne przychody"
                        secondValue="12 405 zł"
                        title="Sprzedaż"
                    />
               </Grid>
                <Grid item xs = {12} md = {4} sm={6} lg={3}>
                    <SmallCard
                        color="primary"
                        iconValue={<EmojiPeopleIcon color="secondary"/>}
                        icon={<EmojiPeopleIcon fontSize="inherit"/>}
                        firstLabel="Dzisiejsi goście"
                        firstValue="3"
                        secondLabel="Liczba gości w tym miesiącu"
                        secondValue="560"
                        title="Goście"
                    />
                </Grid>
                <Grid item xs = {12} md = {4} sm={6} lg={3}>
                    <SmallCard
                        color="secondary"
                        iconValue={<MenuBookIcon color="secondary"/>}
                        icon={<MenuBookIcon fontSize="inherit"/>}
                        firstLabel="Dzisiejsze zamówienia"
                        firstValue="30"
                        secondLabel="Miesięczne zamówienia"
                        secondValue="634"
                        title="Zamówienia"
                    />
                </Grid>
                <Grid item xs = {12} md = {4} sm={6} lg={3}>
                    <SmallCard
                        color="primary"
                        iconValue={<CommentIcon color="secondary"/>}
                        icon={<CommentIcon fontSize="inherit"/>}
                        firstLabel="Wszystkie komentarze"
                        firstValue="20"
                        title="Komentarze"
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} style={{marginTop:8}}>
                <Grid item lg={4} md ={6} xs={12}>
                    <Paper elevation={3} className={classes.middleCart}>
                        <Typography variant="h4" paragraph>Najlepsza sprzedaż</Typography>
                        <Box mb={6}/>
                            <Doughnut data={{
                                labels: [
                                    'Meksykańska',
                                    'Hawajska',
                                    'Margherita'
                                ],
                                datasets: [{
                                    data: [300, 50, 100],
                                    backgroundColor: [
                                        '#FF6384',
                                        '#36A2EB',
                                        '#FFCE56'
                                    ],
                                }]
                            }}/>
                        <Box mb={6}/>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem>
                                <ListItemIcon>
                                    <Chip style={{backgroundColor:"#FF6384", color:"white",minWidth:70}} label="300 szt"/>
                                </ListItemIcon>
                                <ListItemText primary="Meksykańska"  inset/>
                                <ListItemSecondaryAction>
                                    <Button variant ="text" startIcon={<VisibilityIcon color="disabled"/>}> Szczegóły</Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemIcon>
                                    <Chip style={{backgroundColor:"#36A2EB", color:"white" ,minWidth:70}} label="50 szt"/>
                                </ListItemIcon>
                                <ListItemText primary="Hawajska"  inset/>
                                <ListItemSecondaryAction>
                                    <Button variant ="text" startIcon={<VisibilityIcon color="disabled"/>}> Szczegóły</Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemIcon>
                                    <Chip style={{backgroundColor:"#FFCE56", color:"white",minWidth:70}} label="100 szt"/>
                                </ListItemIcon>
                                    <ListItemText primary="Margherita"  inset/>
                                    <ListItemSecondaryAction>
                                    <Button variant ="text" startIcon={<VisibilityIcon color="disabled"/>}> Szczegóły</Button>
                                    </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                        </List>
                        <Box display="flex" justifyContent="flex-end" mt={2}>
                            <Button variant="contained" color="secondary">Pokaż więcej</Button>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item lg={8} md ={6} xs={12}>
                    <Paper elevation={3} className={classes.middleCart}>
                        <Typography variant="h4" paragraph>Ostatnie zamówienia</Typography>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Nr zamówienia</TableCell>
                                    <TableCell align="left">Nazwa</TableCell>
                                    <TableCell align="right">Data</TableCell>
                                    <TableCell align="right">Cena(zł)</TableCell>
                                    <TableCell align="right">Szczegóły</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell>
                                            <b>{row.calories}</b>
                                        </TableCell>
                                        <TableCell align="left" component="th" scope="row"> {row.name}</TableCell>
                                        <TableCell align="right">{row.fat}</TableCell>
                                        <TableCell align="right">{row.carbs.toFixed(2)}</TableCell>
                                        <TableCell align="right">
                                            <Button variant ="contained" color="primary">Więcej</Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}
export default RestaurantDashboard;
