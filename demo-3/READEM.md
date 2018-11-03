1、提取css、
webpack把会js和css打包一起，有时候我们需要把css提取出来单独打包一个css文件，这时候就需要用到 `mini-css-extract-plugin`
2、css懒加载
通过js条件，来加载css

3、自动添加浏览器前缀
安装 autoprefixer postcss-loader 实现给css3添加浏览器前缀，直接在webpack.config.js配置对应loader就可以了
<!-- more -->

**下面是示例代码：**

## 文件结构

```
├── index.html
├── package.json
├── src
│   ├── css
│   │   ├── base.scss
│   │   └── index.scss
│   └── index.js
└── webpack.config.js

```

## package.json
```
  "scripts": {
    "build": "webpack --config webpack.config.js"
  },
  "devDependencies": {
    "css-loader": "^1.0.0",
    "mini-css-extract-plugin": "^0.4.4",
    "node-sass": "^4.9.4",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "webpack": "^4.22.0",
    "webpack-cli": "^3.1.2"
  },
```
<br />


## webpack.config.js
```js
const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  mode: 'development',
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "./dist/"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // 开启 sourceMap
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              // 开启 sourceMap
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 单独打包css
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    })
  ]
};

```
<br />

## src/css/base.scss
```css
html {
    background: #999999;
    h1 {
        color: red;
    }
}

```
<br />

## src/css/index.scss
```css
@import "base";

p {
  color: red;
  transform: translate(100px, 100px);
}

```
<br />

## src/index.js
```js
import './css/index.scss'

```
<br />

## index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>提取css,自动添加浏览器前缀</title>
</head>
<body>
<h1>提取css</h1>
<p>自动添加浏览器前缀</p>

<link rel="stylesheet" href="./dist/css/index.css">
<script src="./dist/index.js"></script>

</body>
</html>

```
<br />

**执行编译，查看dist，发现css已经被单独打包出来了**
<br />

## css懒加载

要实现懒加载，现在修改上面dmeo的代码

修改 `src/index.js`
```js
var loaded = false;
window.addEventListener("click", function() {
  if (!loaded) {
    import(/* webpackChunkName: 'module-index'*/ "./css/index.scss").then(_ => {
      loaded = true;
    });
  }
});

```html
修改 `index.html`

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>提取css、css懒加载、自动添加浏览器前缀</title>
</head>
<body>
<h1>提取css</h1>
<p>自动添加浏览器前缀</p>

<script src="./dist/index.js"></script>

</body>
</html>
```
运行编译命令，打开index.html,发觉样式没有加载，当点击页面后，才加载样式
`注意`： 上面的 `/* webpackChunkName: 'module-index'*/` 会生成 module-index.css 和 module-index.js文件，如果dist目录有相同的文件，就会报错，不同建议在项目中使用

<br />

## 自动添加浏览器前缀
安装 `autoprefixer` `postcss-loader`

```
  "devDependencies": {
    "autoprefixer": "^9.3.1",
    "postcss-loader": "^3.0.0",
    "css-loader": "^1.0.0",
    "mini-css-extract-plugin": "^0.4.4",
    "node-sass": "^4.9.4",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "webpack": "^4.22.0",
    "webpack-cli": "^3.1.2"
  },
```
修改webpack.config.js
注意 postcss-loader 和 sass-loader 顺序
```js
rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // 开启 sourceMap
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins:() => [
                require('autoprefixer')( {"browsers": ["> 1%", "last 2 versions", "not ie <= 8"]} )
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              // 开启 sourceMap
              sourceMap: true
            }
          }
        ]
      }
    ]
```
执行编译命令，查看编译后的css文件，已经添加了浏览器前缀


