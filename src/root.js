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
  }

  componentWillMount() {
    NetInfo.isConnected.fetch().done((isConnected) => {
      global.isConnected = isConnected;
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
      return (
          <App />
      );
  }
}

