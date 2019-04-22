import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const type = 'MaterialIcons';

export class NormalIcon extends React.Component {
  render() {
    return (
      <View style={styles.icon} >
        <Icon {...this.props} type={type} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    marginLeft: 10,
    marginRight: 10
  }
});
