/**
 * 地址管理页面
 */
"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { address } from '../actions/addressAction';
import { ScreenWidth,ScreenHeight } from '../common/global';
// import { ADDRESSDEFAULT_URL,ADDRESSDELETE_URL,ADDRESSEDIT_URL } from '../common/global';
import Toast from 'react-native-root-toast';
// import Util from '../common/util';
import Picker from 'react-native-picker';
const areasData = require('../common/areas.json');

class AddressAdd extends Component {

  constructor(...props) {
    super(...props);
    this.state = {
      modshow:false,
      realname:null,
      mobile:null,
      areas: null,
      address:null
    }
  }

  componentDidMount() {
    Picker.init({
      pickerData: areasData,
      selectedValue: [],
      onPickerConfirm: data => {
        let areaStr='';
        for(let i=0;i<data.length;i++){
          areaStr+=data[i]+' ';
        }
        this.setState({modshow:false,areas:areaStr})
      },
      onPickerCancel: data => {
        this.setState({modshow:false})
      },
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '请选择地址'
    });

  }

  render() {
    return (
      <View style={{flex:1}}>
        <View style={{ alignItems: 'center' }}>
          <View style={s.box}>
            <Text style={s.text}>收货人</Text>
            <TextInput style={s.textInput}
              onChangeText={(text) => this.setState({
                realname: text
              })}
              underlineColorAndroid="transparent"
              placeholder='收货人'
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
            />
          </View>
          <View style={s.box}>
            <Text style={s.text}>所在地区</Text>
            <TouchableOpacity style={{ flex: 4 }} onPress={() => {Picker.show();this.setState({modshow:true})}}>
              <Text style={s.texta}>{this.state.areas==null?'所在地区':this.state.areas}</Text>
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
            />
          </View>
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={s.sub}>确定</Text>
          </TouchableOpacity>
        </View>
        {this.state.modshow?<Text style={s.mod} onPress={()=>{Picker.hide();this.setState({modshow:false})}}></Text>:null}
      </View>
    );
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
  mod:{
    position:'absolute',
    top:0,
    width:ScreenWidth,
    height:ScreenHeight,
    backgroundColor:'rgba(0,0,0,0.5)'
  }
});

function mapStateToProps(state) {
  return {
    addressData: state.addressReducer,
  }
}

export default connect(mapStateToProps)(AddressAdd);