import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import routes from './routes'
import AppContainer from 'react-hot-loader/lib/AppContainer';

ReactDOM.render(
    <AppContainer>
        <Router routes={routes} history={browserHistory}/>
    </AppContainer>,
    document.getElementById('app')
);

if (module && module.hot) {
    module.hot.accept(() => {
        ReactDOM.render(
            <AppContainer>
                <Router routes={routes} history={browserHistory}/>
            </AppContainer>,
            document.getElementById('app')
        );
    });
}