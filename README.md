# <img src='https://github.com/Wpdas/rehoc/raw/master/rehoc_logo_text.png' height='60' alt='Rehoc Logo' />

Rehoc is a tool to manage state container for React apps. It was first used in a React project being built totally thinking in its ecosystem.

It helps you write applications that behave consistently, you can work in a simple and easy way by using Rehoc once that it's clear how to use and change states. This is using the most updated Context API.

It is tiny (3kB, including dependencies).

## Installation

To install the stable version:

```sh
npm install --save rehoc
```

This assumes you are using [npm](https://www.npmjs.com/) as your package manager.

### How to use

Below are examples of how to use the Rehoc, you can also check our example app.

Initializing and consuming Rehoc resources is very simple, you can create your states separated from the Component code as shown below:

```javascript
User State -> ../src/states/user-state.js

const state = {
  firstName: 'Wenderson',
  lastName: 'Silva',
  picture: 'https://url.com/image.jpg'
};

export default state;
```

```javascript
Location State -> ../src/states/location-state.js

const state = {
  location: 'Brazil',
  city: 'Belo Horizonte'
};

export default state;
```

Then, let's set our app up using Rehoc:

```jsx
Index -> ../src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//Rehoc
import { setStates, rehoc } from 'rehoc';
import userState from './states/user-state';
import locationState from './states/location-state';

//Setting our states
setStates({
  userState,
  locationState
});

//Wrapping the Main App Component
const MyApp = rehoc(App);

ReactDOM.render(<MyApp />, document.getElementById('root'));
```

Now, you are able to access (I mean, change and consume) the data provided by states in any component with no need to pass this through other components:

```jsx
UserData Component -> ../src/components/UserData/UserData.jsx

import React from 'react';
import { connect } from 'rehoc';

//Consuming data provided by state. (this "userState" is the same provided here: Index -> ../src/index.js)
const UserData = ({ userState }) => {
  const { firstName, lastName, picture } = userState;
  return (
    <div>
      <span>
        Name: {firstName} {lastName}
      </span>
      <img src={picture} alt={firstName} />
    </div>
  );
};

//Connecting Rehoc
export default connect(UserData);
```

We can also change the state that we want, let's see this as well:

```javascript
App Component -> ../src/App.jsx (only part of the code, see the example project)

//...
import { updateState, connect } from 'rehoc';
//...

onChangeFirstNameField = event => {
  //Changing specific state by passing the object name (this "userState" is the same provided here: Index -> ../src/index.js)
  updateState('userState', { firstName: event.target.value });
};

onChangeLastNameField = event => {
  updateState('userState', { lastName: event.target.value });
};

render() {
    const { firstName, lastName } = this.props.userState;
    const { location, city } = this.props.locationState;
    //...
}

export default connect(App);
```

How about whether we want extract a specific state to send this to some database somewhere?

```javascript
(Extract user data service) -> ../src/utils/userData.js

import { getStore } from 'rehoc';

export const extractData = () => {
  return getStore().userState;
  /**
   * Return:
   * { firstName: 'Wenderson', lastName: 'Silva', picture:'https...'}
   **/
};
```

All of this is only about the first ish version of this lib. We'll still work to create new features. Be free to leave your opinion, bug fixes, sending PR and to be part of this project.

Through the Example App is possible to see a way of testing the app, you can use Jest and Enzyme for that.

Example app working: [See the example app here.](https://github.com/Wpdas/rehoc/tree/master/example_app/src)

<img width="395" alt="screenshot 2019-01-27 at 06 54 51" src="https://user-images.githubusercontent.com/3761994/51798962-18088000-2202-11e9-8f25-340d2a57f999.png">

## Logo

You can find the official logo [on GitHub](https://github.com/Wpdas/rehoc/raw/master/rehoc_logo.png).

## License

MIT
