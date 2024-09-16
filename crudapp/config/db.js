const mongoose=require("mongoose");

mongoose.connect("mongodb://127.0.0.1/routedata");

const db = mongoose.connection

db.once("opne",(err)=>{
    err?console.log(err):console.log("Data base connected");
})
module.exports=db;