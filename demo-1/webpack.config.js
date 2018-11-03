const path = require("path")

module.exports = {
  mode: 'development',
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "./dist/"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader/useable',
          'css-loader'
        ]
      }
    ]
  }
}
