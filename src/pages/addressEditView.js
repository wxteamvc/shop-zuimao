/**
 * 地址编辑页面
 */
"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { address } from '../actions/addressAction';
import { ScreenWidth, ScreenHeight } from '../common/global';
import { ADDRESSUPDATE_URL } from '../common/global';
import Toast from 'react-native-root-toast';
import Picker from 'react-native-picker';
const areasData = require('../common/areas.json');
const dismissKeyboard = require('dismissKeyboard');

class AddressAdd extends Component {

  constructor(...props) {
    super(...props);
    this.state = {
      modshow: false,
      realname: null,
      mobile: null,
      areas: null,
      address: null
    }
  }

  componentDidMount() {
    let addressData = this.props.navigation.state.params.address;
    this.setState({
      realname: addressData.realname,
      mobile: addressData.mobile,
      areas: addressData.province + ' ' + addressData.city + ' ' + addressData.area,
      address: addressData.address
    })
    Picker.init({
      pickerData: areasData,
      onPickerConfirm: data => {
        let areaStr = '';
        for (let i = 0; i < data.length; i++) {
          i == 0 ? areaStr += data[i] : areaStr += ' ' + data[i];
        }
        this.setState({ modshow: false, areas: areaStr })
      },
      onPickerCancel: data => {
        this.setState({ modshow: false })
      },
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '请选择地址'
    });
  }

  componentWillUnmount() {
    this.setState({ modshow: false })
    Picker.hide();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: 'center' }}>
          <View style={s.box}>
            <Text style={s.text}>收货人</Text>
            <TextInput style={s.textInput}
              onChangeText={(text) => this.setState({
                realname: text
              })}
              underlineColorAndroid="transparent"
              placeholder='收货人'
              value={this.state.realname}
            />
          </View>
          <View style={s.box}>
            <Text style={s.text}>电话</Text>
            <TextInput style={s.textInput}
              onChangeText={(text) => this.setState({
                mobile: text
              })}
              underlineColorAndroid="transparent"
              placeholder='电话'
              value={this.state.mobile}
            />
          </View>
          <View style={s.box}>
            <Text style={s.text}>所在地区</Text>
            <TouchableOpacity style={{ flex: 4 }} onPress={() => { Picker.show(); this.setState({ modshow: true }); dismissKeyboard() }}>
              <Text style={s.texta}>{this.state.areas == null ? '所在地区' : this.state.areas}</Text>
            </TouchableOpacity>
          </View>
          <View style={s.box}>
            <Text style={s.text}>详细地址</Text>
            <TextInput style={s.textInput}
              onChangeText={(text) => this.setState({
                address: text
              })}
              underlineColorAndroid="transparent"
              placeholder='详细地址'
              value={this.state.address}
            />
          </View>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this._submit()}>
            <Text style={s.sub}>确定</Text>
          </TouchableOpacity>
        </View>
        {this.state.modshow ? <Text style={s.mod} onPress={() => { Picker.hide(); this.setState({ modshow: false }) }}></Text> : null}
      </View>
    );
  }

  _submit() {
    if (this.state.realname == null || this.state.realname == '') {
      Toast.show('请输入收货人');
      return false;
    }
    if (this.state.mobile == null || this.state.mobile == '') {
      Toast.show('请输入电话号码');
      return false;
    } else {
      let re = /^1[3|4|5|7|8][0-9]{9}$/;
      if (!re.test(this.state.mobile)) {
        Toast.show("手机号格式不正确");
        return false;
      }
    }
    if (this.state.areas == null || this.state.areas == '') {
      Toast.show('请输入所在地区');
      return false;
    }
    if (this.state.address == null || this.state.address == '') {
      Toast.show('请输入详细地址');
      return false;
    }
    let token = this.props.loginData.data.result.token;
    let key, value;
    for (i in token) {
      key = i;
      value = token[key]
    }
    let params = '&' + key + '=' + value + '&addressdata[realname]=' + this.state.realname + '&addressdata[mobile]=' + this.state.mobile + '&addressdata[areas]=' + this.state.areas + '&addressdata[address]=' + this.state.address;
    fetch(ADDRESSUPDATE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status == 1) {
          Toast.show('编辑地址成功');
          this.props.dispatch(address(token));
          this.props.navigation.goBack();
        } else {
          Toast.show('编辑地址失败');
          this.props.dispatch(address(token));
        }
      })
      .catch((error) => {
        Toast.show('服务器请求失败');
      });
  }
}

const s = StyleSheet.create({
  box: {
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },
  text: {
    flex: 1,
    textAlign: 'center'
  },
  textInput: {
    flex: 4,
  },
  sub: {
    flex: 1,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'red',
    color: '#fff',
    padding: 10,
    textAlign: 'center',
    borderRadius: 5
  },
  texta: {
    marginTop: 10,
    marginBottom: 10
  },
  mod: {
    position: 'absolute',
    top: 0,
    width: ScreenWidth,
    height: ScreenHeight,
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
});

function mapStateToProps(state) {
  return {
    loginData: state.loginReducer,
    addressData: state.addressReducer,
  }
}

export default connect(mapStateToProps)(AddressAdd);