import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

export default class Home extends React.Component {

  render() {

    const username = this.props.navigation.getParam('username', 'No User Provided')
      return (
        <View style={styles.container}>
        	<Text style={styles.welcome}>Welcome {username}!</Text>
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
  	justifyContent: 'center',
  	alignItems: 'center',
  	flex: 1,
  	fontSize: 40,
  },
});
