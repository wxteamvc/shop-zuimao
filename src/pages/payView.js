/**
 * Sample React Native App
 * 支付页面
 * @flow
 */
"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image,Modal,ActivityIndicator  } from 'react-native';
import { ScreenWidth } from '../common/global';
import Icon from 'react-native-vector-icons/FontAwesome';
import Util from '../common/util';
import { ScreenHeight,PAY_URL, PAYCHECK_URL, PAYCOMPLETE_URL, PAYSUCCESS_URL } from '../common/global';
import Toast from 'react-native-root-toast';

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
      status: false,
      payType: null,//credit:余额支付，wx:微信支付，ali支付宝支付
      result: null,
      showActivityIndicator: false,
    }
  }

  componentWillMount() {
    let { id, token } = this.props.navigation.state.params;
    this._post(PAY_URL, id);
  }

  _post(url, id) {
    let params = '&app=1&id=' + id;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status == 1) {
          this.setState({
            status: true,
            result: responseJson.result,
          })
        } else {
          Toast.show(responseJson.result.message);
        }
      })
      .catch((error) => {
        Toast.show('服务器请求失败');
      });
  }

  render() {
    if (this.state.status == true) {
      return (
        <View style={{ flex: 1 }}>
          <View style={s.price}>
            <View style={{ flexDirection: 'row' }}>
              <Text>订单号：{this.state.result.order.ordersn}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text>需支付：</Text>
              <Text style={{ color: 'red' }}>&yen;{this.state.result.order.price}</Text>
            </View>
          </View>
          <View style={s.pay}>
            <Text style={s.title}>支付方式：</Text>
            <View style={s.box}>
              <Image source={require('../assets/images/creditpay.png')} style={s.img} />
              <Text style={s.text}>余额支付（当前余额<Text style={{ color: 'red' }}>&yen;{this.state.result.member.credit2}</Text>）</Text>
              <TouchableOpacity onPress={() => {
                this._paycheck();
              }} style={{ flex: 1 }}>
                {this.state.payType == 'credit' ? <Icon name="check-circle" size={25} color={'#EF4F4F'} /> : <Icon name="circle-thin" size={25} />}
              </TouchableOpacity>
            </View>
            <View style={s.box}>
              <Image source={require('../assets/images/wxpay.png')} style={s.img} />
              <Text style={s.text}>微信支付</Text>
              <TouchableOpacity onPress={() => this.setState({ payType: 'wx' })} style={{ flex: 1 }}>
                {this.state.payType == 'wx' ? <Icon name="check-circle" size={25} color={'#EF4F4F'} /> : <Icon name="circle-thin" size={25} />}
              </TouchableOpacity>
            </View>
            <View style={s.box}>
              <Image source={require('../assets/images/alipay.png')} style={s.img} />
              <Text style={s.text}>支付宝</Text>
              <TouchableOpacity onPress={() => this.setState({ payType: 'ali' })} style={{ flex: 1 }}>
                {this.state.payType == 'ali' ? <Icon name="check-circle" size={25} color={'#EF4F4F'} /> : <Icon name="circle-thin" size={25} />}
              </TouchableOpacity>
            </View>
          </View>
          <View style={s.sub}>
            {this.state.payType!=null?
              <TouchableOpacity onPress={() => this._gopay()}>
              <Text style={s.subText}>{this.state.payType == 'credit' ? '余额' : null}{this.state.payType == 'we' ? '微信' : null}{this.state.payType == 'ali' ? '支付宝' : null}支付</Text>
            </TouchableOpacity>:null}
          </View>
          {this.renderActivityIndicator()}
        </View>
      )
    } else {
      return false;
    }
  }

  renderActivityIndicator() {
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.state.showActivityIndicator}
        onRequestClose={() => null}
      >
        <Text style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}></Text>
        <ActivityIndicator style={s.load} color={'#fff'} />
      </Modal>
    )
  }

  _paycheck() {
    let params = '&id=' + this.props.navigation.state.params.id;
    fetch(PAYCHECK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status == 1) {
          this.setState({ payType: 'credit' });
        } else {
          Toast.show(responseJson.result.message);
        }
      })
      .catch((error) => {
        Toast.show('服务器请求失败');
      });
  }

  _gopay() {
    this.setState({showActivityIndicator:true});
    let type = this.state.payType=='credit'?'credit':null;
    let params = '&id=' + this.props.navigation.state.params.id+'&type='+type;
    fetch(PAYCOMPLETE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status == 1) {
          this._paySuccess(responseJson.result.result)
        } else {
          Toast.show(responseJson.result.message);
        }
      })
      .catch((error) => {
        Toast.show('服务器请求失败');
      });
  }

  _paySuccess(result){
    let params = '&id=' + this.props.navigation.state.params.id+'&result='+result+'&app=1';
    fetch(PAYSUCCESS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status == 1) {
          this.setState({showActivityIndicator:false});
          this.props.navigation.navigate('PaySuccess',{result:responseJson.result,token:this.props.navigation.state.params.token})
        } else {
          Toast.show(responseJson.result.message);
        }
      })
      .catch((error) => {
        Toast.show('服务器请求失败');
      });
  }
}


const s = StyleSheet.create({
  load: { position: 'absolute', top: ScreenHeight * 0.5, left: ScreenWidth * 0.5 },
  subText: {
    backgroundColor: 'red', padding: 10, borderRadius: 5, color: '#fff', textAlign: 'center'
  },
  sub: {
    padding: 10, position: 'absolute', bottom: 0, width: ScreenWidth
  },
  text: {
    flex: 9, paddingLeft: 50
  },
  img: {
    flex: 1, height: 30
  },
  box: { flexDirection: 'row', padding: 10, alignItems: 'center' },
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
