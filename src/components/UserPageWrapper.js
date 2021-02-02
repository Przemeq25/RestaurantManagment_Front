import React from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Box, Container, Typography} from "@material-ui/core";
import Navbar from "./Navbar";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
const useStyle = makeStyles(theme=>({
    pageBackground:{
        backgroundColor:'rgba(248,248,248)',
        minHeight:'100vh',
        overflow:'hidden',
    },
}));

const UserPageWrapper = ({children, title}) =>{
    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));
    const classes = useStyle();
    return (
        <Box className={classes.pageBackground}>
            <Navbar/>
            <Container>
                <Box mt={mdDown ? 2 : 5} mb={mdDown ? 2 : 5}>
                    <Typography variant="h3" color="secondary">{title}</Typography>
                </Box>
                {children}
            </Container>
        </Box>
    )
}
export default UserPageWrapper;
