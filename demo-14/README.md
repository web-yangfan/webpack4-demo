koa2+pug+webpack
通过koa2服务，pug模板，结合webpack,具体配置请看下面的示例

`devMiddleware.js` 和 `hotMiddleware.js`写一个koa2中间件,
<!-- more -->

**下面是示例代码：**

## 文件结构
```
├── middleware
│   ├── devMiddleware.js
│   └── hotMiddleware.js
├── package.json
├── server.js
├── src
│   ├── basics.css
│   ├── index.js
│   ├── style.css
│   └── views
│       └── index.pug
└── webpack.config.js

```
## package.json
```
  "scripts": {
    "dev": "node server.js"
  },
  "dependencies": {
    "koa": "^2.0.0-alpha.8",
    "koa-pug": "^3.0.0-2",
    "koa-router": "^7.4.0",
    "koa-static": "^5.0.0",
    "koa-views": "^6.1.4"
  },
  "devDependencies": {
    "koa-webpack": "^5.1.0",
    "webpack": "^4.21.0",
    "webpack-cli": "^3.1.2",
    "webpack-dev-middleware": "^3.4.0",
    "webpack-hot-middleware": "^2.24.3"
  },
```

<br />
## middleware/devMiddleware.js
```js
const webpackDev  = require('webpack-dev-middleware')

const devMiddleware = (compiler, opts) => {
  const middleware = webpackDev(compiler, opts)
  return async (ctx, next) => {
    await middleware(ctx.req, {
      end: (content) => {
        ctx.body = content
      },
      setHeader: (name, value) => {
        ctx.set(name, value)
      }
    }, next)
  }
}

module.exports=devMiddleware;

```
<br />

## middleware/hotMiddleware.js
```js
const webpackHot = require('webpack-hot-middleware')
const PassThrough = require('stream').PassThrough;

const hotMiddleware = (compiler, opts) => {
  const middleware = webpackHot(compiler, opts);
  return async (ctx, next) => {
    let stream = new PassThrough()
    ctx.body = stream
    await middleware(ctx.req, {
      write: stream.write.bind(stream),
      writeHead: (status, headers) => {
        ctx.status = status
        ctx.set(headers)
      }
    }, next)
  }
  
}


module.exports = hotMiddleware;
```
## webpack.config.js

```js
const path = require('path');
const webpack = require('webpack')


module.exports = {
  // production  development
  mode: 'development',
  entry: {
    index: ['./src/index.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        rules: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
      }
    ]
  }
};

```
<br />

## server.js

```js
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

```

<br />

## src/index.js

```js
let wrapper = document.querySelector('#wrapper')

let element = document.createElement('div')

// 调用koa2传过来的数据
element.innerHTML = G_USER
element.classList.add('hello')

wrapper.appendChild(element)

```

<br />

## src/basics.css

```css
body {
  background: beige;
}

```
<br />

## src/style.css
```
@import "basics.css";

.hello {
  color: red;
  width: 400px;
  height: 100px;
  border: 1px solid red;
}

```
<br />
## views/index.pug
```pug
html
  head
    title pug模板
  body
    div#wrapper koa2
    h1 #{title}
    h1= title
  block js
    script.
      var G_USER = !{JSON.stringify(user)};
    script(src="/static/index.js")

```
<br />

运行 `npm run dev`启动


