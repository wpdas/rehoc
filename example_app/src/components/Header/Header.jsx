import React from 'react';
import UserData from '../UserData/UserData';
import classes from './Header.module.scss';

const Header = () => {
  return (
    <div className={classes.Header}>
      <UserData />
    </div>
  );
};

export default Header;
