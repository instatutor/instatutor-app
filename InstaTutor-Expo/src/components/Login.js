import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

export default class Login extends React.Component {

  state = {
    username: '',
    password: '',
  }

  render() {
      return (
        <View style={styles.container}>
        	<TextInput placeholder="Username: " style={styles.input} />
        	<TextInput placeholder="Password: " style={styles.input} />
        	<Button
            onPress={
              () => this.props.navigation.navigate('Home', {
                username: "Sri"
              })
            }
            title="Log In"
          />
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
  input: {
  	alignItems: 'flex-start',
  	borderColor: '#000000',
  	borderWidth: 0.8,
  	borderRadius: 2,
  	overflow: 'hidden',
  	backgroundColor: '#eeeeee',
  	width: 200,
  	height: '4%',
  	padding: 10,
  	marginTop: 10,
  },
  welcome: {
  	justifyContent: 'center',
  	alignItems: 'center',
  	flex: 1,
  	fontSize: 40,
  },
});
