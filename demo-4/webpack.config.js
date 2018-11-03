const path = require("path")

module.exports = {
  mode: 'production',
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "./dist/"
  },
  performance: {
    // 关闭资源超过 250kb警告
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: "[name]-[hash:5].min.[ext]",
              // 设置小于10k转成base64
              limit: 20000, // size <= 20KB
              useRelativePath: true
            }
          }
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
