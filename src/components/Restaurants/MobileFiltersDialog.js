import React, {useState} from "react";
import {
    AppBar,
    Button, Dialog,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText, Slide,
    Toolbar,
    Typography,
    Box
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme)=>({
    toolbar:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
    },
    appBar:{
        position:'relative'
    }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const MobileFiltersDialog = ({isToggleFiltersDialogOpen,handleToggleFiltersDialog,children}) =>{
    const classes = useStyles();

    return(
        <Dialog fullScreen open={isToggleFiltersDialogOpen} onClose={handleToggleFiltersDialog} TransitionComponent={Transition}>
            <AppBar color="secondary" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Box display="flex" alignItems = "center">
                        <IconButton edge="start" color="inherit" onClick={handleToggleFiltersDialog} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Filtry
                        </Typography>
                    </Box>
                    <Button autoFocus color="inherit" onClick={handleToggleFiltersDialog}>
                        Szukaj
                    </Button>
                </Toolbar>
            </AppBar>
            <Box p={1}>
                {children}
            </Box>
        </Dialog>
    )
}
export default MobileFiltersDialog;
