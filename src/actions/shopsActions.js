"use strict"
import axios from 'axios';

//Get Shops
export function GetShops(){
    return function(dispatch){
        axios.get("/api/shops")
           .then((response)=>{  
               dispatch({type:"GET_SHOPS",payload:response.data})
           })
           .catch((err)=>{
               dispatch({type:"GET_SHOPS_REJECTED",payload:"there was an error while geting shops"})
           })
    }
}






