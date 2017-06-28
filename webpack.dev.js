
const path = require('path')

module.exports = {
    devtool: 'source-map',
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
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    devServer: {
      contentBase: path.join(__dirname, "./www")
    }
}