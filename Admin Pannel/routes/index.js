const express = require("express");
const routes = express.Router();

const adminctl = require("../controllers/adminctl");
const multer=require('multer');

const Storage=multer.diskStorage({
  destination : (req,file,cb)=>{
    cb(null,"uploads/")
  },
  filename : (req,file,cb)=>{
    cb(null,file.fieldname+"-"+Date.now());
  }
})

const Uploadspic=multer({storage:Storage}).single("img")


routes.get("/", adminctl.Login)
routes.get("/table",adminctl.table)
routes.get("/dashboard",adminctl.dashboard)
routes.get("/AddForm",adminctl.AddForm)
routes.get("/ViewForm",adminctl.ViewForm)

routes.post("/insserdata",Uploadspic,adminctl.insserdata);

routes.get("/deletedata",adminctl.deletedata)
routes.get("/editdata",adminctl.editdata)

routes.post("/updatedata",Uploadspic,adminctl.updatedata)

routes.post("/userlogin",adminctl.userlogin);

routes.get("/logout",adminctl.Logout)


module.exports = routes; 