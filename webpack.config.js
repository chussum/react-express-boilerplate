const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    plugins: [
        new ExtractTextPlugin('www.css', {
            allChunks: false
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: [
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
