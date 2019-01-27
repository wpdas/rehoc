import React from 'react';
import { connect } from 'rehoc';
import classes from './UserData.module.scss';

//Consuming data provided by state. (this "userState" is the same provided here: Index -> ../src/index.js)
const UserData = ({ userState }) => {
  const { firstName, lastName, picture } = userState;
  return (
    <div className={classes.UserData}>
      <span>
        Name: {firstName} {lastName}
      </span>
      <img src={picture} alt={firstName} />
    </div>
  );
};

//Connecting to Rehoc
export default connect(UserData);
