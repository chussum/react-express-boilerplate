import path from 'path';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import config from '../config';

const port = config.port || 3000;
const secretKey = global.secretKey;
const app = express();

if (process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');

    let devPort = config.devPort;
    let devConfig = require('../webpack.dev.config');
    let compiler = webpack(devConfig);
    let devServer = new WebpackDevServer(compiler, devConfig.devServer);
    devServer.listen(devPort, () => {
        console.log('webpack-dev-server is listening on port', devPort);
    });
}

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());/* use session */
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true
}));
app.use('/', express.static(__dirname + '/../public'));
app.use('/', require('./routes'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

/* handle error */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('THROWS ERROR');
});

require('./models')
    .sequelize
    .sync({
        force: true
    })
    .then(function () {
        app.listen(port, () => {
            console.log('Express listening on port', port);
        });
    });

export default module.exports = app;
