/**
 * 地址管理页面
 */
"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IconT from 'react-native-vector-icons/dist/Foundation';
import { address } from '../actions/addressAction';
import { ScreenWidth } from '../common/global';
import { fontSizeScaler as fs } from '../common/global';
import Toast from 'react-native-root-toast';

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
    if(this.props.loginData.status === "success"){
      return (
        <View style={{flex:1}}>
          <ScrollView>
            {this.renderAddress()}
          </ScrollView>
        </View>
      );
    }else{
      return (
        <View style={{flex:1}}>
          <Text>123</Text>
        </View>
      );
    }
    
  }

  renderAddress(){
    let addressList=this.props.addressData.data.result.address;
    let addressArr=[];
    for(let i = 0;i<addressList.length;i++){
      addressArr.push(
        <View key={i} style={s.list}>
          <View style={s.address}>
            <Text style={s.fonta}>{addressList[i].realname}&nbsp;{addressList[i].mobile}</Text>
            <Text>{addressList[i].province+addressList[i].city+addressList[i].area+addressList[i].address}</Text>
          </View>
        </View>
      );
    }
    return addressArr;
  }
}

const s = StyleSheet.create({
  list:{
    padding:15,
    backgroundColor:'#fff',
    marginTop:10,
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:'#ddd'
  },
  address:{
    borderBottomWidth:1,
    borderColor:'#ddd'
  },
  fonta:{
    fontSize:15,
    color:'#000',
    paddingBottom:5
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