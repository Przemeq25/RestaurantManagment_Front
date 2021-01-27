import React from 'react';
import {Box, Typography} from "@material-ui/core";

const SmallCardElement = ({icon,value}) => {
    return(
        <Box display = "flex" alignItems = "center" mb={1}>
            {icon}
            <Box m={1}/>
            <Typography variant="h6" color="secondary">{value}</Typography>
        </Box>
    )
}
export default SmallCardElement;
