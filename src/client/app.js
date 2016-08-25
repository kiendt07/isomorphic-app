import React from 'react';
import ReactDOM from 'react-dom';
import Foobar from '../shared/components/Foobar.react';

// Initial state that passed from server
let initialState = JSON.parse(document.getElementById('initial-state').innerHTML);

// Render the components, pick up where React left off on the server
ReactDOM.render(<Foobar {...initialState}/>, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
