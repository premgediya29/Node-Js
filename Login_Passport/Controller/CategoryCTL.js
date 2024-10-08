const Category = require('../Model/Category')
const SubCategory = require('../Model/SubCategory')
const path = require('path')
const fs = require('fs')

module.exports.category = (req, res) => {
    res.render('Category', {editdata: null});
}

module.exports.addcategory = async (req, res)=>{
    try {
        console.log(req.body)
        if(req.file){
            req.body.categoryimage = req.file.filename
        }
        const category = await Category.create(req.body)
        category ? res.redirect('/category/viewcategory') : console.log('Category is not added.')
    } catch (error) {
        console.log(error)
    }
}

module.exports.viewcategory = async(req, res)=> {
    const category = await Category.find({})
    const subcategory = await SubCategory.find({})
    category ? res.render('ViewCategory', {category, subcategory}) : console.log('Category is not found.')
}

module.exports.deletecategory = async(req, res)=> {
    try {
        const category = await Category.findById(req.query.id)

        if(category.categoryimage){
            const oldImage = path.join(__dirname, '../images/categoryimage/', category.categoryimage)
            if(fs.existsSync(oldImage)){
                fs.unlinkSync(oldImage)
            }
        }

        const deletecategory = await Category.findByIdAndDelete(req.query.id)
        deletecategory ? res.redirect('back') : console.log('Category is not deleted.')
    } catch (error) {
        console.log(error)
    }
   
}

module.exports.edit = async(req, res)=> {
    try {
        const editdata = await Category.findById(req.query.id)
        editdata ? res.render('Category', {editdata}) : console.log('Category is not going to edit process.')        
    } catch (error) {
        console.log(error)
    }
}

module.exports.editcategory = async(req, res)=> {
    try {
        const category = await Category.findById(req.query.id)
        if(category.categoryimage){
            const oldImage = path.join(__dirname, '../images/categoryimage/', category.categoryimage)
            if(fs.existsSync(oldImage)){
                fs.unlinkSync(oldImage)
            }
            req.body.categoryimage = req.file.filename
        }else{
            req.body.categoryimage = category.categoryimage
        }

        const data = await Category.findByIdAndUpdate(req.query.id, req.body)
        data ? res.redirect('/category/viewcategory') : console.log('Category is not edited.')

    } catch (error) {
        console.log(error)
    }
}