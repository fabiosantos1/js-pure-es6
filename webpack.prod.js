'use strict';

const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require("babili-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "[name].css"
});

module.exports = {
    entry: {
        'app': [
          'babel-polyfill',
          './src/index'
        ]
    },
    output: {
      path: path.resolve(__dirname, './www'),
      filename: '[name].js',
      libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
              test: /\.scss$/,
              exclude: /node_modules/,
              use: extractSass.extract({
                  use: [
                      {
                        loader: 'css-loader',
                        options: {
                          minimize: true
                        }
                      },
                      'postcss-loader',
                      'sass-loader'
                  ],
                  fallback: 'style-loader'
              })
            },
            {
              test: /\.jsx?$/,
              exclude: /node_modules/,
              loader: 'babel-loader'
            }
        ]
    },
    plugins: [
      extractSass,
      new BabiliPlugin()
    ]
}