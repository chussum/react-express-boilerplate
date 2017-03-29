import React from 'react'
import Route from 'react-router-dom/Route';
import Redirect from 'react-router-dom/Redirect';
import Switch from 'react-router-dom/Switch';
import Link from 'react-router-dom/Link';
import Home from './container/Home';
import About from './container/About';

export default (
    <div>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
        </ul>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Switch>
            <Redirect from="/home" to="/"/>
        </Switch>
    </div>
);