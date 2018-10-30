
安装 `autoprefixer` `postcss-loader` 实现给css3添加浏览器前缀，直接在`webpack.config.js`配置对应loader就可以了

<!-- more -->

**下面是示例代码：**

```js
 rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins:() => [
                require('autoprefixer')( {"browsers": ["> 1%", "last 2 versions", "not ie <= 8"]} )
              ]
            }
          },
          'sass-loader'
        ]
      }
    ]

```


