const logadmin=require('../Models/AdminLoginSchema');
const admin=require('../Models/AdminSchema');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')


module.exports.Registration=async(req,res)=>{
  try{
    const user = await logadmin.findOne({email: req.body.email})
    if(user){
      res.status(400).json({success: false, message: 'User already exis'}) 
    }
     req.body.password=await bcrypt.hash(req.body.password,10);
     req.body.confirmPassword=await bcrypt.hash(req.body.confirmPassword,10);

     if (await bcrypt.compare(req.body.password, req.body.confirmPassword)) {
          res.status(400).json({ msg: "Current password does not match" });
     }

     const registerdata=await logadmin.create(req.body);
      
     
     res.status(200).json({msg : "Create data Successfully...",registerdata});
  }
  catch(err){
    console.log(err);
    res.status(400).json({success: false, message: 'error found while register user', err})
    
  }
}

module.exports.loginadmin=async(req,res)=>{
  try{
    console.log(req.body)
   const user=await logadmin.findOne({email : req.body.email});
   console.log(user)
   if(user){
      if(await bcrypt.compare(req.body.password,user.password)){
         const token=jwt.sign({userdata : user},"node",{expiresIn : "1h"});
         res.status(200).json({msg : `Login Successfully`,token:token})
      }
      else {
        res.status(404).json({msg : "Wrong Password Please Try Again...!!"})

      }
   }
   else {
    res.status(404).json({msg : "Admin Not Found..."})
   }
  }
  catch {
   console.log("Login failed...");
   res.status(400).json({success: false, message: 'error found while login user', err})

  }
}

module.exports.insertadmin=async(req,res)=>{
  try {
    
    const insertdata=await admin.create(req.body)

     res.json(insertdata)
  }
  catch(err) {
    res.status(404).json(err)
  }
}

module.exports.viewAdmin=async(req,res)=>{
  try{
     const admindata=await admin.find({})
     res.json(admindata);

  }
  catch (err){
    console.log(err)
  }
}

module.exports.deleteadmin=async(req,res)=>{
  try {
    const deletedata=await admin.findByIdAndDelete(req.query.id);

    deletedata ? res.status(202).json({msg : "Admin Delete Successfully...",deletedata}) :
    res.status(404).json({msg : "Admin Not Deleted Try again...!!!"})
    
  }
  catch(err){
    res.status(404).json(err)
  }
}
module.exports.editdata=async(req,res)=>{
  try {
    const editdata = await admin.findById(req.query.id);
    editdata ? res.status(202).json({msg : "Admin get Successfully...",editdata}) :
    res.status(404).json({msg : "Admin Not edit Try again...!!!"})
  } catch (err) {
    res.status(400).json({success: false, message: 'error found while login user', err})

  }
}

module.exports.updatedata=async(req,res)=>{
  try{

    const updatee=await admin.findByIdAndUpdate(req.query.id,req.body);
    updatee ? res.status(202).json({msg : "Admin edit Successfully...",updatee}) :
    res.status(404).json({msg : "Admin Not update Try again...!!!"})

  }catch(err){
    res.status(404).json(err)
  }
}
