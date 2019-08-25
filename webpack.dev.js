const path = require('path')

const merge = require('webpack-merge')
const common = require('./webpack.common.js')

const webpack = require('webpack') // 导入热跟新所用插件


let devConfig = {
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(styl|css)$/,
        use: [
          // MiniCssExtractPlugin.loader,
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
  }
}

module.exports = merge(common, devConfig, {
  devtool: 'inline-source-map', // js 使用 source map (在浏览器中会在后面显示源码输出所在行)
  devServer: { // 热更新
    clientLogLevel: 'warning', // 可能的值有 none, error, warning 或者 info（默认值)
    hot: true,  // 启用 webpack 的模块热替换特性, 这个需要配合： webpack.HotModuleReplacementPlugin插件
    contentBase:  path.join(__dirname, "dist"), // 告诉服务器从哪里提供内容， 默认情况下，将使用当前工作目录作为提供内容的目录
    compress: true, // 一切服务都启用gzip 压缩
    // host: '0.0.0.0', // 指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问 0.0.0.0
    port: 8080, // 端口
    open: false, // 是否打开浏览器
    overlay: {  // 出现错误或者警告的时候，是否覆盖页面线上错误消息。
      warnings: true,
      errors: true
    },
    publicPath: '/', // 此路径下的打包文件可在浏览器中访问。
    proxy: {  // 设置代理
      "/api": {  // 访问api开头的请求，会跳转到  下面的target配置
        // target: "http://192.168.0.102:8080",
        // pathRewrite: {"^/api" : "/mockjsdata/5/api"}
      }
    }
  },
  plugins: [
    // 热跟新所需的插件
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()  // 替换插件
  ]
})