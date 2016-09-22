// 负责和首页交互
var Movie = require('../models/movie')
var Category = require('../models/category')
//index page    这里以及下面皆是路由以及赋值，这里的字段如title, poster等都会在相应的jade如index.jade中用到，实际上是将这里的值传入相应的jade以渲染页面
exports.index = function(req, res) {
	// console.log(req.session.user)
    Category
    	.find({})
    	.populate({path:'movies', options: {limit:5}})
    	.exec(function(err, categories){
    		if (err) {console.log(err)}
		    res.render('index', {
		        title: 'imooc 首页',
		        categories: categories
		    })
    	})
}
// search page
exports.search = function(req, res) {
    // console.log(req.session.user)
    var catId = req.query.cat
    var page = parseInt(req.query.p, 10) || 1
    var q= req.query.q
    var count = 3
    var index = (page - 1) * count

    if (catId) {
        Category
            .find({_id:catId})
            .populate({
                path:'movies',
                select: 'title poster',
            })
            .exec(function(err, categories){
                if (err) {console.log(err)}

                var category = categories[0] || {}
                var movies = category.movies || []
                var results = movies.slice(index, index + count)
                res.render('results', {
                    title: 'imooc 结果列表页面',
                    keyword: category.name,
                    currentPage: page,
                    query: 'cat=' + catId,
                    totalPage: Math.ceil(movies.length / count),
                    movies: results
                })
            })
    }
    else  {
        // console.log('搜索')
        Movie
            .find({title: new RegExp(q+'.*','i')})
            .exec(function(err, movies){
                if (err) {console.log(err)}

                var results = movies.slice(index, index + count)
                res.render('results', {
                    title: 'imooc 结果列表页面',
                    keyword: q,
                    currentPage: page,
                    query: 'q=' + q,
                    totalPage: Math.ceil(movies.length / count),
                    movies: results
                })
            })

    }    
}	