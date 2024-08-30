const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/CrudProject");

const db = mongoose.connection;

db.once("opne",(err)=>{
    err ? console.log(err) : console.log("DATABASE CONNECTED");
})
module.exports = db;