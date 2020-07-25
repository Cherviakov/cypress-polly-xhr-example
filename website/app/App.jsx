import React from 'react';
import superagent from 'superagent';

const App = () => {
  superagent.get('https://2ality.com/')
    .then(() => console.log('Done'))
    .catch(console.error);

  return (
    <h1>Hello world!</h1>
  );
}

export default App
