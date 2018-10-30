const path = require("path")


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
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name]-[hash:5].min.[ext]",
              
              limit: 5000, // 字体文件小于等于5k生成base64，否则就打包文件
              // publicPath: "fonts/",
              outputPath: "assets/font/"
            }
          }
        ]
      }
    ]
  }
};
