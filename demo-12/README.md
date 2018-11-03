express+pug+webpack
通过express做服务，pug做模板，结合webpack,具体配置请看下面的示例


<!-- more -->

**下面是示例代码：**

## 文件结构

```
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
    "build": "webpack --config webpack.config.js",
    "dev": "node server.js"
  },
  "devDependencies": {
    "clean-webpack-plugin": "^0.1.19",
    "css-loader": "^1.0.0",
    "express": "^4.16.4",
    "pug": "^2.0.3",
    "style-loader": "^0.23.1",
    "webpack": "^4.21.0",
    "webpack-cli": "^3.1.2",
    "webpack-dev-middleware": "^3.4.0",
    "webpack-dev-server": "^3.1.9",
    "webpack-hot-middleware": "^2.24.3"
  }
```

<br />

## webpack.config.js

```js
const path = require('path');
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  // production  development
  mode: 'development',
  entry: {
    index: ['webpack-hot-middleware/client?reload=true', './src/index.js'],
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
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.OccurrenceOrderPlugin(), // 排序输出
    // 启用模块热替换(Enable Hot Module Replacement - HMR)
    new webpack.HotModuleReplacementPlugin(),
    // 跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
    new webpack.NoEmitOnErrorsPlugin()
  ]
};

```

<br />

## server.js

```js
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
  publicPath: '/static/'
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

```


<br />

## src/index.js
```js
let wrapper = document.querySelector('#wrapper')

let element = document.createElement('div')
// G_USER 是express传递过来的参数
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

```css
@import "basics.css";

.hello {
  color: red;
  width: 400px;
  height: 100px;
  border: 1px solid red;
}

```

<br />

## src/views/index.pug
```pug
html
  head
    title pug模板
  body
    h1 express webpack-dev-middleware
    div#wrapper
    h1 #{title}
    h1= title
  block js
    script.
      var G_USER = !{JSON.stringify(user)};
    script(src="/static/index.js")

```


