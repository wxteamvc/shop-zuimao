/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
"use strict";

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { init } from '../actions/initAction'
import Toast from 'react-native-root-toast';
import ScrollViewJumpTop from '../component/scrollViewJumpTop'
import FlatListJumpTop from '../component/flatListJumoTop'

class HomeView extends Component {

  constructor(...props) {
    super(...props);
  }

  componentDidMount() {
    this.props.dispatch(init())

  }

  componentWillReceiveProps() {
    if (this.props.homeData.status == 'failed') {
      Toast.show(this.props.homeData.message)
    }
  }
 
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          首页
        </Text>
         <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SignTab')}}>
           <Text>签到</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Coupons')}}>
           <Text>优惠券</Text>
         </TouchableOpacity>
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
    homeData: state.initReducer,
  }
}

export default connect(mapStateToProps)(HomeView);