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
