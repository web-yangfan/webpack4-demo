在项目中全局使用第三方库， 比如npm安装jquery或者其他本地库，主要通过`webpack.ProvidePlugin`插件来配置，如果是库文件在本地的项目里则要配合`resolve.alias`来进行配置

<!-- more -->

**下面是示例代码：**

## 文件结构

```
├── index.html
├── package.json
├── src
│   ├── index.js
│   └── lib
│       └── utils.js
└── webpack.config.js
```

<br />

## package.json

```js
  "devDependencies": {
    "webpack": "^4.23.1",
    "webpack-cli": "^3.1.2"
  },
  "dependencies": {
    "jquery": "^3.3.1"
  },
```

<br />

## webpack.config.js

```js
const path = require("path")
const webpack = require("webpack")

module.exports = {
  mode: 'development',
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: './dist/'
  },
  resolve: {
    alias: {
      // 本地库需要配置路径和别名
      _utils: path.resolve(__dirname, "src/lib/utils.js")
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
       $: "jquery", // npm
      _utils: "_utils" // 本地库
    })
  ]
};

```

<br />


##### index.js

```js
$('body').append('<button class="btn">点击我</button>')
$('.btn').on('click', function() {
  // 自定义库和jquery一样全局使用
  _utils.log()
})

```

<br />



## utils.js

```js
(function() {
  
  let utils = function() {}
  utils.prototype.log =  function () {
    alert('我是自定义库！')
  }
  
  let initUtils = function() {
    return new utils
  }
  
  module.exports = initUtils()
})()

```

<br />

##### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>使用第三方库</title>
</head>
<body>
    <script src="./dist/index.js"></script>
</body>
</html>

```

    
 执行webpack编译后，就可以发现 jquery 和 utils库可以全局使用
