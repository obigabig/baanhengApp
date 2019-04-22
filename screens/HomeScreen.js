import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { WebBrowser } from 'expo';
import MainMenu from '../components/MainMenu';
import AppHeader from '../components/header/AppHeader';

const MENU_LIST = [
  {
    name: 'Menu Status',
    screen: 'MenuStatusStack',
    icon: 'ios-list-box',
    iconType: 'ionicon'
  },
  {
    name: 'Add/Edit menu',
    screen: 'ManageMenuListStack',
    icon: 'ios-add-circle',
    iconType: 'ionicon'
  }
];

export default class HomeScreen extends React.Component {

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

  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <MainMenu
            menuList={MENU_LIST}
            onMenuPress={screen => this.props.navigation.navigate(screen)}
          />
        </ScrollView>
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
