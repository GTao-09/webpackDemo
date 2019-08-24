const path = require('path')

module.exports = {
  mode: 'development', // 模式
  entry: './src/index.js', // 入口文件
  output: {
    path: path.resolve(__dirname, './dist'), // 输出文件(如果没有dist文件则自动添加)
    filename: 'main.js' // 输出文件
  }
}

// 运行 npx webpack (因为没有全局安装webpack)