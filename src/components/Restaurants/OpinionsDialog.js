import React, {useEffect, useState} from 'react';
import {
    Box,
    Button, CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider, fade,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating/Rating";
import {restaurantService} from "../../services/restaurantService";
import {makeStyles} from "@material-ui/core/styles";
import OpinionsCard from "./OpinionsCard";
import {useDispatch} from "react-redux";
import {errorAlert} from "../../redux/actions/alert";

const useStyles = makeStyles(theme=>({
    paperStyle:{
        padding:theme.spacing(2),
        borderRadius:theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            padding:theme.spacing(1),
        },
        marginBottom:theme.spacing(3),
    },
    select: {
        border: `1px solid ${fade(theme.palette.common.black, 0.10)}`,
        borderRadius: theme.spacing(2),
        padding: '4px 8px 0px',
    },
    selectInput: {
        fontSize: '0.8rem',
    },
}))

const OpinionDialog = ({restaurantId,isOpinionsDialogOpen,handleToggleOpinionsDialog}) =>{
    const classes = useStyles();
    const [opinions,setOpinions] = useState([]);
    const [comment,setComment] = useState('');
    const [opinionValue,setOpinionValue] = useState(0);
    const [isCommentLoading, setIsCommentLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(()=>{
        const getOpinions = () => {
            restaurantService.getRestaurantOpinions(restaurantId)
                .then(response => {
                    setOpinions(response.data.content);
                    setIsCommentLoading(false);
                })
                .catch(() => {
                    setIsCommentLoading(false);
                    setOpinions([]);
                })
        }
        isOpinionsDialogOpen && getOpinions();
    },[isOpinionsDialogOpen,restaurantId]);

    const handleChangeOpinionValue = (e) =>{
        setOpinionValue(e.target.value)
    }
    const handleChangeComment = (e) =>{
        setComment(e.target.value)
    }
    const clearForm = () =>{
        setComment('');
        setOpinionValue(0);
    }

    const submitOpinion = () =>{
        restaurantService.submitOpinionOfRestaurant(restaurantId,{rate:Number(opinionValue), description:comment})
            .then(res=>{
                setOpinions([...opinions,res.data]);
                clearForm()
            })
            .catch((err)=>{
                if(err.response && err.response.status === 401){
                    dispatch(errorAlert("Zaloguj sie by móc dodać opinię!"))
                }else if(err.response && err.response.status === 409){
                    dispatch(errorAlert("Dodałeś już opinię o tej restauracji!"))
                    clearForm()
                }else{
                    dispatch(errorAlert("Nie udało się dodać opinii! Spróbuj ponownie"))
                }
            })
    }
    return(
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
                        <Rating name="rating" value={opinionValue} onChange={handleChangeOpinionValue} precision={0.5}/>
                    </Box>
                    <TextField
                        multiline
                        placeholder="Komentarz"
                        classes={{root:classes.select}}
                        fullWidth
                        rows="3"
                        InputProps={{disableUnderline: true,classes:{input:classes.selectInput }}}
                        size="small"
                        value={comment}
                        onChange={handleChangeComment}
                    />
                    <Box display='flex' justifyContent="flex-end" mt={2}>
                        <Button variant = "contained" color="secondary" onClick={submitOpinion}>Wyślij</Button>
                    </Box>
                </Paper>
                <Box display = 'flex' justifyContent = "center" flexDirection = "column" alignItems="center">
                    {isCommentLoading ? (
                        <CircularProgress color="secondary"/>
                        ):(
                            opinions.length ? (
                                opinions.map(opinion=>(<OpinionsCard comment={opinion.description} opinionValue={opinion.rate}/>))
                            ) : (
                                    <Typography variant="h4" color="secondary" paragraph> Brak opini na temat tej restauracji!</Typography>
                                )
                        )
                    }
                </Box>

            </DialogContent>

        </Dialog>
    )
}
export default OpinionDialog;
