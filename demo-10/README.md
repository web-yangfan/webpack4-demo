## 图片Base64

#### 文件结构和代码
##### 文件结构


```
├── index.html
├── package.json
├── src
│   ├── assets
│   │   └── img
│   │       ├── 1.jpg
│   │       ├── 2.jpg
│   │       ├── 3.jpg
│   │       ├── 4.jpg
│   │       └── 5.jpg
│   ├── css
│   │   └── base.css
│   └── index.js
└── webpack.config.js
```


##### package.json

```
 "scripts": {
    "build": "webpack --config webpack.config.js"
  },
  "devDependencies": {
    "css-loader": "^1.0.0",
    "file-loader": "^2.0.0",
    "img-loader": "^3.0.1",
    "style-loader": "^0.23.1",
    "url-loader": "^1.1.2",
    "webpack": "^4.23.1",
    "webpack-cli": "^3.1.2"
  },
```

##### webpack.config.js
```
const path = require("path")


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
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
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
      }
    ]
  }
};

```

#### base.css

```
#app > div {
    width: 200px;
    height: 200px;
}
.item1 {
    background: url('../assets/img/1.jpg') no-repeat;
    background-size: cover;
}
.item2 {
    background: url('../assets/img/2.jpg') no-repeat;
}
.item3 {
    background: url('../assets/img/3.jpg') no-repeat;
}
.item4 {
    background: url('../assets/img/4.jpg') no-repeat;
}
.item5 {
    background: url('../assets/img/5.jpg') no-repeat;
}

```

#### index.js

```
import './css/base.css'
```
#### index.html


```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>图片base64</title>
</head>
<body>
    <div id="app">
        <div class="item1">1</div>
        <div class="item2">2</div>
        <div class="item3">3</div>
        <div class="item4">4</div>
        <div class="item5">5</div>
    </div>
    <script src="./dist/index.js"></script>


</body>
</html>

```

