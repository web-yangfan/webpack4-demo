const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config.js')

const app = express()

// 获取webapck配置对象
const compiler = webpack(config)


app.set('view engine', 'pug') // 设置模板
app.set('views', './src/views') // 设置模板位置

app.use(webpackDevMiddleware(compiler, {
  noInfo: true, // 向控制台显示任何内容
  // 设置静态文件的路径，在pug模板引入js路径就是 /static/index.js
  publicPath: '/static/',
  stats: 'errors-only'
}))

app.use(require("webpack-hot-middleware")(compiler))

// 设置路由
app.get('/', (req, res) => {
  // 加载模板,并且往模板里传递参数 'user'、'message
  res.render('index', { title: 'express传递参数 pug模板使用', user: 'js 调用 express传递的变量' } )
})

app.listen(3000, () => {
  console.log('http://localhost:3000/')
})
