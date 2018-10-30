webpack处理字体文件很简单,使用`url-loader`就可以

<!-- more -->

**下面是示例代码：**

```js
{
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name]-[hash:5].min.[ext]",
              
              limit: 5000, // 字体文件小于等于5k生成base64，否则就打包文件
              // publicPath: "fonts/",
              outputPath: "assets/font/"
            }
          }
        ]
      }
```
