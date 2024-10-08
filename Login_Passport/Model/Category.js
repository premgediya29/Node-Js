const mongoose = require('mongoose')

const CategorySchem = mongoose.Schema({
    categoryname: {
        type: String,
        required: true
    },
    categoryimage: {
        type: String,
    }
})

const Category = mongoose.model('ProductCategory', CategorySchem)

module.exports = Category