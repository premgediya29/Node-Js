const mongoose = require("mongoose");

const  crud = mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        email : {
            type :String,
            required : true
        },
        password : {
            type : String,
            required : true
        },
        gender : {
            type : Array,
            required : true
        },
        image : {
            type : String,
            required : true
        },
        creaedAT :{
            type : String,
            required : true
        }
    }
);


const crudtable = mongoose.Model("apidata",crud)

module.exports = crudtable