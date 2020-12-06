import React, {useState} from 'react';
import {
    Container,
    Grid,
    Box,
    Hidden,
    useTheme,
    Paper,
    Button,
    TextField,
    fade,
    Divider,
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Navbar from "../components/Navbar";
import {makeStyles} from "@material-ui/core/styles";
import Search from "../components/Search";
import Pagination from "@material-ui/lab/Pagination";
import ShortTextIcon from '@material-ui/icons/ShortText';
import MobileFiltersDialog from "../components/Restaurants/MobileFiltersDialog";
import RestaurantFilters from "../components/Restaurants/RestaurantFilters";
import RestaurantCard from "../components/Restaurants/RestaurantCard";

const useStyles = makeStyles((theme)=>({
    pageBackground:{
        backgroundColor:'rgba(248,248,248)',
    },
    filtersPaperStyle:{
        padding:theme.spacing(1),
        borderRadius:theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            padding:theme.spacing(1),
        },
    },
    select: {
        border:`1px solid ${fade(theme.palette.common.black, 0.10)}`,
        borderRadius:theme.spacing(2),
        padding:'4px 8px 0px'
    },
    selectInput:{
        fontSize:'0.8rem',
    },
    selectIcon:{
      marginTop:'-2px',
    },
    menuStyle:{
        border:`1px solid ${fade(theme.palette.common.black, 0.10)}`,
        borderRadius:theme.spacing(2),
        fontSize: '0.8rem'
    },
    filtersBoxStyle:{
        display :"flex" ,
        justifyContent :"space-between",
        alignItems :"center" ,
        margin: theme.spacing(1),
        [theme.breakpoints.down('md')]: {
            flexDirection: "column",
            alignItems:"space-between",
            margin: 0,
        },
    },
    filtersSelectStyle:{
        width: "100%",
        maxWidth:200,
    },
}))

const Restaurants = () =>{
    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));
    const classes = useStyles();
    const [isCuisineTypeCollapse, setCuisineTypeCollapse] = useState(false);
    const [isToggleFiltersDialogOpen, setToggleFiltersDialogOpen] = useState(false);

    const handleCuisineTypeCollapse = () =>{
        setCuisineTypeCollapse(!isCuisineTypeCollapse)
    }

    const handleToggleFiltersDialog = () =>{
        setToggleFiltersDialogOpen(!isToggleFiltersDialogOpen);
    }

    return (
        <Box className={classes.pageBackground}>
            <Navbar/>
            <Container>
                <Box mt={mdDown ? 5 : 10}/>
                <Grid container spacing={3}>
                    <Grid item md = {3} >
                        <Hidden mdDown>
                            <Box style={{position:'sticky' ,top: 30}}>
                                <RestaurantFilters isCuisineTypeCollapse={isCuisineTypeCollapse} handleCuisineTypeCollapse={handleCuisineTypeCollapse}/>
                            </Box>
                        </Hidden>
                    </Grid>
                    <Grid item md = {mdDown ? 12 : 9} xs={12}>
                        <Paper className={classes.filtersPaperStyle} variant="outlined">
                            <Box className={classes.filtersBoxStyle}>
                                <Search width={'100%'}/>
                                <Box display="flex" mt={mdDown ? 1 : 0} width="100%" justifyContent={mdDown ? "space-between" : "flex-end"}>
                                    <Hidden lgUp>
                                        <Box mr={1}>
                                            <Button variant="contained" color="secondary" size="small" startIcon={<ShortTextIcon/>} onClick = {handleToggleFiltersDialog}>
                                                Filtry
                                            </Button>
                                        </Box>
                                    </Hidden>
                                    <Autocomplete
                                        size="small"
                                        disableClearable
                                        autoHighlight
                                        className={classes.filtersSelectStyle}
                                        classes={{paper:classes.menuStyle, input:classes.selectInput, inputRoot:classes.selectInputRoot,popupIndicator:classes.selectIcon}}
                                        options={['Popularność',"Ocena: od najwyższej","Ocena: od najniższej","Nazwa: A-Z","Nazwa: Z-A"]}
                                        renderInput={(params) => (
                                            <TextField {...params} classes={{root:classes.select}} InputProps={{...params.InputProps, disableUnderline: true,disabled:true }} />
                                        )}
                                    />
                                </Box>
                            </Box>
                        </Paper>
                        <Box m={3}/>
                            <RestaurantCard/>
                            <RestaurantCard/>
                        <RestaurantCard/>
                        <RestaurantCard/>
                        <RestaurantCard/>
                        <RestaurantCard/>
                        <RestaurantCard/>
                        <RestaurantCard/>
                        <Box mb={3}/>
                        <Divider/>
                        <Box m={4} display="flex" justifyContent="center">
                            <Pagination count={10} variant="outlined" color="secondary" />
                        </Box>

                    </Grid>
                </Grid>
            </Container>
            <MobileFiltersDialog
                isToggleFiltersDialogOpen={isToggleFiltersDialogOpen}
                handleToggleFiltersDialog={handleToggleFiltersDialog}
            >
                <RestaurantFilters isCuisineTypeCollapse={isCuisineTypeCollapse} handleCuisineTypeCollapse={handleCuisineTypeCollapse}/>
            </MobileFiltersDialog>
        </Box>
    )
}
export default Restaurants;
