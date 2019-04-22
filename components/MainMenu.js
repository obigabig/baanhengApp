import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View
} from 'react-native';
import { Icon, Card } from 'react-native-elements';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { WebBrowser } from 'expo';

class MainMenu extends React.Component {
  renderMenuItem() {
    //onPress={() => {this.props.navigation.navigate(screen)}}

    return this.props.menuList.map(menuItem => {
      const { name, icon, iconType, screen } = menuItem;
      return (
        <TouchableOpacity 
          key={name} 
          style={styles.cardItem}
          onPress={() => this.props.onMenuPress(screen)}
        >
          <Icon
            reverse
            name={icon}
            type={iconType}
            color={Colors.mainColor}
          />
          <Text>{menuItem.name}</Text>
        </TouchableOpacity>
      );
    });
  }

  render() {
    return <View style={styles.container}>{this.renderMenuItem()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    width: Layout.window.width
  },
  cardItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    width: Layout.window.width - 10,
    borderWidth: 1,
    borderColor: 'gray',
    height: 70
  }
});

export default MainMenu;
