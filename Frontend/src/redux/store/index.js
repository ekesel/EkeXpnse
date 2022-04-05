import { combineReducers, createStore } from "redux";
import { TokenReducer } from "../reducers/auth";
import { expenseReducer } from "../reducers/expenses";

const reducer = combineReducers({
    expenses: expenseReducer,
    token: TokenReducer,
})
const initialState = {}
const store = createStore(reducer, initialState);

export default store;