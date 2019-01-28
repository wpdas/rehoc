import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { connect } from 'rehoc';
import UserData from '../components/UserData';
import UpdateUserData from '../components/UpdateUserData';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class Main extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <UserData />
        <UpdateUserData />
      </View>
    );
  }
}

export default connect(Main);
