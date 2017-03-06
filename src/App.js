import React from 'react';
import { Link } from 'react-router';
import './_/css/common.less';

class App extends React.Component {
    render() {
        return (
            <div>
                <Link to={'/'} className="menu-item">Index</Link>
                <Link to={'/about'} className="menu-item">About</Link>
                {this.props.children}
            </div>
        );
    }
}

export default App;