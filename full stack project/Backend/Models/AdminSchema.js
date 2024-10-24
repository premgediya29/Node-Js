const mongoose=require('mongoose');

const AdminSchema=mongoose.Schema({

  name : {
    type : String,
    required : true,
  },
  email : {
    type : String,
    required : true,
  },
  task : {
    type : String,
    required : true,
  }
})

const AdminModel=mongoose.model("Admin-api",AdminSchema);

module.exports=AdminModel;