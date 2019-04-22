import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import AppHeader from '../../components/header/AppHeader';
import { Button } from 'react-native-elements';
import firebase from 'firebase';
import { Google } from 'expo';

import { ErrorText } from '../../components/StyledText';

class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <AppHeader
          title={__DEV__ ? 'MENU MANAGER (Dev Mode)' : 'MENU MANAGER'}
          navigationProps={navigation}
        />
      )
    };
  };

  state = {
    error: null,
    loading: false
  };

  componentDidMount() {}

  onLogOutSuccess() {
    this.setState({
      error: '', loading: false
    })
  }

  onLogOutFailure(errorMessage) {   
    this.setState({ 
      error: errorMessage , 
      loading: false}
    ) 
  }
  _onSignOutPress = () => {

    this.setState({ error: '', loading: true });
    
    firebase
      .auth()
      .signOut()
      .then(
        // Sign-out successful.
        this.onLogOutSuccess.bind(this)
      )
      .catch(function(errorMessage) {
        // An error happened.
        this.onLogOutFailure.bind(this)(errorMessage);
      });
  };

  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator size={'small'} />;
    }
    return (
      <Button title="Sign out" type="solid" onPress={this._onSignOutPress} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>email: {this.props.user && this.props.user.name}</Text>
          <Text>email: {this.props.user && this.props.user.picture}</Text>
          <Text>email: {this.props.user && this.props.user.email}</Text>
          <Text>role: {this.props.user && this.props.user.role}</Text>
        </View>
        <ErrorText>{this.state.error}</ErrorText>
        {this.renderButton()}
        <View />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    paddingTop: 5
  }
});

function mapStateToProps({ user }) {
  return { user: user };
}

export default connect(mapStateToProps)(ProfileScreen);
