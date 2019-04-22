import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { compose } from 'redux';
import requireAuth from '../utils/requireAuth';
import ContractForm from '../components/contract/ContractForm';

class ContractScreen extends Component {

  mode = this.props.navigation.getParam('mode', 'new');
  
  render() {

    return (
      <ScrollView>
          <ContractForm/>
      </ScrollView>
    );
  }
}

const enhance = compose(requireAuth);

const EnhancedContractScreen = enhance(ContractScreen);

//ถ้าใช้ HOC จะมี Bug ให้ใช้ Static navigationOptions ไม่ได้
EnhancedContractScreen.navigationOptions = ({ navigation }) => {
  const mode = navigation.getParam('mode', 'new');
  
  return {
    title: mode === 'new'? `รายการใหม่` : 'xxx' 
  };
};

export default EnhancedContractScreen;
