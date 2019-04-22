import React, { Component } from 'react';
import _ from 'lodash';
import { compose } from 'redux';
import requireAuth from '../utils/requireAuth';
import ContractList from '../components/contractList/ContractList';
import { NormalIcon } from '../components/Icon';
import Colors from '../constants/Colors';

class ContractListScreen extends Component {
  render() {
    return <ContractList />;
  }
}

const enhance = compose(requireAuth);

const EnhancedContractListScreen = enhance(ContractListScreen);

//ถ้าใช้ HOC จะมี Bug ให้ใช้ Static navigationOptions ไม่ได้
EnhancedContractListScreen.navigationOptions = ({ navigation }) => {
  return {
    title: `รายการทั้งหมด`,
    headerRight: (
      <NormalIcon
        name="add-circle"
        size={32}
        color={Colors.redText}
        onPress={() => navigation.navigate('Contract', { mode: 'new' })}
      />
    )
  };
};

export default EnhancedContractListScreen;
