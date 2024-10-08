const express = require('express')
const categoryroutes = express.Router()
const CategoryCTL = require('../Controller/CategoryCTL')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'images/categoryimage/')
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const categoryupload = multer({storage: storage}).single('categoryimage')

categoryroutes.get('/addcategory', CategoryCTL.category)
categoryroutes.get('/viewcategory', CategoryCTL.viewcategory)
categoryroutes.get('/deletecategory', CategoryCTL.deletecategory)
categoryroutes.get('/edit', CategoryCTL.edit)
categoryroutes.post('/insertcategory', categoryupload ,CategoryCTL.addcategory)
categoryroutes.post('/edit', categoryupload ,CategoryCTL.editcategory)

module.exports = categoryroutes