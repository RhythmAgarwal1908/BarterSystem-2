import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignupLoginScreen from './screens/SignupLoginScreen'
import {AppTabNavigator} from './components/AppTabNavigator';
import { createAppContainer } from 'react-navigation';
export default class App extends React.Component{
  render(){
  return (
    <View>
      <AppContainer/>
    </View>
  );
}
}

const SwitchNavigator=createSwitchNavigator({
  SignupLoginScreen:{screen:SignupLoginScreen},
  BottomTab:{screen:AppTabNavigator}
})

const AppContainer = createAppContainer(SwitchNavigator);