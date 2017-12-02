const bootstrapEntryPoints = require('./webpack.bootstrap.config')
const path = require('path')
const webpack = require('webpack')
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const dev = process.env.NODE_ENV === 'dev'

let cssLoaders = [{
  loader: 'css-loader',
  options: {importLoaders: 1, minimize: !dev}
}]

if (!dev) {
  cssLoaders.push({
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
      plugins: (loaders) => {
        require('auto-prefixer')({
          browsers: ['last 2 versions', 'safari > 7, ie > 8']
        })
      }
    }
  })
}

let config = {
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:8081',
    'webpack/hot/only-dev-server',
    'bootstrap-loader',
    './src/templates/index.js'
  ],

  devtool: dev ? 'cheap-module-eval-source-map' : 'source-map',

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'standard-loader',
        exclude: /(node_modules|bower_components)/,
        options: { error: false, snazzy: true, parser: 'babel-eslint' }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
        // use: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: cssLoaders
        // })
      },
      {
        test: /\.(png|jpeg|gif)$/,
        use: ['file-loader']
      },
      { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000' },
      { test: /\.(ttf|eot)$/, loader: 'file-loader' },
      { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports-loader?jQuery=jquery' }
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

if (!dev) {
  // config.plugins.push(new UglifyJSPlugin({ sourceMap: true }))
  config.plugins.push(
      new CleanPlugin(['public'], {
        root: path.resolve('./'),
        verbose: true,
        dry: true
      })
  )
} else {
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
