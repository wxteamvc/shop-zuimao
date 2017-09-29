/**
 * 会员信息
 */
"use strict";

import React, { Component } from 'react';
import { ScreenWidth, ScreenHeight, MEMBERINFO_URL, MEMBERINFOSUB_URL } from '../common/global';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import Toast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import DatePicker from 'react-native-datepicker'
import Picker from 'react-native-picker';
const areasData = require('../common/areasT.json');
const dismissKeyboard = require('dismissKeyboard');

export default class MemberInfo extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    headerTitle: '会员资料',
    headerTitleStyle: { alignSelf: 'center' },
    // headerRight: <Text style={{ marginRight: 20 }} onPress={() => navigation.navigate()}>订单</Text>,
    headerRight: <Text></Text>
  });

  constructor(...props) {
    super(...props);
    this.state = {
      mobile: '',
      realname: '',
      weixin: '',
      birthyear: '',
      birthmonth: '',
      birthday: '',
      province: '',
      city: '',
    }
    this.token = this.props.navigation.state.params.token;
  }

  componentWillMount() {
    this._post();
  }

  _post() {
    let key, value;
    for (i in this.token) {
      key = i;
      value = this.token[key]
    }
    fetch(MEMBERINFO_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: '&app=1&' + key + '=' + value,
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status == 1) {
          let member = responseJson.result.member;
          this.setState({
            mobile: member.mobile,
            realname: member.realname,
            weixin: member.weixin,
            birthyear: member.birthyear,
            birthmonth: member.birthmonth,
            birthday: member.birthday,
            province: member.province,
            city: member.city,
          })
        } else {
          Toast.show(responseJson.result.message);
        }
      })
      .catch((error) => {
        Toast.show('服务器请求失败');
      });
  }

  componentDidMount() {
    Picker.init({
      pickerData: areasData,
      onPickerConfirm: data => {
        this.setState({
          province: data[0],
          city: data[1]
        })
      },
      onPickerCancel: data => {
        //
      },
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '请选择地址'
    });

  }

  componentWillUnmount() {
    Picker.hide();
  }

  render() {
    let myDate = new Date();
    let year = myDate.getFullYear();
    let month = myDate.getMonth();
    let day = myDate.getDate();

    return (
      <View>
        <StatusBar translucent={false} backgroundColor="#000" />
        <ScrollView>
          <View style={styles.inputView}>
            <View style={styles.inputbox}>
              <Text style={{ flex: 1 }}>手机号：</Text>
              <Text style={{ flex: 2 }}>{this.state.mobile}(已绑定)</Text>
              <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }}
              onPress={()=>this.props.navigation.navigate('MemberBind',{mobile:this.state.mobile,token:this.token})}>
                <Text style={{ flex: 1 }}>更换绑定</Text>
                <Icon name="angle-right" size={20} color={'#ccc'} style={{ flex: 0.1 }} />
              </TouchableOpacity>
            </View>
            <View style={styles.inputbox}>
              <Text>姓名：</Text>
              <TextInput style={styles.input}
                onChangeText={(text) => this.setState({
                  realname: text
                })}
                underlineColorAndroid="transparent"
                placeholder={this.state.realname == '' ? '请填写姓名' : this.state.realname}
              />
            </View>
            <View style={styles.inputbox}>
              <Text>微信号：</Text>
              <TextInput style={styles.input}
                onChangeText={(text) => this.setState({
                  weixin: text
                })}
                underlineColorAndroid="transparent"
                placeholder={this.state.weixin == '' ? '请填写微信号' : this.state.weixin}
              />
            </View>
            <View style={styles.inputbox}>
              <Text>出生日期：</Text>
              <DatePicker
                style={styles.input}
                date={this.state.birthyear != '' && this.state.birthmonth != '' && this.state.birthmonth != '' ? this.state.birthyear + '-' + this.state.birthmonth + '-' + this.state.birthday : ''}
                mode="date"
                placeholder="选择日期"
                format="YYYY-MM-DD"
                minDate="1949-10-01"
                maxDate={year + '-' + month + '-' + day}
                confirmBtnText="确定"
                cancelBtnText="取消"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                  // ... You can check the source to find the other keys.
                }}
                androidMode="spinner"
                onDateChange={(date) => {
                  this.setState({
                    birthyear: date.substring(0, 4),
                    birthmonth: date.substring(5, 7),
                    birthday: date.substring(8, 10),
                  })
                }}
              />
            </View>
            <View style={styles.inputbox}>
              <Text>所在城市：</Text>
              <TouchableOpacity style={styles.input} onPress={() => { Picker.show(); dismissKeyboard() }}>
                <Text>{this.state.province == '' ? '请选择所在城市' : this.state.province + ' ' + this.state.city}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.loginView}>
            <TouchableOpacity onPress={() => this._sub()}>
              <Text style={styles.subBtn} allowFontScaling={false}>确认修改</Text>
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
    fetch(MEMBERINFOSUB_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: '&' + key + '=' + value + '&memberdata[realname]=' + this.state.realname + '&memberdata[weixin]=' + this.state.weixin + '&memberdata[birthyear]=' + this.state.birthyear + '&memberdata[birthmonth]=' + this.state.birthmonth + '&memberdata[birthday]=' + this.state.birthday + '&memberdata[province]=' + this.state.province + '&memberdata[city]=' + this.state.city + '&mcdata[realname]=' + this.state.realname + '&mcdata[birthyear]=' + this.state.birthyear + '&mcdata[birthmonth]=' + this.state.birthmonth + '&mcdata[birthday]=' + this.state.birthday + '&mcdata[resideprovince]=' + this.state.province + '&mcdata[residecity]=' + this.state.city,
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status == 1) {
          Toast.show('修改成功');
          this.props.navigation.goBack()
        } else {
          Toast.show(responseJson.result.message);
        }
      })
      .catch((error) => {
        Toast.show('服务器请求失败');
      });
  }

}

const styles = StyleSheet.create({
  inputView: {
    backgroundColor: 'white',
    padding: 15,
    marginTop: 10
  },
  input: {
    flex: 9,
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
