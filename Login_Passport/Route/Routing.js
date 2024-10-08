const express = require("express");
const route = express.Router();
const controller = require("../Controller/Controller");
const passport = require("passport");
const multer = require("multer");
const paht = require("path");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const uploadpic = multer({ storage: storage }).single("image");

route.get("/", controller.login);

route.get("/logout", controller.logout);

route.get('/updatepassword', controller.updatepassword)

route.post('/resetpassword' ,controller.changePasswords)

route.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  controller.adminlogin
);

route.get("/dashboard", passport.chechauth, controller.dashboard);

route.get("/form", passport.chechauth, controller.form);

route.get("/table", passport.chechauth, controller.table);

route.post("/insert", passport.chechauth, uploadpic, controller.insert);

route.get("/delete", controller.delete);

route.get("/edit", passport.chechauth, controller.edit);

route.get('/forgotpassword', controller.forgotpassword)

route.post('/sendotp', controller.sendOTP)

route.post('/newpassword', controller.resetpassword)

route.post("/edit", uploadpic, controller.editedproduct);

module.exports = route;
