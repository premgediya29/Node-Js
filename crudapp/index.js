const express =  require("express");
const port =7000;
const app=require("express");

app.set("view engine","ejs");
app.use(express.urlencoded());
app.use("/",require("./routes"))

app.listen(port,(err)=>{
    err?console.log(err):console.log(`server started on ${port}`);
})