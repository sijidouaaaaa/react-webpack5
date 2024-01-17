// postcss 一种对 css 编译的工具，类似 babel 对 js 的处理。

module.exports = {
    plugins: [
      require('autoprefixer')({
        overrideBrowserslist: [
          'Android 4.1',
          'iOS 7.1',
          'Chrome > 31',
          'ff > 31',
          'ie >= 8',
        ],
      }),
    ],
  };
  
  