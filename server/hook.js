const assetHook = require('asset-require-hook');
const cssHook = require('css-modules-require-hook');
const lessParser = require('postcss-less').parse;

assetHook({
    extensions: ['ico', 'png', 'jpg', 'jpeg', 'gif', 'svg', 'ttf', 'eot', 'woff', 'woff2'],
    name: 'img/[name].[ext]',
    limit: 10000
});

cssHook({
    extensions: '.less',
    processorOpts: {
        parser: lessParser
    }
});
