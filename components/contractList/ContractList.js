import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getContractListsAction,
  loadMoreContractListsAction
} from '../../actions';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform,
  ActivityIndicator
} from 'react-native';
import ContractItem from './ContractItem';
import Colors from '../../constants/Colors';

class ContractList extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      offset: 0,
      //Data Source for the FlatList
      fetching_from_server: false,
      //Loading state used while loading more data
      selectedContractNo: null,
      sort: { field: 'no', type: -1 },
      filterNo: '',
      filterTitle: '',
      filterStatus: '0,1,2,3',
      filterPact: '0,1,2',
      filterPropType: '0,1,2,3,4,5,6,7,8,9,10',
      filterValue: '0'
    };

    this.dataPerOffset = 20;
  }

  componentDidMount() {
    const { getContractListsAction } = this.props;
    const {
      offset,
      sort,
      filterNo,
      filterTitle,
      filterStatus,
      filterPact,
      filterPropType,
      filterValue
    } = this.state;

    try {
      this.setState({ loading: true }, () => {
        getContractListsAction(
          offset,
          this.dataPerOffset,
          sort,
          filterNo,
          filterTitle,
          filterStatus,
          filterPact,
          filterPropType,
          filterValue,
          () => {
            this.setState({
              loading: false,
              offset: this.state.offset + this.dataPerOffset
            });
          }
        );
      });
    } catch (e) {
      console.error(e);
    }
  }

  loadMoreData = () => {
    const { loadMoreContractListsAction } = this.props;
    const {
      offset,
      sort,
      filterNo,
      filterTitle,
      filterStatus,
      filterPact,
      filterPropType,
      filterValue
    } = this.state;

    try {
      this.setState({ fetching_from_server: true }, () => {
        loadMoreContractListsAction(
          offset,
          this.dataPerOffset,
          sort,
          filterNo,
          filterTitle,
          filterStatus,
          filterPact,
          filterPropType,
          filterValue,
          () => {
            this.setState({
              fetching_from_server: false,
              offset: this.state.offset + this.dataPerOffset
            });
          }
        );
      });
    } catch (e) {
      console.error(e);
    }
  };

  renderFooter() {
    const { contractList } = this.props;
    const { offset } = this.state;

    if (contractList.length && offset >= contractList.length) return null;

    if(this.state.fetching_from_server)
      return (
        <View style={styles.footer}>
          <ActivityIndicator color={Colors.mainColor}  />
        </View>
      );

    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={this.loadMoreData}
          //On Click of button calling loadMoreData function to load more data
          style={styles.loadMoreBtn}
        >
          <Text style={styles.btnText}>แสดงเพิ่ม</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderItem = (item, index) => {
    return (
      <ContractItem item={item} index={index}/>
    );
  };

  renderFlatList() {
    const { contractList } = this.props;
    return (
      <FlatList
        style={{ width: '100%' }}
        keyExtractor={(item, index) => index.toString()}
        data={contractList.data}
        renderItem={({ item, index }) => this.renderItem(item, index)}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={this.renderFooter.bind(this)}
        //Adding Load More button as footer component
      />
    );
  }

  render() {
    if (this.state.loading)
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );

    return <View style={styles.container}>{this.renderFlatList()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5
  },
  separator: {
    //height: 5,
    //backgroundColor: 'rgba(0,0,0,0.4)'
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: Colors.blueBackground,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center'
  }
});

function mapStateToProps({ contractList }) {
  return { contractList };
}

export default connect(
  mapStateToProps,
  { getContractListsAction, loadMoreContractListsAction }
)(ContractList);
