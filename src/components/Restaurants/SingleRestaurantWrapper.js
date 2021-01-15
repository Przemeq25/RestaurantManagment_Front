import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Navbar from "../Navbar";
import {Box, Button, Container, ButtonGroup, Typography,Slide} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating/Rating";
import {NavLink} from "react-router-dom";
import {routes} from "../../config/routes";
import AppLogo from "../AppLogo";
import {getCuisineTypeValue, isValidUrl} from "../../helpers/_helpers";
import {restaurantService} from "../../services/restaurantService";
import Avatar from "@material-ui/core/Avatar";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import OpinionDialog from "./OpinionsDialog";


const useStyles = makeStyles((theme)=>({
    pageBackground: {
        backgroundColor: 'rgba(248,248,248)',
        minHeight:'100vh',
        overflow:'hidden',
    },
    restaurantJumbotron:{
        [theme.breakpoints.down('xs')]:{
            clipPath: 'ellipse(80% 70% at 50% 30%)',
        },
        clipPath: 'ellipse(60% 70% at 50% 30%)',
        backgroundColor: theme.palette.secondary.dark,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
        padding:theme.spacing(10),
    },
    rating:{
        color:theme.palette.secondary.contrastText
    },
    ratingBox:{
        cursor:'pointer',
        position: "absolute",
        bottom:0,
        left:'50%',
        transform:'translateX(-50%)',
        zIndex:100,
        background: 'linear-gradient(0deg, rgba(0,0,0,0.767927239255077) 0%, rgba(244,244,244,0) 40%)',
        width: '100%',
        padding:theme.spacing(1),
        display:'flex',
        justifyContent:'center',
        alignItems:'flex-end',
        height: "100%",
    },
    activeButton:{
        background: theme.palette.primary.main,
        color: theme.palette.secondary.dark,
        '&:hover':{
            color: theme.palette.primary.main,
        }
    },
    filtersBoxStyle:{
        [theme.breakpoints.down('md')]: {
            display :"flex" ,
            justifyContent :"space-between",
            alignItems :"center" ,
        },
    },
    cardMedia: {
        display: 'flex',
        position:'relative',
        backgroundColor: '#ededed',
        overflow:'hidden',
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        [theme.breakpoints.down('xs')]: {
            maxWidth: 120,
            height: 120,
        },
        borderRadius: theme.spacing(2),
    },
    avatar:{
        minHeight: "100%",
        minWidth:'100%'
    }
}));
const SingleRestaurantWrapper = ({children,match}) =>{
    const classes = useStyles();
    const [isOpinionsDialogOpen,setOpinionsDialogOpen] = useState(false);
    const [restaurant, setRestaurant] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleToggleOpinionsDialog = () =>{
        setOpinionsDialogOpen(!isOpinionsDialogOpen);
    }

    useEffect(()=>{
        setIsLoading(true);
        restaurantService.getSingleRestaurant(match.params.restaurantId)
            .then(res=>{
                setIsLoading(false);
                setRestaurant(res.data)
            })
            .catch(err=>{
                setIsLoading(false);
                console.log(err)
            })
    },[match.params.restaurantId]);

    const {name,rate,category,image,id} = restaurant;
    return(

        <Box className={classes.pageBackground}>
            <Navbar/>
            <Slide in={Boolean(restaurant)} timeout={1000} direction="down">
            <Box className={classes.restaurantJumbotron}>
                <Typography variant = "h3" gutterBottom>{name}</Typography>
                <Typography variant="subtitle2" paragraph>{ category && getCuisineTypeValue(category).map(e => e.label).join(", ")}</Typography>
                <Box className={classes.cardMedia}>
                    {isValidUrl(image) ?
                        <Avatar variant="rounded" src={image} className={classes.avatar} />
                        :
                        <AppLogo size={12} color="secondary"/>
                    }
                    <Box className={classes.ratingBox} onClick={handleToggleOpinionsDialog}>
                        <Rating readOnly value={rate ? Number(rate) : 0} size="small" precision={0.5} emptyIcon={<StarBorderIcon color="secondary" fontSize="small"/>}/>
                    </Box>
                </Box>

                <Box mt={4}>
                    <ButtonGroup variant="text" color="primary" >
                        <Button component={NavLink} to={`${routes.SINGLERESTAURANTMENU}/${id}`} activeClassName={classes.activeButton} >Menu</Button>
                        <Button component={NavLink} to={`${routes.SINGLERESTAURANTCONTACT}/${id}`} activeClassName={classes.activeButton}>Kontakt</Button>
                    </ButtonGroup>
                </Box>
            </Box>
            </Slide>
                <Container>
                    {React.cloneElement(children, {restaurant,isLoading})}
                </Container>
            <OpinionDialog restaurantId={match.params.restaurantId} handleToggleOpinionsDialog={handleToggleOpinionsDialog} isOpinionsDialogOpen={isOpinionsDialogOpen}/>
        </Box>
    )
}
export default SingleRestaurantWrapper;
