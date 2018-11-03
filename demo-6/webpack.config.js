const path = require("path")
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")


module.exports = {
  // production development
  mode: 'development',
  // devtool: 'source-map',
  entry: {
    index: "./src/js/index.js",
    about: "./src/js/about.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
    publicPath: ""
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  
  optimization: {
    // js 只要设置 mode: 'production' 就会自动压缩
    minimizer: [
      // 压缩css
      new OptimizeCSSAssetsPlugin()
    ],
    // 把webpack代码单独打包出，在开发模式方便查看打包后的代码
    // runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        /*
         提取公共css
         匹配scss文件，被引用两次的scss会单独打包：style~about~index.css
         注意：
           只有在js中引入scss才会被计算是否被引用两次
           在scss中 @import "basis"; 这方式引入不会被单独打包
        */
        style: {
          test: /\.scss$/,
          chunks: "all",
          minSize: 0,
          minChunks: 2,
        },
        // 会把/src/js/文件下被引用两次的js单独打包
        // about.js index.js common~about~index.js 打包成这三个js文件
        common: {
          test: /[\\/]src\/js[\\/]/,
          chunks: "all",
          // 要生成的块的最小大小, 默认3000
          // 这里方面测试设置为0
          minSize: 0,
          // 最少被引用次数
          minChunks: 2,
        },
        // 首先: 打包第三方node_modules中的文件
        vendor: {
          // 给打包后文件命名，不配置文件名是vendor~about~index.js，配置了文件名是vendor.js
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new HtmlWebpackPlugin({
      title: 'index页',
      filename: 'index.html',
      inject: true,
      excludeChunks: ['about']
    }),
    new HtmlWebpackPlugin({
      title: 'about页',
      filename: 'about.html',
      inject: true,
      excludeChunks: ['index']
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    })
  ]
}
