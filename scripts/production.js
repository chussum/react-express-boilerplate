process.env.NODE_ENV = 'production';

require('babel-register');
require('../build/server');