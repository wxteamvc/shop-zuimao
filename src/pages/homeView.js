/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
"use strict";

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToastAndroid
} from 'react-native';
import { connect } from 'react-redux';
import { init } from '../actions/initAction'

class HomeView extends Component {
  
  constructor(...props){
    super(...props);
    
  }

  componentDidMount() {
    this.props.dispatch(init())    
  }

  componentWillReceiveProps(){
    if(this.props.homeData.status=='failed'){
      ToastAndroid.show(this.props.homeData.message, ToastAndroid.SHORT);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          首页
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

function mapStateToProps(state) {
  return {
      homeData:state.initReducer,
  }
}

export default connect(mapStateToProps)(HomeView);