import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import config from '../config';
import users from './routes/users';

const port = config.port || 3000;
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/../public'));
app.use('/users', users);
app.get('/hello', (req, res) => {
    return res.send('HELLO WORLD');
});
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});
app.listen(port, () => {
    console.log('Express listening on port', port);
});

require('/models/user').sequelize.sync({ force: true }).then(() => {
    console.log('DB sync: User');
});

export default app;
