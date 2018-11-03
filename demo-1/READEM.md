- 基本用法
- 按需加载
- 动态卸载和加载CSS


<!-- more -->

**下面是示例代码：**
## 目录结构和代码
```
├── index.html
├── package.json
├── src
│   ├── css
│   │   ├── base.css
│   │   └── common.css
│   └── index.js
└── webpack.config.js
```

## package.json
```js
  "scripts": {
    "build": "webpack --config webpack.config.js"
  },
  "devDependencies": {
    "css-loader": "^1.0.0",
    "file-loader": "^2.0.0",
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
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}

```
<br />

## src/index.js
```js
import base from './css/base.css'
```
<br />

## src/css/base.css
```css
html {
    background: #999999;
}

```
## src/css/common.css
```css
h1 {
    color: brown;
}

```
## index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>处理css</title>
</head>
<body>
<script src="./dist/index.js"></script>
</body>
</html>

```
以上是处理css基本配置

<br />

## 按需加载
通过**`file-loade`** 和 **`style-loader`**的 `url`参数实现
修改**`webpack.config.js`**和**`index.js`**

```js
{
    test: /\.css$/,
    use: [
      'style-loader/url',
      'file-loader'
    ]
  }
```

```js
window.addEventListener("click", function() {
  // 需要手动点击页面才会引入样式！！！
  import("./css/base.css");
});

```
执行编译命令，打开`index.html`发觉页面没有加载样式，点击页面后，加载样式

<br />

## 动态卸载和加载CSS
修改代码实现每 0.5s 换一次背景颜色
修改**`webpack.config.js`**和**`index.js`**

```js
{
    test: /\.css$/,
    use: [
      'style-loader/useable',
      'css-loader'
    ]
  }
```

```js
import base from './css/base.css'
let flag = false;
setInterval(function() {
  // unuse和use 是 cssObj上的方法
  if (flag) {
    base.unuse();
  } else {
    base.use();
  }
  flag = !flag;
}, 500);

```
**执行编译命令，查看效果**

