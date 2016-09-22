var express = require("express")//这里主要是引用所必须要的模块，当然，这些模块是需要使用"npm install 模块名"安装的
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var path = require('path')
var morgan = require('morgan')
var mongoStore = require('mongo-store')
var cookieSession = require('cookie-session')

var port = process.env.PORT || 3000
var app = express()

mongoose.connect('mongodb://localhost/imooc')

app.set('views', './app/views/pages')//定义了一些路径和所用到的引擎
app.set('view engine', 'jade')

// 静态资源请求路径 libs为静态资源库
app.use(express.static('public/'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(require('connect-multiparty')())
app.use(cookieSession({
    secret : 'imooc',
    store: new mongoStore({
        url: 'mongodb://localhost/imooc',
        collection: 'session'
    })
}))
if ('development' === app.get('env')) {
    app.set('showStackError',true)
    app.use(morgan(':method :url :status :response-time'))
    app.locals.pretty = true
    mongoose.set('debug',true)
}
require('./config/routes.js')(app)
 
app.locals.moment = require('moment')
app.listen(port);

console.log('imooc started on port ' + port);