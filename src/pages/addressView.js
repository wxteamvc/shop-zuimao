/**
 * 我的醉猫页面
 */
"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IconT from 'react-native-vector-icons/dist/Foundation';
import { memberInfo, loginOut } from '../actions/memberAction';
import { ScreenWidth } from '../common/global';
import { fontSizeScaler as fs } from '../common/global';
import Toast from 'react-native-root-toast';

class Address extends Component {

  constructor(...props) {
    super(...props);
  }

  componentDidUpdate(nextProps) {
    //请求用户信息
    if (this.props.loginData.status === "success" && this.props.memberData.status === false) {
      let token = this.props.loginData.data.result.token;
      this.props.dispatch(address(token))
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        <ScrollView>
          
         
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

function mapStateToProps(state) {
  return {
    loginData: state.loginReducer,
    memberData: state.memberInfoReducer,
  }
}

export default connect(mapStateToProps)(Address);