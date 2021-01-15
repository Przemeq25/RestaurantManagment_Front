import React from "react";
import {fade, InputBase} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme=>({
    root: {
        position:'fixed',
        [theme.breakpoints.up('md')]:{
            height:'auto',
            top:'50%',
            right:0,
            transform:'translate(0,-50%)',
            flexDirection:'column',
            background:'transparent',
        },
        [theme.breakpoints.down('sm')]:{
            bottom:'0',
            right:'50%',
            transform:'translate(50%,0)',
            background:'#ebebeb',
            width:'100%',

        },
    },
    ordersContainerPadding:{
        [theme.breakpoints.down("sm")]:{
            paddingBottom:60
        }
    },
    search: {
        position: 'relative',
        borderRadius: 15,
        backgroundColor: fade(theme.palette.common.black, 0.10),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.20),
        },
        width: width=>width.width,
        [theme.breakpoints.up('sm')]: {
            width:'auto'
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: theme.palette.primary.main,
        width:'100%',
        fontSize:'0.8rem',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
    },

}));

const Search =({width,handleBlur})=>{
    const classes = useStyles({width:width});
    return(
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder="Szukaj…"
                onBlur={handleBlur}
                onKeyPress={e=>{
                    if(e.key==="Enter"){
                        handleBlur(e)
                    }
                }}
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
            />
        </div>
    )
}
export default Search;

Search.defaultProps ={
    width:150,
}
