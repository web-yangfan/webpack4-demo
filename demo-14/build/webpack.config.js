const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack');
const path = require('path');


module.exports = {
  // development production
  mode: 'development',
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/assets/'
  },
  // 开发模式
  // 编译后的代码映射回原始源代码
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        rules: [
          {
            test: /\.css$/,
            use: [
              {
                loader: 'style-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          }
        ]
      }
    ]
  },
  plugins: [
    // 每次编译前清空删除dist目录
    new CleanWebpackPlugin(['dist'], {root: path.resolve(__dirname, '..')}),
    new HtmlWebpackPlugin({
      title: 'devServer'
    }),
    // 使用热更新插件
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    port: 8000,
    // 配置服务目录地址，
    publicPath:"/",
    contentBase: false,
     // 热更新
     hot: true
  },
}
