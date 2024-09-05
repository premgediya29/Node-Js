const express = require("express");
const port = 7000;

const db=require("./config/db");
const crudSchema=require("./model/crudSchema");



const app=express();

app.set("view engine","ejs");

app.use(express.urlencoded());
app.get("/" , async (req,res)=>{
    let data = await crudSchema.find({});
    data ? res.render("index",{data})  :console.log("Data Not Found");
})

app.post("/insert",async(req,res)=>{
    console.log(req.body);
    let data=await crudSchema.create(req.body);
    data ? res.redirect("back") : console.log("Data not Submitted!!");
})

app.get("/deleteData",async(req,res)=>{
    let deleteData = await crudSchema.findByIdAndDelete(req.query.id);
    deleteData ? res.redirect("back")  : console.log("Data Not Deleted!!");
})

app.get("/editData" , async (req , res) =>{
    let singleBook = await crudSchema.findById(req.query.id);
    singleBook ? res.render("edit" , {singleBook}) : console.log("Data not Found");
})

app.post("/updateData" , async (req , res) =>{
    console.log(req.body)
    let update = await crudSchema.findByIdAndUpdate(req.query.id , req.body)
    update ? res.redirect("/") : console.log("Data not updated");
})

app.listen(port,(err)=>{
    err ? console.log(err) : console.log(`Server Started ${port}`);
})