const path = require('path')
const webpack = require('webpack')

// Defines common properties of js files loaders
// let jsLoader = {
//   test: /\.js$/,
//   exclude: /node_modules/
// }

let config = {
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:8080',
    'webpack/hot/only-dev-server',
    './src/templates/index.js'
  ],

  devtool: 'cheap-module-eval-source-map',

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'standard-loader',
        exclude: /(node_modules|bower_components)/,
        options: {
          error: false,
          snazzy: true,
          parser: 'babel-eslint'
        }
      },
      {
        // ...jsLoader,
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    hot: true,
    open: true,
    proxy: {
      '*': 'http://localhost:3000'
    }
  },

  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'public')
  }
}

module.exports = config
