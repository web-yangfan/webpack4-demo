
webpack把会js和css打包一起，有时候我们需要把css提取出来单独打包一个css文件，这时候就需要用到 **`mini-css-extract-plugin`**

<!-- more -->

**下面是示例代码：**

## 文件结构
```
├── package.json
├── src
│   ├── css
│   │   └── base.scss
│   └── pageA.js
└── webpack.config.js
```

<br />

## package.json
```
    "clean-webpack-plugin": "^0.1.19",
    "html-webpack-plugin": "^3.2.0",
    "css-loader": "^1.0.0",
    "mini-css-extract-plugin": "^0.4.4",
    "node-sass": "^4.9.4",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "webpack": "^4.22.0",
    "webpack-cli": "^3.1.2"
```

<br />

## webpack.config.js

```js
const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    pageA: "./src/pageA.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "./"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    // 编译前清空dist目录
    new CleanWebpackPlugin(['dist']),
    // 生成html
    new HTMLWebpackPlugin({
      filename: 'pageA.html',
      title: '提取css',
      inject: true
    }),
    
    // 单独打包css
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    })
  ]
};

```

<br />

## pageA.js

```js
import base from './css/base.scss'
```

<br />

## base.scss
```scss
html {
    background: #999999;
    h1 {
        color: red;
    }
}

```

运行**`npm run build`** 会把` base.scss` 单独打包成css 打包后路径是 `dist/css/base.css`



<br />

## 单独提取的css实现懒加载
**修改 pageA.js**
```js
var loaded = false;
window.addEventListener("click", function() {
  if (!loaded) {
    import(/* webpackChunkName: 'base'*/ "./css/base.scss").then(_ => {
      loaded = true;
    });
  }
});
```
修改代码后编译，然后打开` dist/pageA.html`，点击页面，就会加载`base.css`


