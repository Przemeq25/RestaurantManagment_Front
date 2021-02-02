import React from "react";
import {
    Drawer,
    TextField,
    Typography,
    Box, IconButton,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CloseIcon from '@material-ui/icons/Close';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Collapse from "@material-ui/core/Collapse";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Button from "@material-ui/core/Button";
import ProgressButton from "../../ProgressButton";
import {useDispatch, useSelector} from "react-redux";
import {
    addTableInForm,
    addTablesToRestaurant, changeNameOfTableInForm,
    changeNumberOfSeats,
    changeNumberOfTables,
    removeTableInForm,
    toggleAddTablesDrawer,
    toggleCollapseInForm
} from "../../../redux/actions/tables";

const useStyles = makeStyles(theme=>({
    drawerStyle:{
        top: 64,
        padding:20,
        alignItems:'center',
        height:'calc(100% - 64px)',
        maxWidth:380,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    closeIconPosition:{
        position:'absolute',
        top: 10,
        right:10,
        cursor:'pointer',
    },
    input:{
        display:'none',
    },
    accordionSummary:{
        padding: 0,
    }
}));

const AddTables =({restaurantId})=>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const addingTables = useSelector(state=>state.tables.addingTables);
    const isOpen = useSelector(state=>state.tables.addTableIsOpen)

    const submitTable = () =>{
        const checkIsNotEmpty = addingTables.tables.every(table => table.numberOfSeats !== "" && table.numberOfTables !== "" && table.numberOfSeats > 0 && table.numberOfTables >0)
        if(checkIsNotEmpty){
            const obj = addingTables.tables.map(table=>table.tablesNumbers.map(item=>({name:item.name || `#${item.id + 1}`, numberOfSeats: Number(table.numberOfSeats), canReserve:true})));
            dispatch(addTablesToRestaurant(restaurantId,Array.prototype.concat.apply([], obj)))
        }
    }


    return(
        <>
            <Drawer open={isOpen} anchor="right" variant="persistent" classes={{paper:classes.drawerStyle}}>
                <CloseIcon className={classes.closeIconPosition} onClick={()=>dispatch(toggleAddTablesDrawer())}/>
                <Typography variant="h4" paragraph>Dodaj stoliki:</Typography>
                <Box mt={4} mb={2} display="flex" alignItems = "center" flexDirection = "column">
                    <Box>
                        <Typography variant="body2">Ile rodzajów stolików chcesz dodać? </Typography>
                        <Typography variant="subtitle1">(Rodzaj stolika - liczba miejsc przy stoliku) </Typography>
                    </Box>
                    <Box mt={2} display="flex" alignItems="center" justifyContent="center">
                        <IconButton
                            size="small"
                            onClick={()=>dispatch(removeTableInForm())}
                            disabled={addingTables.amount <= 1}
                            color="secondary"
                        >
                            <IndeterminateCheckBoxIcon
                                color="inherit"
                                className={classes.buttonActions}
                            />
                        </IconButton>
                        <TextField
                            value={addingTables.amount}
                            disabled
                            inputProps={{
                                min: 0,
                                style: {
                                    textAlign: 'center',
                                    maxWidth:30,
                                    margin:'0px 5px',
                                }
                            }}
                        />
                        <IconButton
                            size="small"
                            onClick={()=>dispatch(addTableInForm())}
                            color="secondary"
                        >
                            <AddBoxIcon
                                color="inherit"
                                className={classes.buttonActions}
                            />
                        </IconButton>
                    </Box>
                    {addingTables.tables.map((row,index)=>(
                        <Box key = {index} mt={2}>
                            <Typography variant="subtitle2">#{index}</Typography>
                            <Box mb={1} display="flex" alignItems="center">
                                <Box mr={2}/>
                                <TextField value={row.numberOfSeats} label="Lb. miejsc" onChange={(e)=>dispatch(changeNumberOfSeats(index,e.target.value))}/>
                                <Box mr={1}/>
                                <TextField value={row.numberOfTables} label="Lb. stolików" onChange={(e)=>dispatch(changeNumberOfTables(index,e.target.value))}/>
                            </Box>
                            {addingTables.tables[index].tablesNumbers.length ? (
                                <Box mb={1} display="flex" justifyContent="center">
                                    <Button size="small" onClick={() => dispatch(toggleCollapseInForm(index))}
                                            endIcon={addingTables.tables[index].isCollapseOpen ? <ArrowDropUpIcon/> :
                                                <ArrowDropDownIcon/>}>
                                        Wprowadź nazwy stolików
                                    </Button>
                                </Box>
                            ):null
                            }
                            <Collapse in={addingTables.tables[index].isCollapseOpen} timeout="auto" unmountOnExit>
                                <Box pl={4} pr={4}>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>#</TableCell>
                                                <TableCell>Identyfikator</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {addingTables.tables[index].tablesNumbers.map((row) => (
                                                <TableRow key={row.id}>
                                                    <TableCell component="th" scope="row">
                                                        {row.id + 1}
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField value={row.name} placeholder="..." onChange={(e)=>dispatch(changeNameOfTableInForm(index,row.id,e.target.value))}/>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Collapse>
                        </Box>
                    ))}
                </Box>
                <Box width = "100%">
                    <ProgressButton label="Dodaj" onClick={()=>submitTable()} variant="contained" color="secondary" size="small"/>
                </Box>
            </Drawer>
        </>
    );

}
export default AddTables;
