import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

export default class Home extends React.Component {

  render() {
    //Acquires the data from TextInput to display the username
    const username = this.props.navigation.getParam('username', 'No User Provided');
    const error = this.props.navigation.getParam('errorText', '');
      return (
        <View style={styles.container}>
        	<Text style={styles.welcome}>{username == '' ? 'No User Provided' : username}</Text>
        </View>
     );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00DEFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
  	fontSize: 20,
  },
});
