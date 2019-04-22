import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import firebase from 'firebase';

import { ErrorText } from '../../components/StyledText';

class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign Up!'
  };

  state = {
    email: '',
    password: '',
    error: null,
    loading: false
  };

  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator size={'small'} />;
    }
    return <Button title="Sign up!" onPress={this._signUpAsync} />;
  }

  render() {
    return (
      <View style={styles.container}>
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
        <ErrorText>{this.state.error}</ErrorText>
        {this.renderButton()}
      </View>
    );
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false
    });
  }

  onLoginFailure(errorMessage) {
    this.setState({
      error: errorMessage,
      loading: false
    });
  }

  _signUpAsync = async () => {
    this.setState({ error: '', loading: true });
    const { email, password } = this.state;

    try {

      let res = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

        let res2 =   await firebase
        .database()
        .ref('users/' + res.user.uid)
        .set({
          email: email,
          role: 'admin'
        });

      this.onLoginSuccess.bind(this);

    } catch (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        this.onLoginFailure.bind(this)('Weak password!');
      } else {
        this.onLoginFailure.bind(this)(errorMessage);
      }
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});

export default SignUpScreen;
