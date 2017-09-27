/**
 * Sample React Native App
 * 创建订单
 * @flow
 */
"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput, Modal, Alert } from 'react-native';
import { ORDERCREATE_URL, ORDERCREATECACULATE_URL, ORDERCREATECOUPON_URL, ScreenWidth, StatusBarHeight, ORDERCREATEGETCOUPONPRICE_URL } from '../common/global';
import Toast from 'react-native-root-toast';
import { connect } from 'react-redux';
import Loading from '../component/loading';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

class OrderCreate extends Component {

  constructor(...props) {
    super(...props);
    this.state = {
      status: false,
      showMod: false,
      coupons: null,
      selectedCouponId: null,
      selectedCouponName: null,
      selectedCouponDeductprice: 0,
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
      this._post(ORDERCREATE_URL, this.params);
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
          this._caculate(ORDERCREATECACULATE_URL, {
            // totalPrice:this.result.goodsprice,
            addressid: this.result.address.id,
            dflag: 0,
            goods: this.result.goodslist[0].goods,
          })
        } else {
          Toast.show(responseJson.result.message);
        }
      })
      .catch((error) => {
        Toast.show('服务器请求失败');
      });
  }

  _caculate(url, data) {
    let params = '';
    for (let k in data) {
      params += '&' + k + '=' + data[k];
      if (k == 'goods') {
        let goods = data[k];
        for (let i = 0; i < goods.length; i++) {
          params += '&goods[' + i + '][goodsid]=' + goods[i].goodsid;
          params += '&goods[' + i + '][total]=' + goods[i].total;
          params += '&goods[' + i + '][optionid]=' + goods[i].optionid;
          params += '&goods[' + i + '][marketprice]=' + goods[i].marketprice;
          params += '&goods[' + i + '][merchid]=' + goods[i].merchid;
          params += '&goods[' + i + '][cates]=' + goods[i].cates;
          params += '&goods[' + i + '][discounttype]=' + goods[i].discounttype;
          params += '&goods[' + i + '][isdiscountprice]=' + goods[i].isdiscountprice;
          params += '&goods[' + i + '][discountprice]=' + goods[i].discountprice;
          params += '&goods[' + i + '][isdiscountunitprice]=' + goods[i].isdiscountunitprice;
          params += '&goods[' + i + '][discountunitprice]=' + goods[i].discountunitprice;
        }
      }
    }
    // params += '&app=1';
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
          this.caculate = responseJson.result;
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
        <View style={s.container}>
          <View style={{ backgroundColor: '#fff' }}>
            <View style={s.express}>
              <Text>收获人：{this.result.address.realname}</Text>
              <Text>{this.result.address.mobile}</Text>
            </View>
            <View style={{ flexDirection: 'row', padding: 15 }}>
              <TouchableOpacity style={s.address}>
                <Icon name="map-marker" size={25} style={{ flex: 1 }} />
                <Text style={{ paddingLeft: 20, flex: 23 }}>收获地址：{this.result.address.province}{this.result.address.city}{this.result.address.area} {this.result.address.address}</Text>
                <Icon name="angle-right" size={20} color={'#ccc'} style={{ flex: 1 }} />
              </TouchableOpacity>
            </View>
          </View>
          <Image source={require('../assets/images/border.jpg')} resizeMode={'cover'} style={{ height: 5, marginBottom: 10 }} />
          <ScrollView>
            {this.renderList(goodslist)}
            {this.renderCouponcount()}
            {this.renderPrice()}
          </ScrollView>
          <View style={s.bottom}>
            <View style={s.bottomPrice}>
              <Text>合计：</Text>
              <Text style={{ color: 'red' }}>&yen;{this.caculate.realprice}</Text>
            </View>
            <TouchableOpacity style={s.sub}>
              <Text style={{ color: '#fff' }}>提交订单</Text>
            </TouchableOpacity>
          </View>
          {this.renderMod()}
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

  renderMod() {
    let { goodsprice } = this.result;
    let conpons = [];
    if (this.state.coupons != null) {
      for (let i = 0; i < this.state.coupons.length; i++) {
        conpons.push(
          <TouchableOpacity key={i} style={{ flexDirection: 'row', marginBottom: 10 }} onPress={() => this._selectedCoupon(this.state.coupons[i])}>
            <View style={s.couponL}>
              <Image source={{ uri: this.state.coupons[i].thumb }} style={s.couponImg} />
              <View>
                <Text style={s.couponTitle}>{this.state.coupons[i].couponname}</Text>
                <Text style={{ color: this.state.coupons[i].color == 'blue' ? '#42B5FE' : '#F4558F', paddingLeft: 10 }}>{this.state.coupons[i].backstr}{this.state.coupons[i].backmoney}</Text>
              </View>
            </View>
            <View style={[s.couponR, { backgroundColor: this.state.coupons[i].color == 'blue' ? '#42B5FE' : '#F4558F' }]}>
              <Text style={{ color: '#fff' }}>立即使用</Text>
            </View>
          </TouchableOpacity>
        )
      }
    }
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.state.showMod}
        onRequestClose={() => this.setState({ showMod: false })}
      >
        <Text style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} onPress={() => this.setState({ showMod: false })}></Text>
        <View style={s.mod}>
          <Text style={s.modTitle}>请选择优惠券</Text>
          <ScrollView>
            <View style={{ padding: 15, backgroundColor: '#efefef' }}>
              {conpons}
            </View>
          </ScrollView>
          <View style={s.bottom}>
            <TouchableOpacity style={s.modBtn} onPress={() => {
              this.setState({ 
                showMod: false,
                selectedCouponId: null,
                selectedCouponName: null,
                selectedCouponDeductprice: 0,
              })
            }}>
              <Text>取消使用</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.modBtn} onPress={() => {
              this._useCoupon(ORDERCREATEGETCOUPONPRICE_URL, {
                goodsprice: goodsprice,
                couponid: this.state.selectedCouponId,
                discountprice: this.caculate.discountprice,
                isdiscountprice: this.caculate.isdiscountprice,
                goods: this.result.goodslist[0].goods,
              });
            }}>
              <Text style={{ color: 'red' }}>立即使用</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  _useCoupon(url, data) {
    if (this.state.selectedCouponId != null) {
      let params = '';
      for (let k in data) {
        params += '&' + k + '=' + data[k];
        if (k == 'goods') {
          let goods = data[k];
          for (let i = 0; i < goods.length; i++) {
            params += '&goods[' + i + '][goodsid]=' + goods[i].goodsid;
            params += '&goods[' + i + '][total]=' + goods[i].total;
            params += '&goods[' + i + '][optionid]=' + goods[i].optionid;
            params += '&goods[' + i + '][marketprice]=' + goods[i].marketprice;
            params += '&goods[' + i + '][merchid]=' + goods[i].merchid;
            params += '&goods[' + i + '][cates]=' + goods[i].cates;
            params += '&goods[' + i + '][discounttype]=' + goods[i].discounttype;
            params += '&goods[' + i + '][isdiscountprice]=' + goods[i].isdiscountprice;
            params += '&goods[' + i + '][discountprice]=' + goods[i].discountprice;
            params += '&goods[' + i + '][isdiscountunitprice]=' + goods[i].isdiscountunitprice;
            params += '&goods[' + i + '][discountunitprice]=' + goods[i].discountunitprice;
          }
        }
      }
      // params += '&app=1';
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
            this.setState({ showMod: false, selectedCouponId: null, selectedCouponDeductprice: responseJson.result.deductprice });
            this.caculate.realprice = responseJson.result.totalprice - responseJson.result.deductprice;
            this.forceUpdate();
          } else {
            Toast.show(responseJson.result.message);
          }
        })
        .catch((error) => {
          Toast.show('服务器请求失败');
        });
    } else {
      Alert.alert('温馨提醒', '请选择优惠券', [
        { text: '确定' }
      ])
    }

  }

  _selectedCoupon(coupon) {
    this.setState({ selectedCouponId: coupon.id, selectedCouponName: coupon.couponname })
  }

  renderCouponcount() {
    if (this.caculate.couponcount > 0) {
      return (
        <View>
          <TouchableOpacity style={s.couponcount} onPress={() => this._conpon()}>
            <Text style={{ flex: 3 }}>优惠券:</Text>
            <Text style={{ flex: 15 }}>{this.state.selectedCouponName == null ? '未使用优惠券' : this.state.selectedCouponName}{this.state.selectedCouponDeductprice > 0 ? <Text style={{ color: 'red' }}>&nbsp;-&nbsp;&yen;{this.state.selectedCouponDeductprice}</Text> : null}</Text>
            <Text style={{ color: 'red', flex: 0.8 }}>{this.caculate.couponcount}</Text>
            <Icon name="angle-right" size={20} color={'#ccc'} style={{ flex: 0.5 }} />
          </TouchableOpacity>
        </View>
      )
    }
  }

  _conpon() {
    this._getConpon(ORDERCREATECOUPON_URL, { money: 0, type: 0, goods: this.result.goodslist[0].goods })
  }

  _getConpon(url, data) {
    let params = '';
    for (let k in data) {
      params += '&' + k + '=' + data[k];
      if (k == 'goods') {
        let goods = data[k];
        for (let i = 0; i < goods.length; i++) {
          params += '&goods[' + i + '][goodsid]=' + goods[i].goodsid;
          params += '&goods[' + i + '][total]=' + goods[i].total;
          params += '&goods[' + i + '][optionid]=' + goods[i].optionid;
          params += '&goods[' + i + '][marketprice]=' + goods[i].marketprice;
          params += '&goods[' + i + '][merchid]=' + goods[i].merchid;
          params += '&goods[' + i + '][cates]=' + goods[i].cates;
          params += '&goods[' + i + '][discounttype]=' + goods[i].discounttype;
          params += '&goods[' + i + '][isdiscountprice]=' + goods[i].isdiscountprice;
          params += '&goods[' + i + '][discountprice]=' + goods[i].discountprice;
          params += '&goods[' + i + '][isdiscountunitprice]=' + goods[i].isdiscountunitprice;
          params += '&goods[' + i + '][discountunitprice]=' + goods[i].discountunitprice;
        }
      }
    }
    // params += '&app=1';
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
            showMod: true,
            coupons: responseJson.result.coupons
          });
        } else {
          Toast.show(responseJson.result.message);
        }
      })
      .catch((error) => {
        Toast.show('服务器请求失败');
      });
  }

  renderPrice() {
    return (
      <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
        {this.renderPriceTotal()}
      </View>
    )
  }

  renderPriceTotal() {
    let { exchangeOrder, packageid, goodsprice, exchangecha, buyagainprice, exchangepostage, dispatchprice } = this.result;
    let arr = [], i = 0;
    if (exchangeOrder != '' && exchangeOrder != null) {
      arr.push(
        <View key={++i} style={s.totalPrice}>
          <Text>兑换券：</Text>
          <Text style={{ color: 'red' }}>&yen;{exchangecha}</Text>
        </View>
      )
    }
    arr.push(
      <View key={++i} style={s.totalPrice}>
        <Text>商品小计：</Text>
        <Text style={{ color: 'red' }}>&yen;{goodsprice}</Text>
      </View>
    )
    if (exchangeOrder == '' || exchangeOrder == null) {
      if (packageid == 0) {
        if (buyagainprice > 0) {
          arr.push(
            <View key={++i} style={s.totalPrice}>
              <Text>重复购买优惠:</Text>
              <Text style={{ color: 'red' }}>&nbsp;-&nbsp;&yen;{buyagainprice}</Text>
            </View>
          )
        }
        if (this.caculate.taskdiscountprice > 0) {
          arr.push(
            <View key={++i} style={s.totalPrice}>
              <Text>任务活动优惠:</Text>
              <Text style={{ color: 'red' }}>&nbsp;-&nbsp;&yen;{this.caculate.taskdiscountprice}</Text>
            </View>
          )
        }
        if (this.caculate.discountprice > 0) {
          arr.push(
            <View key={++i} style={s.totalPrice}>
              <Text>会员优惠:</Text>
              <Text style={{ color: 'red' }}>&nbsp;-&nbsp;&yen;{this.caculate.discountprice}</Text>
            </View>
          )
        }
        if (this.caculate.isdiscountprice > 0) {
          arr.push(
            <View key={++i} style={s.totalPrice}>
              <Text>促销优惠:</Text>
              <Text style={{ color: 'red' }}>&nbsp;-&nbsp;&yen;{this.caculate.isdiscountprice}</Text>
            </View>
          )
        }
        if (this.caculate.deductenough_money > 0) {
          arr.push(
            <View key={++i} style={s.totalPrice}>
              <Text>商城单笔满{saleset.enoughmoney}元立减:</Text>
              <Text style={{ color: 'red' }}>&nbsp;-&nbsp;&yen;{this.caculate.deductenough_money}</Text>
            </View>
          )
        }
        if (this.caculate.merch_deductenough_money > 0) {
          arr.push(
            <View key={++i} style={s.totalPrice}>
              <Text>商户单笔满{saleset.enoughmoney}元立减:</Text>
              <Text style={{ color: 'red' }}>&nbsp;-&nbsp;&yen;{this.caculate.merch_deductenough_money}</Text>
            </View>
          )
        }
        if (this.caculate.seckillprice > 0) {
          arr.push(
            <View key={++i} style={s.totalPrice}>
              <Text>秒杀优惠:</Text>
              <Text style={{ color: 'red' }}>&nbsp;-&nbsp;&yen;{seckthis.caculate.seckillprice}</Text>
            </View>
          )
        }
      }
      arr.push(
        <View key={++i} style={s.totalPriceLast}>
          <Text>运费:</Text>
          <Text style={{ color: 'red' }}>&yen;{this.caculate.price}</Text>
        </View>
      )

    }
    return arr;
  }

  renderList(list) {
    let goods = [];
    for (let i = 0; i < list.length; i++) {
      goods.push(
        <View key={i} style={s.listBox}>
          <View style={s.list}>
            <Text style={s.shopIcon}>&#xe60c;</Text>
            <Text>{list[i].shopname}</Text>
          </View>
          {this.renderImgList(list[i].goods)}
          {this.renderRemark()}
        </View>
      )

    }
    return goods;
  }

  renderRemark() {
    return (
      <View style={s.remark}>
        <Text style={{ flex: 1 }}>留言：</Text>
        <TextInput
          style={{ flex: 6 }}
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
        <View key={j} style={s.goodsBox}>
          <View style={[{ flex: 1 / 3 }, s.center]}>
            <Image source={{ uri: imgs[j].thumb }} style={{ height: 100, width: 100 }} />
          </View>
          <View style={[s.columnBetween, { flex: 2 / 3 }]}>
            <View>
              <Text style={{ color: '#000' }}>{imgs[j].isnodiscount == 0 && imgs[j].dflag != 0 ?
                <Text style={{ color: '#fff', backgroundColor: '#EF4F4F' }}>&nbsp;折扣&nbsp;</Text> :
                null}&nbsp;{imgs[j].title}</Text>
            </View>
            <View style={s.rowBetween}>
              <Text style={{ color: 'red' }}>&yen;{imgs[j].marketprice}</Text>
              <Text>&times;&nbsp;{imgs[j].total}</Text>
            </View>
          </View>
        </View>
      )
    }
    return imgsArr;
  }

}


const s = StyleSheet.create({
  modBtn: {
    flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10
  },
  couponTitle: {
    fontSize: 18, fontWeight: 'bold', color: '#000', padding: 10
  },
  couponImg: {
    width: 60, height: 60, margin: 10
  },
  couponR: {
    justifyContent: 'center', alignItems: 'center', flex: 1, borderTopRightRadius: 10, borderBottomRightRadius: 10
  },
  couponL: {
    backgroundColor: '#fff', flexDirection: 'row', flex: 3, borderTopLeftRadius: 10, borderBottomLeftRadius: 10
  },
  modTitle: {
    width: ScreenWidth, textAlign: 'center', padding: 10, borderBottomWidth: 1, borderColor: '#eee'
  },
  mod: {
    backgroundColor: '#fff', position: 'absolute', bottom: 0, height: 250
  },
  couponcount: {
    flexDirection: 'row', padding: 15, marginTop: 10, backgroundColor: '#fff'
  },
  goodsBox: {
    flexDirection: 'row', paddingTop: 10, paddingBottom: 10, backgroundColor: '#FAFAFA'
  },
  remark: {
    paddingLeft: 25, flexDirection: 'row', alignItems: 'center'
  },
  shopIcon: {
    fontFamily: 'iconfont', fontSize: 25, marginRight: 10
  },
  listBox: {
    backgroundColor: '#fff', marginTop: 10
  },
  list: {
    padding: 10, paddingBottom: 10, flexDirection: 'row', alignItems: 'center'
  },
  totalPriceLast: {
    marginLeft: 20, marginRight: 20, padding: 10, flexDirection: 'row', justifyContent: 'flex-end'
  },
  totalPrice: {
    marginLeft: 20, marginRight: 20, padding: 10, flexDirection: 'row', justifyContent: 'flex-end', borderBottomWidth: 1, borderColor: '#eee'
  },
  sub: {
    flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red', padding: 10
  },
  bottomPrice: {
    flex: 2, flexDirection: 'row', justifyContent: 'flex-end', padding: 10
  },
  bottom: {
    flexDirection: 'row', borderTopWidth: 1, borderColor: '#ccc', backgroundColor: '#fff'
  },
  address: {
    flex: 1, flexDirection: 'row', alignItems: 'center'
  },
  express: {
    flexDirection: 'row', paddingTop: 15, paddingRight: 15, paddingLeft: 50, justifyContent: 'space-between'
  },
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