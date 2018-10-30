

演示如何在webpack4通过 `splitChunks` 提取公共代码

<!-- more -->

**下面是示例代码：**

## 目录结构

```
├── dist
│   ├── common.js
│   ├── pageA.html
│   ├── pageA.js
│   ├── pageB.html
│   ├── pageB.js
│   └── vendor.js
├── package.json
├── src
│   ├── child_pageA.js
│   ├── child_pageB.js
│   ├── common_module.js
│   ├── pageA.js
│   └── pageB.js
└── webpack.config.j
```

<br />


## package.json

```js
{
  "name": "demo-2",
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
  // development production
  mode: 'production',
  // 多页面应用
  entry: {
    pageA: "./src/pageA.js",
    pageB: "./src/pageB.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    chunkFilename: "[name].js"
  },
  optimization: {
    splitChunks: {
      // 缓存组，目前在项目中设置cacheGroup可以抽取公共模块，不设置则不会抽取
      cacheGroups: {
        // 其次: 打包业务中公共代码
        // 缓存组信息，名称可以自己定义
        common: {
          // 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
          chunks: "initial",
          // 要生成的块的最小大小（以字节为单位）默认是3000,
          // 两个模块提取公共文件大小满足条件，就会生成 common~pageA~pageB.js
          minSize: 0,
          // 表示被引用次数
          minChunks: 2,
        },
        // 首先: 打包第三方node_modules中的文件
        vendor: {
          name: "vendor",
          test: /node_modules/,
          chunks: "initial",
          priority: 10,
          enforce: true
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HTMLWebpackPlugin({
      title: 'pageA',
      filename: 'pageA.html',
      inject: true,
      excludeChunks: ['pageB']
    }),
    new HTMLWebpackPlugin({
      title: 'pageB',
      filename: 'pageB.html',
      inject: true,
      excludeChunks: ['pageA']
    }),
  ]
};

```

<br />

## common_module.js

```js
export default function (str) {
  console.log(`${str}---this is common_module`)
}

```

<br />


#### child_pageA.js
```js
import common from './common_module.js'
common('child_pageA')
export default 'child_pageA'
```

<br />

#### child_pageB.js
```js
import common from './common_module.js'
common('child_pageB')

export default 'child_pageB'

```


<br />


    
#### pageA.js
```js
import './child_pageA.js'
import './child_pageB.js'
import * as _ from 'lodash'


```

<br />

    
#### pageB.js
```js
import './child_pageA.js'
import * as _ from 'lodash'


```


<br />

## 运行`npm run build` 

```
Hash: ecaf5866c28cfcb76692
Version: webpack 4.22.0
Time: 1225ms
Built at: 2018-10-25 00:10:09
     Asset       Size  Chunks             Chunk Names
 common.js   3.62 KiB  common  [emitted]  common
pageA.html  287 bytes          [emitted]
  pageA.js   6.16 KiB   pageA  [emitted]  pageA
pageB.html  287 bytes          [emitted]
  pageB.js   6.16 KiB   pageB  [emitted]  pageB
 vendor.js    547 KiB  vendor  [emitted]  vendor
Entrypoint pageA = vendor.js common.js pageA.js
Entrypoint pageB = vendor.js common.js pageB.js
[./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 489 bytes {vendor} [built]
[./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 497 bytes {vendor} [built]
[./src/child_pageA.js] 91 bytes {common} [built]
[./src/child_pageB.js] 92 bytes {common} [built]
[./src/common_module.js] 82 bytes {common} [built]
[./src/pageA.js] 82 bytes {common} [built]
[./src/pageB.js] 78 bytes {common} [built]
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


<br /> 

上面的cacheGroups 配置生成两个公共文件，`common.js` 和 `vendor.js`  
1. `common.js` 是 `pageA.js`和`pageB.js` 需要引入的公共模块
2. `vendor.js` 是 所有第三方`node_modules`的库


如果想分开打包第三方库: 例子 安装`preact` 和 `lodash` 库


```js
// 把preact和lodash三放库分别打包
cacheGroups: {
  preact: {
    test: /preact/,
      chunks: 'initial'
  },
  lodash: {
    test: /lodash/,
    chunks: 'all'
  }
}

// preact和lodash第三方库打包在一起, 文件夹名library
cacheGroups: {
  library: {
    test: /(preact)|(lodash)/,
    // initial 表示初始化就需要加载的第三方库
    chunks: 'initial'
  }
}
```

<br />

#### optimization 参数说明


```
//提取公共模块，webpack4去除了CommonsChunkPlugin，使用SplitChunksPlugin作为替代
//例子代码 https://github.com/webpack/webpack/tree/master/examples/common-chunk-and-vendor-chunk
    
optimization: {
    // 默认为true 压缩
    // minimize: false
    
    // 使用UglifyJsPlugin 压缩
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          cache: true,
          parallel: true
        }
      })
    ]
    // 开启runtimeChunk
    runtimeChunk: true,
    
    //SplitChunksPlugin配置
    splitChunks: {}

  }
```
具体splitChunks 参数请看 [官方文档](https://webpack.js.org/plugins/split-chunks-plugin/) 
