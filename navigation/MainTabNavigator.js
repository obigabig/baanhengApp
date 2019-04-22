import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  getActiveChildNavigationOptions
} from 'react-navigation';
import { Icon } from 'expo';
import Colors from '../constants/Colors';

import TabBarIcon from '../components/TabBarIcon';
//Screen
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ContractListScreen from '../screens/ContractListScreen';
import ContractScreen from '../screens/ContractScreen';
import ProfileScreen from '../screens/user/ProfileScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  title: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  )
};

const DashboardStack = createStackNavigator(
  {
    Dashboard: DashboardScreen
  },
  {
    // This applies to child routes
    defaultNavigationOptions: {
      header: null
    }
  }
);

// This applies to the parent navigator
DashboardStack.navigationOptions = {
  title: 'แจ้งเตือน',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-list-box' : 'md-list-box'}
    />
  )
};

const ContractListStack = createStackNavigator(
  {
    ContractList: ContractListScreen,    
    Contract: ContractScreen
  },
  {
    // This applies to child routes
    defaultNavigationOptions: {
      title: 'รายการทั้งหมด'
    }
  }
);

// This applies to the parent navigator
ContractListStack.navigationOptions = {
  title: 'รายการ',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle'}
    />
  )
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen
});

// This applies to the parent navigator
ProfileStack.navigationOptions = {
  title: 'ข้อมูลส่วนตัว',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  )
};


export default createBottomTabNavigator({
  ContractListStack,
  DashboardStack,
  ProfileStack,
});
