 1. 合并两个webpack的js配置文件
 webpack-merge的工具可以实现两个配置文件进合并，这样我们就可以把 开发环境和生产环境的公共配置抽取到一个公共的配置文件中。
 npm install --save-dev webpack-merge
   webpack-demo
      |- package.json
      |- webpack.config.js
      |- webpack.common.js  // 存放公共配置
      |- webpack.dev.js  // 开发环境
      |- webpack.prod.js  // 生产环境

2.  js 使用 source map
当 webpack 打包源代码时，可能会很难追踪到错误和警告在源代码中的原始位置。例如，如果将三个源文件（a.js, b.js 和 c.js）打包到一个 bundle（bundle.js）中，而其中一个源文件包含一个错误，那么堆栈跟踪就会简单地指向到 bundle.js。
使用 `inline-source-map` 选项，这有助于解释说明 js 原始出错的位置。（不要用于生产环境）

devtool: 'inline-source-map'

3. 使用 webpack-dev-server 和热更新
npm install --save-dev webpack-dev-server
启动
npx webpack-dev-server --config webpack.dev.js

4. JS启用babel转码
npm i -D babel-loader @babel/core @babel/preset-env
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,  // 加快编译速度，不包含node_modules文件夹内容
      use: {
        loader: 'babel-loader'
      }
    }
  ]
}
然后，在项目根目录下，添加babel的配置文件 .babelrc
{
  "presets": ["env"]
}

5. babel优化
babel 在每个文件都插入了辅助代码，使代码体积过大.babel 对一些公共方法使用了非常小的辅助代码，比如 _extend。 默认情况下会被添加到每一个需要它的文件中。你可以引入 `babel runtime` 作为一个独立模块，来避免重复引入。
npm install @babel/plugin-transform-runtime --save-dev
npm install --save @babel/runtime

6. 安装ESLint
npm install eslint --save-dev
npm install eslint-loader --save-dev
// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          // eslint options (if necessary)
          fix: true
        }
      },
    ],
  },
  // ...
}
eslint配置可以直接放到webpack的配置文件中，也可以直接放到项目根目录的 `.eslintrc`中

