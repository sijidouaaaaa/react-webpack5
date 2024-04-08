# react-webpack5
react+webpack5搭建的项目

全局安装包
npm install

打包
npm run build

启动
npm start

端口号：8080





关于导航  导航有#号 HashRouter这个方法
http://localhost:8080/#/client/xxxx

创建导航  后面还需要优化
router.js里面引入页面组件
init.js 里面写地址需要运行 node grant



项目目录结构
  my-project
  |- config
    |- webpack.common.config.js
    |- webpack.dev.config.js
    |- webpack.prod.config.js
+ |- dist
+   |- js
+     |- bundle.js
  |- node_modules
  |- src
    |- app.js
  |- package.json

