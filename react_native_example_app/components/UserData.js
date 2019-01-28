import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { connect } from 'rehoc';

const styles = StyleSheet.create({
  picture: {
    width: 140,
    height: 140,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 100,
    marginBottom: 16
  },
  text: {
    fontSize: 18
  }
});

const UserData = ({ userState }) => {
  const { firstName, lastName, picture } = userState;
  return (
    <View>
      <Image
        style={styles.picture}
        source={{
          uri: picture
        }}
      />
      <Text style={styles.text}>
        Name: {firstName} {lastName}
      </Text>
    </View>
  );
};

//Connecting to Rehoc
export default connect(UserData);
