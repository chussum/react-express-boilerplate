import React from 'react';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import HashRouter from 'react-router-dom/HashRouter';
import routes from './routes';

const Router = history.pushState ? BrowserRouter : HashRouter;

class App extends React.Component {
    render() {
        return (
            <Router>
                {routes}
            </Router>
        );
    }
}

export default App;