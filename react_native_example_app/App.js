import React from 'react';

import { rehoc, setStates } from 'rehoc';
import userState from './states/user-state';
import Main from './components/Main';

class App extends React.Component {
  render() {
    return <Main />;
  }
}

setStates({
  userState
});

export default rehoc(App);
