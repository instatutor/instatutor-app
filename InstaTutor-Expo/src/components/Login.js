import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

export default class Login extends React.Component {

  state = {
    username: '',
    password: '',
    errorText: ''
  }

  //Changes the username based on text inside TextInputs
  handleChangeText = (newText) => {
    this.setState((prevState) => {
      return {username: newText};
    });
  }

  checkIfUsername = () => {
    if (this.state.username == '') {
      this.setState((prevState) => {
        return {errorText: 'You didn\'t enter a username'};
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logContainer}>
          <TextInput
            placeholder="Username: "
            style={styles.input}
            onChangeText = {this.handleChangeText}
            defaultValue={this.state.username}
            textContentType='username'
          />

        	<TextInput
            placeholder="Password: "
            style={styles.input}
            textContentType='password'
            secureTextEntry={true}
          />

          <TouchableOpacity
            onPress={
              () => this.props.navigation.navigate('Home', {
                username: this.state.username,
                errorText: this.state.errorText
              })
            }
            isDisabled={this.state.requiredFields}
          >
            <Text style={styles.logBtn}>Log In</Text>
          </TouchableOpacity>
        </View>

          <TouchableOpacity
            onPress = {
              () => this.props.navigation.navigate('Registration')
            }
          >
            <Text style={styles.registerBtn}>New? Sign Up!</Text>
          </TouchableOpacity>
        </View>
     );
    }
  }

const styles = StyleSheet.create({
  //Styling for Background and ForeGround Elements
  container: {
    flex: 1,
    backgroundColor: '#00A3CB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  //Styling for TextInputs
  input: {
  	alignItems: 'center',
    justifyContent: 'center',
  	borderColor: '#000000',
  	borderWidth: 0.8,
  	borderRadius: 5,
  	overflow: 'hidden',
  	backgroundColor: '#eeeeee',
  	width: 200,
  	padding: 10,
  	marginTop: 10,
  },
  logContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  //Styling for Login Button
  logBtn: {
    backgroundColor: '#015266',
    borderColor: 'white',
    borderWidth: 1.5,
    color: 'white',
    width: 150,
    padding: 10,
    marginTop: 15,
    borderRadius: 2,
    overflow: 'hidden',
    textAlign: 'center',
    justifyContent: 'center',
  },
  //Styling for Registration Button
  registerBtn: {
    justifyContent: 'flex-end',
    marginBottom: 50,
    textDecorationLine: 'underline',
    fontSize: 17,
  },
});
