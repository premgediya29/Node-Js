const express = require("express");
const app = express()
const port = 3000;
const db = require("./Config/db");

app.use(express.urlencoded());

const addSchema = require("./Model/addSchema");
const routes = require("./Routes");
app.use('/',require("./Route/index"));

app.listen(port , (err)=>{
    err ? console.log(err) : console.log(`server started on ${port}`);
})