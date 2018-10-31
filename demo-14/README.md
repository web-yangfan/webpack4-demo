本篇介绍 **devServer** 配置参数说明

<!-- more -->

```js
devServer: {
    clientLogLevel: 'warning', // 可能的值有 none, error, warning 或者 info（默认值)
    hot: true, // 启用 webpack 的模块热替换特性, 这个需要配合： webpack.HotModuleReplacementPlugin插件
    contentBase: path.join(__dirname, "dist"), // 告诉服务器从哪里提供内容， 默认情况下，将使用当前工作目录作为提供内容的目录
    compress: true, // 一切服务都启用gzip 压缩
    host: '0.0.0.0', // 指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问 0.0.0.0
    port: 58080, // 端口
    open: true, // 是否打开浏览器
    overlay: { // 出现错误或者警告的时候，是否覆盖页面线上错误消息。
      warnings: true,
      errors: true
    },
    publicPath: '/', // 此路径下的打包文件可在浏览器中访问。
    proxy: {
      '/api': { // 访问api开头的请求，会跳转到  下面的target配置
        target: 'xxxx', // 代理地址
        changeOrigin: true,
        logLevel: 'debug'   // 控制台显示代理信息
        pathRewrite: {
          // 把comments 定向到 /api/comments
          '^/comments': '/api/comments'
        }
        // 添加请求头信息
        headers: {
           'Cookie': 'xxxxxxxxx'
        }
      }
    },
    quiet: true, // necessary for FriendlyErrorsPlugin. 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
    watchOptions: { // 监视文件相关的控制选项
      poll: true, // webpack 使用文件系统(file system)获取文件改动的通知。在某些情况下，不会正常工作。例如，当使用 Network File System (NFS) 时。Vagrant 也有很多问题。在这些情况下，请使用轮询. poll: true。当然 poll也可以设置成毫秒数，比如：  poll: 1000
      ignored: /node_modules/, // 忽略监控的文件夹，正则
      aggregateTimeout: 300 // 默认值，当第一个文件更改，会在重新构建前增加延迟
    }
  }
```


<!-- more -->

**下面是示例代码：**

## 文件结构

```
├── package.json
├── src
│   ├── basics.css
│   ├── index.js
│   ├── printMe.js
│   └── style.css
└── webpack.config.js
```

<br />

## package.json
``` 
 "scripts": {
    "build": "webpack --config webpack.config.js",
    "watch": "webpack --watch",
    "dev": "webpack-dev-server --open"
  },
  "devDependencies": {
    "style-loader": "^0.23.1",
    "css-loader": "^1.0.0",
    "clean-webpack-plugin": "^0.1.19",
    "html-webpack-plugin": "^3.2.0",
    "webpack": "^4.20.2",
    "webpack-cli": "^3.1.2",
    "webpack-dev-server": "^3.1.9"
  },
```


<br />

## webpack.config.js

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack');
const path = require('path');

module.exports = {
  // development production
  mode: 'development',
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  // 开发模式
  // 编译后的代码映射回原始源代码
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        rules: [
          {
            test: /\.css$/,
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
              }
            ]
          }
        ]
      }
    ]
  },
  plugins: [
    // 每次编译前清空删除dist目录
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'devServer'
    }),
    // 使用热更新插件
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    // 配置服务目录地址，
     contentBase: './dist',
     // 热更新
     hot: true
  },
}

```

<br />


## index.js

```js
import printMe from './printMe.js'
import './style.css'
function component() {
	let element = document.createElement('div')
	element.innerHTML = 'webpack devServer 服务，热更新'
  element.classList.add('hello')
  
  var btn = document.createElement('button');
  btn.innerHTML = 'Click me and check the console!'
  btn.onclick = printMe
  document.body.appendChild(element)
  document.body.appendChild(btn)
}


component()



```

<br />


## printMe.js


```js
export default function printMe() {
  console.log('I get called from print.js！');
}

```


<br />
## basics.css

```
body {
  background: beige;
}

```

<br />

## style.css

```
@import "basics.css";

.hello {
  color: red;
  width: 400px;
  height: 100px;
  border: 1px solid red;
}

```

运行`npm run dev`就开启本地服务


