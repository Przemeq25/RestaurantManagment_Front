import React, {useState} from "react";
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

const AddTables =({addTableIsOpen,handleToggleAddTable})=>{
    const classes = useStyles();
    const [tableTypesAmount,setTableTypesAmount] = useState({
        amount:1,
        tables:[{
            numberOfSeats:'',
            numberOfTables:'',
            isCollapseOpen:false,
            tablesNumbers:[],
        }],
    });

    const addTable = () =>{
        setTableTypesAmount(currentState=>{
            const newTable = {
                numberOfSeats:'',
                numberOfTables:'',
                tablesNumbers:[],
            }
            return {
                amount:currentState.amount +1,
                tables:[...currentState.tables, newTable]
            }
        })
    }
    const removeTable = () =>{
        setTableTypesAmount(currentState=>{
            const arrayWithoutLastElement = [...currentState.tables];
            arrayWithoutLastElement.pop();
            if(currentState.amount >1){
                return {
                    amount:currentState.amount -1,
                    tables:arrayWithoutLastElement,
                }
            }else{
                return {...currentState}
            }
        })
    }
    const changeNumberOfSeats = (index,value) =>{
        setTableTypesAmount(currentState=>{
            const copyOfTables = [...currentState.tables];
            copyOfTables.splice(index,1,{...copyOfTables[index],numberOfSeats:value});
            return {
                ...currentState,
                tables:copyOfTables
            }
        })
    }
    const changeNumberOfTables = (index,value) =>{
        setTableTypesAmount(currentState=>{
            const copyOfTables = [...currentState.tables];
            const newTablesNumbers= [...currentState.tables[index].tablesNumbers];
            if(newTablesNumbers.length){
                console.log(value > currentState.tables[index].numberOfTables);
                if(value > currentState.tables[index].numberOfTables){
                    for(let i = Number(currentState.tables[index].numberOfTables); i < value; i++){
                        newTablesNumbers.push({id:i, name:''});
                    }
                    console.log(newTablesNumbers)
                }else{
                    const numberOfItemToBeRemoved = currentState.tables[index].numberOfTables - value;
                    for(let i = 0; i < numberOfItemToBeRemoved; i++){
                        newTablesNumbers.pop();
                    }
                }
            }else{
                for(let i = 0; i < value; i++){
                    newTablesNumbers.push({id:i, name:''});
                }
            }

            copyOfTables.splice(index,1,{...copyOfTables[index],numberOfTables:value,tablesNumbers:newTablesNumbers});
            return {
                ...currentState,
                tables:copyOfTables
            }
        })
    }
    const changeNameOfTable = (index,id,value) =>{
        setTableTypesAmount(currentState=>{
            const copyOfTables = [...currentState.tables];
            const newTablesNumber= [...currentState.tables[index].tablesNumbers];
            newTablesNumber.splice(id,1,{id:id, name:value});
            copyOfTables.splice(index,1,{...copyOfTables[index], tablesNumbers:newTablesNumber});
            return {
                ...currentState,
                tables:copyOfTables
            }
    })
    }
    const handleToggleCollapse = (index)=>{
        setTableTypesAmount(currentState=>{
            const copyOfTables = [...currentState.tables];
            copyOfTables.splice(index,1,{...copyOfTables[index], isCollapseOpen:!copyOfTables[index].isCollapseOpen});
            return {
                ...currentState,
                tables:copyOfTables
            }
        })
    }


    return(
        <>
            <Drawer open={addTableIsOpen} anchor="right" variant="persistent" classes={{paper:classes.drawerStyle}}>
                <CloseIcon className={classes.closeIconPosition} onClick={handleToggleAddTable}/>
                <Typography variant="h4" paragraph>Dodaj stoliki:</Typography>
                <Box mt={4} mb={2} display="flex" alignItems = "center" flexDirection = "column">
                    <Box>
                        <Typography variant="body2">Ile rodzajów stolików chcesz dodać? </Typography>
                        <Typography variant="subtitle1">(Rodzaj stolika - liczba miejsc przy stoliku) </Typography>
                    </Box>
                    <Box mt={2} display="flex" alignItems="center" justifyContent="center">
                        <IconButton
                            size="small"
                            onClick={removeTable}
                            disabled={tableTypesAmount.amount <= 1}
                            color="secondary"
                        >
                            <IndeterminateCheckBoxIcon
                                color="inherit"
                                className={classes.buttonActions}
                            />
                        </IconButton>
                        <TextField
                            value={tableTypesAmount.amount}
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
                            onClick={addTable}
                            color="secondary"
                        >
                            <AddBoxIcon
                                color="inherit"
                                className={classes.buttonActions}
                            />
                        </IconButton>
                    </Box>
                    {tableTypesAmount.tables.map((row,index)=>(
                        <Box key = {index} mt={2}>
                            <Typography variant="subtitle2">#{index}</Typography>
                            <Box mb={1} display="flex" alignItems="center">
                                <Box mr={2}/>
                                <TextField value={row.numberOfSeats} label="Lb. miejsc" onChange={(e)=>changeNumberOfSeats(index,e.target.value)}/>
                                <Box mr={1}/>
                                <TextField value={row.numberOfTables} label="Lb. stolików" onChange={(e)=>changeNumberOfTables(index,e.target.value)}/>
                            </Box>
                            {tableTypesAmount.tables[index].tablesNumbers.length ? (
                                <Box mb={1} display="flex" justifyContent="center">
                                    <Button size="small" onClick={() => handleToggleCollapse(index)}
                                            endIcon={tableTypesAmount.tables[index].isCollapseOpen ? <ArrowDropUpIcon/> :
                                                <ArrowDropDownIcon/>}>
                                        Wprowadź nazwy stolików
                                    </Button>
                                </Box>
                                ):null
                            }
                            <Collapse in={tableTypesAmount.tables[index].isCollapseOpen} timeout="auto" unmountOnExit>
                                <Box pl={4} pr={4}>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>#</TableCell>
                                                <TableCell>Identyfikator</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {tableTypesAmount.tables[index].tablesNumbers.map((row) => (
                                                <TableRow key={row.id}>
                                                    <TableCell component="th" scope="row">
                                                        {row.id + 1}
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField value={row.name} placeholder="..." onChange={(e)=>changeNameOfTable(index,row.id,e.target.value)}/>
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
            </Drawer>
        </>
    );

}
export default AddTables;
