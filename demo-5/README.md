

介绍babel编译ES6的方法和例子

- babel-loader: 负责es6语法转化
- babel-preset-env: 包含es6、7等版本的语法转化规则
- babel-polyfill: es6内置方法和函数转化垫片
- babel-plugin-transform-runtime: 避免polyfill污染全局变量
需要注意的是, `babel-loader` 和 `babel-polyfill`。前者负责语法转化，比如：箭头函数；后者负责内置方法和函数，比如：new Set()

<!-- more -->


**下面是示例代码：**

## 目录结构
```
├── .babelrc
│   
├── index.html
├── package.json
├── src
│   └── index.js
└── webpack.config.js
```

<br />


## package.json
```js
{
  "scripts": {
    "build": "webpack --config webpack.config.js"
  },
  "dependencies": {},
  "devDependencies": {
    "@babel/core": "^7.1.2",
    "@babel/plugin-transform-runtime": "^7.1.0",
    "@babel/polyfill": "^7.0.0",
    "@babel/preset-env": "^7.1.0",
    "@babel/runtime": "^7.1.2",
    "babel-loader": "^8.0.4",
    "webpack": "^4.22.0",
    "webpack-cli": "^3.1.2"
  }
}
```

<br />



## webpack.config.js
```js
const path = require('path')

module.exports = {
  // development production
  mode: 'development',
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}


```

<br />


## .babelrc
```js
{
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "browsers": ["last 1 version", "> 1%"]
      }
    }]
  ],
  "plugins": ["@babel/transform-runtime"]
}

```

