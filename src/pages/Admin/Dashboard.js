import React, {useState} from "react";
import {Typography,Card,CardActionArea,CardContent,CardMedia, Grid, Fab} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import appLogo from '../../helpers/_helpers';
import AddRestaurantStepper from "../../components/Admin/AddRestaurant/AddRestaurantStepper";
const useStyles = makeStyles(theme=>({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    progressPosition:{
        height:'calc(100vh - 115px)',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    },
    cardChecked:{
            border: `5px solid ${theme.palette.secondary.main}`
    }
}));

const Dashboard = () =>{
    const classes = useStyles();
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleToggleDialog=()=>{
        setDialogOpen(!isDialogOpen);
    }

    return(
        <>
        <Typography variant="h3">Twoje restauracje:</Typography>
        <Typography variant="subtitle2" paragraph >Kliknij w kartę i zarządzaj wybraną restauracją!</Typography>
            <AddRestaurantStepper isDialogOpen={isDialogOpen} setDialogOpen={handleToggleDialog}/>
            <Grid container spacing={2}>
                <Grid item xs={12} md = {6} lg = {4} xl = {3}>
                    <Card raised >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="200"
                                image={appLogo}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                    across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} md = {6} lg = {4} xl = {3}>
                    <Card raised className={classes.cardChecked}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="200"
                                image={appLogo}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                    across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
            <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleToggleDialog}>
                <AddIcon />
            </Fab>
        </>
    );

}
export default Dashboard;
