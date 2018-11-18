const path = require("path")
const webpack = require('webpack')


module.exports = {
  // production development
  mode: 'development',
  // devtool: 'source-map',
  entry: {
    index: "./src/js/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
    publicPath: ""
  },
  resolve: {
    alias: {
      jQuery: path.resolve(__dirname, "src/js/jQuery v3.3.1.js")
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      // $: 'jquery' // npm
      $: "jQuery",
      jQuery: "jQuery" // 本地Js文件
    })
  ]
}
