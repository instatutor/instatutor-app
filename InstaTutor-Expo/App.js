import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from './src/components/Home.js'
import Login from './src/components/Login.js'

const AppNavigator = createStackNavigator ({
  Login: Login,
  Home: Home,
})

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {

  render() {
      return <AppContainer />;
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