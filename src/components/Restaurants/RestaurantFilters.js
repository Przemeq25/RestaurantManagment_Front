import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Checkbox, Collapse, fade,
    List,
    ListItem,
    ListItemIcon,
    ListItemText, Paper,
    TextField,
    Typography,
    IconButton,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import Rating from "@material-ui/lab/Rating/Rating";
import {cuisineType} from "../../helpers/_helpers";
import {makeStyles} from "@material-ui/core/styles";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme)=>({
    filtersPaperStyle: {
        padding: theme.spacing(2),
        borderRadius: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(1),
        },
    },
    filtersSubtitleStyle: {
        fontWeight: 600
    },
    listItemIcon: {
        minWidth: 0,
    },
    listStyle: {
        margin: `-${theme.spacing(2)}px`,
    },
    buttonLabel: {
        justifyContent: 'normal',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        fontSize: '0.6rem'
    },
    select: {
        border: `1px solid ${fade(theme.palette.common.black, 0.10)}`,
        borderRadius: theme.spacing(2),
        padding: '4px 8px 0px'
    },
    selectInput: {
        fontSize: '0.8rem',
    },
    selectIcon: {
        marginTop: '-2px',
    },
    menuStyle:{
        border:`1px solid ${fade(theme.palette.common.black, 0.10)}`,
        borderRadius:theme.spacing(2),
        fontSize: '0.8rem'
    },
    listItem:{
        paddingTop: 0,
        paddingBottom: 0,
    }
    }
));

const RestaurantFilters = ({isCuisineTypeCollapse,handleCuisineTypeCollapse,handleChangeFilters,query}) =>{
    const [category,setCategory] = useState([]);
    const [city,setCity] = useState(null);
    const [isRestaurantOpen, setRestaurantOpen] = useState(false);
    const [rate,setRate] = useState(0);

    useEffect(()=>{
        if(query){
            query.city && setCity(query.city);
            query.category && setCategory(query.category.split(','));
            query.open && setRestaurantOpen(query.open);
            query.rate && setRate(query.rate);
        }
    },[query])

    const handleClearAll = () =>{
        setCategory([]);
        setCity('');
        setRestaurantOpen(false);
        setRate(0);
    };
    const handleToggleRestaurantOpen = () =>{
        setRestaurantOpen(!isRestaurantOpen);
    };

    const handleCheckFilter = (value) =>{
        const categoryIndex = category.findIndex(cat=>cat === value);
        const newRestaurantsArray = [...category];
        categoryIndex !== -1 && newRestaurantsArray.splice(categoryIndex,1)
        categoryIndex !== -1 ? setCategory(newRestaurantsArray) : setCategory([...category,value]);
    };
    const classes = useStyles();
    return (
        <Paper className={classes.filtersPaperStyle} variant="outlined">
            <Box display = "flex" justifyContent = "space-between" alignItems = "center" mb={4} flexWrap="wrap">
                <Typography variant = "h3" className={classes.filtersSubtitleStyle}>Filtry</Typography>
                <Button
                    variant="text"
                    size="small"
                    classes={{label:classes.buttonLabel}}
                    disableRipple
                    onClick={handleClearAll}
                > Wyczyść wszystkie</Button>
            </Box>
            <Typography variant="body2" className={classes.filtersSubtitleStyle} paragraph>Miasto</Typography>
            <Autocomplete
                size="small"
                autoComplete
                value={city}
                classes={{paper:classes.menuStyle, input:classes.selectInput, inputRoot:classes.selectInputRoot,popupIndicator:classes.selectIcon}}
                options={['Tarnów',"Bochnia","Brzesko","Kraków","Gliwice","Katowice"]}
                onChange={(item,value)=>setCity(value)}
                renderInput={(params) => (
                    <TextField {...params} classes={{root:classes.select}} InputProps={{...params.InputProps, disableUnderline: true, }}/>
                )}
            />
            <Box mb={2}/>

            <Typography variant="body2" className={classes.filtersSubtitleStyle} paragraph>Otwarte:</Typography>
            <Box display = "flex" alignItems="center" justifyContent={"space-around"} mb={2}>
                <Button variant={isRestaurantOpen ? "outlined" : "contained"} color="secondary" disabled={isRestaurantOpen} onClick={handleToggleRestaurantOpen}>Teraz otwarte</Button>
                <Button variant={!isRestaurantOpen ? "outlined" : "contained"} color="secondary" disabled={!isRestaurantOpen} onClick={handleToggleRestaurantOpen}>Brak</Button>
            </Box>
            <Typography variant="body2" className={classes.filtersSubtitleStyle} paragraph>Ocena (od):</Typography>
            <Box display ="flex" alignItems="center">
                <Rating
                    name="rating"
                    precision={0.5}
                    onChange={(event, newValue) => {
                        setRate(newValue);
                    }}
                    value={Number(rate)}
                />
                {rate > 0 &&
                    <IconButton size="small" onClick={()=>setRate(0)}>
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                }
            </Box>
            <Box mb={2}/>
            <Typography variant="body2" className={classes.filtersSubtitleStyle} paragraph>Typ kuchni:</Typography>
            <List className={classes.listStyle} >
                {
                    cuisineType.map((type,index) => (
                        index <=4 &&
                        <ListItem key={type.key} button classes={{root:classes.listItem}} onClick={()=>handleCheckFilter(type.key)}>
                            <ListItemIcon classes={{root:classes.listItemIcon}}>
                                <Checkbox
                                    edge="start"
                                    checked={category.indexOf(type.key) !== -1}
                                    size="small"
                                />
                            </ListItemIcon>
                            <ListItemText primary={type.label} />
                        </ListItem>
                    ))
                }
                <Collapse in={isCuisineTypeCollapse} timeout="auto" unmountOnExit>
                    {
                        cuisineType.map((type,index) => (
                            index >4 &&
                            <ListItem key={type.key} button classes={{root:classes.listItem}} onClick={()=>handleCheckFilter(type.key)}>
                                <ListItemIcon classes={{root:classes.listItemIcon}}>
                                    <Checkbox
                                        edge="start"
                                        checked={category.indexOf(type.key) !== -1}
                                        size="small"
                                    />
                                </ListItemIcon>
                                <ListItemText primary={type.label} />
                            </ListItem>
                        ))
                    }
                </Collapse>
                <Box>
                    <Button
                        variant="text"
                        size="small"
                        disableRipple
                        fullWidth
                        classes={{label:classes.buttonLabel}}
                        onClick={handleCuisineTypeCollapse}
                    >
                        {isCuisineTypeCollapse ? 'Ukryj' : `Wczytaj więcej (${cuisineType.length - 5})`}
                    </Button>
                </Box>
            </List>
            <Box mb={3}/>
            <Button fullWidth color="secondary" variant="contained" onClick={()=>handleChangeFilters(category.join(','), city,isRestaurantOpen,rate)}>Szukaj</Button>
        </Paper>
    )
}
export default RestaurantFilters;
