const environments = {
    production: {
        port: 7777,
        db: {
            username: 'root',
            password: '',
            database: 'node_api',
            host: 'localhost',
            port: 3306,
            dialect: 'mariadb',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        }
    },
    development: {
        port: 7777,
        devPort: 7778,
        db: {
            username: 'root',
            password: '',
            database: 'node_api',
            host: 'localhost',
            port: 3306,
            dialect: 'mariadb',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        }
    },
    test: {
        port: 7779,
        db: {
            username: 'root',
            password: '',
            database: 'node_api',
            host: 'localhost',
            port: 3306,
            dialect: 'mariadb',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        }
    }
};
const nodeEnv = process.env.NODE_ENV || 'development';
global.secretKey = 'iluvhyungdewdewdewkwon';
module.exports = environments[nodeEnv];
