const path = require("path")
const webpack = require("webpack")

module.exports = {
  mode: 'development',
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: './dist/'
  },
  resolve: {
    alias: {
      // 本地库需要配置路径和别名
      _utils: path.resolve(__dirname, "src/lib/utils.js")
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
       $: "jquery", // npm
      _utils: "_utils" // 本地库
    })
  ]
};
