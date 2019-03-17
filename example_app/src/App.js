import React, { Component } from 'react';
import { updateState, connect } from 'rehoc';
import * as userStateActions from './states/user/actions';
import Header from './components/Header/Header';
import './App.css';

import * as locationStateActions from './states/location/actions';

const stateName = 'userState';

class App extends Component {
  onChangeFirstNameField = event => {
    updateState(stateName, { firstName: event.target.value });
  };

  onChangeLastNameField = event => {
    updateState(stateName, { lastName: event.target.value });
  };

  onClickExtractUserData = () => {
    // You can also call actions related to the State connected to this Component
    console.log(userStateActions.getUserData());
  };

  render() {
    // Using data provided by the state linked to this Component
    const { firstName, lastName } = this.props;

    // Always use actions when you need to get data from another state
    const { location, city } = locationStateActions.getLocation();

    return (
      <div className="App">
        <header className="App-header">
          <Header />
          <p className="localization">
            You are located in: {location} / {city}
          </p>

          <input
            className="fields"
            name="firstName"
            type="text"
            placeholder="First name"
            defaultValue={firstName}
            onChange={this.onChangeFirstNameField}
          />

          <br />

          <input
            className="fields"
            name="lastName"
            type="text"
            placeholder="Last name"
            defaultValue={lastName}
            onChange={this.onChangeLastNameField}
          />

          <br />

          <input
            type="button"
            className="Button"
            value="Extract User Data"
            onClick={this.onClickExtractUserData}
          />
        </header>
      </div>
    );
  }
}

export default connect(
  App,
  stateName
);
