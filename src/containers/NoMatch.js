import React from 'react';

const NoMatch = ({ location }) => (
    <div>
        <h1>Whoops</h1>
        <p>Not Found {location.pathname}</p>
    </div>
);

export default NoMatch;