const path = require('path');
const webpack = require('webpack')


module.exports = {
  // production  development
  mode: 'development',
  entry: {
    index: ['./src/index.js'],
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
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src' )],
        exclude: [path.resolve(__dirname, 'src/libs' )],
        use: [
          {
            loader: 'eslint-loader',
            options: {
              formatter: require('eslint-friendly-formatter')
            }
          }
        ]
      }
    ]
  },
  devServer: {
    // 配置服务目录地址，
    contentBase: './',
    // 热更新
    hot: true,
    overlay: true // 有错误，在浏览器上覆盖显示
  },
  plugins: [
    // 使用热更新插件
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ]
};
