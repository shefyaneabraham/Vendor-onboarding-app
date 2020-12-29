/*
Refer to the Document.pdf for documentation.
Refer to API collection Postman to import in Postman an test

*/


const express= require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser")
var config = require("./config");
var vendorRoutes= require('./routers/levels')

mongoose.connect(config.dbHost,{useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false, useCreateIndex:true})
var app= express();
var router= express.Router({mergeParams:true});
module.exports = app;

app.use(bodyparser.json({limit:'50mb'}));
app.use(bodyparser.urlencoded({limit:'50mb',extended:true}));

app.use('/vendor',vendorRoutes);
const port = process.env.PORT||8080;
app.listen(port, function(){
    console.log("Node js server for Test Started on port: "+port);
})