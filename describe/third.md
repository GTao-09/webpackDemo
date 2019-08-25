1. PostCSS 处理 loader（附带：添加 css3 前缀）
npm i -D postcss-loader
npm install autoprefixer --save-dev

2.  样式表抽离成专门的单独文件并且设置版本号 (使用生产环境)
webpack4 开始使用： mini-css-extract-plugin插件
抽取了样式，就不能再用 style-loader 注入到 html 中了。
npm install --save-dev mini-css-extract-plugin

生产环境的运行
npx webpack --config webpack.product.config.js

3. 压缩css
npm i -D optimize-css-assets-webpack-plugin

4. 压缩js
压缩需要一个插件：uglifyjs-webpack-plugin, 此插件需要一个前提就是：mode: 'production'.
npm i -D uglifyjs-webpack-plugin

5. 解决 CSS 文件或者 JS 文件名字哈希变化的问题
HtmlWebpackPlugin插件，可以把打包后的 CSS 或者 JS 文件引用直接注入到 HTML 模板中
npm install --save-dev html-webpack-plugin

6. 清理 dist 目录
每次构建，我们的 `/dist` 文件夹都会保存生成的文件，然后就会非常杂乱。通常，在每次构建前清理 `/dist` 文件夹，是比较推荐的做法
npm install clean-webpack-plugin --save-dev
