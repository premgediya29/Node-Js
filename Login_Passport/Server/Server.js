const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/Login-Project")

const db = mongoose.connection;

db.once('open', (err)=>{
    if(err){
        console.log('Mongodb Connection error say: ', err);
    }else{
        console.log('Mongodb Connection is successful');
    }
})

module.exports = db