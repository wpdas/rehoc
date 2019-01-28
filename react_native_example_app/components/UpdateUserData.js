import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { connect, updateState } from 'rehoc';

const styles = StyleSheet.create({
  field: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 18,
    padding: 8,
    marginBottom: 8
  },
  view: {
    marginTop: 16
  },
  text: {
    fontSize: 18
  }
});

class UpdateUserData extends React.Component {
  onChangeFirstName = text => {
    updateState('userState', { firstName: text });
  };

  onChangeLastName = text => {
    updateState('userState', { lastName: text });
  };

  render() {
    const { firstName, lastName } = this.props.userState;
    return (
      <View style={styles.view}>
        <Text style={styles.text}>Edit first name: {firstName}</Text>
        <TextInput
          style={styles.field}
          onChangeText={this.onChangeFirstName}
          defaultValue={firstName}
          placeholder="First name"
        />
        <Text style={styles.text}>Edit last name:</Text>
        <TextInput
          style={styles.field}
          onChangeText={this.onChangeLastName}
          defaultValue={lastName}
          placeholder="Last name"
        />
      </View>
    );
  }
}

//Connecting to Rehoc
export default connect(UpdateUserData);
