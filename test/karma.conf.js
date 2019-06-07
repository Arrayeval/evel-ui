const path = require('path');
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
      thresholds: {
        emitWarning: false, // set to `true` to not fail the test command when thresholds are not met
        // thresholds for all files
        global: {
          statements: 100,
          lines: 100,
          branches: 100,
          functions: 100
        },
        // thresholds per file
        each: {
          statements: 100,
          lines: 100,
          branches: 100,
          functions: 100,
          // overrides: {
          //   'baz/component/**/*.js': {
          //     statements: 98
          //   }
          // }
        }
      },
      verbose: false // output config used by istanbul for debugging
    },

    webpack: {
      // webpack配置，针对测试脚本打包的compilation配置，与项目文件打包不相关
      // 也可以引入独立的配置文件
      mode: 'none',
      module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['env'],
                },
              }
            },
          //   {
          //     test: /\.js$/,
          //     include: path.resolve('src/lib'),
          //     use: {
          //         loader: 'istanbul-instrumenter-loader'
          //     },
          //  },
          
        ]
      }
    },

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
        require("karma-spec-reporter"),
        require("karma-coverage-istanbul-reporter"),
        require("istanbul-instrumenter-loader")
    ],

    browsers: ['Chrome']
  })
}