const express = require('express')
const Subcategory = express.Router()
const SubCategoryCTL = require('../Controller/SubCategoryCTL')

Subcategory.get('/addsubcategory', SubCategoryCTL.subcategory)
Subcategory.get('/deletesubcategory', SubCategoryCTL.delete)
Subcategory.get('/edit', SubCategoryCTL.edit)
Subcategory.post('/insertsubcategory', SubCategoryCTL.addsubcategory)
Subcategory.post('/edit', SubCategoryCTL.editsubcategory)


module.exports = Subcategory