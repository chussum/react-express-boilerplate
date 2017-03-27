import './hook';
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import routes from '../src/routes';
import path from 'path';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import api from './routes';
import dotenv from 'dotenv';
dotenv.config();

const isDev = (process.env.NODE_ENV == 'development');
const title = process.env.TITLE;
const port = process.env.PORT;
const app = express();

if (!port) {
    console.error('please rename config file and then edit the file. (.envcpy to .env)');
    process.exit(0);
}

if (isDev) {
    console.log('Server is running on development mode');

    let config = require('../webpack.config.dev');
    let compiler = webpack(config);
    let devPort = process.env.DEVPORT;
    let devServer = new webpackDevServer(compiler, config.devServer);
    devServer.listen(devPort, () => {
        console.log('webpack-dev-server is listening on port', devPort);
    });
    app.use(morgan('dev'));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', api);
app.use('/', express.static(path.join(__dirname, '..', 'public')));
app.get('*', (req, res) => {
    const context = {};
    const html = ReactDOMServer.renderToString(
        <StaticRouter
            location={req.url}
            context={context}
        >
            {routes}
        </StaticRouter>
    );
    if (context.url) {
        res.redirect(301, context.url);
    } else {
        let content = !isDev && html;
        res.render(path.resolve(__dirname, '..', 'src', 'index.pug'), {
            TITLE: title,
            CONTENT: content
        });
    }
});
app.use((err, req, res) => {
    res.status(500).send('500 Error');
});
app.listen(port, () => {
    console.log('Express server listening on port ' + port);
});
