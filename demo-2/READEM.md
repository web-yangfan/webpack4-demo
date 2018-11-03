webpack配置scss
安装：`node-sass` `sass-loader`
开启`sourceMap`
开发模式时候开启 sourceMap后，在查看元素样式的时候`chrome-devtools`，会显示样式在哪个`scss`文件

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

<br />

## package.json
```js
  "scripts": {
    "build": "webpack --config webpack.config.js"
  },
  "devDependencies": {
    "css-loader": "^1.0.0",
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
          {
            loader: 'style-loader',
            options: {
              // 开启 sourceMap
              sourceMap: true
            }
          },
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
  }
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
    <title>配置 scss</title>
</head>
<body>
<h1>配置 scss</h1>
<p>配置 scss</p>
<script src="./dist/index.js"></script>
</body>
</html>

```

<br />

**执行编译命令，查看效果**


