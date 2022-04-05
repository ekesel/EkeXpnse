import { CHANGE_TOKEN, GET_TOKEN } from "../action-types/auth";
const savedToken=()=>{
    const token = localStorage.getItem("savedToken")
    return token
}
const initialState={
    savedToken : savedToken(),
};

export const TokenReducer=(state=initialState, action)=> {
    switch(action.type) {
        case CHANGE_TOKEN: {
            localStorage.setItem('savedToken', action.data)
            return {
                ...state,
                savedToken: action.data,
            }
        }
        case GET_TOKEN: {
            return {
                ...state,
                savedToken: action.data,
            }
        }
        default:
            return state; 
    }
};