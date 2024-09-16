const UserModel=require("../model/AdminSchema");
let path=require('path');
const fs=require('fs');
const { log } = require("console");



module.exports.Login=(req,res)=>{
    try{
      res.render("Login")
    }
    catch(err){
        console.log(err)
    }
}

module.exports.Logout=(req,res)=>{
    try {
        res.clearCookie("admin")
        res.redirect("/")
    }
    catch(err){
        console.log(err);   
    }
}

module.exports.userlogin=async(req,res)=>{
    try {
    const user=await UserModel.findOne({email : req.body.email});
 
    // req.cookies() // 
    // res.cookie() //

     if(user){

        if(user.password==req.body.password){
              res.cookie("admin",user);
              res.redirect("/dashboard")
        }
        else {
            res.redirect("/")
            console.log("User Not found");
        }
     }
     else {
         console.log("User Not Found");
         
     }
    
       }
       catch(err){
         console.log(err);
         
       }
   
  
}

module.exports.table=(req,res)=>{
    try{
    res.render("table")
        
    }
    catch(err){
       console.log(err);
       
    }
}
module.exports.dashboard=async(req,res)=>{
    
    try {
         
        if(req.cookies.admin===undefined){
            res.redirect("/")
        }
        else {
            const Userdata =await UserModel.findById(req.cookies.admin._id);

            console.log(Userdata)
            
            if(Userdata){
                res.render("dashboard")
            }
            else {
                res.redirect("/");
            }
        }
    }
    catch (err){
        console.log(err);
        
    }
       



}
module.exports.AddForm=async(req,res)=>{

      
     
     try {
            if(req.cookies.admin===undefined){
                res.redirect("/")
            }
            else {

                const Userdata=await UserModel.findById(req.cookies.admin._id)
                
                if(Userdata){

                     res.render("AddForm")

                }
                else {
                    res.redirect("/")
                }
            }
            
     } catch(err){  

          console.log(err);
          
     }
     

}
module.exports.ViewForm=async(req,res)=>{

    try{
     if(req.cookies.admin==undefined){
        res.redirect("/")
     }
     else{
        const Userdata=await UserModel.findById(req.cookies.admin._id)
         
        if(Userdata){
            const data=await UserModel.find({})
            res.render("ViewForm",{data})
        }
        else {
            res.redirect("/")
        }
    
     }
    }
    catch(err){
        console.log(err);
        
    }
}
module.exports.insserdata=async(req,res)=>{

    
    try{
       
        req.body.img=req.file.path;
        const data=await UserModel.create(req.body);
        console.log(req.body);
        res.redirect("/ViewForm");  
    }
    catch (err){
        console.log(err);
        
    }
}

module.exports.deletedata=async(req,res)=>{


    try{
        
        const singledata=await UserModel.findById(req.query.id);
       const imgpath=path.join(__dirname,'..',singledata.img)

        fs.unlinkSync(singledata.img)
        
       const deldata=await UserModel.findByIdAndDelete(req.query.id)
       res.redirect("back")
    }
    catch(err){

       console.log(err);
   
    }
}

module.exports.editdata=async(req,res)=>{

      try{

    if(req.cookies.admin===undefined){
         res.redirect("/")
    }
    else{
            const Userdata=await UserModel.findById(req.cookies.admin._id)
            if(Userdata){
                const editdata=await UserModel.findById(req.query.id)
                res.render("EditForm",{editdata})
            } 
            else {
                  res.redirect("/")
            }
    }
}
catch(err) {
   console.log(err);
   
}
    
}
module.exports.updatedata=async(req,res)=>{

  
    try{

         let image="";

         const singledata=await UserModel.findById(req.query.id)
         
         req.file ? image = req.file.path : img = singledata.img 

         if(req.file){
            fs.unlinkSync(singledata.img)
         }
         
         req.body.img=image

        const updatedata=await UserModel.findByIdAndUpdate(req.query.id,req.body)
        res.redirect("/ViewForm")
    }
    catch(err){
       console.log(err);
       
    }
}