import React, {useState} from "react";
import {Fab, Typography} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from "@material-ui/core/styles";
import AddMenu from "../../components/Admin/Menu/AddMenu";
import MenuRowCard from "../../components/Admin/Menu/MenuRowCard";

const useStyles = makeStyles(theme=>({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}));

const Menu = () =>{
    const [addMenuIsOpen, setAddMenuIsOpen] = useState(false);
    const classes = useStyles();

    const handleToggleMenu = () =>{
        setAddMenuIsOpen(!addMenuIsOpen);
    }
    return (
        <>
            <AddMenu menuIsOpen = {addMenuIsOpen} toggleMenuOpen = {handleToggleMenu}/>
            <Typography variant="h3">Menu:</Typography>
            <Typography variant="subtitle2" paragraph >Zarządzaj menu swojej restauracji!</Typography>

            <MenuRowCard/>
            <MenuRowCard/>
            <MenuRowCard/>
            <MenuRowCard/>

            <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleToggleMenu}>
                <AddIcon/>
            </Fab>
        </>
    )
}
export default Menu;
