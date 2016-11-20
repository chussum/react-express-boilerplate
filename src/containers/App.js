import React from 'react';
import { BrowserRouter as Router, Match, Miss, Link } from 'react-router';
import NoMatch from './NoMatch';

const App = () => (
     <Router>
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
            <hr/>
            <Match exactly pattern="/" component={Home} />
            <Match pattern="/about" component={About} />
            <Miss component={NoMatch}/>
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