"use strict";


import React, { Component } from 'react';

import { AppRegistry, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { cart } from '../actions/cartAction';
import { ScreenWidth, ScreenHeight, CART_SELECT_URL, CART_UPDATE_URL, CART_REMOVE_URL } from '../common/global';
import Toast from 'react-native-root-toast';
import { NavigationActions } from 'react-navigation';

class Cart extends Component {

  constructor(...props) {
    super(...props)
    this.state = {
      isedit: false,
      ids: [],
    }
  }

  componentDidUpdate(nextProps) {
    let { loginData, memberData } = this.props;
    //请求购物车
    if (loginData.status === "success" && memberData.status !== "success") {
      this.props.dispatch(cart(loginData.data.result.token))
    }
  }

  render() {
    if (this.props.loginData.status === 'success') {
      if (this.props.cartData.status === 'success') {
        return this.cartRender();
      } else {
        return false;
      }
    } else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ textAlign: 'center', fontSize: 20 }}>您还没有登陆哦~</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={{ textAlign: 'center', fontSize: 18, backgroundColor: '#0271BC', borderRadius: 10, padding: 10, color: '#fff', marginTop: 10 }}>立即登录</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  cartRender() {
    if (this.props.cartData.data.result.list.length > 0) {
      let cartList = this.props.cartData.data.result.list;//购物车列表
      let total = this.props.cartData.data.result.total;//购物车统计数量
      let totalprice = this.props.cartData.data.result.totalprice;//购物车统计价格
      let ischeckall = this.props.cartData.data.result.ischeckall;//购物车是否全选
      let cartListArr = [];
      for (let i = 0; i < cartList.length; i++) {
        cartListArr.push(
          <View key={i} style={styles.listView}>
            <View style={styles.listA}>
              {this.state.isedit ?
                <TouchableOpacity onPress={() => this.setState({
                  ids: this._editIds(cartList[i].id),
                })}>
                  {this.renderCheckIcon(cartList[i].id)}
                </TouchableOpacity> :
                <TouchableOpacity onPress={() => { this._select(cartList[i].id, cartList[i].selected) }}>
                  {cartList[i].selected == 1 ? <Icon name="check-circle" size={25} color={'#EF4F4F'} /> : <Icon name="circle-thin" size={25} />}
                </TouchableOpacity>
              }
            </View>
            <View style={{ flex: 2, justifyContent: 'center' }}>
              <Image source={{ uri: cartList[i].thumb }} style={styles.img} />
            </View>
            <View style={{ flex: 8 }}>
              <Text numberOfLines={1} style={{ marginBottom: 10 }}>{cartList[i].title}</Text>
              {this.ctitleRender(cartList[i])}
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 5 }}>
                  <Text style={styles.price}>&yen;<Text style={{ fontSize: 18 }}>{cartList[i].marketprice}</Text></Text>
                </View>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity onPress={() => this._total(cartList[i].id, cartList[i].total, 'minus')}>
                    <Text style={styles.minusPlus}>-</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}><Text style={styles.num}>{cartList[i].total}</Text></View>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity onPress={() => this._total(cartList[i].id, cartList[i].total, 'plus')}>
                    <Text style={styles.minusPlus}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </View>
        )
      }
      return (
        <View style={styles.cartView}>
          {this.renderTop()}
          <ScrollView showsVerticalScrollIndicator={false} style={{ width: ScreenWidth }}>
            <View style={{ backgroundColor: 'white', flexDirection: 'row', borderBottomWidth: 1, borderColor: '#eee', padding: 10, alignItems: 'center' }}>
              <Text style={{ fontFamily: 'iconfont', fontSize: 25, marginRight: 10, flex: 1 }}>&#xe60c;</Text>
              <Text style={{ flex: 10 }}>自营店铺</Text>
              <Icon name="angle-right" size={20} style={{ flex: 0.5 }} />
            </View>
            {cartListArr}
            <Text style={{ textAlign: 'center', padding: 10 }}>DUANG~已经到底了哦</Text>
            <View style={{ height: 100 }}></View>
          </ScrollView>
          {this.state.isedit ? this.cartBottomEditRender(cartList) :
            <View style={styles.cartBottom}>
              <View style={styles.cartBottomA}>
                <TouchableOpacity onPress={() => this._select('all', ischeckall)}>
                  {ischeckall == '1' ? <Icon name="check-circle" size={25} color={'#EF4F4F'} /> : <Icon name="circle-thin" size={25} />}
                </TouchableOpacity>
                <Text style={{ paddingLeft: 10 }}>全选</Text>
              </View>
              <View style={{ flex: 5 }}>
                <Text>合计：<Text style={{ color: 'red' }}>&yen;{totalprice}</Text></Text>
                <Text>不含运费</Text>
              </View>
              <View style={{ flex: 3 }}>
                <View style={{ flexDirection: 'row' }}>
                  {total == 0 ?
                    <Text style={styles.payBtnGray}>结算({total})</Text> :
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('OrderCreateView', { type: 'cart' })}>
                      <Text style={styles.payBtn}>结算({total})</Text>
                    </TouchableOpacity>
                  }
                </View>
              </View>
            </View>
          }
        </View>
      )
    } else {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Icon name="shopping-cart" size={80} color={'#aaa'} />
          <Text style={{ color: '#aaa' }}>购物车空空如也~</Text>
        </View>
      )
    }
  }

  renderCheckIcon(id) {
    for (let key in this.state.ids) {
      if (this.state.ids[key] == id) {
        return (<Icon name="check-circle" size={25} color={'#EF4F4F'} />)
      }
    }
    return (<Icon name="circle-thin" size={25} />)
  }

  _editIds(id) {
    let ids = this.state.ids;
    for (let key in this.state.ids) {
      if (this.state.ids[key] == id) {
        ids.splice(key, 1);
        return ids;
      }
    }
    return this.state.ids.concat(id)
  }

  cartBottomEditRender(cartList) {
    let count = cartList.length;
    return (
      <View style={styles.cartBottom}>
        <View style={styles.cartBottomA}>
          <TouchableOpacity onPress={() => this._editCheckAll()}>
            {count == this.state.ids.length ? <Icon name="check-circle" size={25} color={'#EF4F4F'} /> : <Icon name="circle-thin" size={25} />}
          </TouchableOpacity>
          <Text style={{ paddingLeft: 10 }}>全选</Text>
        </View>
        <View style={{ flex: 5 }}></View>
        <View style={{ flex: 3 }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => this._remove()}>
              <Text style={styles.payBtn}>删除</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  _remove() {
    let params = '&ids[]=' + this.state.ids;
    this._fetch(CART_REMOVE_URL, params);
  }

  _editCheckAll() {
    let cartList = this.props.cartData.data.result.list;
    let checkedALL = cartList.length == this.state.ids.length ? 0 : 1;
    let idArr = [];
    this.setState({
      ids: [],
    })
    if (checkedALL == 1) {
      for (let j = 0; j < cartList.length; j++) {
        idArr = idArr.concat(cartList[j].id)
      }
      this.setState({
        ids: idArr,
      })
    }
  }

  ctitleRender(data) {
    return data.isdiscount == 1 ? this.textRender('促销', '#ff00ff') : null;
  }

  textRender(text, color) {
    return (
      <Text numberOfLines={2} style={{ borderRadius: 5, backgroundColor: color, color: '#fff', width: 50, textAlign: 'center', marginBottom: 10 }}>{text}</Text>
    )
  }

  renderTop() {
    return (
      <View style={styles.cartTop}>
        <View style={styles.cartTitle}><Text style={styles.colorWhite}>我的购物车</Text></View>
        <View style={styles.cartEdit}>
          <TouchableOpacity onPress={() => this.setState({ isedit: !this.state.isedit })}>
            <Text style={styles.colorWhite}>{this.state.isedit ? '完成' : '编辑'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  _select(id, select) {
    let sel = select == 1 ? 0 : 1;
    let params = '&id=' + id + '&select=' + sel;
    this._fetch(CART_SELECT_URL, params);
  }

  _total(id, total, type) {
    if (type === 'minus') {
      let num = total - 1;
      if (num >= 1) {
        let params = '&id=' + id + '&total=' + num;
        this._fetch(CART_UPDATE_URL, params);
      }
    }
    if (type === 'plus') {
      let num = total * 1 + 1;
      let params = '&id=' + id + '&total=' + num;
      this._fetch(CART_UPDATE_URL, params);
    }
  }

  _fetch(url, params) {
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
          if (this.state.isedit) { this.setState({ isedit: false }) }
          this.props.dispatch(cart(this.props.loginData.data.result.token))
        } else {
          Toast.show('服务器请求失败');
          this.props.dispatch(cart(this.props.loginData.data.result.token))
        }
      })
      .catch((error) => {
        Toast.show('服务器请求失败');
      });
  }
}

const styles = StyleSheet.create({
  cartView: {
    alignItems: 'center', flex: 1
  },
  cartTop: {
    flexDirection: 'row', paddingLeft: 10, paddingRight: 10, paddingBottom: 15, backgroundColor: '#C10001', borderBottomWidth: 1, borderColor: '#aaa', marginBottom: 10, paddingTop: 10
  },
  cartTitle: {
    flex: 8, justifyContent: 'center', alignItems: 'center'
  },
  cartEdit: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  colorWhite: {
    color: '#fff'
  },
  cartBottom: {
    width: ScreenWidth, position: 'absolute', bottom: 0, flexDirection: 'row', backgroundColor: '#fff', padding: 10, borderTopWidth: 1, borderColor: '#ddd'
  },
  cartBottomA: {
    flexDirection: 'row', flex: 2
  },
  payBtn: {
    textAlign: 'center', width: 100, borderRadius: 10, color: '#fff', backgroundColor: '#EF4F4F', padding: 10
  },
  listView: {
    flexDirection: 'row', backgroundColor: '#fff', padding: 10, borderBottomWidth: 1, borderColor: '#ddd'
  },
  listA: {
    flex: 1, alignItems: 'center', justifyContent: 'center'
  },
  img: {
    width: 50, height: 50, borderRadius: 10
  },
  minusPlus: {
    flex: 1, borderWidth: 1, borderColor: '#aaa', textAlign: 'center', paddingTop: 3, paddingBottom: 3
  },
  num: {
    flex: 1.5, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#aaa', textAlign: 'center', paddingTop: 3, paddingBottom: 3
  },
  price: {
    color: 'red',
  },
  payBtnGray: {
    textAlign: 'center', width: 100, borderRadius: 10, color: '#fff', backgroundColor: '#aaa', padding: 10
  }
})

function mapStateToProps(state) {
  return {
    loginData: state.loginReducer,
    memberData: state.memberInfoReducer,
    cartData: state.cartReducer
  }
}

export default connect(mapStateToProps)(Cart);