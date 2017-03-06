const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: [
        './src/client.js'
    ],
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'www.css',
            allChunks: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            output: {
                comments: false,
            }
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: [
                        'transform-decorators-legacy',
                        'transform-class-properties'
                    ]
                }
            },
            {
                test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'url-loader',
                options: {
                    name: 'assets/[hash].[ext]',
                    limit: 10000,
                },
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css-loader'),
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('css-loader!postcss-loader!less-loader'),
                exclude: /node_modules/
            }
        ]
    }
};
