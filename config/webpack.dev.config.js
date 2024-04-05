// 开发环境配置文件

const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  // 配置 source-map 便于开发调试
  devtool: 'eval-cheap-module-source-map',
  /**
   * static: 启服务的文件
   * port: 端口号
   * compress: 为每个静态文件开启gzip压缩：
 */
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 8080,
    compress: true,
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader', // 将 JS 字符串生成为 style 节点
      //     'css-loader', // 将 CSS 转化成 CommonJS 模块
      //     'postcss-loader',
      //   ],
      // },
      {
        test: /\.(less|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader','less-loader'],
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader','postcss-loader', 'sass-loader'],//未安装
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      hash: false,
    }),
  ],
});