const mongoose=require('mongoose')

const AdminLoginSchema=mongoose.Schema({

  name : {
    type : String,
    required : true,
  },
  email : {
    type : String,
    required : true,
  },
  password : {
    type : String,
    required : true,
  },
  confirmPassword : {
    type : String,
    required : true,
  }
})

const AdminLogModel=mongoose.model("Admin-Log",AdminLoginSchema);

module.exports=AdminLogModel;