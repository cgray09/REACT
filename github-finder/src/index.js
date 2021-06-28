import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// says we want to render our App in the "root" or index.html
// index.html is how we render a single page app (its the dom)
ReactDOM.render(<App />, document.getElementById('root'));
