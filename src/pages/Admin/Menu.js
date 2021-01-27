import React, {useEffect} from "react";
import {Fab, Typography, Box, CircularProgress, Backdrop, Paper} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from "@material-ui/core/styles";
import AddMenu from "../../components/Admin/Menu/AddMenu";
import MenuRowCard from "../../components/Admin/Menu/MenuRowCard";
import {useDispatch, useSelector} from "react-redux";
import {addMeal, closeDrawer, deleteMeal, editMeal, getMeals, openDrawer} from "../../redux/actions/meals";
import {handleRenderMenuByCategory, menuInitialValues, ownerPermision} from "../../helpers/_helpers";
import Jumbotron from "../../components/Jumbotron";
import MenuBookIcon from '@material-ui/icons/MenuBook';

const useStyles = makeStyles(theme=>({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    menuStyle:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        [theme.breakpoints.down('md')]:{
            padding: theme.spacing(1)
        },
        padding: `${theme.spacing(8)}px ${theme.spacing(16)}px`
    },
    categoryPaperStyle:{
        padding:`${theme.spacing(1)}px ${theme.spacing(2)}px` ,
        borderRadius:theme.spacing(2),
        margin:`${theme.spacing(3)}px 0`,
        marginRight:theme.spacing(3),
        backgroundColor:theme.palette.secondary.dark,
    }
}));

const Menu = ({match}) =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const mealsArray = useSelector(state=>state.meals.meals);
    const menuIsOpen = useSelector(state=>state.meals.isDrawerOpen);
    const isRequesting = useSelector(state=>state.meals.isRequesting);
    const isDeleteRequesting = useSelector(state=>state.meals.isDeleteRequesting);
    const isEditRequesting = useSelector(state=>state.meals.isEditRequesting);
    const isAddRequesting = useSelector(state=>state.meals.isAddRequesting);
    const editedMeal = useSelector(state=>state.meals.editedMeal);
    const role = useSelector(state=>state.restaurant.role);

    useEffect(()=>{
        !mealsArray.length && dispatch(getMeals(match.params.restaurantId))
    },[dispatch, match.params.restaurantId,mealsArray.length])

    const handleCloseDrawer = () =>{
        dispatch(closeDrawer());
    }
    const handleOpenDrawer = () =>{
        dispatch(openDrawer());
    }

    const handleAddMeal = (meal) =>{
        dispatch(addMeal(meal,match.params.restaurantId))
    }
    const handleEditMeal = (meal) =>{
        dispatch(editMeal(meal,match.params.restaurantId,meal.id));
    }
    const handleDeleteMeal = (mealID,name) =>{
        dispatch(deleteMeal(mealID,match.params.restaurantId,name));
    }
    return (
        <>
                <AddMenu
                    menuIsOpen = {menuIsOpen}
                    handleCloseDrawer={handleCloseDrawer}
                    handleSubmitForm={editedMeal ? handleEditMeal : handleAddMeal}
                    handleDeleteMeal={handleDeleteMeal}
                    isEditRequesting={isEditRequesting}
                    isAddRequesting={isAddRequesting}
                    menuInitialValues={editedMeal ? editedMeal : menuInitialValues}
                    isEditing={Boolean(editedMeal)}
                    isDeleteRequesting={isDeleteRequesting}
                />
            <Typography variant="h3">Menu:</Typography>
            <Typography variant="subtitle2" paragraph >Zarządzaj menu swojej restauracji!</Typography>
            <Box className = {classes.menuStyle}>
                {isRequesting ? (
                        <Backdrop className={classes.backdrop} open={isRequesting} invisible>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    ):(
                    mealsArray.length ? (
                        Object.entries(handleRenderMenuByCategory(mealsArray)).map((category,i) => (
                            <Box key={i} width="100%">
                                <Paper className={classes.categoryPaperStyle} variant="outlined" >
                                    <Typography variant="h4" autoCapitalize>{category[0] !== "null" ? category[0] : "Inne" }</Typography>
                                </Paper>
                                {category[1].map(meal=>(
                                    <MenuRowCard {...meal}/>
                                ))}
                            </Box>
                        ))
                    ):(
                        <Jumbotron text ="Brak posiłków w menu" buttonText="Dodaj posiłek" icon={<MenuBookIcon fontSize="inherit"/>} handleClick={handleOpenDrawer}/>
                    )
                    )
                }
            </Box>
            {ownerPermision(role) &&
                <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleOpenDrawer} variant="extended"
                     size="small">
                    <AddIcon/>
                    Dodaj posiłek
                </Fab>
            }

        </>
    )
}
export default Menu;
