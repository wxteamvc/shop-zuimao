/**
 * 地址管理页面
 */
"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity,Alert } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { address } from '../actions/addressAction';
import { ScreenWidth } from '../common/global';
import { ADDRESSDEFAULT_URL,ADDRESSDELETE_URL,ADDRESSEDIT_URL } from '../common/global';
import Toast from 'react-native-root-toast';
import Util from '../common/util';

class AddressEdit extends Component {

  constructor(...props) {
    super(...props);
  }



  render() {
 
      return (
        <View style={{ flex: 1 }}>
          <Text>123</Text>
        </View>
      );
    }


}  

const s = StyleSheet.create({
 
});

function mapStateToProps(state) {
  return {
    addressData: state.addressReducer,
  }
}

export default connect(mapStateToProps)(AddressEdit);