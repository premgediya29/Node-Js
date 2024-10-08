const { Admin, Login } = require("../Model/Model");
const fs = require("fs");
const path = require("path");
const Mailer = require('../Server/Mailer')
const SubCategory = require('../Model/SubCategory')
const Category = require('../Model/Category')


module.exports.login = (req, res) => {
  try {
    res.render('Login');

  } catch (err) {
    console.log("Login Page Rendering Error..", err);
  }
};

module.exports.updatepassword = (req, res) => {
  res.render('UpdatePassword')
}

module.exports.changePasswords = async(req, res) => {
  const userinfo = await Login.findById(req.user.id)
  console.log(userinfo)
  if(userinfo){
    if(userinfo.password == req.body.oldps){
      if(userinfo.password != req.body.newps){
        if(req.body.newps == req.body.confirmps){
          const updatepassword = await Login.findByIdAndUpdate(userinfo.id, {password: req.body.newps})
          updatepassword ? res.redirect('/logout') + console.log('Password Change'): console.log('password is not changed.')
        }else{
          console.log('New Password and Confirm Password Must be Same.')
          res.redirect('/dashboard')
        }
      }else{
        console.log('Old Password and New Password Must be Different.')
        res.redirect('/dashboard')
      }
    }else{
      console.log('Old Password is Incorrect.')
      res.redirect('/dashboard')
    }
  }else{
    console.log('User Not Found')
    res.redirect('/dashboard')
  }
}

module.exports.forgotpassword = (req, res) => {
  res.render('ForgotPassword')
}

module.exports.sendOTP = async (req, res) => {
  const adminData = await Login.findOne({email: req.body.email})
  console.log(adminData)
  if(adminData){
    const otp = Math.floor(100000 + Math.random() * 900000)
    Mailer.sendOtp(req.body.email, otp)
    req.session.otp = otp 
    req.session.adminID = adminData.id
    res.render('CreatePassword', {otp})
  }else{
    req.redirect('/')
    console.log('Incorrect Email.')
  }
}

module.exports.resetpassword = async(req, res)=> {

  let otp = req.session.otp 
  let adminID = req.session.adminID   
  console.log(otp);
  console.log(adminID);
  console.log(req.body);
  
  if(req.body.otp == otp){
    if(req.body.newpassword == req.body.confirmpassword){
      const updatepassword = await Login.findByIdAndUpdate(adminID, {password: req.body.newpassword})
      updatepassword ? res.redirect('/') + console.log('Password Change'): console.log('password is not update')
    }else{  
      console.log('New Password and Confirm Password Must be Same.')
      res.redirect('/')
    }
  }else{
    console.log('Incorrect OTP')
    res.redirect('/')
  }
}

module.exports.adminlogin = async (req, res) => {
  try {
    const Data = await Login.findOne({ email: req.body.email });
    if (Data) {
      if (Data.password == req.body.password) {
        res.redirect("/dashboard");
      } else {
        res.redirect("/");
        console.log('Email and Password Incorrect')
      }
    } else {
      console.log("User Not Found.");
      res.redirect("/");
    }
  } catch (error) {
    console.log("Login Error", error);
  }
};

module.exports.logout = async (req, res) => {
  req.session.destroy((err)=> {
    err ? console.log('Logout error', err) : res.redirect('/')
  });
};

module.exports.dashboard = (req, res) => {
  try {
    res.render("Dashboard");
  } catch (error) {
    console.log("Dashboard Rendering Error ", error);
  }
};

module.exports.form = async (req, res) => {
  try {
    const category = await Category.find({});
    const subcategory = await SubCategory.find({})
    res.render("Form", { editdata: null, category, subcategory });
    console.log(subcategory)
  } catch (error) {
    console.log("Form Rendering Error ", error);
  }
};

module.exports.insert = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.filename;
    }
   const product = await Admin.create(req.body);
    product ? res.redirect("/table") : console.log('Product is not added.')
  } catch (error) {
    console.log("Insert Data Error", error);
  }
};

module.exports.table = async (req, res) => {
  try {
    const data = await Admin.find({}).populate("category").populate("subcategory")
    console.log(data)
    data ? res.render("Table", { data }) : res.write("Data not found");
  } catch (error) {
    console.log("Table Rendering Error ", error);
  }
};

module.exports.delete = async (req, res) => {
  try {
    const productimg = await Admin.findById(req.query.id);
    if (productimg.image) {
      const oldImage = path.join(__dirname, "../images/", productimg.image);
      if(fs.existsSync(oldImage)){
        fs.unlinkSync(oldImage);
      }
    }
    const deleteproduct = await Admin.findByIdAndDelete(req.query.id);
    deleteproduct ? res.redirect("/table") : console.log("Deleting Error.");
  } catch (error) {
    console.log("Data is not deleted.");
  }
};

module.exports.edit = async (req, res) => {
  try {
    const editdata = await Admin.findById(req.query.id);
    const category = await Category.find({})
    const subcategory = await SubCategory.find({})
    editdata
      ? res.render("Form", { editdata, category, subcategory })
      : console.log("Data is not available.");
  } catch (error) {
    console.log("Data is not go for edit process.");
  }
};

module.exports.editedproduct = async (req, res) => {
  try {
    const editimage = await Admin.findById(req.query.id);
    if (req.file) {
      const Image = path.join(__dirname, "../images/", editimage.image);
      if(fs.existsSync(Image)){
          fs.unlinkSync(Image);
      }
      req.body.image = req.file.filename;
    } else {
      req.body.image = editimage.image;
    }

    const editeddata = await Admin.findByIdAndUpdate(req.query.id, req.body);
    editeddata ? res.redirect("/table") : console.log("Data Not Update.");
  } catch (error) {
    console.log("Data is not edited.");
  }
};





