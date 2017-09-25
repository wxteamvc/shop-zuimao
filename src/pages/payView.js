/**
 * Sample React Native App
 * 支付页面
 * @flow
 */
"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { ScreenWidth } from '../common/global';
import Icon from 'react-native-vector-icons/FontAwesome';
import Util from '../common/util';


export default class Pay extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    headerTitle: '收银台',
    headerTitleStyle: { alignSelf: 'center' },
    // headerRight: <Text style={{ marginRight: 20 }} onPress={() => navigation.navigate()}>订单</Text>,
    headerRight: <Text></Text>
  });

  constructor(...props) {
    super(...props);
    this.state = {
      payType: 'yu',//yu:余额支付，we:微信支付，ali支付宝支付
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={s.price}>
          <View style={{flexDirection:'row'}}>
            <Text>订单号：SH20170925090558938400</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <Text>需支付：</Text>
            <Text style={{ color: 'red' }}>&yen;120</Text>
          </View>
        </View>
        <View style={s.pay}>
          <Text style={s.title}>支付方式：</Text>
          <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
            <Image source={require('../assets/images/yupay.png')} style={{ flex: 1, height: 30 }} />
            <Text style={{ flex: 9, paddingLeft: 50 }}>余额支付</Text>
            <TouchableOpacity onPress={() => this.setState({ payType: 'yu' })} style={{ flex: 1 }}>
              {this.state.payType == 'yu' ? <Icon name="check-circle" size={25} color={'#EF4F4F'} /> : <Icon name="circle-thin" size={25} />}
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
            <Image source={require('../assets/images/wepay.png')} style={{ flex: 1, height: 30 }} />
            <Text style={{ flex: 9, paddingLeft: 50 }}>微信支付</Text>
            <TouchableOpacity onPress={() => this.setState({ payType: 'we' })} style={{ flex: 1 }}>
              {this.state.payType == 'we' ? <Icon name="check-circle" size={25} color={'#EF4F4F'} /> : <Icon name="circle-thin" size={25} />}
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
            <Image source={require('../assets/images/alipay.png')} style={{ flex: 1, height: 30 }} />
            <Text style={{ flex: 9, paddingLeft: 50 }}>支付宝</Text>
            <TouchableOpacity onPress={() => this.setState({ payType: 'ali' })} style={{ flex: 1 }}>
              {this.state.payType == 'ali' ? <Icon name="check-circle" size={25} color={'#EF4F4F'} /> : <Icon name="circle-thin" size={25} />}
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ padding: 10, position: 'absolute', bottom: 0, width: ScreenWidth }}>
          <TouchableOpacity>
            <Text style={{ backgroundColor: 'red', padding: 10, borderRadius: 5, color: '#fff', textAlign: 'center' }}>{this.state.payType == 'yu' ? '余额' : null}{this.state.payType == 'we' ? '微信' : null}{this.state.payType == 'ali' ? '支付宝' : null}支付</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }


}


const s = StyleSheet.create({
  price: {
    marginTop: 10,
    padding: 10,
    paddingRight: 30,
    backgroundColor: '#fff'
  },
  pay: {
    marginTop: 10,
    backgroundColor: '#fff'
  },
  title: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',

  }
})
