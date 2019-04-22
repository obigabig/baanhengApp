import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform,
  ActivityIndicator
} from 'react-native';
import { Button } from 'react-native-elements';

class FltaListPagination extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      //Loading state used while loading the data for the first time
      serverData: [],
      //Data Source for the FlatList
      fetching_from_server: false
      //Loading state used while loading more data
    };
    this.offset = 1;
    //Index of the offset to load from web API
  }

  componentDidMount() {
    fetch('http://aboutreact.com/demo/getpost.php?offset=' + this.offset)
      //Sending the currect offset with get request
      .then(response => response.json())
      .then(responseJson => {
        //Successful response from the API Call
        this.offset = this.offset + 1;
        //After the response increasing the offset for the next API call.
        this.setState({
          serverData: [...this.state.serverData, ...responseJson.results],
          //adding the new data with old one available in Data Source of the List
          loading: false
          //updating the loading state to false
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <ScrollView>
        <Text>ContractListScreen</Text>
        <Text>ContractListScreen</Text>
        <Text>ContractListScreen</Text>
        <Text>ContractListScreen</Text>
      </ScrollView>
    );
  }
}

export default FltaListPagination;
