import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from 'react-hot-loader/lib/AppContainer';
import App from './App';
import "./_/css/common.less";

ReactDOM.render(
    <AppContainer>
        <App/>
    </AppContainer>,
    document.getElementById('app')
);

module.hot && module.hot.accept();
