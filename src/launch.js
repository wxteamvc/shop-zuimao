/**
 * 欢迎页面
 */

import React, { Component } from 'react';
import { View, NetInfo, Image, TouchableOpacity, Text, StatusBar, StyleSheet, Animated } from 'react-native';

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
    this.state = {
      time: 3,
      bounceValue: new Animated.Value(1),
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          translucent={false}
          backgroundColor="#000"
        />
        <Animated.Image
          resizeMode={'stretch'}
          source={require('./assets/images/indexAd.jpg')}
          style={{ width: ScreenWidth, height: ScreenHeight, transform: [{ scale: this.state.bounceValue }] }} />
        {
          this.props.homeData.status == 'success' ?
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                this.props.navigator.replace({
                  title: '首页',
                  component: App,
                  //    passProps:{'id':1}传值
                });
              }}
            >
              <Text style={styles.text}>跳过</Text>
            </TouchableOpacity> : false
        }

      </View>
    );
  }

  componentDidMount() {
    //发送首页信息请求动作
    this.props.dispatch(init());
    
    Animated.sequence([
      Animated.timing(
        this.state.bounceValue, {
          toValue: 1.2,
          duration: 700
        }
      ),
      Animated.timing(
        this.state.bounceValue, {
          toValue: 1,
          duration: 300
        }
      ),
    ]).start();

    //设置跳转倒计时
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


const styles = StyleSheet.create({
  btn: {
    position: 'absolute', bottom: 20, right: 20, height: 30, width: 30, borderRadius: 15, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', borderColor: '#fff', borderWidth: 0.7
  },
  text: {
    color: '#fff', fontSize: 12
  }
})


function mapStateToProps(state) {
  return {
    homeData: state.initReducer,
  }
}

export default connect(mapStateToProps)(Launch);