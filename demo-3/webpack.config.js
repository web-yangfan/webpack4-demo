const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

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
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // 开启 sourceMap
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins:() => [
                require('autoprefixer')( {"browsers": ["> 1%", "last 2 versions", "not ie <= 8"]} )
              ]
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
  },
  plugins: [
    // 单独打包css
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    })
  ]
};
