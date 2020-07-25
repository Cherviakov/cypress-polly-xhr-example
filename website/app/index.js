import React from 'react';
import { render } from 'react-dom';
import { Polly } from '@pollyjs/core';
import XHRAdapter from '@pollyjs/adapter-xhr';
import FetchAdapter from '@pollyjs/adapter-fetch';
import RESTPersister from '@pollyjs/persister-rest';
import superagent from 'superagent';
import App from './App.jsx';

Polly.register(XHRAdapter);
Polly.register(FetchAdapter);
Polly.register(RESTPersister);
window.polly = new Polly('Cypress-Test', {
  adapters: ['xhr','fetch'],
  adapterOptions: {
    xhr: {
      context: window,
    },
    fetch: {
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
window.superagent = superagent;

window.addEventListener('beforeUnload', () => {
  window.polly.stop().catch(console.error);
});

render(
  <App />,
  document.getElementById('root')
);
