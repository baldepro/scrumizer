const path = require('path')
const webpack = require('webpack')

// Defines common properties of js files loaders
let jsLoader = {
    test: /\.js$/,
    exclude: /node_modules/
}

let config = {
    entry: [
        'webpack-dev-server/client?http://127.0.0.1:8080',
        'webpack/hot/only-dev-server',
        './src/index.js'
    ],

    devtool: 'cheap-module-eval-source-map',

    module: {
        rules: [
            //{
            //         enforce: 'pre',
            //         ...jsLoader,
            //         use: ['eslint-loader']
            //     },
            {
                //...jsLoader,
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