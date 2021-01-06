import React, {useState} from "react";
import {
    Box, Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Radio, TextField,
    Typography,
    RadioGroup
} from "@material-ui/core";
import {orderType, paymentType} from "../../helpers/_helpers";
import {changeOrderDetail} from "../../redux/actions/payment";
import {useDispatch, useSelector} from "react-redux";

const DeliveryAndPaymentWrapper = ({paymentOnline,restaurantId}) =>{
    const [comment,setComment] = useState('');
    const dispatch = useDispatch();
    const delivery = useSelector(state=>{
        const orderIndex = state.payment.order.findIndex(order=>order.restaurantId === restaurantId);
        if(orderIndex !== -1){
            return state.payment.order[orderIndex].orderType
        }
    })
    const payment = useSelector(state=>{
        const orderIndex = state.payment.order.findIndex(order=>order.restaurantId === restaurantId);
        if(orderIndex !== -1){
            return state.payment.order[orderIndex].paymentType
        }
    })

    const handleComment = (value) =>{
        dispatch(changeOrderDetail('comment',value,restaurantId))
    }
    const handleChangeDelivery = (value) =>{
        dispatch(changeOrderDetail('orderType',value,restaurantId))
    }
    const handleChangePayment = (value) =>{
        dispatch(changeOrderDetail('paymentType',value,restaurantId))
    }
    return(
        <>
            <Box mt={4} mb={4}>
                <Typography variant="h5" paragraph>Dostawa i płatność</Typography>
                <List style={{flex:1}}>
                    <RadioGroup aria-label="gender" name="gender1" value={delivery || orderType.TAKE_AWAY }>
                        <ListItem dense button onClick={()=>handleChangeDelivery(orderType.TAKE_AWAY)}>
                            <ListItemIcon>
                                <Radio
                                    edge="start"
                                    value={orderType.TAKE_AWAY}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText primary="Obiór w restauracji" />
                            <ListItemSecondaryAction>
                                <Typography variant="body2"> 0.00zł </Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem dense button onClick={()=>handleChangeDelivery(orderType.DELIVERY)}>
                            <ListItemIcon>
                                <Radio
                                    edge="start"
                                    value={orderType.DELIVERY}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText primary="Dostawa na adres" />
                            <ListItemSecondaryAction>
                                <Typography variant="body2"> 0.00zł </Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </RadioGroup>
                </List>
                <Divider />
                <List style={{flex:1}}>
                    <RadioGroup aria-label="gender" name="gender1" value={payment || paymentType.CASH}>
                        <ListItem dense button onClick={()=>handleChangePayment(paymentType.CASH)}>
                            <ListItemIcon>
                                <Radio
                                    edge="start"
                                    value={paymentType.CASH}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText primary="Płatność przy odbiorze" />
                        </ListItem>
                        {paymentOnline && (
                            <ListItem dense button onClick={()=>handleChangePayment(paymentType.CASH)}>
                                <ListItemIcon>
                                    <Radio
                                        edge="start"
                                        value={paymentType.ONLINE}
                                        disableRipple
                                    />
                                </ListItemIcon>
                                <ListItemText primary="Płatność online" />
                            </ListItem>
                        )}
                    </RadioGroup>
                </List>
            </Box>
            <TextField
                multiline
                rows={3}
                variant="outlined"
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
                onBlur={()=>handleComment(comment)}
                fullWidth
                label="Komentarz do zamówienia"
            />
        </>
    )
}
export default DeliveryAndPaymentWrapper;
