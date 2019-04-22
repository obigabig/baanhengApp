import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import firebase from 'firebase';

import { ErrorText } from '../../components/StyledText';

class SignInScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Please sign in',
      headerRight: (
        <Button
          title="Sign up!"
          onPress={() => navigation.navigate('SignUp')}
        />
      )
    };
  };

  state = {
    email: '',
    password: '',
    error: null,
    loading: false
  };

  renderButton() {
    if (this.state.loading) {
      return<ActivityIndicator size={"small"} />
    }
    return (
      <Button title="Sign in" onPress={this._signInAsync} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.errorMessage && (
          <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>
        )}
        <Input
          label="email"
          placeholder="Enter email"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <Input
          label="password"
          placeholder="Enter password"
          secureTextEntry
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />   
        <ErrorText>
          {this.state.error}
        </ErrorText>
        {this.renderButton()}
      </View>
    );
  }

  onLoginSuccess() {
    this.setState({
      email: '', password: '', error: '', loading: false
    })
  }

  onLoginFailure(errorMessage) {   
    this.setState({ 
      error: errorMessage , 
      loading: false}
    ) 
  }

  _signInAsync = async () => {
    this.setState({ error: '', loading: true });
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;

        this.onLoginFailure.bind(this)(errorMessage);
        
      });

  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
});

export default SignInScreen;
