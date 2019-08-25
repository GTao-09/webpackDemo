const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const devMode = (process.env.NODE_ENV !== 'production') // 判断当前环境是开发环境还是 部署环境，主要是 mode属性的设置值。
/* 
  生产环境与开发环境
    生产环境,生产环境与开发环境完全不同，在生产环境中我们关注的是如何才能产生更小的代码块，压缩文件的体积，使得加载时间做到最短
    开发环境,在项目开发过程中，我们关注的是能否追溯到代码的错误来源，能够及时刷新页面让我们看到代码的实际效果
*/
module.exports = {
  mode: 'production', // 模式
  entry: './src/index.js', // 入口文件
  output: {
    path: path.resolve(__dirname, './dist'), // 输出文件(如果没有dist文件则自动添加)
    filename: 'index.js' // 输出文件
  },
  module: {
    rules: [
      {
        test: /\.(styl|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          { // 添加前缀
            loader: 'postcss-loader',
            options: {
              ident: 'postcss', // 唯一标识
              sourceMap: true,
              plugins: loader => [
                require('autoprefixer') // 可配置browserslist(package.json)
              ]
            }
          },
          'stylus-loader'
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
  },
  plugins: [ // 相关插件
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      // filename: devMode ? '[name].css' : '[name].[hash].css', // 设置最终输出的文件名
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
      // chunkname: 是未被列在entry中，却又需要被打包出来的文件命名配置。什么场景需要呢？我们项目就遇到过，在按需加载（异步）模块的时候，这样的文件是没有被列在entry中的
    }),
    // new HtmlWebpackPlugin() // 使用默认配置
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
    new CleanWebpackPlugin()
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}), // css压缩
      new UglifyJsPlugin({ // js压缩
        cache: true, // js未发生改变时不再次压缩
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
    ]
  }
}
