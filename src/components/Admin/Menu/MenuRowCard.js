import React, {useState} from "react";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Card, CardMedia, CardContent, Typography, Chip, Box, Grow, IconButton, Grid, List} from "@material-ui/core";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import EditIcon from '@material-ui/icons/Edit';
import AppLogo from "../../AppLogo";
import {useDispatch, useSelector} from "react-redux";
import {openDrawerToEditMeal} from "../../../redux/actions/meals";
import {ownerPermision} from "../../../helpers/_helpers";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        position:'relative',
        maxWidth:'1500px',
        width:'100%',
        marginBottom:theme.spacing(1),
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        borderRadius:theme.spacing(2),
        "&:hover": {
            boxShadow: "-1px 10px 29px 0px rgba(0,0,0,0.4)"
        },
        height:200,
        paddingRight:theme.spacing(6),
        [theme.breakpoints.down('xs')]: {
            height: 120,
            paddingRight:theme.spacing(0),
        },
    },
    cover: {
        [theme.breakpoints.down('sm')]: {
            width: 120,
            height: 120,
        },
        [theme.breakpoints.up('sm')]: {
            width:200,
            height: 200,
        },
    },
    editingButtons:{
        position:'absolute',
        top: 10,
        right: 10,
        [theme.breakpoints.down('xs')]: {
            top:5,
            right:5,
        },
    },
    editingInput:{
        width: 200,
    },
    content:{
        display:'flex',
        maxWidth:'calc(100vw - 370px)',
        [theme.breakpoints.down('sm')]: {
            maxWidth:'calc(100vw - 220px)',
            padding:theme.spacing(1),
        },
        [theme.breakpoints.down('xs')]: {
            maxWidth:'calc(100vw - 180px)',
            padding:theme.spacing(1),
        },
    },
    chip:{
        position:'absolute',
        top:10,
        left:10,
        border:`1px solid ${theme.palette.primary.main}`,
        [theme.breakpoints.down('xs')]: {
            top:5,
            left:5,
        },
    },
    fontBold:{
        fontWeight:600
    },
    descriptionBox: {
        display: "-webkit-box",
        boxOrient: "vertical",
        lineClamp: 4,
        wordBreak: "break-all",
        overflow: "hidden",
        [theme.breakpoints.down('xs')]: {
            lineClamp: 2,
        },
    },
    cardMedia:{
        display: 'flex',
        backgroundColor:'#ededed',
        height: '100%',
        alignItems:'center',
        justifyContent:'center',
        width: 200,
        [theme.breakpoints.down('xs')]: {
            maxWidth: 120,
            height: 120,
        },
    }
}));

const MenuRowCard = ({id,name,image,ingredients,timeToDo,price,category}) =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const role = useSelector(state=>state.restaurant.role)
    return(
        <Grow in={true} timeout={500}>
            <Card className={classes.root}>
                {ownerPermision(role) &&
                    <Box className={classes.editingButtons}>
                        <IconButton size="small" onClick={() => dispatch(openDrawerToEditMeal({
                            id,
                            name,
                            image,
                            ingredients,
                            timeToDo,
                            price,
                            category
                        }))}>
                            <EditIcon fontSize="small" color="secondary"/>
                        </IconButton>
                    </Box>
                }
                <Chip
                    variant="default"
                    color="secondary"
                    size="small"
                    icon={<AccessTimeIcon/>}
                    label={`${timeToDo} min`}
                    className = {classes.chip}
                />
                {image ? (
                        <CardMedia
                            className={classes.cover}
                            image={image}
                        />
                    ):(
                        <Box className = {classes.cardMedia}>
                            <AppLogo size={12}/>
                        </Box>
                    )}
                <CardContent className={classes.content}>
                    <Grid container wrap="nowrap" direction="column" spacing={1} >
                        <Grid item zeroMinWidth>
                            <Typography component="h2" variant="h5" noWrap gutterBottom className={classes.fontBold}>
                                {name}
                            </Typography>
                        </Grid>
                        <Grid item xs>
                           <Box
                               classes={{root:classes.descriptionBox}}
                           >
                               <Typography variant = "subtitle2">
                                   {ingredients}
                               </Typography>
                           </Box>
                        </Grid>
                        <Grid item>
                            <Typography component="h6" variant="h4" color="secondary" className={classes.fontBold}>
                                {price} zł
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grow>
    );
}
export default MenuRowCard;
