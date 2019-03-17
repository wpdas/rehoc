import React from 'react';
import ReactDOM from 'react-dom';

//Rehoc
import { setStates, rehoc } from 'rehoc';
import userState from './states/user/state';
import locationState from './states/location/state';

import './index.css';
import App from './App';

//Setting states
setStates({
  userState,
  locationState
});

//Wrapping the main App Component
const MyApp = rehoc(App);

ReactDOM.render(<MyApp />, document.getElementById('root'));
