const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  // entry: {
  //   app: './src/index.js'
  // },
  plugins: [
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin()
    new HtmlWebpackPlugin({ // 解决 CSS 文件或者 JS 文件名字哈希变化的问题
      title: 'Webpack Demo',
      filename: 'index.html', // 默认值： 'index.html'
      template: path.resolve(__dirname, 'index.html'), // 模板
      minify: {
        collapseWhitespace: true,
        removeComments: true, // 移除注释
        removeAttributeQuotes: true // 移除属性的引号
      }
    }),
  ],
  // output: {
  //   filename: '[name].bundle.js',
  //   path: path.resolve(__dirname, 'dist')
  // }
  module: {
    rules: [
      { // JS启用babel转码
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,  // 加快编译速度，不包含node_modules文件夹内容
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        // test: /\.(png|svg|jpg|gif)$/,
        test: /\.(png|svg|jpg|gif|jpeg|ico|woff|woff2|eot|ttf|otf)$/,
        use: [
          // 'file-loader', // 有了url-loader
          { // base64
            loader: 'url-loader', // 根据图片大小，把图片优化成base64
            options: {
              limit: 10000
            }
          },
          { // 先进行图片优化
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              }
            }
          },
        ]
      },
      { // 字体处理
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
}