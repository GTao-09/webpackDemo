const path = require('path')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.common.js')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const webpack = require('webpack')
const devMode = process.env.NODE_ENV === 'production' // 判断当前环境是开发环境还是 部署环境，主要是 mode属性的设置值。

console.log(process.env.NODE_ENV)

const prodConfig = {
  mode: 'production',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(styl|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
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
      }
    ]
  },
  plugins: [ // 相关插件
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].[hash].css' : '[name].css', // 设置最终输出的文件名
      chunkFilename: devMode ? '[id].[hash].css' : '[id].css'
    })
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}), // css压缩
      new UglifyJsPlugin({ // js压缩
        cache: true, // js未发生改变时不再次压缩
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      })
    ]
  }
}

module.exports = merge(common, prodConfig, {
  /*  plugins: [
    new UglifyJSPlugin(),
    new OptimizeCSSAssetsPlugin()
  ] */
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ]
})
