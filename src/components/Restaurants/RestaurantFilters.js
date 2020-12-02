import React from "react";
import {
    Box,
    Button,
    Checkbox, Collapse, fade,
    List,
    ListItem,
    ListItemIcon,
    ListItemText, Paper,
    TextField,
    Typography
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import Rating from "@material-ui/lab/Rating/Rating";
import {cuisineType} from "../../helpers/_helpers";
import {makeStyles} from "@material-ui/core/styles";

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
}));

const RestaurantFilters = ({isCuisineTypeCollapse,handleCuisineTypeCollapse}) =>{
    const classes = useStyles();
    return (
        <Paper className={classes.filtersPaperStyle} variant="outlined">
            <Box display = "flex" justifyContent = "space-between" alignItems = "center" mb={4} flexWrap="wrap">
                <Typography variant = "h3" className={classes.filtersSubtitleStyle}>Filtry</Typography>
                <Button variant="text" size="small" classes={{label:classes.buttonLabel}} disableRipple> Wyczyść wszystkie</Button>
            </Box>
            <Typography variant="body2" className={classes.filtersSubtitleStyle} paragraph>Miasto</Typography>
            <Autocomplete
                size="small"
                disableClearable
                autoComplete
                classes={{paper:classes.menuStyle, input:classes.selectInput, inputRoot:classes.selectInputRoot,popupIndicator:classes.selectIcon}}
                options={['Tarnów',"Bochnia","Brzesko","Kraków","Gliwice","Katowice"]}
                renderInput={(params) => (
                    <TextField {...params} classes={{root:classes.select}} InputProps={{...params.InputProps, disableUnderline: true, }}/>
                )}
            />
            <Box mb={2}/>

            <Typography variant="body2" className={classes.filtersSubtitleStyle} paragraph>Rezerwacja:</Typography>
            <Box display = "flex" alignItems="center" justifyContent={"space-around"} mb={2}>
                <Button variant="outlined" color="secondary">Rezerwacja</Button>
                <Button variant="outlined" color="secondary" disabled>Brak</Button>
            </Box>
            <Typography variant="body2" className={classes.filtersSubtitleStyle} paragraph>Opinie:</Typography>
            <Rating name="pristine" value={null} />
            <Box mb={2}/>
            <Typography variant="body2" className={classes.filtersSubtitleStyle} paragraph>Typ kuchni:</Typography>
            <List className={classes.listStyle} >
                {
                    cuisineType.map((type,index) => (
                        index <=4 &&
                        <ListItem key={type.key} dense button>
                            <ListItemIcon classes={{root:classes.listItemIcon}}>
                                <Checkbox
                                    edge="start"
                                    checked={false}
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
                            <ListItem key={type.key} dense button>
                                <ListItemIcon classes={{root:classes.listItemIcon}}>
                                    <Checkbox
                                        edge="start"
                                        checked={false}
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
            <Button fullWidth color="secondary" variant="contained">Szukaj</Button>
        </Paper>
    )
}
export default RestaurantFilters;
