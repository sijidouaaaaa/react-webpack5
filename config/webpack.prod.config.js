// 生产环境配置文件

const { merge } = require('webpack-merge');
const common = require('./webpack.common.config.js');
//HTML 模版
const HtmlWebpackPlugin = require('html-webpack-plugin');

//清理本地打包文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 这个插件可以将样式文件从bundle.js抽离出来一个文件，并且支持chunk css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//压缩css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); 

// 压缩js文件
const TerserPlugin = require("terser-webpack-plugin"); 


module.exports = merge(common, {
    mode: 'production',
    /**
     * 解决浏览器缓存，给打包出的 js 文件换个不确定名字
     * 防止浏览器缓存机制带来的业务代码不更新问题 
     */
    output: {
        filename: 'js/[nane]-bundle-[hash:6].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader','postcss-loader',],
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader','less-loader'],
              },
              {
                test: /\.(sass|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader','sass-loader'],
              },
        ],
    },
    /**
     * template：基于我们自己定义的 html 文件为模板生成 html 文件
     * filename：打包之后的 html 文件名字
     * inject：将 js 文件注入到 body 最底部
     * minify：压缩 html 文件时的配置
     * removeComments：去除注释
     */
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            filename: 'index.html',
            inject: 'body',
            minify: {
                removeComments: true,
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'style/[name].[hash:6].css',
        }),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin()],
        minimizer: [
            new TerserPlugin({
              terserOptions: {
                compress: {
                  drop_console: true, // 屏蔽log
                },
              },
            }),
          ],
    },
});