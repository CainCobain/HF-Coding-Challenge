"use strict"

const express = require('express');
const app = express();
const path = require('path');


//Midelware to define folder for static files  

app.use(express.static('public'));

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'public','index.html'));
});


app.listen(3000,()=>{
    console.log('express working on port 3000'); 
});