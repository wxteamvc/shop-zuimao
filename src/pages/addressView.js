/**
 * 地址管理页面
 */
"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { address } from '../actions/addressAction';
import { ScreenWidth } from '../common/global';
import { ADDRESSDEFAULT_URL, ADDRESSDELETE_URL, ADDRESSEDIT_URL } from '../common/global';
import Toast from 'react-native-root-toast';
import Util from '../common/util';

class Address extends Component {

  constructor(...props) {
    super(...props);
  }

  componentDidMount() {
    //请求用户信息
    if (this.props.loginData.status === "success") {
      let token = this.props.loginData.data.result.token;
      this.props.dispatch(address(token))
    }
  }

  render() {
    if (this.props.loginData.status === "success") {
      return (
        <View style={{ flex: 1 }}>
          <ScrollView>
            {this.renderAddress()}
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Text>123</Text>
        </View>
      );
    }

  }

  renderAddress() {
    let addressList = this.props.addressData.data.result.address;
    let addressArr = [];
    for (let i = 0; i < addressList.length; i++) {
      addressArr.push(
        <View key={i} style={s.list}>
          <View style={s.address}>
            <View style={{ flex: 2 }}>
              <Text style={s.fonta}>{addressList[i].province + addressList[i].city + addressList[i].area + addressList[i].address}</Text>
              <Text style={s.fontb}>{addressList[i].realname}&nbsp;{addressList[i].mobile}</Text>
            </View>
            <TouchableOpacity onPress={() => this._edit(addressList[i].id)} style={s.icon}>
              <Icon name="edit" size={20} style={{ flex: 1 }} />
            </TouchableOpacity>
          </View>
          <View style={s.option}>
            <TouchableOpacity onPress={() => this._default(addressList[i].id)} style={{ flex: 1 }}>
              {addressList[i].isdefault == 1 ? <Icon name="check-square-o" size={25} color={'#EF4F4F'} /> : <Icon name="square-o" size={25} />}
            </TouchableOpacity>
            <Text style={{ flex: 6 }}>设置默认</Text>
            <TouchableOpacity onPress={() => this._delete(addressList[i].id)} style={s.icon}>
              <Icon name="trash-o" size={20} style={{ flex: 1 }} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <ScrollView>
        {addressArr}
        <TouchableOpacity onPress={()=>this._add()}>
          <View style={s.addressAdd}>
            <Text style={{ flex: 9 }}>新增收货地址</Text>
            <Icon name="plus-square-o" size={20} style={{ flex: 1 }} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    )
  }

  _default(aid) {
    let token = this.props.loginData.data.result.token;
    this._fetch(ADDRESSDEFAULT_URL, Object.assign(token, { id: aid }), token)
  }

  _edit(aid) {
    this.props.navigation.navigate('AddressEdit')
  }

  _delete(aid) {
    Alert.alert('温馨提醒', '确定删除吗?', [
      { text: '取消' },
      {
        text: '确定', onPress: () => {
          let token = this.props.loginData.data.result.token;
          this._fetch(ADDRESSDELETE_URL, Object.assign(token, { id: aid }), token)
        }
      }
    ])
  }

  _add(){
    this.props.navigation.navigate('AddressAdd')
  }

  _fetch(url, params = {}, token = {}) {
    Util.post(url, params,
      (responseJson) => {
        if (responseJson.status == 1) {
          this.props.dispatch(address(token));
        } else {
          Toast.show(responseJson.result.message);
          this.props.dispatch(address(token));
        }
      },
      (error) => {
        Toast.show('服务器请求失败！');
      },
    )
  }

}

const s = StyleSheet.create({
  list: {
    padding: 10,
    backgroundColor: '#fff',
    marginTop: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },
  address: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
  },
  fonta: {
    color: '#000',
    paddingBottom: 5
  },
  fontb: {
    paddingBottom: 5
  },
  option: {
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 15
  },
  addressAdd: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginTop: 10,
    padding: 10
  }
});

function mapStateToProps(state) {
  return {
    loginData: state.loginReducer,
    memberData: state.memberInfoReducer,
    addressData: state.addressReducer,
  }
}

export default connect(mapStateToProps)(Address);