# <img src='https://github.com/Wpdas/rehoc/raw/master/rehoc_logo_text.png' height='60' alt='Rehoc Logo' />

Rehoc is a tool to manage state container for React apps. It was first used in a React project being built totally thinking in its ecosystem. The work behind the scenes happens using the new Context API provided by React.

It helps you write applications that behave consistently, you can work in a simple and easy way by using Rehoc once that it's clear how to use and change states. Rehoc also has friendly error messages so it's easy to identify when something is wrong with the states.

It is tiny (4kB, including dependencies).

## Installation

To install the stable version:

```sh
npm install --save rehoc
```

This assumes you are using [npm](https://www.npmjs.com/) as your package manager.

### Example Apps (ReactJS & React Native)

- [ReactJS Example APP](https://github.com/Wpdas/rehoc/tree/master/example_app/src)
- [React Native Example APP](https://github.com/Wpdas/rehoc/tree/master/react_native_example_app)

### How to use

Rehoc has these main methods to be used: `{ rehoc, setStates, connect, updateState, getStore }`.

- `rehoc` - The main wrapper to start using this state management;
- `setStates` - Used to register initial States;
- `connect` - Used to connect Components to States (registeres before with `setStates`). You can connect the Component to one or more states. [See here](#multi-state);
- `updateState` - Used to update content in some registered State;
- `getStore` - Returns all States registered by `setStates` containing the most recent values.

Initializing and consuming Rehoc resources is very simple, you can create your states separated from the Component. Below are examples of how to use it, you can also check our example app:

```javascript
const userState = {
  firstName: 'Wenderson',
  lastName: 'Silva',
  picture: 'https://url.com/image.jpg'
};

export default userState;
```

Then, let's set our app up using Rehoc:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//Rehoc
import { setStates, rehoc } from 'rehoc';
import userState from './states/user/state';
import locationState from './states/location/state';

//Setting our states
setStates({
  userState,
  locationState
});

//Wrapping the Main App Component
const MyApp = rehoc(App);

ReactDOM.render(<MyApp />, document.getElementById('root'));
```

You must use `setStates({...})` to register all States the app will use. Be in mind that the name of states that you are passing to this method will be the name key to access them after. So, for example. Above we are registering `userState`, then, if I want to use this in some component, I need to call for the same name. You will see more about this in the next lines.

Now, you are able to access (I mean, change and consume) the data provided by states in any component with no need to pass this through other components. You will see 2 methods to do this below:

```jsx
import React from 'react';
import { connect } from 'rehoc';
import classes from './UserData.module.scss';

const userState = 'userState';

class UserData extends React.Component {
  render() {
    // Method One (version 1.3.0)
    // const { userState } = this.props;
    // const { firstName, lastName, picture } = userState;

    // Method Two (version 1.4.0 on)
    const { firstName, lastName, picture } = this.props;

    return (
      <div className={classes.UserData}>
        <span>
          Name: {firstName} {lastName}
        </span>
        <img src={picture} alt={firstName} />
      </div>
    );
  }
}

// Method One (version 1.3.0)
// export default connect(UserData);

// Method Two (version 1.4.0 onwards)
export default connect(
  UserData,
  userState
);
```

As mentioned, if you are using method one, you must to call for the same name key registered within `setStates({...})`, then, you will access all its properties. In the other hand, if you are using method two, you need to inform `connect()` method what main state it should connect.

When you choose to use method one (shown above), you need to get first the object state `userState`. This means that all the other States are accessible after `this.props`. So, we recommend you to use method two where you access only the State props related to this Component as shown above. But which way to use, it's up to you.

We can also change the state that we want by using `updateState(stateName, updatedObject)`:

```javascript
import { updateState } from 'rehoc';

onChangeFirstNameField = event => {
  updateState('userState', { firstName: event.target.value });
};
```

If you want extract a specific state to send this to some database somewhere, you can use the `getStore()` method. It will return all the States containing the most recent values.

```javascript
import { getStore } from 'rehoc';

/**
 * Return:
 * { firstName: 'Wenderson', lastName: 'Silva', picture:'https...'}
 **/
export const getUserData = () => {
  return getStore().userState;
};
```

We'd like to give you essential tips. These tips are to help you structure your project using Rehoc.

## Well to know & Tips

- The multi-state connection is supported from version 1.6.0 onwards. [See here](#multi-state);
- Using multi-state connection to get specifics states properties is better than call `getStore()` method;
- Use PureComponent or React.memo() as often as you can;
- React Native is supported from version 1.2.0 onwards;
- Avoid changing state properties that don't need to be changed;
- It's not possible to set new properties into states after Rehoc starts. You're able only to change its values;
- We strongly recommend to adopt this folder structure:

```
src/
├── components/
├── containers/
└── states/
    └── location/
        ├── actions.js
        ├── state.js
    └── user/
        ├── actions.js
        ├── state.js

```

You should set the initial properties and values for every State you need. And actions to do things that will affect the co-related States.

Lets suppose that the `userState` should be extracted in somewhere, for this, we can create an action that will expose user data:

```javascript
// action.js
import { getStore } from 'rehoc';

export const getUserData = () => {
  return getStore().userState;
};
```

Of course, you can use `getStore()` within some another component, but the best way to use this resource is into action files. Just to leave thing as much organized as we can.

- Create a const called `stateName` containing the name of the state you want to connect to the Component. By this way, you can access easily the content related to this State and also change its values.

```javascript
import React from 'react';
import { connect, updateState } from 'rehoc';

const userState = 'userState';

class UserData extends React.PureComponent {
  onServerResponse(response) {
    updateState(userState, { picture: response.data.picture });
  }

  render() {
    const { firstName } = this.props;

    return (
      <div>
        <p>User Name: {firstName}</p>
      </div>
    );
  }
}

export default connect(
  UserData,
  userState
);
```

### Multi-state

- From version 1.6.0 onwards, it's possible to connect a component to multiple states at once. This is better than call `getStore()`. The getStore method needs to check and get all the states, even those that you don't need to use.

```javascript
import React from 'react';
import { connect, updateState } from 'rehoc';

const userState = 'userState';
const addressState = 'addressState';

class UserData extends React.PureComponent {
  onServerResponse(response) {
    updateState(userState, { picture: response.data.picture });
    updateState(addressState, { street: response.data.street });
  }

  render() {
    // firstName from userState;
    // street from addressState;
    const { firstName, street } = this.props;

    return (
      <div>
        <p>User Name: {firstName}</p>
        <p>User Street Name: {street}</p>
      </div>
    );
  }
}

export default connect(
  UserData,
  [stateName, addressState] // multi-state
);
```

- Use actions to change or access data that are in another States. Let's suppose that I want to change the location value of some State called `locationState`, but we are into the user component. The user component is not connected to `locationState`. For reach this, we should create an action that will do this change for us. This actions, of course, should be into the `src/states/location` folder. See the example below:

```javascript
import React from 'react';
import { connect } from 'rehoc';
import * as locationStateActions from './states/location/actions';

const stateName = 'userState';

class UserData extends React.Component {
  // Change location
  onSelectUSA() {
    const newLocation = 'USA';
    locationStateActions.setLocation(newLocation);
  }
}

export default connect(
  UserData,
  stateName
);
```

And this would be our location action(.js file):

```javascript
import { updateState } from 'rehoc';

const stateName = 'locationState';

// Set new location
export const setLocation = newlocation => {
  updateState(stateName, { location: newlocation });
};
```

- Take a look in the [states](https://github.com/Wpdas/rehoc/tree/master/example_app/src/states) folder structure and files (Example App);
- Take a look in the [index.js](https://github.com/Wpdas/rehoc/tree/master/example_app/src/index.js) file (Example App);
- Take a look in the [App.js](https://github.com/Wpdas/rehoc/tree/master/example_app/src/App.js) file (Example App);
- Take a look in the [UserData.jsx](https://github.com/Wpdas/rehoc/tree/master/example_app/src/components/UserData/UserData.jsx) file (Example App);
- Take a look in the [actions.test.js](https://github.com/Wpdas/rehoc/tree/master/example_app/src/states/user/actions.test.js) file to see how to write tests for your action files (Example App);
- See through the Example App the way of testing the app, you can use Jest and Enzyme for that (Example App);

Example app working: [See the example app here.](https://github.com/Wpdas/rehoc/tree/master/example_app/src)

<img width="395" alt="screenshot 2019-01-27 at 06 54 51" src="https://user-images.githubusercontent.com/3761994/51798962-18088000-2202-11e9-8f25-340d2a57f999.png">

## Changelogs

### v1.6.0

- Performance was improved;
- `connect` method, now can connect multiples states to the same component. [See example here](#multi-state).

### v1.5.0

- Using the new ContextAPI;
- `updateState` method, now has only two parameters `updateState(stateName: string, updatedObject: any)`. The third one called `shouldComponentUpdate` is not being used anymore and it was deprecated since version 1.5.0.

## Logo

You can find the official logo [on GitHub](https://github.com/Wpdas/rehoc/raw/master/rehoc_logo.png).

## License

MIT
