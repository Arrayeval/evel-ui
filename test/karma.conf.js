const path = require('path')
const webpackConfig = require("../build/webpack.test")

module.exports = (config) => {
  config.set({
    files: [
      // 针对test目录下所有符合命名规范的测试文件
      // { pattern: 'test/*_test.js', watched: false },
      // { pattern: 'test/**/*_test.js', watched: false }
      'index.test.js'
    ],
    frameworks: ['mocha'],
    // plugins: ['karma-coverage-istanbul-reporter'],
    reporters: ['mocha', 'coverage-istanbul'],
    preprocessors: {
      // 为选定脚本指定前处理器，这里配置所有的测试脚本需要经过webpack处理
      // 'test/*_test.js': [ 'webpack' ],
      // 'test/**/*_test.js': [ 'webpack' ]
      'index.test.js': [ 'webpack']
    },

    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'text-summary'],
      dir: path.join(__dirname, 'coverage'),
      combineBrowserReports: true,
      skipFilesWithNoCoverage: true,
      fixWebpackSourcePaths: true,
      'report-config': {
        html: {
          // outputs the report in ./coverage/html
          subdir: 'html'
        }
      },
      verbose: false // output config used by istanbul for debugging
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      //如果使用了webpack-dev-server则可以传入一些参数
      // stats: 'errors-only'
      noInfo: true
    },

    plugins: [
        require('webpack'),
        require('karma-webpack'),
        require("karma-mocha"),
        require("karma-chai"),
        require("karma-chrome-launcher"),
        require("karma-mocha-reporter"),
        require("karma-coverage-istanbul-reporter"),
        require("istanbul-instrumenter-loader")
    ],

    browsers: ['Chrome']
  })
}