const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const PurifyCSS = require("purifycss-webpack");
const glob = require("glob-all");


module.exports = {
  mode: 'development',
  entry: {
    pageA: "./src/pageA.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "./"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins:() => [
                require('autoprefixer')( {"browsers": ["> 1%", "last 2 versions", "not ie <= 8"]} )
              ]
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    // 编译前清空dist目录
    new CleanWebpackPlugin(['dist']),
    // 生成html
    new HTMLWebpackPlugin({
      filename: 'pageA.html',
      title: 'css Tree Shaking',
      inject: true
    }),
    
    // 单独打包css
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    }),
    // 去掉没有使用的css
    new PurifyCSS({
      paths: glob.sync([
        // CSS Tree Shaking的路径文件
        // path.resolve(__dirname, "./*.html"), // 对 html 文件进行 tree shaking
        path.resolve(__dirname, "./src/*.js")
      ])
    })
  ]
};
