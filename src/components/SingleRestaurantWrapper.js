import React, {useState} from 'react';
import {fade, makeStyles} from "@material-ui/core/styles";
import Navbar from "../components/Navbar";
import {Box, Button, Container, ButtonGroup, Typography, Dialog, DialogTitle, DialogContent,Paper,Divider,TextField,Slide,Fade} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating/Rating";
import {NavLink} from "react-router-dom";
import {routes} from "../config/routes";
import AppLogo from "./AppLogo";


const useStyles = makeStyles((theme)=>({
    pageBackground: {
        backgroundColor: 'rgba(248,248,248)',
        minHeight:'100vh',
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
        bottom:10,
        left:'50%',
        transform:'translateX(-50%)',
        zIndex:100,
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
    paperStyle:{
        padding:theme.spacing(2),
        borderRadius:theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            padding:theme.spacing(1),
        },
        marginBottom:theme.spacing(3),
    },
    cardMedia: {
        display: 'flex',
        position:'relative',
        backgroundColor: '#ededed',
        background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(210,210,210,0.38697485830269607) 32%, rgba(64,64,64,0) 64%, rgba(22,22,22,0.675490264465161) 100%)',
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
    select: {
        border: `1px solid ${fade(theme.palette.common.black, 0.10)}`,
        borderRadius: theme.spacing(2),
        padding: '4px 8px 0px',
    },
    selectInput: {
        fontSize: '0.8rem',
    },
}));
const SingleRestaurantWrapper = ({children}) =>{
    const classes = useStyles();
    const [isOpinionsDialogOpen,setOpinionsDialogOpen] = useState(false);

    const handleToggleOpinionsDialog = () =>{
        setOpinionsDialogOpen(!isOpinionsDialogOpen);
    }
    return(

        <Box className={classes.pageBackground}>
            <Navbar/>
            <Fade in={true} timeout={700}>
            <Box className={classes.restaurantJumbotron}>
                <Typography variant = "h3" gutterBottom>Nazwa restauracji</Typography>
                <Typography variant="subtitle2" paragraph>Kuchnia tajska, sushi</Typography>
                <Box className={classes.cardMedia}>
                    <AppLogo size={12}/>
                    <Box className={classes.ratingBox} onClick={handleToggleOpinionsDialog}>
                        <Rating readOnly value={4} size="small"/>
                    </Box>
                </Box>

                <Box mt={4}>
                    <ButtonGroup variant="text" color="primary" >
                        <Button component={NavLink} to={routes.SINGLERESTAURANTMENU} activeClassName={classes.activeButton} >Menu</Button>
                        <Button  component={NavLink} to={routes.SINGLERESTAURANTRESERVATION} activeClassName={classes.activeButton} >Rezerwacje</Button>
                        <Button component={NavLink} to={routes.SINGLERESTAURANTCONTACT} activeClassName={classes.activeButton}>Kontakt</Button>
                    </ButtonGroup>
                </Box>
            </Box>
            </Fade>
            <Slide in={true} direction="right">
                <Container>
                    {children}
                </Container>
            </Slide>
            <Dialog
                fullWidth
                open={isOpinionsDialogOpen}
                onClose={handleToggleOpinionsDialog}
                scroll='body'
            >
                <DialogTitle>Opinie</DialogTitle>
                <DialogContent >
                    <Paper variant='outlined' className={classes.paperStyle}>
                        <Typography variant="h4" paragraph> Oceń restaurację! </Typography>
                        <Divider/>
                        <Box mt={2} mb={2}>
                            <Rating name="rating"/>
                        </Box>
                        <TextField
                            multiline
                            placeholder="Komentarz"
                            classes={{root:classes.select}}
                            fullWidth
                            rows="3"
                            InputProps={{disableUnderline: true,classes:{input:classes.selectInput }}}
                            size="small"
                        />
                        <Box display='flex' justifyContent="flex-end" mt={2}>
                            <Button variant = "contained" color="secondary">Wyślij</Button>
                        </Box>
                    </Paper>
                    <Box display = 'flex' justifyContent = "center">
                        <Typography variant="h4" color="secondary" paragraph> Brak opini na temat tej restauracji!</Typography>
                    </Box>

                </DialogContent>

            </Dialog>
        </Box>
    )
}
export default SingleRestaurantWrapper;
