const nodeEnv = process.env.NODE_ENV || 'development';
const environments = {
    production: {
        port: 7777,
        db: {
            username: 'root',
            password: '',
            database: 'node_api'
        }
    },
    development: {
        port: 7777,
        devPort: 7778,
        db: {
            username: 'root',
            password: '',
            database: 'node_api'
        }
    },
    test: {
        port: 7779,
        db: {
            username: 'root',
            password: '',
            database: 'node_api'
        }
    }
};

module.exports = environments[nodeEnv];