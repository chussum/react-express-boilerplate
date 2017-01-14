const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const port = config.port;
const devPort = config.devPort;

module.exports = {
    devtool: 'inline-source-map',
    entry: [
        './src/index.js',
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
            "**": 'http://127.0.0.1:' + port
        }
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('www.css', {
            allChunks: false
        })
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
                    plugins: [
                        'react-hot-loader/babel',
                        'transform-decorators-legacy',
                        'transform-class-properties'
                    ]
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader'),
                exclude: /node_modules/
            }
        ]
    }
};
