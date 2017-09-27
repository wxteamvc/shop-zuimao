/**
 * Sample React Native App
 * 支付成功页面
 * @flow
 */
"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { ScreenWidth } from '../common/global';
import Icon from 'react-native-vector-icons/FontAwesome';
import Util from '../common/util';
import { PAY_URL, PAYCHECK_URL, PAYCOMPLETE_URL, PAYSUCCESS_URL } from '../common/global';
import Toast from 'react-native-root-toast';

export default class PaySuccess extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    headerTitle: '支付成功',
    headerTitleStyle: { alignSelf: 'center' },
    // headerRight: <Text style={{ marginRight: 20 }} onPress={() => navigation.navigate()}>订单</Text>,
    headerRight: <Text></Text>
  });

  constructor(...props) {
    super(...props);
    this.state = {
    }
  }

  componentWillMount() {
    let result=this.props.navigation.state.params.result;
  }

  render(){
      return(
          <View>
              <Text>支付成功页面</Text>
          </View>
      )
  }
 
}  


const s = StyleSheet.create({
})
