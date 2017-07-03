'use strict'

const path = require('path')

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    coverageReporter: {
      reporters: [
        { type: 'html', subdir: 'html' },
      ],
    },
    frameworks: [
      'jasmine',
    ],
    preprocessors: {
      'webpack.test.js': ['webpack', 'sourcemap'],
    },
    reporters: ['progress', 'coverage'],
    webpack: {
      cache: true,
      devtool: 'inline-source-map',
      module: {
        preLoaders: [
          {
            test: /\.js?$/,
            include: '/src/test/',
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              cacheDirectory: true,
            },
          }
        ],
        loaders: [
          {
            test: /\.js$/,
            include: path.resolve(__dirname, './src'),
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              cacheDirectory: true,
            },
          },
        ],
      },
    },
  })
}
