import React from 'react';
import { connect } from 'rehoc';
import classes from './UserData.module.scss';

const stateName = 'userState';

class UserData extends React.Component {
  render() {
    // Method One (until version 1.3.0)
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

// Method One (until version 1.3.0)
// export default connect(UserData);

// Method Two (version 1.4.0 on)
export default connect(
  UserData,
  stateName
);
