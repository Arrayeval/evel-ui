const testsJSContext = require.context("./utils/", true, /\.test$/)
// console.log("获取的文件数量", testsContext.keys())
testsJSContext.keys().forEach(testsJSContext)

// const testsContext = require.context("../src/utils/", true, /\.js$/)

// testsContext.keys().forEach(testsContext)