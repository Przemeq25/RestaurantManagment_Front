import React, {useEffect, useState} from "react";
import {Drawer, TextField, Typography, Avatar, Button, Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme=>({
    drawerStyle:{
        top: 64,
        padding:20,
        alignItems:'center',
        width:300,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    imageStyle:{
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    closeIconPosition:{
        position:'absolute',
        top: 10,
        right:10,
        cursor:'pointer',
    },
    input:{
        display:'none',
    }
}));

const AddMenu =({menuIsOpen,toggleMenuOpen})=>{
    const [image,setImage] = useState('');
    const classes = useStyles();

    const handleCloseMenu =()=>{
        setImage('');
    }

    return(
        <>
            <Drawer open={menuIsOpen} anchor="right" variant="persistent" classes={{paper:classes.drawerStyle,paperAnchorDockedRight:classes.drawerBorder}}>
                <CloseIcon className={classes.closeIconPosition} onClick={toggleMenuOpen}/>
                <Typography variant="h4" paragraph>Dodaj posiłek:</Typography>
                {image ? (
                    <Avatar src = {URL.createObjectURL(image)} variant="rounded" className={classes.imageStyle}/>
                    ):(
                    <Avatar variant="rounded" className={classes.imageStyle}>
                        <LocalDiningIcon fontSize="large" color="secondary"/>
                    </Avatar>
                )
                }
                <form>
                    <TextField label ="Nazwa" margin="dense" fullWidth/>
                    <TextField label ="Cena" type="number" margin="dense" fullWidth />
                    <TextField label ="Czas wykonania" margin="dense" fullWidth />
                    <TextField label ="Opis" margin="dense" multiline fullWidth/>
                    <Box mt={2}>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            type="file"
                            onChange={e=>setImage(e.target.files[0])}
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="secondary" component="span">
                                {image ? "Zmień zdjęcie" : "Dodaj zdjęcie"}
                            </Button>
                        </label>
                    </Box>
                    <Box mt={2} display="flex" justifyContent ="flex-end">
                        <Button
                            color="primary"
                            variant = "contained"
                            onClick={()=>{
                                handleCloseMenu();
                                toggleMenuOpen();
                            }}
                        >
                            Zatwierdź
                        </Button>
                    </Box>

                </form>
            </Drawer>
        </>
    );

}
export default AddMenu;
