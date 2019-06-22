import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from './src/components/Home.js'
import Login from './src/components/Login.js'

//App Navigator handles navigation between Apps
const AppNavigator = createStackNavigator ({
  Login: Login,
  Home: Home,
})

//Used to display and use AppNavigator
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {

  render() {
    return <AppContainer />;
  }
}
