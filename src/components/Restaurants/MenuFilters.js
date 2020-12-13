import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    fade, MenuItem,
    Paper, Select,
    TextField,
    Typography
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import {makeStyles} from "@material-ui/core/styles";
import {onlyNumbers} from "../../helpers/_validation";

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
        buttonLabel: {
            justifyContent: 'normal',
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            fontSize: '0.6rem'
        },
        selectInput:{
            fontSize:'0.8rem',
            border:`1px solid ${fade(theme.palette.common.black, 0.10)}`,
            borderRadius:theme.spacing(2),
            padding:'5px 8px 5px',
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
        menuItem:{
            fontSize:'0.8rem',
        },
        select:{
            width:'100%',
        }
    }
));

const MenuFilters = ({handleChangeFilters,query}) =>{
    const classes = useStyles();
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo,setPriceTo] = useState('');
    const [prepareFrom,setPrepareFrom] = useState('');
    const [prepareTo,setPrepareTo] = useState('');
    const [category,setCategory] = useState('');



    const handleClearAll =()=>{
        setPriceFrom('');
        setPrepareTo('');
        setPriceTo('');
        setPrepareFrom('');
        setCategory('');
    }

    return (
        <Paper className={classes.filtersPaperStyle} variant="outlined">
            <Box display = "flex" justifyContent = "space-between" alignItems = "center" mb={4} flexWrap="wrap">
                <Typography variant = "h3" className={classes.filtersSubtitleStyle}>Filtry</Typography>
                <Button variant="text" size="small" classes={{label:classes.buttonLabel}} disableRipple onClick={handleClearAll}> Wyczyść wszystkie</Button>
            </Box>
            <Typography variant="body2" className={classes.filtersSubtitleStyle} paragraph>Kategoria:</Typography>
            <Select
                value={'default'}
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
                classes={{select:classes.selectInput}}
                className={classes.select}
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
            >
                    <MenuItem value="1" className={classes.menuItem}>weleo</MenuItem>
            </Select>
            <Box mb={2}/>
            <Typography variant="body2" className={classes.filtersSubtitleStyle} paragraph>Cena:</Typography>
            <Box display = "flex" justifyContent = "space-around" alignItems = "center" mb={2}>
                <TextField
                    placeholder="od"
                    InputProps={{disableUnderline: true,classes:{input:classes.selectInput }}}
                    size="small"
                    value={priceFrom}
                    onChange={(e)=>setPriceFrom(e.target.value)}
                    onInput={(e)=>onlyNumbers(e)}
                />
                <TextField
                    placeholder="do"
                    InputProps={{disableUnderline: true,classes:{input:classes.selectInput } }}
                    size="small"
                    value={priceTo}
                    onChange={(e)=>setPriceTo(e.target.value)}
                    onInput={(e)=>onlyNumbers(e)}
               />
            </Box>
            <Typography variant="body2" className={classes.filtersSubtitleStyle} paragraph>Czas przygotowania(min):</Typography>
            <Box display = "flex" justifyContent = "space-around" alignItems = "center">
                <TextField
                    placeholder="od"
                    InputProps={{disableUnderline: true,classes:{input:classes.selectInput }}}
                    size="small"
                    value={prepareFrom}
                    onChange={(e)=>setPrepareFrom(e.target.value)}
                    onInput={(e)=>onlyNumbers(e)}
                />
                <TextField
                    placeholder="do"
                    InputProps={{disableUnderline: true,classes:{input:classes.selectInput } }}
                    size="small"
                    value={prepareTo}
                    onChange={(e)=>setPrepareTo(e.target.value)}
                    onInput={(e)=>onlyNumbers(e)}
                />
            </Box>
            <Box mb={3}/>
            <Button fullWidth color="secondary" variant="contained" onClick={()=>handleChangeFilters(category,priceFrom,priceTo,prepareFrom,prepareTo)}>Szukaj</Button>
        </Paper>
    )
}
export default MenuFilters;
