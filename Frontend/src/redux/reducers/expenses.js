import { ADD_EXPENSE, DELETE_EXPENSE, SEARCH_EXPENSE } from "../action-types/expenses";
const initialList=()=>{
    const list = localStorage.getItem("expense-list")
    let expenses=[];
    if(list) {
        expenses = JSON.parse(list);
    }
    return expenses;
}
const initialState={
    expenseList : initialList(),
    query: "",
};

export const expenseReducer=(state=initialState, action)=> {
    switch(action.type) {
        case ADD_EXPENSE: {
            const {data} = action;
            localStorage.setItem('expense-list',JSON.stringify(data))
            //localStorage.setItem('expense-list', JSON.stringify(...state.expenseList, action.data))
            return {
                ...state,
                expenseList: data,
            }
        }
        case DELETE_EXPENSE: {
            const {data} = action;
            //const updatedList = state.expenseList.filter(item=>item.createdAt !== data.createdAt);
            localStorage.setItem('expense-list',JSON.stringify(data))
            return {
                ...state,
                expenseList: data,
            }   
        }
        case SEARCH_EXPENSE: {
            const { query } = action
            return {
                ...state,
                query,
            };
        }
        default:
            return state; 
    }
};