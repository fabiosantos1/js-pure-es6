var webpackConfig = require('./webpack.dev.js')

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      './src/test/*-test.js'
    ],
    preprocessors: {
      './src/test/*-test.js': ['webpack']
    },
    webpack: webpackConfig, 
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity
  })
}