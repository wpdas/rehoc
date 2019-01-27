import React from 'react';
import ReactDOM from 'react-dom';
import { rehoc } from 'rehoc';
import App from './App';

// Init Rehoc with app states
import './tests/initRehoc';

describe('Init app using Rehoc', () => {
  it('Should init app without error.', () => {
    const TestApp = rehoc(App);
    const div = document.createElement('div');
    ReactDOM.render(React.createElement(TestApp), div);
  });
});
