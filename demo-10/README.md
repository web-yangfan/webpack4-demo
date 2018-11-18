webpack-manifest-plugin 会在编译后的文件夹里生成一个manifest.json，里面有所有的打包记录：

<!-- more -->


```js
entry: {
    pageA: './src/a.js',
    pageB: './src/b.js'
  }

// 编译后manifest.json 文件的内容
 {
   "pageA.js": "/pageA.js",
   "pageB.js": "/pageB.js"
 }
 
```



## 如何配置
1、 安装 `webpack-manifest-plugin`

2、在webapck配置文件中配置
```

const ManifestPlugin = require('webpack-manifest-plugin')

....

 plugins: [
    new ManifestPlugin()
  ]

```

