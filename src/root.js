/**
 * APP入口文件
 * 使用redux的Provider进行包裹
 */
"use strict";

import React, { Component } from 'react';
import { NetInfo,View } from 'react-native';
import App from './app';

//全局联网状态
global.isConnected = null;

export default class Root extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      isok: null
    }
  }

  componentWillMount() {
    NetInfo.isConnected.fetch().done((isConnected) => {
      global.isConnected = isConnected;
      this.setState({
        isok: true,
      })
    });
    function handleFirstConnectivityChange(isConnected) {
      global.isConnected = isConnected;
    }
    NetInfo.isConnected.addEventListener(
      'channge',
      handleFirstConnectivityChange
    );
  }

  render() {
    if (this.state.isok) {
      return (
          <App />
      );
    } else {
      return (
        <View style={{flex:1,backgroundColor:'#fff'}}></View>
      );
    }

  }
}

