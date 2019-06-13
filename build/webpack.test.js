var path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpackConfig = {
    // webpack配置，针对测试脚本打包的compilation配置，与项目文件打包不相关
    // 也可以引入独立的配置文件
    mode: 'development',
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        modules: ['node_modules'],
        alias: {
           // https://cn.vuejs.org/v2/guide/installation.html#%E5%AF%B9%E4%B8%8D%E5%90%8C%E6%9E%84%E5%BB%BA%E7%89%88%E6%9C%AC%E7%9A%84%E8%A7%A3%E9%87%8A
           'vue$': 'vue/dist/vue.esm.js',
           '@': path.resolve(__dirname, '../src'),
          }
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            include: path.resolve('src/utils/'),
            use: {
                loader: 'istanbul-instrumenter-loader'
            },
         },
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
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              preserveWhitespace: false
            }
          }
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: "css-loader" // translates CSS into CommonJS
            }, 
            {
              loader: "sass-loader" // compiles Sass to CSS
            }
          ]
        }
      ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
  }
  
module.exports = webpackConfig;
