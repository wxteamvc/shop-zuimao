/**
 * 地址管理页面
 */
"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { address } from '../actions/addressAction';
import { ScreenWidth } from '../common/global';
import { ADDRESSDEFAULT_URL } from '../common/global';
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
            <Text style={s.fonta}>{addressList[i].realname}&nbsp;{addressList[i].mobile}</Text>
            <Text style={s.fontb}>{addressList[i].province + addressList[i].city + addressList[i].area + addressList[i].address}</Text>
          </View>
          <View style={s.option}>
            <TouchableOpacity onPress={() => this._default(addressList[i].id)} style={{flex:1}}>
              {addressList[i].isdefault ==1 ? <Icon name="check-circle" size={25} color={'#EF4F4F'} /> : <Icon name="circle-thin" size={25} />}
            </TouchableOpacity>
            <Text style={{flex:6}}>设置默认</Text>
            <TouchableOpacity onPress={() => this._edit()} style={{flex:1}}>
              <Icon name="edit" size={20} style={{flex:1}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._delete()} style={{flex:1}}>
              <Icon name="trash-o" size={20} style={{flex:1}} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return addressArr;
  }

  _default(aid){
    let token = this.props.loginData.data.result.token;
    this._fetch(ADDRESSDEFAULT_URL,Object.assign(token, {id:aid}),token)
  }

  _fetch(url,params={},token={}){
    Util.post(url,params,
      (responseJson)=>{
          if(responseJson.status==1){
              this.props.dispatch(address(token));
          }else{
              Toast.show(responseJson.message);
              this.props.dispatch(address(token));
          }
      },
      (error)=>{
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
    borderColor: '#ddd'
  },
  fonta: {
    fontSize: 15,
    color: '#000',
    paddingBottom: 5
  },
  fontb: {
    paddingBottom: 5
  },
  option: {
    paddingTop: 5,
    flexDirection: 'row',
    alignItems:'center',
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