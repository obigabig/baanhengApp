import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import requireAuth from '../utils/requireAuth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ActivityIndicator, ScrollView, View, Platform } from 'react-native';
import { ErrorText } from '../components/StyledText';
import { getDueContractListsAction } from '../actions';
import color from '../constants/Colors';

import DueContractBox from '../components/dashboard/DueContractBox';

class DashboardScreen extends Component {
  /*static navigationOptions = ({ navigation }) => {
    return {
    };
  };*/

  state = {
    isLoading: true
  };

  componentDidMount() {
    this.props.getDueContractListsAction(() => {
      this.setState({ isLoading: false });
    });
  }

  splitDueContractList(overDueList, upComingList, data) {
    if (data) {
      const sortedList = _.orderBy(
        data,
        e => {
          return moment(e.actions[0].dueDate, 'DD/MM/YYYY');
        },
        ['asc']
      );

      _.each(sortedList, contract => {
        if (
          moment(contract.actions[0].dueDate, 'DD/MM/YYYY').diff(
            moment(),
            'days'
          ) < 0
        )
          overDueList.push(contract);
        else upComingList.push(contract);
      });
    }
  }

  render() {
    if (this.state.isLoading) {
      return <View style={{flex:1 , justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator /></View>;
    }

    let overDueList = [];
    let upComingList = [];
    //Split overDueList and  upComingList
    this.splitDueContractList(
      overDueList,
      upComingList,
      this.props.dueContractList.data
    );

    return (
      <ScrollView style={Platform.OS === 'ios' ? '' : {marginTop: 24}}>
        <ErrorText>{this.props.dueContractList.errorMessage}</ErrorText>
        <DueContractBox title="เลยกำหนด" icon="warning" iconColor={color.errorBackground} data={overDueList} />
        <DueContractBox title="กำลังจะถึง" icon="warning" iconColor={color.warningText}  data={upComingList} />
      </ScrollView>
    );
  }
}

function mapStateToProps({ dueContractList }) {
  return {
    dueContractList
  };
}

export default compose(
  requireAuth,
  connect(
    mapStateToProps,
    { getDueContractListsAction }
  )
)(DashboardScreen);
