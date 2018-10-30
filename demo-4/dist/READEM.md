
## webpack - 处理css
### CSS 在 HTML 中的常用引入方法有<link>标签和<style>标签两种，所以这次就是结合webpack特点实现以下功能：
1. 将 css 通过 link 标签引入
2. 将 css 放在 style 标签里
3. 动态卸载和加载 css
4. 页面加载 css 前的transform



#### 目录结构和代码
```
├── package.json
├── src
│   ├── css
│   │   ├── base.css
│   │   └── common.css
│   └── pageA.js
├── pageA.html
└── webpack.config.js

<br />


#### package.json
```
 "scripts": {
    "build": "webpack --config webpack.config.js"
  },
  "devDependencies": {
    file-loader": "^2.0.0",
    "css-loader": "^1.0.0",
    "style-loader": "^0.23.1",
    "webpack": "^4.22.0",
    "webpack-cli": "^3.1.2"
  },
```

#### base.css

```
html {
    background: #999999;
}

```
#### common.css
```
h1 {
    color: brown;
}

```


#### webpack.config.js

```
const path = require("path")

module.exports = {
  mode: 'development',
  entry: {
    pageA: "./src/pageA.js",
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
        use: [ 'style-loader', 'css-loader']
      }
    ]
  }
};
```

### pageA.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>处理css</title>
</head>
<body>
<script src="./dist/pageA.js"></script>
</body>
</html>

```


#### CSS通过<link>标签引入
通过file-loader，把上面style单独打包css文件，通过link引入
```
 module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader/url',
          'file-loader'
        ]
      }
    ]
  }
```
在修改一下pageA.js
```
window.addEventListener("click", function() {
  // 需要手动点击页面才会引入样式！！！
  import("./css/base.css");
});

```

#### CSS放在<style>标签里
一般来说，css放在style标签里可以减少网络请求次数，提高响应时间。旧IE浏览器对style限制。下面代码把所有的style合并到一个style里
```
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {
              singleton: true // 处理为单个style标签
            }
          },
          {
            loader: "css-loader",
          }
        ]
      }
    ]
  }
```

#### 动态卸载和加载CSS
修改代码实现每 0.5s 换一次背景颜色
修改webpack.config.js
```
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader/useable',
          'css-loader'
        ]
      }
    ]
  }
```
修改pagaA.js
```
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

