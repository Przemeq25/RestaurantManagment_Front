import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardMedia, CardContent, Typography, Hidden,Chip,Box,TextField,IconButton} from "@material-ui/core";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DescriptionIcon from '@material-ui/icons/Description';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        position:'relative',
        marginBottom:theme.spacing(1)
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width:'100%',
    },
    cover: {

        [theme.breakpoints.down('sm')]: {
            minHeight: 150,
        },
        [theme.breakpoints.up('sm')]: {
            width:200,
        },
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    editingButtons:{
        position:'absolute',
        top: 10,
        right: 10,
        [theme.breakpoints.down('xs')]: {
            top: 155,
            right: 5,
        },
    },
    editingInput:{
        width: 200,
    }
}));

const MenuRowCard = () =>{
    const classes = useStyles();
    const [isEdited,setIsEdited] = useState(false);
    return(
        <Card className={classes.root}>
            <Box className={classes.editingButtons}>
                {
                    isEdited ? (
                        <>
                            <IconButton onClick ={()=>setIsEdited(!isEdited)} >
                                <DoneIcon/>
                            </IconButton>
                            <IconButton>
                                <CloseIcon/>
                            </IconButton>
                        </>
                    ):(
                        <>
                            <IconButton onClick ={()=>setIsEdited(!isEdited)} >
                                <EditIcon/>
                            </IconButton>
                            <IconButton>
                                <DeleteIcon/>
                            </IconButton>
                        </>
                    )
                }
            </Box>
            <Hidden xsDown>
                <CardMedia
                    className={classes.cover}
                    image="https://res.cloudinary.com/przemeq25/image/upload/v1593706499/frytki_dnooac.jpg"
                />
            </Hidden>
            <div className={classes.details}>
                <Hidden smUp>
                    <CardMedia
                        className={classes.cover}
                        image="https://res.cloudinary.com/przemeq25/image/upload/v1593706499/frytki_dnooac.jpg"
                    />
                </Hidden>
                <CardContent className={classes.content}>
                    {
                        isEdited ? (
                            <TextField value="Live From Space"/>
                        ) : (
                            <Typography component="h6" variant="h5">
                                Live From Space
                            </Typography>
                        )
                    }
                    <Box display="flex" mt={1} mb={1}>
                        <Box mr = {1}>
                            {isEdited ? (
                                    <TextField
                                        placeholder = "Czas wykonania"
                                        color="secondary"
                                        InputProps={{
                                            startAdornment:
                                                <Box mr={1} mb={1}>
                                                    <AccessTimeIcon fontSize="small" color ="secondary"/>
                                                </Box>,
                                            endAdornment:
                                                <Typography variant = "subtitle1" color="secondary">min</Typography>
                                        }}
                                        size="small"
                                        className={classes.editingInput}
                                    />
                                ) : (
                                    <Chip variant="outlined" color="secondary" size="small" icon={<AccessTimeIcon/>}
                                          label="35min"/>
                                )
                            }
                        </Box>
                    </Box>
                    {
                        isEdited ? (
                            <TextField value="Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyślepoligraficznym. Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym."
                                       fullWidth
                                       InputProps={{
                                           startAdornment:
                                               <Box mr={1} mb={1}>
                                                    <DescriptionIcon fontSize="small" color ="secondary"/>
                                               </Box>
                                       }}
                                       inputProps={{style:{fontSize:12, color:'#6C6C6C'}}}
                                       color='secondary'
                                       size="small"
                            />
                        ) : (
                            <Typography variant="subtitle2" paragraph>
                                Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle
                                poligraficznym. Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w
                                przemyśle poligraficznym.
                            </Typography>
                        )
                    }
                    {
                        isEdited ? (
                            <TextField
                                value="35"
                                placeholder="Cena"
                                InputProps={{
                                    startAdornment:
                                        <Box mr={1}>
                                            <LocalAtmIcon fontSize="small" color ="secondary"/>
                                        </Box>,
                                    endAdornment:
                                        <Typography variant = "subtitle1" color="secondary">zł</Typography>
                                }}
                                color="secondary"
                                className={classes.editingInput}
                            />
                        ) : (
                            <Typography component="h6" variant="h5" color="secondary">
                                35 zł
                            </Typography>
                            )
                    }
                </CardContent>
            </div>

        </Card>
    );
}
export default MenuRowCard;
