import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

export default class Login extends React.Component {

  state = {
    username: '',
    password: '',
  }

  //Changes the username based on text inside TextInputs
  handleChangeText = (newText) => {
    this.setState((prevState) => {
      return {username: newText};
    });
  }

  render() {
      return (
        <View style={styles.container}>

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
          />

        	<Button
            onPress={
              () => this.props.navigation.navigate('Home', {
                username: this.state.username
              })
            }
            title="Log In"
            style={styles.logBtn}
            isDisabled={this.state.requiredFields}
          />

        </View>
     );
    }
  }

const styles = StyleSheet.create({
  //Styling for Background and ForeGround Elements
  container: {
    flex: 1,
    backgroundColor: '#00DEFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  //Styling for TextInputs
  input: {
  	alignItems: 'flex-start',
  	borderColor: '#000000',
  	borderWidth: 0.8,
  	borderRadius: 5,
  	overflow: 'hidden',
  	backgroundColor: '#eeeeee',
  	width: 200,
  	height: '0',
  	padding: 10,
  	marginTop: 10,
  },
});
