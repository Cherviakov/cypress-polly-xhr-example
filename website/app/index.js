import React from 'react';
import { render } from 'react-dom';
import { Polly } from '@pollyjs/core';
import XHRAdapter from '@pollyjs/adapter-xhr';
import RESTPersister from '@pollyjs/persister-rest';
import superagent from 'superagent';
import App from './App.jsx';

// second way to use
/* if (window.Cypress) {
  Polly.register(XHRAdapter);
  Polly.register(RESTPersister);
  window.polly = new Polly(window.testName, {
    adapters: ['xhr'],
    adapterOptions: {
      xhr: {
        context: window,
      },
    },
    persister: ['rest'],
    persisterOptions: {
      rest: {
        host: 'http://localhost:3002'
      }
    },
  });
} */

window.superagent = superagent;

render(
  <App />,
  document.getElementById('root')
);
