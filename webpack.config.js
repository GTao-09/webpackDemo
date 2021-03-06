const path = require('path')

module.exports = {
  mode: 'development', // 模式
  entry: './src/index.js', // 入口文件
  output: {
    path: path.resolve(__dirname, './dist'), // 输出文件(如果没有dist文件则自动添加)
    filename: 'main.js' // 输出文件
  },
  module: {
    rules: [
      {
        //test: /\.css$/,
        // css-loader： 辅助解析 js 中的 import './main.css'
        // style-loader: 把 js 中引入的 css 内容 注入到 html 标签中，并添加 style 标签.依赖 css-loader
        //use: ['style-loader', 'css-loader'] // 从右往左

        /* less, sass, stylus */
        test: /\.(styl|css)$/, // /\.(sc|c|sa)ss$/  // scss, css, sass
        use: [ // ["style-loader", "css-loader", "stylus-loader"]
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
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
          {
            loader: 'stylus-loader', // {loader: "sass-loader"} // {loader: "less-loader"}
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader', //  加载图片
          { // 图片压缩
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
      }
    ]
  }
}
