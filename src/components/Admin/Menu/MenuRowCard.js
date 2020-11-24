import React, {useState} from "react";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Card, CardMedia, CardContent, Typography,Chip,Box,TextField,IconButton,Grid} from "@material-ui/core";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DescriptionIcon from '@material-ui/icons/Description';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        position:'relative',
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
    }
}));

const MenuRowCard = () =>{
    const classes = useStyles();
    return(
        <Card className={classes.root}>
            <Box className={classes.editingButtons}>
                <IconButton size="small">
                    <EditIcon fontSize="small"/>
                </IconButton>
            </Box>
            <Chip
                variant="default"
                color="secondary"
                size="small"
                icon={<AccessTimeIcon/>}
                label="35min"
                className = {classes.chip}
            />
            <CardMedia
                className={classes.cover}
                image="https://res.cloudinary.com/przemeq25/image/upload/v1593706499/frytki_dnooac.jpg"
            />
            <CardContent className={classes.content}>
                <Grid container wrap="nowrap" direction="column" spacing={1} >
                    <Grid item zeroMinWidth>
                        <Typography component="h2" variant="h5" noWrap gutterBottom className={classes.fontBold}>
                            Live From Space 3213 123 123 dasd asd asd asd
                        </Typography>
                    </Grid>
                    <Grid item xs>
                       <Box
                           component="Typography"
                           variant="subtitle2"
                           classes={{root:classes.descriptionBox}}
                       >


                       </Box>
                    </Grid>
                    <Grid item>
                        <Typography component="h6" variant="h4" color="secondary" className={classes.fontBold}>
                            35 zł
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
export default MenuRowCard;
