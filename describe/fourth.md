1. 加载图片与图片优化
npm install --save-dev file-loader
image-webpack-loader可以帮助我们对图片进行压缩和优化
npm install image-webpack-loader --save-dev

2.  更进一步处理图片成 base64
npm install --save-dev url-loader

3. 字体的处理（同图片）
{
  test: /\.(woff|woff2|eot|ttf|otf)$/,
  use: [
    'file-loader'
  ]
}