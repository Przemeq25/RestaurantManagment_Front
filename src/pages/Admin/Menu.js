import React, {useEffect} from "react";
import {Fab, Typography,Box} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from "@material-ui/core/styles";
import AddMenu from "../../components/Admin/Menu/AddMenu";
import MenuRowCard from "../../components/Admin/Menu/MenuRowCard";
import {useDispatch, useSelector} from "react-redux";
import {addMeal, closeDrawer, deleteMeal, editMeal, getMeals, openDrawer} from "../../redux/actions/meals";
import {menuInitialValues} from "../../helpers/_helpers";

const useStyles = makeStyles(theme=>({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    menuStyle:{
        [theme.breakpoints.down('md')]:{
            padding: theme.spacing(1)
        },
        padding: theme.spacing(8)
    }
}));

const Menu = ({match}) =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const mealsArray = useSelector(state=>state.meals.meals);
    const menuIsOpen = useSelector(state=>state.meals.isDrawerOpen);
    const isRequesting = useSelector(state=>state.meals.isRequesting);
    const isDeleteRequesting = useSelector(state=>state.meals.isDeleteRequesting);
    const editedMeal = useSelector(state=>state.meals.editedMeal);
    useEffect(()=>{
        mealsArray.length <=0 && dispatch(getMeals(match.params.restaurantId))
    },[])

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
    const handleDeleteMeal = (mealID) =>{
        dispatch(deleteMeal(mealID,match.params.restaurantId));
    }
    return (
        <>
            <AddMenu
                menuIsOpen = {menuIsOpen}
                handleCloseDrawer={handleCloseDrawer}
                handleSubmitForm={editedMeal ? handleEditMeal : handleAddMeal}
                handleDeleteMeal={handleDeleteMeal}
                isRequesting={isRequesting}
                menuInitialValues={editedMeal ? editedMeal : menuInitialValues}
                isEditing={Boolean(editedMeal)}
                isDeleteRequesting={isDeleteRequesting}
            />
            <Typography variant="h3">Menu:</Typography>
            <Typography variant="subtitle2" paragraph >Zarządzaj menu swojej restauracji!</Typography>
            <Box className = {classes.menuStyle}>
                {
                    mealsArray.length ? mealsArray.map(({id,name,image,ingredients,timeToDo,price})=>(
                        <MenuRowCard
                            key = {id}
                            id={id}
                            name={name}
                            image={image}
                            ingredients={ingredients}
                            timeToDo={timeToDo}
                            price={price}
                        />
                    )):null
                }
            </Box>
            <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleOpenDrawer} variant="extended">
                <AddIcon/>
                Dodaj posiłek
            </Fab>
        </>
    )
}
export default Menu;
