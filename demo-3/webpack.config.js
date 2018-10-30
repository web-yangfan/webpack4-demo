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
