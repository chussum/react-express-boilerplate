const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const port = config.port;
const devPort = config.devPort;

module.exports = {
    entry: [
        './src/index.js',
        './src/style.css',
        'webpack-dev-server/client?http://0.0.0.0:' + devPort,
        'webpack/hot/only-dev-server'
    ],
    output: {
        path: '/',
        filename: 'bundle.js'
    },
    devServer: {
        hot: true,
        filename: 'bundle.js',
        publicPath: '/',
        historyApiFallback: true,
        contentBase: './public',
        proxy: {
            "**": 'http://localhost:' + port
        }
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: ["react-hot-loader/babel"]
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css-loader'
            }
        ]
    }
};
