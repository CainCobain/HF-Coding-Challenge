"use strict"
import axios from 'axios';

//Create User
export function AddUser(user){
    return function(dispatch){
        axios.post("/api/addUser",user)
           .then((response)=>{
               dispatch({type:"POST_ADD_USER",payload:response.data})
           })
           .catch((err)=>{
               dispatch({type:"POST_ADD_USER_REJECTED",payload:"there was an error while adding this user"})
           })
    }
   }

//User Login
export function ConnectUser(user){
    return function(dispatch){
        axios.post("/api/login",user)
           .then((response)=>{
               dispatch({type:"POST_LOGIN_USER",payload:response.data})
           })
           .catch((err)=>{
               dispatch({type:"POST_LOGIN_USER_REJECTED",payload:"there was an error while adding this user"})
           })
    }
   }