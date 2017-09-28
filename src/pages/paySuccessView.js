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

  // componentWillMount() {
  //   let result=this.props.navigation.state.params.result;
  // }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={[styles.center, { flex: 0.35 }]}>
            <Icon name={'truck'} color={'#fff'} size={30} />
          </View>
          <View style={{ flex: 0.55 }}>
            <Text style={styles.text1}>订单支付成功</Text>
            <Text style={styles.text2}>您的包裹整装待发</Text>
          </View>
        </View>
        <View style={styles.middle}>
          <View style={[styles.center, { flex: 0.1 }]}>
            <Icon name={'map-marker'} size={15} />
          </View>
          <View style={{ flex: 0.9 }}>
            <Text style={{ fontSize: 14, marginBottom: 5, }}>测试 13900000000</Text>
            <Text style={{ fontSize: 12, }}>
              北京市北京辖区东城区朝阳区玄武区永安区北京市北京辖区东城区朝阳区玄武区永安区
              </Text>
          </View>
        </View>
        <View style={[styles.rowBetween,styles.middle2]}>
          <Text>实付金额</Text>
          <Text style={{ color: 'red' }}>&yen;19.90</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <View style={styles.center}>
            <TouchableOpacity style={styles.btn}>
              <Text style={{ color: 'red' }}>订单详情</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.center}>
            <TouchableOpacity style={styles.btn}>
              <Text style={{ color: 'red' }}>返回首页</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

}
const styles = StyleSheet.create({
  // 居中
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  //水平分布居中
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  //水平分布垂直居中
  rowYCenter: {
    flexDirection: 'row', alignItems: 'center',
  },
  //水平两端布局
  rowBetween: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },
  top:{
    flexDirection: 'row', backgroundColor: '#C10001', paddingTop: 20, paddingBottom: 20
  },
  text1:{
    fontSize: 16, marginBottom: 5, color: '#fff'
  },
  text2:{
    fontSize: 12, color: '#fff'
  },
  middle:{
    flexDirection: 'row', backgroundColor: '#fff', margin: 10, paddingTop: 5, paddingBottom: 5
  },
  middle2:{
    marginLeft: 10, marginRight: 10, backgroundColor: '#fff', paddingTop: 10, paddingBottom: 10
  },
  btn:{
    padding: 5, paddingLeft: 25, paddingRight: 25, borderColor: 'red', borderWidth: 0.7, borderRadius: 5 
  }
})
