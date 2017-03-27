import './hook';
import path from 'path';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import api from './routes';
import routes from '../src/routes';
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
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
    match({routes: routes, location: req.url}, (err, redirect, props) => {
        if (err) {
            res.status(500).send(err.message)
        } else if (redirect) {
            res.redirect(302, redirect.pathname + redirect.search)
        } else if (props) {
            res.status(200).render(path.resolve(__dirname, '..', 'src', 'index.pug'), {
                TITLE: title,
                CONTENT: !isDev && renderToString(<RouterContext {...props} />)
            });
        } else {
            res.status(404).send('Not found')
        }
    })
});
app.use((err, req, res) => {
    res.status(500).send('500 Error');
});
app.listen(port, () => {
    console.log('Express server listening on port ' + port);
});
