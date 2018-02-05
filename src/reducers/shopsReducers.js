"user strict"

//Define reducers
export function ShopsReducer(state={shops:[]},action){
    switch (action.type){
        case "GET_SHOPS":
        return {...state,
            shops: action.payload
        };
        break; 
    }
    return state;
}