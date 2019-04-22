import React, { Component } from 'react';
import moment from 'moment';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { markActionAsComplete } from '../../actions';
import { NormalIcon } from '../../components/Icon';
import { ContentText } from '../../components/StyledText';
import Colors from '../../constants/Colors';

export class DueContractCard extends Component {
  constructor() {
    super();
    this.state = {};

    this.IsLinkHover = false;
    this.markAsComplete = this.markAsComplete.bind(this);
  }

  markAsComplete(event, actionId) {
    const { contract } = this.props;

    confirmAlert({
      title: '',
      message: 'ทำการปิดการแจ้งเตือน ?',
      buttons: [
        {
          label: 'ตกลง',
          onClick: () => this.props.markActionAsComplete(contract._id, actionId)
        },
        {
          label: 'ยกเลิก',
          onClick: () => {}
        }
      ]
    });

    event.preventDefault();
  }

  renderAlertSection(action) {
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <NormalIcon name="alarm-off" color="#000" />
      </View>
    );
  }

  renderUpComingText(upComingDay) {
    let upComingTextColor = Colors.mainBackground;
    if (upComingDay <= 10) upComingTextColor = Colors.errorBackground;
    else if (upComingDay <= 20) upComingTextColor = Colors.warningText;

    return (
      <Text style={{ color: upComingTextColor }}>
        {' '}
        {` (${upComingDay} วัน)`}
      </Text>
    );
  }

  renderDetail(contract) {
    const action = contract.actions[0];
    const upComingDay = moment(action.dueDate, 'DD/MM/YYYY').diff(
      moment(),
      'days'
    );

    return (
      <View style={{ flex: 5 }}>
        <Text style={styles.headerText}>{`#${contract.no} : ${contract.title}`}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text>{action.type && `${action.type} : ${action.dueDate}`}</Text>
          {this.renderUpComingText(upComingDay)}
        </View>
      </View>
    );
  }

  render() {
    const { contract, index } = this.props;
    const bgColor = index % 2 ? '#f7f7f7' : Colors.grayBackground;

    return (
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        {this.renderDetail(contract)}
        {this.renderAlertSection(contract.actions[0])}
      </View>
    );
  }
}

export default connect(
  null,
  { markActionAsComplete }
)(DueContractCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
  headerText: {
    color: Colors.tintColor,
    fontSize: 18
  }
});
