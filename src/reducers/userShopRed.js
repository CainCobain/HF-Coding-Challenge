"use strict"
//UserShop Reducer
export function UserShopRed(state={liked:[]},action) { 
    switch(action.type){
        case "GET_LIKED_SHOPS":
        return {...state,
            liked:action.payload
        };
        break;
        case "GET_DISLIKED_SHOPS":
        return {...state,
            liked:action.payload
        };
        break;
        case "POST_LIKED_SHOP":
        return {
             ...state,
             liked:action.payload
            };
        break;
        case "REMOVE_LIKED_SHOP":
        return {
            ...state,
            liked:action.payload
            };
        break;
        case "RERENDER_SHOP":
        return {...state,
            liked:action.payload
        };
    }
    return state;
}