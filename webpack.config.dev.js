const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

require('dotenv').config();

process.noDeprecation = true;

module.exports = {
    devtool: '#source-map',
    entry: [
        // activate HMR for React
        'react-hot-loader/patch',

        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        `webpack-dev-server/client?http://0.0.0.0:${process.env.DEV_PORT}`,

        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        'webpack/hot/only-dev-server',

        // the entry point of our app
        './src/client.js'
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
            "**": `http://127.0.0.1:${process.env.PORT}`
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
        new ExtractTextPlugin({
            filename: 'www.min.css',
            allChunks: false
        })
    ],
    module: {
        rules: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: [
                        'react-hot-loader/babel',
                        'transform-decorators-legacy',
                        'transform-class-properties'
                    ]
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(ico|png|jpe?g|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'url-loader',
                options: {
                    name: 'assets/[hash].[ext]',
                    limit: 10000
                },
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css-loader?sourceMap'),
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('css-loader?sourceMap!postcss-loader?sourceMap!less-loader?sourceMap'),
                exclude: /node_modules/
            }
        ]
    }
};
