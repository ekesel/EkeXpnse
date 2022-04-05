import { CHANGE_TOKEN, GET_TOKEN } from "../action-types/auth";

export const changeToken=(data)=> {
    return {
        type: CHANGE_TOKEN,
        data: data,
    };
};


export const getToken=(data)=> {
    var dat = localStorage.getItem('savedToken')
    console.log(dat);
    return {
        type: GET_TOKEN,
        data: dat,
    };
};
