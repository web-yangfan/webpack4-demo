const CleanWebpackPlugin = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const webpack = require('webpack');
const path = require('path');

module.exports = {
  // development production
  mode: 'development',
  entry: {
    pageA: './src/a.js',
    pageB: './src/b.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  // 开发模式
  // 编译后的代码映射回原始源代码
  devtool: 'inline-source-map',
  plugins: [
    // 每次编译前清空删除dist目录
    new CleanWebpackPlugin(['dist']),
    new ManifestPlugin()
  ]
}
