<!-- 初始化 -->
npm init -y
npm install webpack webpack-cli --save-dev

<!-- 项目结构 -->
|- package.json
|- /src
  |- index.js
|- index.html
|- webpack.config.js

<!-- 运行 -->
npx webpack (因为没有全局安装webpack)
npm run start (在package.json中scripts配置)