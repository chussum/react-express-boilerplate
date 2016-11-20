import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {App, Signin, Signup } from './containers';

const rootElement = document.getElementById('root');
ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Signin}/>
            <Route path="signin" component={Signin}/>
            <Route path="signup" component={Signup}/>
        </Route>
    </Router>,
    rootElement
);