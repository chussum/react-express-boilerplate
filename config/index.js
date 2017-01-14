const config = require('../config/config.json');
const nodeEnv = process.env.NODE_ENV || 'development';

module.exports = {
    secretKey: config.secretKey,
    maxVoteCount: (nodeEnv == 'development') ? 10000 : config.maxVoteCount,
    coinValue: config.coinValue,
    port: config.httpPort,
    devPort: config.httpPortDev,
    db: config[nodeEnv],
};
