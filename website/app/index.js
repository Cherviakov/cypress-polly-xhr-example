import React from 'react';
import { render } from 'react-dom';
import superagent from 'superagent';
import App from './App.jsx';

window.superagent = superagent;

render(
  <App />,
  document.getElementById('root')
);
