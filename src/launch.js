/**
 * 欢迎页面
 */

import React, { Component } from 'react';
import { View,NetInfo } from 'react-native';

var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
import Loading from './component/loading';
import { connect } from 'react-redux';
import { init } from './actions/initAction';
import App from './app';

//全局联网状态
global.isConnected = null;

class Launch extends Component {

  constructor(...props) {
    super(...props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Loading />
      </View>
    );
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

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.props.navigator.replace({
        title: '首页',
        component: App,
        //    passProps:{'id':1}传值
      });
    }, 1000)
    this.props.dispatch(init());
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
}

function mapStateToProps(state) {
  return {
      // homeData: state.initReducer,
  }
}

export default connect(mapStateToProps)(Launch);