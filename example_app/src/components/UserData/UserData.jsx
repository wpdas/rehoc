import React from 'react';
import { connect } from 'rehoc';
import classes from './UserData.module.scss';

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

export default connect(UserData);
