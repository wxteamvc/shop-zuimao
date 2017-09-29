/**
 * 手机绑定
 */
"use strict";

import React, { Component } from 'react';
import { ScreenWidth, ScreenHeight, MEMBERBIND_URL, VERIFY_CODE_URL } from '../common/global';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import Toast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default class MemberBind extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    headerTitle: '绑定手机号',
    headerTitleStyle: { alignSelf: 'center' },
    // headerRight: <Text style={{ marginRight: 20 }} onPress={() => navigation.navigate()}>订单</Text>,
    headerRight: <Text></Text>
  });

  constructor(...props) {
    super(...props);
    this.state = {
      mobile: this.props.navigation.state.params.mobile,
      verifycode: null,
      pwd: null,
      pwdSure: null,
    }
    this.token = this.props.navigation.state.params.token;
    this.changeMobile = this.props.navigation.state.params.changeMobile;
  }

  render() {
    return (
      <View>
        <StatusBar translucent={false} backgroundColor="#000" />
        <ScrollView>
          <View style={styles.inputView}>
            <View style={styles.inputbox}>
              <Text style={{ flex: 1 }}>手机号：</Text>
              <TextInput style={styles.input}
                onChangeText={(text) => this.setState({
                  mobile: text
                })}
                underlineColorAndroid="transparent"
                placeholder={this.state.mobile}
              />
            </View>
            <View style={styles.inputbox}>
              <Text style={{ flex: 1 }}>验证码：</Text>
              <TextInput style={styles.inputcode}
                onChangeText={(text) => this.setState({
                  verifycode: text
                })}
                underlineColorAndroid="transparent"
                placeholder='填写验证码'
              />
              <View style={styles.codeBtn}>
                <TouchableOpacity onPress={() => this._verifycode()}>
                  <Text style={styles.codeBtnText}>获取验证码</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputbox}>
              <Text style={{ flex: 1 }}>登录密码：</Text>
              <TextInput style={styles.input}
                onChangeText={(text) => this.setState({
                  pwd: text
                })}
                underlineColorAndroid="transparent"
                placeholder='填写密码'
              />
            </View>
            <View style={styles.inputbox}>
              <Text style={{ flex: 1 }}>确认密码：</Text>
              <TextInput style={styles.input}
                onChangeText={(text) => this.setState({
                  pwdSure: text
                })}
                underlineColorAndroid="transparent"
                placeholder='确认密码'
              />
            </View>
          </View>
          <View style={styles.loginView}>
            <TouchableOpacity onPress={() => this._sub()}>
              <Text style={styles.subBtn} allowFontScaling={false}>立即绑定</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  _sub() {
    let key, value;
    for (i in this.token) {
      key = i;
      value = this.token[key]
    }
    var mobile = this.state.mobile;
    var pwd = this.state.pwd;
    var verifycode = this.state.verifycode;
    if (this.state.pwd === this.state.pwdSure) {
      fetch(MEMBERBIND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: '&' + key + '=' + value + 'mobile=' + mobile + '&pwd=' + pwd + '&verifycode=' + verifycode + '&app=1'
      })
        .then(response => response.json())
        .then(
        responseJson => {
          //判断返回码
          //{ status: 0, result: { message: '*******' } }
          if (responseJson.status == 1) {
            this.changeMobile(this.state.mobile);
            this.props.navigation.goBack();
            Toast.show('绑定成功');
          } else {
            Toast.show('绑定失败');
          }
        }
        ).catch((error) => {
          Toast.show('服务器请求失败！');
        });
    } else {
      Toast.show('两次密码不一致！');
    }
  }

  _verifycode() {
    var mobile = this.state.mobile;
    var isMobile = this._checkMobile(mobile);
    if (isMobile) {
      fetch(VERIFY_CODE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'mobile=' + mobile + '&temp=sms_bind'
      })
        .then(response => response.json())
        .then(
        responseJson => {
          Toast.show(responseJson.result.message);
        }
        ).catch((error) => {
          Toast.show("验证码发送请求失败！");
        });

    } else {
      Toast.show("手机号格式不正确");
    }
  }

  _checkMobile(mobile) {
    let re = /^1[3|4|5|7|8][0-9]{9}$/;
    if (re.test(mobile)) {
      return true;
    } else {
      return false;
    }
  }

}

const styles = StyleSheet.create({
  codeBtn: {
    flex: 2,
    justifyContent: 'center',
  },
  codeBtnText: {
    textAlign: 'center',
    backgroundColor: '#0271BC',
    padding: 8,
    marginLeft: 10,
    borderRadius: 10,
    color: '#fff',
  },
  inputView: {
    backgroundColor: 'white',
    padding: 15,
    marginTop: 10
  },
  inputcode: {
    flex: 2,
    margin: 0,
    padding: 0
  },
  input: {
    flex: 4,
    margin: 0,
    padding: 0
  },
  inputbox: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
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
  subBtn: {
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
    backgroundColor: '#C10001',
    color: 'white',
    padding: 15,
    borderRadius: 5
  }
});
