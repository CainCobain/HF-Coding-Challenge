"use strict"
import axios from 'axios';

//Get Liked Shops
export function GetLikedShops(){
    return function(dispatch){
        axios.get("/api/likedShop")
           .then((response)=>{
               dispatch({type:"GET_LIKED_SHOPS",payload:response.data})
           })
           .catch((err)=>{
               dispatch({type:"GET_LIKED_SHOPS_BOOKS_REJECTED",payload:"there was an error while geting liked shops"})
           })
    }
}

//Create Shop
export function LikeShop(shop){
 return function(dispatch){
     axios.post("/api/shops",shop)
        .then((response)=>{
            dispatch({type:"POST_LIKED_SHOP",payload:response.data})
        })
        .catch((err)=>{
            dispatch({type:"POST_SHOP_REJECTED",payload:"there was an error while liking this shop"})
        })
 }
}

//Delete Shop 
export function RemoveShop(index){
    return function(dispatch){
        axios.delete("/api/likedShop/"+index)
           .then((response)=>{
               dispatch({type:"REMOVE_LIKED_SHOP",payload:response.data})
           })
           .catch((err)=>{
               dispatch({type:"REMOVE_LIKED_SHOP_REJECTED",payload:"there was an error while deleting shop"})
           })
    }
   
}
//Rerender Shop 
export function RerenderShop(index){
    return function(dispatch){
        axios.delete("/api/dislikedShop/"+index)
           .then((response)=>{
               dispatch({type:"RERENDER_SHOP",payload:index})
           })
           .catch((err)=>{
               dispatch({type:"RERENDER_SHOP_REJECTED",payload:"there was an error while reredering shop"})
           })
    }
   
}
//Get Disliked Shop 
export function GetDislikedShops(){
    return function(dispatch){
        axios.get("/api/dislikedShop")
           .then((response)=>{
               console.log('data rednred from disliked shops action : ',response.data);
               dispatch({type:"GET_DISLIKED_SHOPS",payload:response.data})
           })
           .catch((err)=>{
               dispatch({type:"REMOVE_DISLIKED_SHOP_REJECTED",payload:"there was an error while geting disliked shops"})
           })
    }
   
}

