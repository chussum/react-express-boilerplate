process.env.NODE_ENV = 'development';

var nodemon = require('nodemon');
nodemon('--exec ./node_modules/.bin/babel-node ./server/server.js --watch ./server');
nodemon.on('start', function () {
    console.log('\n[nodemon] App has started');
}).on('quit', function () {
    console.log('\n[nodemon] App has quit');
    process.exit(0);
}).on('restart', function (files) {
    console.log('\n[nodemon] App restarted due to:', files);
});