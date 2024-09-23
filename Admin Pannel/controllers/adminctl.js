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

module.exports.deletedata = async (req, res) => {
    try {
        const singledata = await UserModel.findById(req.query.id);

        // Ensure img field is defined and has a valid value
        if (singledata && singledata.img) {
            const imgpath = path.join(__dirname, '..', singledata.img);

            if (fs.existsSync(imgpath) && fs.lstatSync(imgpath).isFile()) {
                fs.unlinkSync(imgpath);  // Delete only if it's a file
            } else {
                console.log("Image path is not valid or file doesn't exist");
            }
        }

        await UserModel.findByIdAndDelete(req.query.id);
        res.redirect("back");
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred while deleting the data.");
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
module.exports.updatedata = async (req, res) => {
    try {
        let image = "";
        const singledata = await UserModel.findById(req.query.id);

        // Use the new image if provided, else keep the old image
        req.file ? image = req.file.path : image = singledata.img;

        // Check if the current image path is a valid file
        if (singledata.img) {
            const imgpath = path.join(__dirname, '..', singledata.img);

            // Log the image path for debugging
            console.log('Image Path:', imgpath);

            if (fs.existsSync(imgpath) && fs.lstatSync(imgpath).isFile()) {
                // Delete only if it's a file
                fs.unlinkSync(imgpath);
            } else {
                console.log("Old image file does not exist or it's a directory.");
            }
        }

        req.body.img = image;
        await UserModel.findByIdAndUpdate(req.query.id, req.body);
        res.redirect("/ViewForm");
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred while updating the data.");
    }
};
