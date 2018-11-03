处理图片、字体
`注意:`当资源大于 `250k`，webpack会提示警告

font下文件可以去 [Iconfont-阿里巴巴矢量图标库](http://www.iconfont.cn/) 找。

<!-- more -->

**下面是示例代码：**
## 文件结构
```
├── package.json
├── src
│   ├── css
│   │   └── index.css
│   ├── font
│   │   ├── iconfont.css
│   │   ├── iconfont.eot
│   │   ├── iconfont.svg
│   │   ├── iconfont.ttf
│   │   └── iconfont.woff
│   ├── img
│   │   ├── 1.jpg
│   │   ├── 2.jpg
│   │   ├── 3.jpg
│   │   ├── 4.jpg
│   │   └── 5.jpg
│   └── index.js
└── webpack.config.js
```

## package.json
```
  "scripts": {
    "build": "webpack --config webpack.config.js"
  },
  "dependencies": {
    "css-loader": "^1.0.1",
    "file-loader": "^2.0.0",
    "img-loader": "^3.0.1",
    "style-loader": "^0.23.1",
    "url-loader": "^1.1.2",
    "webpack": "^4.23.1",
    "webpack-cli": "^3.1.2"
  },
```
<br />

## webpack.config.js
```js
const path = require("path")

module.exports = {
  mode: 'production',
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "./dist/"
  },
  performance: {
    // 关闭资源超过 250kb警告
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: "[name]-[hash:5].min.[ext]",
              // 设置小于10k转成base64
              limit: 20000, // size <= 20KB
              useRelativePath: true
            }
          }
        ]
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name]-[hash:5].min.[ext]",
          
              limit: 5000, // 字体文件小于等于5k生成base64，否则就打包文件
              // publicPath: "fonts/",
              outputPath: "assets/font/"
            }
          }
        ]
      }
    ]
  }
};


```
<br />

## src/css/index.css
```css
@import "../font/iconfont.css";

#app > div {
  width: 200px;
  height: 200px;
  float: left;
}

.item1 {
  background: url('../img/1.jpg') no-repeat;
  background-size: cover;
}
.item2 {
  background: url('../img/2.jpg') no-repeat;
}
.item3 {
  background: url('../img/3.jpg') no-repeat;
}
.item4 {
  background: url('../img/4.jpg') no-repeat;
}
.item5 {
  background: url('../img/5.jpg') no-repeat;
}

```
<br />

## src/index.js
```js
import './css/index.css'
```
<br />

## index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>处理图片、字体</title>
</head>
<body>

<ul>
    <li class="icon iconfont icon-alibabaziti">阿里巴巴字体</li>
    <li class="icon iconfont icon-zhiwuxianziti">智无线字体</li>
    <li class="icon iconfont icon-wangxiaobaoziti">网销宝字体</li>
    <li class="icon iconfont icon-tianmaozhitongcheziti">天猫直通车字体</li>
</ul>

<div id="app">
    <div class="item1">1</div>
    <div class="item2">2</div>
    <div class="item3">3</div>
    <div class="item4">4</div>
    <div class="item5">5</div>
</div>

<script src="dist/index.js"></script>
</body>
</html>

```

