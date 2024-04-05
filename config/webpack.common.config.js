// 公共配置文件
const path = require('path');


module.exports = {
    // 属性定义了入口文件路径，
    entry: {
        index: './src/index.jsx',
    },
    // 定义了编译打包之后的文件名以及所在路径
    // 打包输出的文件名字为 bundle.js ，bundle.js  文件存放的路径为 dist/js/bundle.js
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, '../dist'),
    },
    /**babel-loader：使用 Babel 和 webpack 来转译 JavaScript 文件。
     * @babel/core：babel 的核心模块
     * @babel/preset-env：转译 ES2015+的语法
     * @babel/preset-react：转译 react 的 JSX
     * @babel/plugin-proposal-class-properties：用来编译类(class)
     * @babel/plugin-transform-runtime：防止污染全局，代码复用和减少打包体积
     */
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [
                    /(src)/,
                    /(node_modules\/antd)/,
                    /(node_modules)/,
                    /grant.js/
                ],
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [
                            '@babel/plugin-transform-runtime',
                            '@babel/plugin-proposal-class-properties',
                        ],
                    },
                },
            },
            {
                test: /\.(png|jpe?g|gif)$/i, //后缀为 jpg,png,gif 的文件，使用 url-loader 进行预处理；
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]',//options 中的[name].[ext]表示，输出的文件名为 原来的文件名；
                    outputPath: 'images',// 是输出到 dist 目录下的路径，即 dist/images；
                    limit: 8192, //limit: 8192，指定文件的最大体积（以字节为单位）。
                },
            },
        ],
    },
    resolve: {
        /**
         * extensions: 如果有多个文件有相同的名字，但后缀名不同
         * webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀
         * 使用此选项会 覆盖默认数组，这就意味着 webpack 将不再尝试使用默认扩展来解析模块。
         */
        extensions: ['.js', '.jsx', '.json', '.less', '.scss'],
        //如果你想要添加一个目录到模块搜索目录，此目录优先于 node_modules/ 搜索。
        modules: [path.resolve(__dirname, '../src'), 'node_modules'],
        alias: {//创建 import 或 require 的别名，来确保模块引入变得更简单。例如，一些位于 src/ 文件夹下的常用模块
            '@': path.resolve(__dirname, '../src'),
            '@components': path.join(__dirname, '../src/components'),
            '@assets': path.join(__dirname, '../src/assets'),
            '@pages': path.join(__dirname, '../src/pages'),
            '@util': path.join(__dirname, '../src/util'),
            '@mock': path.join(__dirname, '../src/mock'),
        }
    },
};
