eslint 检查代码规范，本文使用了**[standard](https://standardjs.com/rules-zhcn.html)** 规范，其他功能可以查看**[官方文档](https://standardjs.com/readme-zhcn.html)**
首先安装一大堆包，具体包请看下面的 package.json

定义全局变量，关闭某些规则验证请`.eslintrc.js`文件

<!-- more -->

## 首页介绍一下屏蔽规则的方式
**对某一行禁用所有规则**
```
file = 'I know what I am doing' // eslint-disable-line
```

**对多行禁用**

```
/* eslint-disable */
console.log('offending code goes here...')
console.log('offending code goes here...')
console.log('offending code goes here...')
/* eslint-enable */
```

一些三方库（比如 mocha）会向全局暴露变量（describe、it）。这些变量或方法即没有定义，也没有被 require 进来，所以 standard 会报出变量未定义的警告（这种警告通常情况下是很有用的）。这种情况下我们想对这些全局变量禁用检查。
为了让 standard 检测通过（同时也使代码更加易懂），在文件顶部添加如下配置：
/* global myVar1, myVar2 */

**下面是示例代码：**

## 文件结构

```
├── index.html
├── package.json
├── .eslintrc.js
├── src
│   ├── index.js
│   └── libs
│       └── lib.js
└── webpack.config.js
```

## package.json

```
"scripts": {
    "build": "webpack --config webpack.config.js",
    "dev": "webpack-dev-server --open"
  },
  "dependencies": {
    "jquery": "^3.3.1",
    "webpack": "^4.23.1",
    "webpack-cli": "^3.1.2",
    "webpack-dev-server": "^3.1.10"
  },
  "devDependencies": {
    "eslint": "^5.8.0",
    "eslint-config-standard": "^12.0.0",
    "eslint-friendly-formatter": "^4.0.1",
    "eslint-loader": "^2.1.1",
    "eslint-plugin-import": "^2.14.0",
    "eslint-plugin-node": "^8.0.0",
    "eslint-plugin-promise": "^4.0.1",
    "eslint-plugin-standard": "^4.0.0",
    "standard": "^12.0.1"
  },
```
<br />

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
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src' )],
        exclude: [path.resolve(__dirname, 'src/libs' )],
        use: [
          {
            loader: 'eslint-loader',
            options: {
              formatter: require('eslint-friendly-formatter')
            }
          }
        ]
      }
    ]
  },
  devServer: {
    // 配置服务目录地址，
    contentBase: './',
    // 热更新
    hot: true,
    overlay: true // 有错误，在浏览器上覆盖显示
  },
  plugins: [
    // 使用热更新插件
    new webpack.HotModuleReplacementPlugin()
  ]
};

```
<br />

## .eslintrc.js

```js
module.exports = {
  root: true, // 表明文件是在根目录
  extends: 'standard', // 使用standard标准
  plugins: [],
  env: {  // 定义环境
    browser: true  // 浏览器环境
    // node: true, // node环境
  },
  rules: {  // 规则
    // 设置缩进为4个空格
    'indent': ['error', 4],
    // 关闭代码最后空格检查
    'no-multiple-empty-lines': 0
  },
  globals: {
    // 定义$为全局变量
    $: true
  }
}

```

<br />


## src/index.js
```js

let add = (a, b) => {
    return a + b
}

add(10, 10)

$('#app').html('<p>Eslint</p>')
log()
sex()

// 屏蔽一样
let test=()=>{console.log('正确的代码格式')} // eslint-disable-line

/* eslint-disable */

let test2=()=>{
  console.log('区块屏蔽')
}

/* eslint-enable */

```
<br />

## src/libs/lib.js
```js
exports.log = () => {
  console.log('测试')
}

exports.sex = () => {
  console.log('sex')
}

```

<br />

## index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>配置eslinit</title>
</head>
<body>

<a href="https://standardjs.com/rules-zhcn.html">standardjs规程官网</a>
<div id="app"></div>

<script src="./index.js"></script>
</body>
</html>

```


