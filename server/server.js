import config from '../config';
import routes from './routes';
import path from 'path';
import morgan from 'morgan';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

const port = config.port || 3000;
const secretKey = config.secretKey;
const app = express();

// if development
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
app.use(bodyParser.json());
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true
}));

app.secretKey = secretKey;
app.use('/api', routes);
app.use('/', express.static(__dirname + '/../public'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});
app.use((err, req, res, next) => {
    res.status(500).send('500 Error');
});

// init database tables
require('./models')
    .sequelize
    .sync({
        force: true
    })
    .then(function () {
        let server = app.listen(port, function(){
            console.log("Express server listening on port " + port);
        });
    });

export default module.exports = app;
