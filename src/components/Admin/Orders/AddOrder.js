import React, {useState} from "react";
import {
    Box,
    Drawer, fade, IconButton, Paper, TextField,
    Typography,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CloseIcon from '@material-ui/icons/Close';
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import {handleRenderMenuByCategory} from "../../../helpers/_helpers";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ProgressButton from "../../ProgressButton";
import {useDispatch, useSelector} from "react-redux";
import {
    addProductToOrder,
    incrementProduct,
    removeProductFromOrder,
    decrementProduct,
    submitPersonalOrder, changeOrderComment
} from "../../../redux/actions/orders";
import {errorAlert} from "../../../redux/actions/alert";

const useStyles = makeStyles(theme=>({
    drawerStyle:{
        top: 64,
        padding:20,
        alignItems:'center',
        height:'calc(100% - 64px)',
        maxWidth:380,
        minWidth:350,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    closeIconPosition:{
        position:'absolute',
        top: 10,
        right:10,
        cursor:'pointer',
    },
    listSection:{
        backgroundColor:theme.palette.secondary.main,
        color:theme.palette.secondary.contrastText,
    },
    listStyle:{
        borderRadius:theme.spacing(2),
        marginTop:theme.spacing(2),
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        minHeight:200,
        marginBottom:theme.spacing(2),
    },
    listItem:{
        padding: '0px 16px',
    },
    listIcon:{
        minWidth: 20,
    },
    typographyHidden:{
        marginRight:60,
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        display: "block",
        overflow: "hidden"
    },
    secondaryAction:{
        right: 0,
    },
    select: {
        border: `1px solid ${fade(theme.palette.common.black, 0.10)}`,
        borderRadius: theme.spacing(2),
        padding: '4px 8px 0px',
    },
}));

const AddOrder =({addOrderIsOpen,handleToggleAddOrder,menu,restaurantId})=>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const currentOrder = useSelector(state=>state.orders.currentOrder);
    const isRequesting = useSelector(state=>state.orders.isRequesting);
    const [comment,setComment] = useState('');
    return(
        <>
            <Drawer open={addOrderIsOpen} anchor="right" variant="persistent" classes={{paper:classes.drawerStyle}}>
                <CloseIcon className={classes.closeIconPosition} onClick={handleToggleAddOrder}/>
                <Typography variant="h4" paragraph>Dodaj zamówienie:</Typography>
                <List className={classes.listStyle} disablePadding>
                    {Object.entries(handleRenderMenuByCategory(menu)).map((category,i) => (
                        <li key={i}  >
                            <ul className={classes.ul}>
                                <ListSubheader className={classes.listSection} >{category[0] !== "null" ? category[0] : "Inne" }</ListSubheader>
                                {category[1].map(meal=>(
                                    <Box key={meal.id}>
                                        <ListItem  button classes={{root:classes.listItem}} disableGutters divider>
                                            <ListItemIcon classes={{root:classes.listIcon}}>
                                                <Checkbox
                                                    edge="start"
                                                    checked={Boolean(currentOrder.meals.find(mealID=>mealID.id === meal.id))}
                                                    onChange={(e)=>{
                                                        !e.target.checked ?
                                                            dispatch(removeProductFromOrder(meal.id))
                                                            :
                                                            dispatch(addProductToOrder(meal))
                                                    }}
                                                    disableRipple
                                                />
                                            </ListItemIcon>
                                            <ListItemText style={{width:'100%'}}>
                                                <Typography variant="body2" className={classes.typographyHidden}>{meal.name}</Typography>
                                            </ListItemText>
                                            <ListItemSecondaryAction>
                                                <Typography variant="body2" style={{fontWeight:500}}>{meal.price}zł</Typography>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </Box>
                                ))}
                            </ul>
                        </li>
                    ))}
                </List>
                <Typography variant='h5'>Zamówienie:</Typography>
                <List className={classes.listStyle} disablePadding>
                    {currentOrder.meals.length ? currentOrder.meals.map(meal=>(
                        <ListItem disableGutters>
                            <ListItemText style={{width:'100%'}}>
                                <Typography variant="body2" className={classes.typographyHidden}>{meal.name}</Typography>
                            </ListItemText>
                            <ListItemSecondaryAction classes={{root:classes.secondaryAction}}>
                                <Box display="flex" alignItems="center" justifyContent="flex-end">
                                    <IconButton
                                        size="small"
                                        color="secondary"
                                        onClick={()=>dispatch(decrementProduct(meal.id))}
                                    >
                                        <IndeterminateCheckBoxIcon
                                            color="inherit"
                                        />
                                    </IconButton>
                                    <TextField
                                        value={meal.quantity}
                                        disabled
                                        inputProps={{
                                            min: 0,
                                            style: {
                                                textAlign: 'center',
                                                maxWidth:30,
                                                margin:'0px 5px',
                                            }
                                        }}
                                    />
                                    <IconButton
                                        size="small"
                                        color="secondary"
                                        onClick={()=>dispatch(incrementProduct(meal.id))}
                                    >
                                        <AddBoxIcon
                                            color="inherit"
                                        />
                                    </IconButton>
                                </Box>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )):(
                        <Box m={2}>
                            <Typography variant="subtitle2" style={{fontWeight:500}} align="center">Utwórz zamówienie</Typography>
                        </Box>
                    )}
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2} mr={3} mt={2}>
                        <Typography variant="body1">Całkowity koszt:</Typography>
                        <Typography variant="body1" style={{fontWeight:500}}>{currentOrder.totalPrice.toFixed(2)}zł</Typography>
                    </Box>
                    <TextField
                        multiline
                        rows={3}
                        variant="outlined"
                        value={comment}
                        onChange={(e)=>setComment(e.target.value)}
                        onBlur={()=>dispatch(changeOrderComment(comment))}
                        fullWidth
                        label="Komentarz do zamówienia"
                    />
                    <Box m={2}/>
                    <ProgressButton
                        label="Dodaj"
                        color="secondary"
                        loading={isRequesting}
                        onClick={()=>{
                            currentOrder.meals.length ?
                                dispatch(submitPersonalOrder(currentOrder,restaurantId))
                                :
                                dispatch(errorAlert("Utwórz zamówienie!"))
                        }}
                    />
                </List>
            </Drawer>
        </>
    );

}
export default AddOrder;
