/**
 * 欢迎页面
 */

import React, { Component } from 'react';
import { View, NetInfo, Image } from 'react-native';

var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
import Loading from './component/loading';
import { connect } from 'react-redux';
import { init } from './actions/initAction';
import { ScreenWidth, ScreenHeight } from './common/global';
import App from './app';

//全局联网状态
global.isConnected = null;

class Launch extends Component {

  constructor(...props) {
    super(...props);
    this.state = {
      time: 3
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image
          resizeMode={'stretch'}
          source={require('./assets/images/indexAd.jpg')}
          style={{ width: ScreenWidth, height: ScreenHeight }} />
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
    this.props.dispatch(init());
    this.timer = setInterval(() => {
      this.setState({ time: this.state.time > 0 ? --this.state.time : 0 })
      if (this.state.time == 0 && this.props.homeData.status == 'success') {
        this.props.navigator.replace({
          title: '首页',
          component: App,
          //    passProps:{'id':1}传值
        });
      }
    }, 1000)

  }
  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }
}

function mapStateToProps(state) {
  return {
    homeData: state.initReducer,
  }
}

export default connect(mapStateToProps)(Launch);