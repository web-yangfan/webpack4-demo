webpack devServer的proxy 可以让我实现跨域
proxy的options参数和http-proxy-middleware 参数一样，可以参考 http-proxy-middleware

<!- more -->


**`下面是proxy常用参数`**
```
proxy: {
      '/xxx': {
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
    }

```


**下面是示例代码：**

## 文件结构
```

├── index.html
├── package.json
├── src
│   └── index.js
└── webpack.config.js

```

## package.json

```
  "scripts": {
    "build": "webpack --config webpack.config.js",
    "dev": "webpack-dev-server --open"
  },
  "dependencies": {
    "axios": "^0.18.0"
  },
  "devDependencies": {
    "webpack": "^4.23.1",
    "webpack-cli": "^3.1.2",
    "webpack-dev-server": "^3.1.10"
  },
```
<br />

## webpack.config.js

```js
const path = require('path');
const webpack = require('webpack')


module.exports = {
  // production  development
  mode: 'development',
  entry: {
    index: ['./src/index.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    // 配置服务目录地址，
    contentBase: './',
    // 热更新
    hot: true,
    port: 8000,
    proxy: {
      '/revision': {
        target: 'https://www.ximalaya.com', // 代理地址
        changeOrigin: true,
        logLevel: 'debug'   // 控制台显示代理信息
      }
    }
  },
  plugins: [
    // 使用热更新插件
    new webpack.HotModuleReplacementPlugin()
  ]
};

```
<br />

## src/index.js

```js

import axios from 'axios'


var btn = document.createElement('button');
btn.innerHTML = '跨域请求'
btn.onclick = function() {
  axios.get('/revision/album/getTracksList', {
    params: {
      albumId: 3268363,
      pageNum: 1
    }
  }).then( (res) => {
    alert(res.data.msg)
  }).catch((error) => {
    alert('失败')
  })
}

document.body.appendChild(btn)



```

## index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>设置devServer.proxy</title>
</head>
<body>

<script src="./index.js"></script>
</body>
</html>

```

启动服务以后，就可以跨域请求了


