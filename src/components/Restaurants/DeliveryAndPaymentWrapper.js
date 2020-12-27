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

const DeliveryAndPaymentWrapper = ({paymentOnline}) =>{
    const [comment,setComment] = useState('');
    const [delivery,setDelivery] = useState('TAKE_AWAY');
    const [payment,setPayment] = useState('CASH');

    const handleComment = (e) =>{
        setComment(e.target.value);
    }
    const handleChangeDelivery = (e) =>{
        setDelivery(e.target.value)
    }
    const handleChangePayment = (e) =>{
        setPayment(e.target.value)
    }
    return(
        <>
            <Box mt={4} mb={4}>
                <Typography variant="h5" paragraph>Dostawa i płatność</Typography>
                <List style={{flex:1}}>
                    <RadioGroup aria-label="gender" name="gender1" value={delivery} onChange={handleChangeDelivery}>
                        <ListItem dense button onClick={()=>setDelivery("TAKE_AWAY")}>
                            <ListItemIcon>
                                <Radio
                                    edge="start"
                                    value="TAKE_AWAY"
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText primary="Obiór w restauracji" />
                            <ListItemSecondaryAction>
                                <Typography variant="body2"> 0.00zł </Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem dense button onClick={()=>setDelivery("DELIVERY")}>
                            <ListItemIcon>
                                <Radio
                                    edge="start"
                                    value="DELIVERY"
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText primary="Dostawa na adres" />
                            <ListItemSecondaryAction>
                                <Typography variant="body2"> 15.00zł </Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </RadioGroup>
                </List>
                <Divider />
                <List style={{flex:1}}>
                    <RadioGroup aria-label="gender" name="gender1" value={payment} onChange={handleChangePayment}>
                        <ListItem dense button onClick={()=>setPayment("CASH")}>
                            <ListItemIcon>
                                <Radio
                                    edge="start"
                                    value="CASH"
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText primary="Płatność przy odbiorze" />
                        </ListItem>
                        {paymentOnline && (
                            <ListItem dense button onClick={()=>setPayment("ONLINE")}>
                                <ListItemIcon>
                                    <Radio
                                        edge="start"
                                        value="ONLINE"
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
                onChange={handleComment}
                fullWidth
                label="Komentarz do zamówienia"
            />
        </>
    )
}
export default DeliveryAndPaymentWrapper;
