import './hook';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import routes from '../src/routes';
import path from 'path';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import api from './routes';

require('dotenv').config();

const isDev = (process.env.NODE_ENV == 'development');
const port = process.env.PORT;
const ogTitle = process.env.OG_TITLE;
const ogDescription = process.env.OG_DESCRIPTION;
const ogImage = process.env.OG_IMAGE;
const title = process.env.TITLE;
const app = express();

// require config setting
if (!port) {
    console.error('please rename config file and then edit the file. (.envcpy to .env)');
    process.exit(0);
}

// for HMR and etc.. using webpack dev server
if (isDev) {
    let config = require('../webpack.config.dev');
    let compiler = webpack(config);
    let devPort = process.env.DEV_PORT;
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
    let context = {};
    let html = ReactDOMServer.renderToString(
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
        res.render(path.resolve(__dirname, '..', 'src', 'index.pug'), {
            OG_TITLE: ogTitle,
            OG_DESCRIPTION: ogDescription,
            OG_IMAGE: ogImage,
            TITLE: title,
            CONTENT: html,
            DEVELOPMENT: isDev
        });
    }
});
app.use((err, req, res) => {
    res.status(500).send('500 Error');
});
app.listen(port, () => {
    console.log('express server listening on port ' + port);
});
