"use strict"

//UserShop Reducer
export function UserReducer(state={user:[]},action) { 
    switch(action.type){
        case "POST_ADD_USER":
        return {
             ...state,
             user:action.payload
            };
        break;
        case "POST_LOGIN_USER":
        return {
             ...state,
             user:action.payload
            };
        break;
    }
    return state;
}