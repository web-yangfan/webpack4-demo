const path = require('path');
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  // production  development
  mode: 'development',
  entry: {
    index: ['webpack-hot-middleware/client?reload=true', './src/index.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        rules: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.OccurrenceOrderPlugin(), // 排序输出
    // 启用模块热替换(Enable Hot Module Replacement - HMR)
    new webpack.HotModuleReplacementPlugin(),
    // 跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
