var Index = require('../app/controllers/index.js')
var Movie = require('../app/controllers/movie')
var User = require('../app/controllers/user')
var Comment = require('../app/controllers/comment')
var Category = require('../app/controllers/category')

module.exports = function(app){
	//pre handle user
	app.use(function(req, res, next) {
	    var _user = req.session.user

	    app.locals.user = _user
	    next()
	})

	//index page    这里以及下面皆是路由以及赋值，这里的字段如title, poster等都会在相应的jade如index.jade中用到，实际上是将这里的值传入相应的jade以渲染页面
	app.get('/',Index.index)

	// User
	app.post('/user/signup',User.signup)
	app.post('/user/signin',User.signin)
	// 登出
	app.get('/logout',User.logout)
	// 登入
	app.get('/signin',User.showSignin)
	// 注册
	app.get('/signup',User.showSignup)
	app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list)
	//Movie
	app.get('/movie/:id',Movie.detail)
	app.get('/admin/movie/list',User.signinRequired, User.adminRequired,Movie.list)
	app.get('/admin/movie/new',User.signinRequired, User.adminRequired,Movie.admin)
	app.get('/admin/movie/:id',Movie.detail)
	app.get('/admin/movie/update/:id',User.signinRequired, User.adminRequired,Movie.update)
	// 电影保存
	app.post('/admin/movie',User.signinRequired, User.adminRequired,Movie.savePoster,Movie.save)
	
	app.delete('/admin/movie/list',User.signinRequired, User.adminRequired,Movie.del)

	// Comment评论
	app.post('/user/comment',User.signinRequired, Comment.save)
	//category
	// 创建分类
	app.get('/admin/category/new',User.signinRequired, User.adminRequired,Category.new)
	// 保存按钮
	app.post('/admin/category',User.signinRequired, User.adminRequired,Category.save)
	// 分类列表
	app.get('/admin/categorylist',User.signinRequired, User.adminRequired,Category.list)

	// 分页和搜索
	app.get('/results', Index.search)

	// //
	// app.get('/test',function (req, res) {
	//  if (!req.body) return res.sendStatus(400)
	//  res.send(req.query.username +　req.query.userpassword)
	// })
}	
