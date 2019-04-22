import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import ignoreWarnings from 'react-native-ignore-warnings';

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    ignoreWarnings('Setting a timer');
  }

  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = async () => {
    await firebase.auth().onAuthStateChanged(user => {
      console.log('AUTH STATE CHANGED CALLED ');
      if (user) {
        firebase
          .auth()
          .currentUser.getIdToken(true)
          .then(accessToken => {
            this.props.signInAction(
              accessToken,
              () => {
                this.props.navigation.navigate('Main');
              },
              () => {
                //if error do sign out.
                firebase
                  .auth()
                  .signOut()
                  .then(response => {
                    this.props.signOutAction(() =>
                      this.props.navigation.navigate('Auth')
                    );
                  });
              }
            );
          });

        

      } else {
        this.props.navigation.navigate('Auth');
      }
    });
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default connect(
  null,
  actions
)(AuthLoadingScreen);
