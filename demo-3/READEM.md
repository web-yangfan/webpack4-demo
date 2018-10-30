

演示如何在webpack4 实现 懒加载

<!-- more -->

**下面是示例代码：**

## 目录结构

```
├── READEM.md
├── package.json
├── src
│   ├── child_pageA.js
│   ├── child_pageB.js
│   ├── common_module.js
│   ├── pageA.js
│   └── pageB.js
└── webpack.config.js
```

<br />


## package.json
```js
{
  "name": "demo-3",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "webpack --config webpack.config.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "clean-webpack-plugin": "^0.1.19",
    "html-webpack-plugin": "^3.2.0",
    "lodash": "^4.17.11",
    "webpack": "^4.22.0",
    "webpack-cli": "^3.1.2"
  }
}
```

<br />


## webpack.config.js

```js
const path = require("path")
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    pageA: "./src/pageA.js",
    pageB: "./src/pageB.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    chunkFilename: "[name].js"
  },
  plugins: [
    // 编译前清空dist目录
    new CleanWebpackPlugin(['dist']),
    // 生成html
    new HTMLWebpackPlugin({
      filename: 'pageA.html',
      title: 'pageA-懒加载',
      inject: true,
      excludeChunks: ['pageB']
    }),
    new HTMLWebpackPlugin({
      filename: 'pageB.html',
      title: 'pageB-懒加载',
      inject: true,
      excludeChunks: ['pageA']
    })
  ]
};

```

<br />


## common_module.js

```js
export default function (str) {
  console.log( `${str}---this is common_module`)
}

```

<br />


## child_pageA.js

```js
import common_module from './common_module'
common_module('child_pageA')

export default 'child_pageA'

```

<br />

#### child_pageB.js

```js
import common_module from './common_module'
common_module('child_pageB')

export default 'child_pageB'

```

<br />

#### pageA.js

```js
import "./child_pageA"
import "./child_pageB"


function component() {
  
  let button = document.createElement('button')
  button.innerHTML = '点击我查看控制台';
  button.onclick = e => import(/* webpackChunkName: "lodash" */ 'lodash').then(module => {
    console.log(module.join(['1', '2', '3'], '~'))
  })
  document.body.appendChild(button)
}
component()

```

<br />

#### pageB.js

```js
function component() {
  
  let button = document.createElement('button')
  button.innerHTML = '点击我查看控制台';
  button.onclick = e => {
    import(/* webpackChunkName: "lodash" */ 'lodash').then(module => {
      console.log(module.join(['1', '2', '3'], '~'))
    })
    
    import(/* webpackChunkName: "child_pageB" */ './child_pageB.js').then(module => {
      console.log(module.default)
    })
  }
  document.body.appendChild(button)
}
component()

```

<br />

#### 运行`npm run build`

```
Hash: f789ca6fdab802d324d7
Version: webpack 4.23.0
Time: 722ms
Built at: 2018-10-25 15:00:16
            Asset       Size          Chunks             Chunk Names
   child_pageB.js   1.24 KiB     child_pageB  [emitted]  child_pageB
       pageA.html  184 bytes                  [emitted]
         pageA.js   10.8 KiB           pageA  [emitted]  pageA
       pageB.html  184 bytes                  [emitted]
         pageB.js   8.88 KiB           pageB  [emitted]  pageB
vendors~lodash.js    547 KiB  vendors~lodash  [emitted]  vendors~lodash
Entrypoint pageA = pageA.js
Entrypoint pageB = pageB.js
[./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 489 bytes {vendors~lodash} [built]
[./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 497 bytes {vendors~lodash} [built]
[./src/child_pageA.js] 103 bytes {pageA} [built]
[./src/child_pageB.js] 103 bytes {pageA} {child_pageB} [built]
[./src/common_module.js] 83 bytes {pageA} {child_pageB} [built]
[./src/pageA.js] 352 bytes {pageA} [built]
[./src/pageB.js] 453 bytes {pageB} [built]
    + 1 hidden module
Child html-webpack-plugin for "pageA.html":
     1 asset
    Entrypoint undefined = pageA.html
    [./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 489 bytes {0} [built]
    [./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 497 bytes {0} [built]
        + 2 hidden modules
Child html-webpack-plugin for "pageB.html":
     1 asset
    Entrypoint undefined = pageB.html
    [./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 489 bytes {0} [built]
    [./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 497 bytes {0} [built]
        + 2 hidden modules

```

`pageA.html` 加载 `pageA.js`,点击按钮后会加载 vendors~lodash.js 并执行 `console.log(module.join(['1', '2', '3'], '~'))`

`pageB.html` 加载 `pageB.js`,点击按钮后会加载 vendors~lodash.js、child_pageB.js 并执行 


```js
 console.log(module.join(['1', '2', '3'], '~'))
 console.log(module.default)
```


