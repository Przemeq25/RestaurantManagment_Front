import React from "react";
import {
    Box,
    Button,
    fade,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
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
        select: {
            border: `1px solid ${fade(theme.palette.common.black, 0.10)}`,
            borderRadius: theme.spacing(2),
            padding: '4px 8px 0px',
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

const MenuFilters = () =>{
    const classes = useStyles();
    return (
        <Paper className={classes.filtersPaperStyle} variant="outlined">
            <Box display = "flex" justifyContent = "space-between" alignItems = "center" mb={4} flexWrap="wrap">
                <Typography variant = "h3" className={classes.filtersSubtitleStyle}>Filtry</Typography>
                <Button variant="text" size="small" classes={{label:classes.buttonLabel}} disableRipple> Wyczyść wszystkie</Button>
            </Box>
            <Typography variant="body2" className={classes.filtersSubtitleStyle} paragraph>Kategoria:</Typography>
            <Autocomplete
                size="small"
                disableClearable
                autoComplete
                classes={{paper:classes.menuStyle, input:classes.selectInput, inputRoot:classes.selectInputRoot,popupIndicator:classes.selectIcon}}
                options={["Alkohole","Kebaby","Inne"]}
                renderInput={(params) => (
                    <TextField {...params} classes={{root:classes.select}} InputProps={{...params.InputProps, disableUnderline: true, }}/>
                )}
            />
            <Box mb={2}/>
            <Typography variant="body2" className={classes.filtersSubtitleStyle} paragraph>Cena:</Typography>
            <Box display = "flex" justifyContent = "space-around" alignItems = "center" mb={2}>
                <TextField
                    placeholder="od"
                    classes={{root:classes.select}}
                    InputProps={{disableUnderline: true,classes:{input:classes.selectInput }}}
                    size="small"
                />
                <TextField
                    placeholder="do"
                    classes={{root:classes.select}}
                    InputProps={{disableUnderline: true,classes:{input:classes.selectInput } }}
                    size="small"
               />
            </Box>
            <Typography variant="body2" className={classes.filtersSubtitleStyle} paragraph>Czas przygotowania(min):</Typography>
            <Box display = "flex" justifyContent = "space-around" alignItems = "center">
                <TextField
                    placeholder="od"
                    classes={{root:classes.select}}
                    InputProps={{disableUnderline: true,classes:{input:classes.selectInput }}}
                    size="small"
                />
                <TextField
                    placeholder="do"
                    classes={{root:classes.select}}
                    InputProps={{disableUnderline: true,classes:{input:classes.selectInput } }}
                    size="small"
                />
            </Box>
            <Box mb={3}/>
            <Button fullWidth color="secondary" variant="contained">Szukaj</Button>
        </Paper>
    )
}
export default MenuFilters;
