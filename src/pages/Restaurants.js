import React, {useEffect, useState} from 'react';
import {
    Container,
    Grid,
    Box,
    Hidden,
    useTheme,
    Paper,
    Button,
    fade,
    Select,
    MenuItem,
    Divider,
    Typography,
    CircularProgress,
    Slide,
    Grow
} from "@material-ui/core";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Navbar from "../components/Navbar";
import {makeStyles} from "@material-ui/core/styles";
import Search from "../components/Search";
import Pagination from "@material-ui/lab/Pagination";
import ShortTextIcon from '@material-ui/icons/ShortText';
import MobileFiltersDialog from "../components/Restaurants/MobileFiltersDialog";
import RestaurantFilters from "../components/Restaurants/RestaurantFilters";
import RestaurantCard from "../components/Restaurants/RestaurantCard";
import {restaurantService} from "../services/restaurantService";
import Jumbotron from "../components/Jumbotron";
import {history, searchWriteName} from "../helpers/_helpers";
import {routes} from "../config/routes";
import HomeIcon from '@material-ui/icons/Home';
import queryString  from 'query-string';

const useStyles = makeStyles((theme)=>({
    pageBackground:{
        backgroundColor:'rgba(248,248,248)',
        minHeight:'100vh',
        overflow:'hidden',
    },
    filtersPaperStyle:{
        padding:theme.spacing(1),
        borderRadius:theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            padding:theme.spacing(1),
        },
    },
    select:{
        minWidth:170,
    },
    selectInput:{
        fontSize:'0.8rem',
        border:`1px solid ${fade(theme.palette.common.black, 0.10)}`,
        borderRadius:theme.spacing(2),
        padding:'4px 8px 4px',
        "&:focus": {
            background: "transparent",
            border:`1px solid ${fade(theme.palette.common.black, 0.10)}`,
            borderRadius:theme.spacing(2),
        }
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
    menuItem:{
        fontSize:'0.8rem',
    },
}))

const Options = [
    {label:'Popularność', value: 'default'},
    {label:"Ocena: od najwyższej", value: 'rate,asc'},
    {label:'Ocena: od najniższej', value: 'rate,desc'},
    {label:'Nazwa: A-Z', value: 'name,asc'},
    {label:'Nazwa: Z-A', value: 'name,desc'}
]

const Restaurants = ({location}) =>{
    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));
    const classes = useStyles();


    const [isCuisineTypeCollapse, setCuisineTypeCollapse] = useState(false);
    const [isToggleFiltersDialogOpen, setToggleFiltersDialogOpen] = useState(false);
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages,setTotalPages] = useState(false);
    const [query,setQuery] = useState({
        page:0,
    })

    useEffect(()=>{
        const queryStr = queryString.parse(location.search);
            if (Object.keys(queryStr).length !== 0) {
                setQuery(queryStr);
            }
        setIsLoading(true);
        restaurantService.getAllRestaurants(queryString.parse(location.search))
            .then(res=>{
                setRestaurants(res.data.content);
                setTotalPages(res.data.totalPages);
                setIsLoading(false);
            })
            .catch(err=>{
                console.log(err);
                setIsLoading(false);
            });
    },[location.search])

    const handleCuisineTypeCollapse = () =>{
        setCuisineTypeCollapse(!isCuisineTypeCollapse)
    }

    const handleToggleFiltersDialog = () =>{
        setToggleFiltersDialogOpen(!isToggleFiltersDialogOpen);
    }
    const handleChangeFilters = (category,city,isRestaurantOpen,rate)=>{
        const newObject = {
            page:0,
        };
        if(category){
            newObject.category = category;
        }
        if(city){
            newObject.city = city;
        }
        if(isRestaurantOpen){
            newObject.open = isRestaurantOpen;
        }
        if(rate){
            newObject.rate = rate;
        }
        if(query.sort){
            newObject.sort= query.sort;
        }
        setQuery(newObject);
        pushToHistory(newObject)
        isToggleFiltersDialogOpen && handleToggleFiltersDialog();
    }

    const handleSort=(value)=>{
        if(value !=="default"){
            setQuery({...query, sort:value, page:0})
            pushToHistory({...query, sort:value, page:0})
        }else if(query.sort){
            const newQuery = {...query, page:0};
            delete newQuery.sort;
            setQuery(newQuery);
            pushToHistory(newQuery)
        }
    }

    const pushToHistory =(query)=>{
        const newQuery = queryString.stringify(query);
        history.push({
            pathname:routes.RESTAURANTS,
            search:newQuery,
        })
    }

    return (
        <Box className={classes.pageBackground}>
            <Navbar/>
            <Container>
                <Box mt={mdDown ? 2 : 5} mb={mdDown ? 0 : 5}>
                    <Typography variant="h3" color="secondary">Dostępne restauracje</Typography>
                </Box>
                <Grid container spacing={3}>
                    <Grid item md = {3} >
                        <Hidden mdDown>
                            <Slide in={true} timeout={500} direction="right">
                                <Box style={{position:'sticky' ,top: 30}}>
                                    <RestaurantFilters
                                        isCuisineTypeCollapse={isCuisineTypeCollapse}
                                        handleCuisineTypeCollapse={handleCuisineTypeCollapse}
                                        handleChangeFilters={handleChangeFilters}
                                        query={query}
                                    />
                                </Box>
                            </Slide>
                        </Hidden>
                    </Grid>
                    <Grid item md = {mdDown ? 12 : 9} xs={12}>
                        <Slide in={true} timeout={500} direction="left">
                        <Paper className={classes.filtersPaperStyle} variant="outlined">
                            <Box className={classes.filtersBoxStyle}>
                                <Search width={'100%'} handleBlur={(e)=> searchWriteName(e.target.value,setQuery,query,pushToHistory) }/>
                                <Box display="flex" mt={mdDown ? 1 : 0} width="100%" justifyContent={mdDown ? "space-between" : "flex-end"}>
                                    <Hidden lgUp>
                                        <Box mr={1}>
                                            <Button variant="contained" color="secondary" size="small" startIcon={<ShortTextIcon/>} onClick = {handleToggleFiltersDialog}>
                                                Filtry
                                            </Button>
                                        </Box>
                                    </Hidden>
                                    <Select
                                        value={query.sort ? query.sort : 'default'}
                                        onChange={event => handleSort(event.target.value)}
                                        disableUnderline
                                        MenuProps={{
                                            anchorOrigin: {
                                                vertical: "bottom",
                                                horizontal: "right"
                                            },
                                            transformOrigin: {
                                                vertical: "top",
                                                horizontal: "right"
                                            },
                                            getContentAnchorEl: null,
                                            classes:{paper:classes.menuStyle}
                                        }}
                                        classes={{select:classes.selectInput, root:classes.select}}
                                    >
                                        {
                                            Options.map(option=>(
                                                <MenuItem value={option.value} key = {option.label} className={classes.menuItem}>{option.label}</MenuItem>
                                        ))
                                        }
                                    </Select>
                                </Box>
                            </Box>
                        </Paper>
                        </Slide>
                        <Box m={3}/>
                        <Box minHeight="50vh" position="relative">
                        {
                            isLoading ? (
                                <Box display="flex" alignItems="center" justifyContent="center" minHeight="100%">
                                    <CircularProgress color="secondary"/>
                                </Box>
                                ):(
                                restaurants.length ? restaurants.map((restaurant)=>(
                                        <RestaurantCard {...restaurant} key={restaurant.id} />
                                )):(
                                    <Grow in={true} timeout={500}>
                                    <Jumbotron
                                        text="Brak restauracji w bazie"
                                        icon={<HomeIcon fontSize="inherit"/>}
                                        size={40}
                                    />
                                    </Grow>
                            ))
                        }
                        </Box>

                        <Box mb={3}/>

                            <>
                            <Divider/>
                                <Box m={4} display="flex" justifyContent="center">
                                <Pagination
                                    count={parseInt(totalPages)}
                                    disabled={!restaurants.length}
                                    variant="outlined"
                                    color="secondary"
                                    page={Number(query.page)+1}
                                    onChange={(e,value)=> {
                                        setQuery({...query, page: value - 1})
                                        pushToHistory({...query,page:value-1});
                                    }}/>
                                </Box>
                            </>



                    </Grid>
                </Grid>
            </Container>
            <MobileFiltersDialog
                isToggleFiltersDialogOpen={isToggleFiltersDialogOpen}
                handleToggleFiltersDialog={handleToggleFiltersDialog}
            >
                <RestaurantFilters
                    isCuisineTypeCollapse={isCuisineTypeCollapse}
                    handleCuisineTypeCollapse={handleCuisineTypeCollapse}
                    handleChangeFilters={handleChangeFilters}
                    query={query}
                />
            </MobileFiltersDialog>
        </Box>
    )
}
export default Restaurants;
