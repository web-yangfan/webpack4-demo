const Koa = require('koa')
const router = require('koa-router')()
const static = require('koa-static')
const views = require('koa-views')
const path = require('path')

const webpack = require('webpack')
const koaWebpack = require('koa-webpack')
const config = require('./webpack.config.js')
const compiler = webpack(config)



const app = new Koa()
// 加载模板引擎
app.use(views(path.join(__dirname, './src/views'), {
  extension: 'pug'
}))

const devMiddleware = {
  noInfo: true, // 控制台显示任何信息
  // 设置静态文件的路径，在pug模板引入js路径就是 /static/index.js
  publicPath: '/static/'
}

router.get('/', async (ctx) => {
  // ctx.body = "用户管理"
  await ctx.render('index', {title: 'koa2传递参数 pug模板使用', user: 'js 调用 koa2传递的变量' } )
})

/* 启动路由 */
app.use(router.routes())
app.use(router.allowedMethods())

koaWebpack({ compiler,  devMiddleware})
.then((middleware) => {
  app.use(middleware);
});


app.listen(3000, () => {
  console.log('http://localhost:3000/')
})
