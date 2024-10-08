const SubCategory = require('../Model/SubCategory')
const Category = require('../Model/Category')

module.exports.subcategory = async (req, res) => {
    try {
        const categories = await Category.find({})
       categories ? res.render('Subcategory', {categories, editdata: null}) : res.render('Subcategory')
    } catch (error) {
        console.log(error)
    }
   
}

module.exports.addsubcategory = async(req, res)=>{

    if (!req.body.categoryid) {
        return res.status(400).send('Category ID is required');
    }

    const subcategory = await SubCategory.create(req.body)
    subcategory ? res.redirect('/category/viewcategory') : console.log('Subcategory is not added.')
}

module.exports.delete = async(req, res)=> {

    const subcategory = await SubCategory.findByIdAndDelete(req.query.id)
    subcategory ? res.redirect('back') : console.log('Subcategory is not deleted.')

}

module.exports.edit = async(req, res)=> {
    try {
        const editdata = await SubCategory.findById(req.query.id)
        const categories = await Category.find({})
        editdata ? res.render('Subcategory', {editdata, categories}) : console.log('Subcategory is not going to edit process.')
    } catch (error) {
        console.log(error)
    }
}

module.exports.editsubcategory = async(req, res)=> {
    try {
        const subcategory = await SubCategory.findByIdAndUpdate(req.query.id, req.body)
        subcategory ? res.redirect('/category/viewcategory') : console.log('Subcategory is not updated.')        
    } catch (error) {
        console.log(error)
    }
}