1. 加载非js文件 之 加载css文件
webpack 最出色的功能之一就是，除了 JavaScript，还可以通过 loader 引入任何其他类型的文件
npm install --save-dev style-loader css-loader

2. 加载 Sass,Less,Stylus 文件
npm install sass-loader node-sass webpack --save-dev
npm install less-loader node-less webpack --save-dev
npm install stylus stylus-loader webpack --save-dev

3.  创建 Source Map
Source map就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。
css-loader`和`sass-loader`都可以通过该 options 设置启用 sourcemap。