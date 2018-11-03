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
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              // 开启 sourceMap
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              // 开启 sourceMap
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              // 开启 sourceMap
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
};
