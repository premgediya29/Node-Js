const express=require('express');
const port=5555;

const app=express();
const db=require('./Config/db')
const cors=require('cors');

const cookieParser = require('cookie-parser');

app.use(cookieParser())

app.use(cors({ origin : 'http://localhost:3000' ,credentials:true}));
app.use(express.json());

app.use(express.urlencoded());


app.use("/",require('./Routes/index'));

app.listen(port,console.log(`Server Started on port : ${port}`));
