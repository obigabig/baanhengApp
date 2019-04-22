import React, { Component } from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from '../../constants/Colors';
import { HeaderText } from '../StyledText';

class AppHeader extends Component {
    
  render() {
    return (
      <View style={[styles.container]}>
        <HeaderText style={{ paddingLeft: 5}}> {this.props.title} </HeaderText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10
  }
});

export default AppHeader;
