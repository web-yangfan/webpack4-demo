
CSS Tree Shaking 就是去掉css中没有使用的css代码
安装 `purifycss-webpack` `glob-all` `purify-css`

<!-- more -->


在plugins 添加一下代码

```js
new PurifyCSS({
      paths: glob.sync([
        // CSS Tree Shaking的路径文件
        // path.resolve(__dirname, "./*.html"), // 对 html 文件进行 tree shaking
        path.resolve(__dirname, "./src/*.js")
      ])
    })
```



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
 "scripts": {
    "build": "webpack --config webpack.config.js"
  },
  "devDependencies": {
    "autoprefixer": "^9.3.1",
    "clean-webpack-plugin": "^0.1.19",
    "css-loader": "^1.0.0",
    "glob-all": "^3.1.0",
    "html-webpack-plugin": "^3.2.0",
    "mini-css-extract-plugin": "^0.4.4",
    "node-sass": "^4.9.4",
    "postcss-loader": "^3.0.0",
    "purify-css": "^1.2.5",
    "purifycss-webpack": "^0.7.0",
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
 const HTMLWebpackPlugin = require('html-webpack-plugin')
 const CleanWebpackPlugin = require('clean-webpack-plugin')
 const PurifyCSS = require("purifycss-webpack");
 const glob = require("glob-all");
 
 
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
           {
             loader: 'postcss-loader',
             options: {
               ident: 'postcss',
               plugins:() => [
                 require('autoprefixer')( {"browsers": ["> 1%", "last 2 versions", "not ie <= 8"]} )
               ]
             }
           },
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
       title: 'css Tree Shaking',
       inject: true
     }),
     
     // 单独打包css
     new MiniCssExtractPlugin({
       filename: "css/[name].css",
       chunkFilename: "css/[id].css"
     }),
     // 去掉没有使用的css
     new PurifyCSS({
       paths: glob.sync([
         // CSS Tree Shaking的路径文件
         // path.resolve(__dirname, "./*.html"), // 对 html 文件进行 tree shaking
         path.resolve(__dirname, "./src/*.js")
       ])
     })
   ]
 };

```

## pageA.js
```js
import './css/base.scss'

let element = document.createElement("div")
element.className = 'box-small'
document.body.appendChild(element)

```

## base.scss
```css
html {
    background: #999999;
}

.box {
    height: 200px;
    width: 200px;
    background: green;
}

.box-medium {
    height: 300px;
    width: 300px;
    background: pink;
}

.box-small {
    height: 100px;
    width: 100px;
    background: orange;
}

```

运行`npm run build` 编译后，查看编译后的css，会发觉 不有使用的css已经被删除

