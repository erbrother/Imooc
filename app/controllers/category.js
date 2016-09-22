var Category = require('../models/category')
//detail page

//admin page
exports.new =function (req, res) {
    res.render('category_admin', {
        title: 'imooc 后台录入页',
        category:{}
    })
}

//admin post movie 后台电影保存
exports.save  = function(req,res){
    var _category = req.body.category
    var _category = new Category(_category)

    _category.save(function(err, catetory) {
        if (err) {
            console.log(err)
        }
        res.redirect('/admin/categorylist')
    })
}
// categoryList page
exports.list = function (req, res) {
    Category.fetch(function(err,categories){
        if(err){
            console.log(err)
        }
        res.render('categorylist', {
            title: 'imooc 电影分类列表页',
            categories: categories
        })
    })
}