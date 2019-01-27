import React, { Component } from 'react';
import { updateState, connect } from 'rehoc';
import * as userData from './utils/userData';
import Header from './components/Header/Header';
import './App.css';

class App extends Component {
  onChangeFirstNameField = event => {
    updateState('userState', { firstName: event.target.value });
  };

  onChangeLastNameField = event => {
    updateState('userState', { lastName: event.target.value });
  };

  onClickExtractUserData = () => {
    console.log(userData.extractData());
  };

  render() {
    const { firstName, lastName } = this.props.userState;
    const { location, city } = this.props.locationState;

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

export default connect(App);
