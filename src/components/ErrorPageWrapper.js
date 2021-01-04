import React from 'react';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {useTheme} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const ErrorPageWrapper = ({code,message,action, actionText}) =>{
    const theme = useTheme();
    return(
        <Box
            minHeight="100vh"
            display="flex"
            alignItems="center"
            justifyContent='center'
            flexDirection = "column"
            style={{
                backgroundColor:theme.palette.secondary.main ,
                color:theme.palette.secondary.contrastText,
            }}
        >
            <Typography variant = "h1"> {code} </Typography>
            <Typography variant = "h6" paragraph> {message} </Typography>
            {action && <Button variant="contained" onClick={action} color = "primary"> {actionText} </Button>}
        </Box>
    )
}
export default ErrorPageWrapper;
