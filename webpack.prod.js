const path = require('path')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.common.js')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

let prodConfig = {
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
          'style-loader',
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
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    }),
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

module.exports = merge(common, prodConfig, {
 /*  plugins: [
    new UglifyJSPlugin(),
    new OptimizeCSSAssetsPlugin()
  ] */
})