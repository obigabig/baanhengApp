import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { numberWithCommas } from '../../utils/format';
import { ContractStatusValue } from '../../constants';
import { NormalIcon } from '../Icon';

class ContractItemDetail extends Component {
  render() {
    const { data } = this.props;

    return (
      <View
        style={[
          styles.content,
          { backgroundColor: getColorFromStatus(data.status) }
        ]}
      >
        <View style={{flex: 4}}>
          <Text>{`สถานะ: ${data.status}`}</Text>
          <Text>{`${data.pact}/${data.type}: ${numberWithCommas(
            data.value
          )} บาท`}</Text>
          <Text>{`สถานะ: ${data.status}`}</Text>
          <Text>{`วันที่เริ่มสัญญา: ${
            data.beginDate ? data.beginDate : '-'
          }`}</Text>
          <Text>{`วันที่จบสัญญา: ${
            data.closeDate ? data.closeDate : '-'
          }`}</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'space-around'}}> 
          <NormalIcon name="edit" color="#000" size={30} onPress={() => alert('hello')}  />
          <NormalIcon name="map" color="#000" size={30} onPress={() => alert('hello')} />
        </View>
      </View>
    );
  }
}

const getColorFromStatus = status => {
  if (status === ContractStatusValue.draft) return '#d3e9ff';
  else if (status === ContractStatusValue.ongoing) return '#05d66242';
  else if (status === ContractStatusValue.break) return '#bf83798f';
  else if (status === ContractStatusValue.end) return '#eaeaea';

  return '';
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 5,
    paddingBottom: 10
  }
});

export default ContractItemDetail;
