/**
 * Sample React Native App
 * 创建订单
 * @flow
 */
"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image,TextInput } from 'react-native';
import { ORDERCREATE_URL, ORDERCREATECACULATE_URL, ScreenWidth, StatusBarHeight } from '../common/global';
import Toast from 'react-native-root-toast';
import { connect } from 'react-redux';
import Loading from '../component/loading';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

class OrderCreate extends Component {

  constructor(...props) {
    super(...props);
    this.state = {
      status: false,
    }
    this.result = {};
    let token = '';
    for (let key in this.props.loginData.data.result.token) {
      token = this.props.loginData.data.result.token[key];
    }
    this.type = this.props.navigation.state.params.type;
    if (this.type == 'goodsInfo') {
      this.params = {
        id: this.props.navigation.state.params.id,
        total: this.props.navigation.state.params.total,
        optionid: this.props.navigation.state.params.optionid,
        giftid: this.props.navigation.state.params.giftid,
        token: token
      }
    }
  }

  componentDidMount() {
    if (this.type == 'goodsInfo') {
      this._post(ORDERCREATE_URL, this.params)
    }
  }

  _post(url, data) {
    let params = '';
    for (let k in data) {
      params += '&' + k + '=' + data[k];
    }
    params += '&app=1';
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
          this.result = responseJson.result;
          this.setState({ status: true });
        } else {
          Toast.show(responseJson.result.message);
        }
      })
      .catch((error) => {
        Toast.show('服务器请求失败');
      });
  }

  render() {
    if (this.state.status) {
      let goodslist = this.result.goodslist;
      return (
        <View style={styles.container}>
          <View style={{ backgroundColor: '#fff' }}>
            <View style={{ flexDirection: 'row', paddingTop: 15, paddingRight: 15, paddingLeft: 50, justifyContent: 'space-between' }}>
              <Text>收获人：{this.result.address.realname}</Text>
              <Text>{this.result.address.mobile}</Text>
            </View>
            <View style={{ flexDirection: 'row', padding: 15 }}>
              <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="map-marker" size={25} style={{ flex: 1 }} />
                <Text style={{ paddingLeft: 20, flex: 23 }}>收获地址：{this.result.address.province}{this.result.address.city}{this.result.address.area} {this.result.address.address}</Text>
                <Icon name="angle-right" size={20} color={'#ccc'} style={{ flex: 1 }} />
              </TouchableOpacity>
            </View>
          </View>
          <Image source={require('../assets/images/border.jpg')} resizeMode={'cover'} style={{ height: 5, marginBottom: 10 }} />
          <ScrollView>
            {this.renderList(goodslist)}
            <View style={{ height: 300 }}></View>
          </ScrollView>
        </View>
      )
    } else {
      return (
        <View style={{ flex: 1, }}>
          <Loading status={this.state.status} errmessage={this.state.errmessage} />
        </View>
      )
    }
  }

  renderList(list) {
    let goods = [];
    for (let i = 0; i < list.length; i++) {
      goods.push(
        <View key={i} style={{ backgroundColor: '#fff', marginTop: 10 }}>
          <View style={{ padding: 10, paddingBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontFamily: 'iconfont', fontSize: 25, marginRight: 10 }}>&#xe60c;</Text>
            <Text>{list[i].shopname}</Text>
          </View>
          {this.renderImgList(list[i].goods)}
          {this.renderDiscount(list)}
        </View>
      )

    }
    return goods;
  }

  renderDiscount(list) {
    return (
      <View style={{paddingLeft:25,flexDirection:'row',alignItems:'center'}}>
        <Text style={{flex:1}}>留言：</Text>
        <TextInput
          style={{flex:6}}
          onChangeText={(text) => null}
          multiline={true}
          placeholder='可填'
          underlineColorAndroid="transparent"
        />
      </View>
    )
  }

  renderImgList(imgs) {
    let imgsArr = [];
    for (let j = 0; j < imgs.length; j++) {
      imgsArr.push(
        <View key={j} style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, backgroundColor: '#FAFAFA' }}>
          <View style={[{ flex: 1 / 3 }, styles.center]}>
            <Image source={{ uri: imgs[j].thumb }} style={{ height: 100, width: 100 }} />
          </View>
          <View style={[styles.columnBetween, { flex: 2 / 3 }]}>
            <View>
              <Text style={{ color: '#000' }}>{imgs[j].isnodiscount == 0 && imgs[j].dflag != 0 ?
                <Text style={{ color: '#fff', backgroundColor: '#EF4F4F' }}>&nbsp;折扣&nbsp;</Text> :
                null}&nbsp;{imgs[j].title}</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text style={{ color: 'red' }}>&yen;{imgs[j].marketprice}</Text>
              <Text>&times;&nbsp;2</Text>
            </View>
          </View>
        </View>
      )
    }
    return imgsArr;
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },
  // 居中
  center: {
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
  //垂直两端布局
  columnBetween: {
    flexDirection: 'column', justifyContent: 'space-between', padding: 10,
  },
  //水平两端布局
  rowBetween: {
    flexDirection: 'row', justifyContent: 'space-between',
  },
})


function mapStateToProps(state) {
  return {
    loginData: state.loginReducer,
  }
}

export default connect(mapStateToProps)(OrderCreate);