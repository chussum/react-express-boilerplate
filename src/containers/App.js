import React from 'react';
import Router from 'react-router/BrowserRouter';
import Match from 'react-router/Match';
import MatchGroup from 'react-router/MatchGroup';
import Miss from 'react-router/Miss';
import Link from 'react-router/Link';
import NoMatch from './NoMatch';
import '../_/common.less';

const App = () => (
    <Router>
        <div>
            <h1>BASIC</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
            <hr/>
            <MatchGroup>
                <Match exactly pattern="/" component={Home} />
                <Match pattern="/about" component={About} />
                <Miss component={NoMatch}/>
            </MatchGroup>
        </div>
    </Router>
);

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
);

const About = () => (
    <div>
        <h2>About</h2>
    </div>
);

export default App;