const express = require("express");
const db=require("./config/Database");

const cookieParser=require('cookie-parser');
const port = 6578;
// path //
const path = require("path")
// path //

const app = express();


app.use(express.urlencoded());
app.set("view engine","ejs");
app.use(cookieParser());

// routes //
const routes = require("./routes")
app.use("/",routes)
// routes //


// cookies //
// cookies //



app.use(express.static(path.join(__dirname , "Public")))
app.use("/uploads",express.static(path.join(__dirname,"uploads")))



app.listen(port,(err)=>{
    err ? console.log(err) : console.log(`server started on ${port}`);
    
});