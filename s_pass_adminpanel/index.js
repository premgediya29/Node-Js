const express=require("express");
const port=7000;
const app =express();
app.use(express.urlencoded());
app.set("view engine","ejs");
var session =require('express-session');
const passport=require("passport");
const localst=require("./config/passport");
const multer=require("./config/db");
const db=require("./confing/db");
const admin=require("./model/admin");
const path=require("path");

