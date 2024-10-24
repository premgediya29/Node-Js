const mongoose=require('mongoose');

const db=mongoose.connect("mongodb://localhost:27017/Mern-1")
.then(()=>{
  console.log("MongoDB Connected....")
})
.catch((err)=>{
  console.log(err)
})


module.exports=db;
