const express=require('express')

const routes=express.Router();
const adminctl = require('../Controller/AdminCtl')


routes.post("/registration",adminctl.Registration);
routes.post("/loginadmin",adminctl.loginadmin)
routes.get("/viewadmin",adminctl.viewAdmin)
routes.post("/insertadmin",adminctl.insertadmin)
routes.delete("/deleteadmin",adminctl.deleteadmin)
routes.post("editdata",adminctl.editdata)
routes.put("/updatedata",adminctl.updatedata)
routes.post("/changepass",adminctl.changepass)
routes.post("/forgetpass",adminctl.forgetpass)
routes.post("/verifyOtp",adminctl.verifyOtp)
module.exports=routes;