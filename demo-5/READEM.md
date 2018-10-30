

webpack处理css预编译器，style、less、scss 基本一样，就是安装对应的loader，以scss为例子，并且开启`sourceMap`

<!-- more -->


**下面是示例代码：**

## 安装loader
```
"sass-loader": "^7.1.0",
"style-loader": "^0.23.1",
```

<br />

## 文件结构

```
├── package.json
├── pageA.html
├── src
│   ├── css
│   │   └── base.scss
│   └── pageA.js
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
  }
```

<br />


## webpack.config.js

```js
const path = require("path")

module.exports = {
  mode: 'development',
  entry: {
    pageA: "./src/pageA.js",
  },
  output: {
 ****   path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "./dist/"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
};
```
**use里面的loader是从后往前处理的，所有需要把 `sass-loader `放到最后**
开启 **`sourceMap`** 修改修改代码如下：

```js 
{
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
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

<br />

## pageA.html
```html 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>配置 scss</title>
</head>
<body>
<h1>配置 scss</h1>
<script src="./dist/pageA.js"></script>
</body>
</html>
 
 ```
 
 运行 `npm run build` 编译，webpack就会把scss打包成css
