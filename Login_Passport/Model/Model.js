const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        require: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductCategory',
        require: true
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductSubcategory',
        required: true
    }
})

const LoginSchema = mongoose.Schema({
    fname: {
         type: String,
         require: true 
    },
    lname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})


const Admin = mongoose.model('Passport', Schema)
const Login = mongoose.model('Admin', LoginSchema)

module.exports = { Admin, Login };