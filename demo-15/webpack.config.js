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
  devServer: {
    // 配置服务目录地址，
    contentBase: './',
    // 热更新
    hot: true,
    port: 8000,
    proxy: {
      '/revision': {
        target: 'https://www.ximalaya.com', // 代理地址
        changeOrigin: true,
        logLevel: 'debug'   // 控制台显示代理信息
      }
    }
  },
  plugins: [
    // 使用热更新插件
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ]
};
