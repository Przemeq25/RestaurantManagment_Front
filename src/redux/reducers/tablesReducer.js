import {tablesConstants} from "../types";

const initialState = {
    isFetching:false,
    isAddRequesting:false,
    tables:[],
    error:'',
    addTableIsOpen:false,
    addingTables:{
        amount:1,
        tables:[{
            numberOfSeats:'',
            numberOfTables:'',
            isCollapseOpen:false,
            tablesNumbers:[],
        }],
    }
}

export const tablesReducer = (state = initialState, action) =>{
    switch (action.type) {
        case tablesConstants.GET_TABLES_REQUEST:
            return {
                ...state,
                isFetching: true,
            }
        case tablesConstants.GET_TABLES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                tables: action.payload
            }
        case tablesConstants.GET_TABLES_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
        case tablesConstants.ADD_TABLES_REQUEST:
            return {
                ...state,
                isAddRequesting:true,
                addTableIsOpen: false
            }
        case tablesConstants.ADD_TABLES_SUCCESS:
            return {
                ...state,
                isAddRequesting: false,
                tables: state.tables.concat(action.payload),
                addingTables: initialState.addingTables
            }

        case tablesConstants.FORM_ADD_TABLE:{
            const newTable = {
                numberOfSeats:'',
                numberOfTables:'',
                tablesNumbers:[],
            }
            return {
                ...state,
                addingTables: {
                    amount: state.addingTables.amount +1,
                    tables:[...state.addingTables.tables, newTable]
                },

            }
        }

        case tablesConstants.FORM_REMOVE_TABLE:{
            const arrayWithoutLastElement = [...state.addingTables.tables];
            arrayWithoutLastElement.pop();
            if(state.addingTables.amount >1){
                return {
                    ...state,
                    addingTables:{
                        amount:state.addingTables.amount -1,
                        tables:arrayWithoutLastElement,
                    }

                }
            }else{
                return {...state.addingTables}
            }
        }

        case tablesConstants.FORM_CHANGE_NUMBER_OF_SEATS:{
            const {index,value} = action.payload;
            const copyOfTables = [...state.addingTables.tables];
            copyOfTables.splice(index,1,{...copyOfTables[index],numberOfSeats:value});
            return {
                ...state,
                addingTables:{
                    ...state.addingTables,
                    tables:copyOfTables
                }

            }
        }
        case tablesConstants.FORM_CHANGE_NUMBER_OF_TABLES:{
            const {index,value} = action.payload;
            const copyOfTables = [...state.addingTables.tables];
            const newTablesNumbers= [...state.addingTables.tables[index].tablesNumbers];
            if(newTablesNumbers.length){
                if(value > state.addingTables.tables[index].numberOfTables){
                    for(let i = Number(state.addingTables.tables[index].numberOfTables); i < value; i++){
                        newTablesNumbers.push({id:i, name:''});
                    }
                }else{
                    const numberOfItemToBeRemoved = state.addingTables.tables[index].numberOfTables - value;
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
                ...state,
                addingTables:{
                    ...state.addingTables,
                    tables:copyOfTables
                }
            }
        }
        case tablesConstants.FORM_TOGGLE_COLLAPSE:{
            const copyOfTables = [...state.addingTables.tables];
            copyOfTables.splice(action.payload,1,{...copyOfTables[action.payload], isCollapseOpen:!copyOfTables[action.payload].isCollapseOpen});
            return {
                ...state,
                addingTables:{
                    ...state.addingTables,
                    tables:copyOfTables
                }
            }
        }
        case tablesConstants.FORM_TOGGLE_OPEN:{
            return {
                ...state,
                addTableIsOpen:!state.addTableIsOpen,
            }
        }
        case tablesConstants.FORM_CHANGE_NAME_OF_TABLE:{
            const {id,index,value} = action.payload;
            const copyOfTables = [...state.addingTables.tables];
            const newTablesNumber= [...state.addingTables.tables[index].tablesNumbers];
            newTablesNumber.splice(id,1,{id:id, name:value});
            copyOfTables.splice(index,1,{...copyOfTables[index], tablesNumbers:newTablesNumber});
            return {
                ...state,
                addingTables:{
                    ...state.addingTables,
                    tables:copyOfTables
                }

            }
        }

        default:
            return state
    }
}
