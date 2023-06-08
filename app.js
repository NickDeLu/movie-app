const express = require('express');
const fs = require("fs");
const path = require("path");
const app = express();
var cors = require('cors');

//Middleware
app.use(cors({origin:true,credentials: true}));
app.options('*', cors({origin:true,credentials: true}));
app.use(express.urlencoded({extended:false})); 
app.use(express.json());
app.use(express.static(process.cwd()+"/www"));

app.get('*', (req,res) => {
    res.sendFile(process.cwd()+"/www")
});

app.listen(8080,()=>{
    console.log("listening on 8080" + " From movieApp");
})