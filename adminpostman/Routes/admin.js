const express = require("express");
const route = express.Router();
const adminCtl = require("../Controllers/adminCtl")

const multer = require("multer");

const Storage = multer.diskStorage({
    destination: (req, file , cb)=>{
        cb(null,"uploads/addSchema")
    },
    filename: (req,file,cb)=>{
        cb(null,file.filedname + "-" + Date.now())
    }
}) 

const upload = multer ({storage:Storage}).single("image");

route.post("/addAdmin", upload, adminCtl,addadmin)

Medule.exports = route