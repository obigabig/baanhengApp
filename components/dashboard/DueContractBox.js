import React, { Component } from 'react';
import _ from 'lodash';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { HeaderText } from '../StyledText';
import { NormalIcon } from '../Icon';
import color from '../../constants/Colors';
import DueContractCard from './DueContractCard';
import Layout from '../../constants/Layout';

import Accordion from 'react-native-collapsible/Accordion';
import Colors from '../../constants/Colors';

class DueContractBox extends Component {
  state = {
    activeSections: []
  };

  _renderSectionTitle = section => {
    return (
      <View style={styles.content}>
        <Text />
      </View>
    );
  };

  _renderHeader = section => {
    const { icon, iconColor } = this.props;

    return (
      <View style={styles.header}>
        <View
          style={{
            flex: 4,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <NormalIcon name={icon} color={iconColor} />
          <HeaderText style={styles.headerText}>{section.title}</HeaderText>
        </View>
        <View style={{ flex: 1 }}>
          {this.state.activeSections[0] === 0 ? (
            <NormalIcon name="keyboard-arrow-up" color="#FFF" />
          ) : (
            <NormalIcon name="keyboard-arrow-down" color="#FFF" />
          )}
        </View>
      </View>
    );
  };

  _renderContent = section => {
    return _.map(section.data, (data, i) => {
      return <DueContractCard key={i} contract={data} index={i} />;
    });
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    const { title, data } = this.props;
    const sections = [
      {
        title,
        data
      }
    ];
    return (
      <View style={styles.box}>
        <Accordion
          sections={sections}
          activeSections={this.state.activeSections}
          renderSectionTitle={this._renderSectionTitle}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          onChange={this._updateSections}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>{`ทั้งหมด ${
            data.length
          } รายการ...`}</Text>
        </View>
      </View>
    );
  }
}

DueContractBox.defaultProps = {
  title: '',
  icon: 'perm-device-information',
  iconColor: '#000'
};

export default DueContractBox;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 20,    
    marginLeft: 5,
    marginRight: 5,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#d6d7da',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 50,
    lineHeight: 40,
    backgroundColor: Colors.mainColor,
  },
  headerText: {
    flex: 1,
    fontSize: 25
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 2,
    backgroundColor: '#FFF'
  },
  footerText: {
    flex: 1,
    color: Colors.grayText
  },
});
