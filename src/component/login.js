/**
 * 登陆页面组件
 */
"use strict";

import React, { Component } from 'react';
import { ScreenWidth, ScreenHeight } from '../common/global';
import { StyleSheet, Text, View, ScrollView, TextInput, Switch, TouchableOpacity, StatusBar, Alert, Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Toast from 'react-native-root-toast';
import { login } from '../actions/memberAction';
import *as wechat from 'react-native-wechat'

class Login extends Component {

  constructor(...props) {
    super(...props);
    this.state = {
      mobile: null,
      pwd: null,
      showPwd: false,
    }

  }

  componentDidMount() {
    wechat.registerApp('wxddb9f220e7c44b2b')
  }

  componentDidUpdate(nextProps) {
    if (this.props.loginData.status === 'success') {
      Toast.show(this.props.loginData.message);
      this.props.navigation.goBack();
    }
  }

  render() {
    return (
      <View>
        <StatusBar translucent={false} backgroundColor="#000" />
        <ScrollView>
          <View style={styles.inputView}>
            <View style={styles.inputMobile}>
              <Icon name='mobile' size={35} style={styles.icon} />
              <TextInput style={{ flex: 9 }}
                onChangeText={(text) => this.setState({
                  mobile: text
                })}
                underlineColorAndroid="transparent"
                placeholder='手机号'
              />
            </View>
            <View style={styles.inputPwd}>
              <Icon name='lock' size={30} style={styles.icon} />
              <TextInput style={{ flex: 7 }}
                onChangeText={(text) => this.setState({
                  pwd: text
                })}
                underlineColorAndroid="transparent"
                placeholder='密码'
                secureTextEntry={!this.state.showPwd}
              />
              <Switch style={{ flex: 2, marginLeft: 20 }} value={this.state.showPwd} onTintColor='#4CD662' onValueChange={() => this.setState({ showPwd: !this.state.showPwd })} />
            </View>
          </View>
          <View style={styles.textForget}>
            <TouchableOpacity>
              <Text allowFontScaling={false}>忘记密码?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.loginView}>
            <TouchableOpacity onPress={() => this._login()}>
              <Text style={this.state.mobile && this.state.pwd ? styles.loginGreen : styles.loginGray} allowFontScaling={false}>登 陆</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => this._wxLogin()} style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image source={require('../assets/images/wx.png')} style={styles.img} />
              <Text allowFontScaling={false}>微信登陆</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

    );
  }

  _login() {
    let mobile = this.state.mobile;
    let pwd = this.state.pwd;
    if (mobile && pwd) {
      let re = /^1[3|4|5|7|8][0-9]{9}$/;
      if (re.test(mobile)) {
        this.props.dispatch(login({ mobile: this.state.mobile, pwd: this.state.pwd, app: 1 }));
      } else {
        Toast.show("手机号格式不正确");
      }
    } else {
      Toast.show("手机号或密码错误")
    }
  }

  //微信登录示例
  _wxLogin = () => {
    let scope = 'snsapi_userinfo';
    let state = 'wechat_sdk_demo';
    //判断微信是否安装
    wechat.isWXAppInstalled()
      .then((isInstalled) => {
        if (isInstalled) {
          //发送授权请求
          wechat.sendAuthRequest(scope, state)
            .then(responseCode => {
              //返回code码，通过code获取access_token
              this.getAccessToken(responseCode.code);
            })
            .catch(err => {
              Alert.alert('登录授权发生错误：', err.message, [
                { text: '确定' }
              ]);
            })
        } else {
          Platform.OS == 'ios' ?
            Alert.alert('没有安装微信', '是否安装微信？', [
              { text: '取消' },
              { text: '确定', onPress: () => this.installWechat() }
            ]) :
            Alert.alert('没有安装微信', '请先安装微信客户端在进行登录', [
              { text: '确定' }
            ])
        }
      })
  };

}

const styles = StyleSheet.create({
  img: { width: 30, height: 30 },
  inputView: {
    backgroundColor: 'white',
    padding: 15,
  },
  inputMobile: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    justifyContent: 'center',
  },
  inputPwd: {
    flexDirection: 'row',
  },
  icon: {
    flex: 1,
    paddingTop: 8,
  },
  textForget: {
    padding: 15
  },
  loginView: {
    padding: 15,
  },
  loginGray: {
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
    backgroundColor: '#ccc',
    color: 'white',
    padding: 15,
    borderRadius: 5
  },
  loginGreen: {
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
    backgroundColor: '#C10001',
    color: 'white',
    padding: 15,
    borderRadius: 5
  }
});

function mapStateToProps(state) {
  return {
    loginData: state.loginReducer,
  }
}

export default connect(mapStateToProps)(Login);