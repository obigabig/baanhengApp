import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import ContractItemDetail from './ContractItemDetail';
import Accordion from 'react-native-collapsible/Accordion';
import { NormalIcon } from '../Icon';
import { HeaderText } from '../StyledText';
import { getColorFromStatus } from '../../utils/contractUtil';

class ContractItem extends Component {
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
    const item = section.title;
    const backgroundColor = getColorFromStatus(item.status);

    return (
      <View style={[styles.header, { backgroundColor }]}>
        <View
          style={{
            flex: 4,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <HeaderText style={styles.headerText} size="2.3" color="#000">{`${
            item.no
          } : ${item.title}`}</HeaderText>
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

  _renderContent = ({ data }) => {
    return (
      <ContractItemDetail data={data} />
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    const { item, index } = this.props;
    const sections = [
      {
        title: item,
        data: item
      }
    ];

    return (
      <View style={styles.item}>
        <Accordion
          sections={sections}
          activeSections={this.state.activeSections}
          renderSectionTitle={this._renderSectionTitle}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          onChange={this._updateSections}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 55,
    lineHeight: 30,
    paddingLeft: 10,
    marginLeft: 0,
    marginRight: 0,
    marginTop: -15,
    borderBottomWidth: 0,
    borderColor: 'rgba(0,0,0,0.4)'
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 5,

  }
});

export default ContractItem;
