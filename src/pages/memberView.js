/**
 * 我的醉猫页面
 */
"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IconT from 'react-native-vector-icons/dist/Foundation';
import { memberInfo, loginOut, updateMemberInfo } from '../actions/memberAction';
import { ScreenWidth } from '../common/global';
import { fontSizeScaler as fs } from '../common/global';
import Toast from 'react-native-root-toast';

class Member extends Component {

  constructor(...props) {
    super(...props);
    this.state = {
      confBGC: 'transparent',
      iconC: '#fff',
    }
  }

  componentDidUpdate(nextProps) {
    //请求用户信息
    if (this.props.loginData.status === "success" && this.props.memberData.status !== 'success') {
      let token = this.props.loginData.data.result.token;
      this.props.dispatch(memberInfo(token))
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} onScroll={(e) => this._conBGC(e)}>
          <View style={styles.topView}>
            <View style={styles.row}>
              <View style={styles.userIconView}>
                <Icon name='user-o' color={'#C10001'} size={50} />
              </View>
              <View style={styles.loginStatus}>
                {this.renderText()}
              </View>
            </View>
          </View>
          {this.renderOrder()}
          {this.renderMoney()}
          {this.renderOther()}
          {this.renderLoginOut()}
        </ScrollView>
        <View style={{ backgroundColor: this.state.confBGC, paddingTop: 20, position: 'absolute', top: 0, width: ScreenWidth }}>
          <View style={styles.conf}>
            <TouchableOpacity>
              <Icon name='cog' color={this.state.iconC} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name='commenting-o' color={this.state.iconC} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        
      </View>
    );
  }

  _conBGC(e) {
    if (e.nativeEvent.contentOffset.y >= 125) {
      this.setState({
        confBGC: 'rgba(255, 255, 255,0.5)',
        iconC: '#000',
      })
    }
    else {
      this.setState({
        confBGC: 'transparent',
        iconC: '#fff',
      })
    }
  }

  //登陆状态文字
  renderText() {
    if (this.props.loginData.status === "success" ) {
      if(this.props.memberData.status === "success"){
        let memberData = this.props.memberData.data.result.member;
        let name = memberData.realname == null || memberData.realname == '' ? memberData.nickname : memberData.realname;
        let levelname = memberData.levelname == null || memberData.levelname == '' ? '[普通会员]' : memberData.levelname;
        return (
          <View>
            <Text style={[styles.fontWhite, { fontSize: 18 }]}>{name}</Text>
            <Text style={styles.fontWhite}>{levelname}</Text>
          </View>
  
        )
      }else{
        return false
      }
    } else {
      return (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={[styles.fontWhite, styles.fontS]}>登陆/注册 〉</Text>
        </TouchableOpacity>
      )
    }
  }

  //订单
  renderOrder() {
    let islogin = this.props.loginData.status === "success" && this.props.memberData.status === "success";
    let member;
    if (islogin) {
      member = this.props.memberData.data.result.member;
    }
    return (
      <View style={styles.modView}>
        <View style={styles.modTop}>
          <View style={styles.modTopTextL}>
            <Text style={[styles.fontS, { marginRight: 5 }]}>我的订单</Text>
          </View>
          <TouchableOpacity onPress={() => islogin ? this.props.navigation.navigate('OrderList', { search: { status: '' } }) : this._unlogin()}>
            <View style={styles.modTopTextR}>
              <Text style={[styles.fontS, { marginRight: 5 }]}>查看全部订单</Text>
              <Icon name="angle-right" size={20} color={'#ccc'} style={{ marginRight: 5, marginTop: 5 }} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.modBottom}>
          <View style={styles.modBottomList}>
            <TouchableOpacity onPress={() => islogin ? this.props.navigation.navigate('OrderList', { search: { status: 0 } }) : this._unlogin()}>
              <View style={styles.center}>
                <Icon name="address-card-o" size={30} color={'#aaa'} />
                <Text style={styles.fontS}>待付款</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.modBottomList}>
            <TouchableOpacity onPress={() => islogin ? this.props.navigation.navigate('OrderList', { search: { status: 1 } }) : this._unlogin()}>
              <View style={styles.center}>
                <Icon name="cube" size={30} color={'#aaa'} />
                <Text style={styles.fontS}>待发货</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.modBottomList}>
            <TouchableOpacity onPress={() => islogin ? this.props.navigation.navigate('OrderList', { search: { status: 2 } }) : this._unlogin()}>
              <View style={styles.center}>
                <Icon name="truck" size={30} color={'#aaa'} />
                <Text style={styles.fontS}>待收货</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.modBottomList}>
            <TouchableOpacity onPress={() => islogin ? this.props.navigation.navigate('OrderList', { search: { status: 4 } }) : this._unlogin()}>
              <View style={styles.center}>
                <Icon name="plug" size={30} color={'#aaa'} />
                <Text style={styles.fontS}>退换货</Text>
              </View>
            </TouchableOpacity>
          </View>
          {islogin ? this.renderOrderIcon(0, member.order_0) : null}
          {islogin ? this.renderOrderIcon(1, member.order_1) : null}
          {islogin ? this.renderOrderIcon(2, member.order_2) : null}
          {islogin ? this.renderOrderIcon(3, member.order_4) : null}

        </View>
      </View>
    )
  }

  renderOrderIcon(type, num) {
    if (num != 0 && num != '' && num != undefined) {
      return (
        <Text style={[styles.fontIcon, { left: ScreenWidth * 0.5 / 4 + ScreenWidth / 4 * type + 10 }]}>{num}</Text>
      )
    }
  }

  _unlogin() {
    Toast.show('请先登录');
  }

  //我的钱包
  renderMoney() {
    let islogin = this.props.loginData.status === "success" && this.props.memberData.status === "success";
    if (islogin) {
      let memberData = this.props.memberData.data.result.member;
      var credit2 = memberData.credit2;
      var credit1 = memberData.credit1;
      var coupon = memberData.coupon;
    } else {
      var credit2 = '0.00';
      var credit1 = '0';
      var coupon = '0';
    }
    return (
      <View style={styles.modView}>
        <View style={styles.modTop}>
          <View style={[styles.modTopTextL, styles.borderB]}>
            <Text style={[styles.fontS, { marginRight: 5 }]}>我的钱包</Text>
          </View>
          <TouchableOpacity onPress={() => islogin ? null : this._unlogin()}>
            <View style={[styles.modTopTextR, styles.borderB]}>
              <Text style={[styles.fontS, { marginRight: 5 }]}>查看明细</Text>
              <Icon name="angle-right" size={20} color={'#ccc'} style={{ marginRight: 5, marginTop: 5 }} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.modBottom}>
          <View style={styles.modBottomList}>
            <TouchableOpacity onPress={() => islogin ? null : this._unlogin()}>
              <View style={styles.center}>
                <Text style={{ fontSize: 16 }}>{credit2}</Text>
                <Text style={styles.fontS}>账户余额</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.modBottomList}>
            <TouchableOpacity onPress={() => islogin ? this.props.navigation.navigate('MyCoupons') : this._unlogin()}>
              <View style={styles.center}>
                <Text style={{ fontSize: 16 }}>{coupon}</Text>
                <Text style={styles.fontS}>优惠券</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.modBottomList}>
            <TouchableOpacity onPress={() => islogin ? null : this._unlogin()}>
              <View style={styles.center}>
                <Text style={{ fontSize: 16 }}>{credit1}</Text>
                <Text style={styles.fontS}>积分</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  //其他
  renderOther() {
    let islogin = this.props.loginData.status === "success" && this.props.memberData.status === "success";
    return (
      <View style={styles.modView}>
        <View style={[styles.modBottom, { flexWrap: 'wrap' }]}>
          <View style={styles.modBottomOther}>
            <TouchableOpacity onPress={() => islogin ?this.props.navigation.navigate('Favorite') : this._unlogin()}>
              <View style={styles.center}>
                <Icon name="heart" size={25} color={'#FB585E'} />
                <Text style={styles.fontS}>我的关注</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.modBottomOther}>
            <TouchableOpacity onPress={() => islogin ? this.props.navigation.navigate('Cart') : this._unlogin()}>
              <View style={styles.center}>
                <Icon name="shopping-cart" size={25} color={'#1D9D73'} />
                <Text style={styles.fontS}>购物车</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.modBottomOther}>
            <TouchableOpacity onPress={() => islogin ? this.props.navigation.navigate('MyHistory') : this._unlogin()}>
              <View style={styles.center}>
                <IconT name="foot" size={25} color={'#1B8EFF'} />
                <Text style={styles.fontS}>我的足迹</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.modBottomOther}>
            <TouchableOpacity onPress={() => islogin ? null : this._unlogin()}>
              <View style={styles.center}>
                <Icon name="credit-card" size={25} color={'#FFAB15'} />
                <Text style={styles.fontS}>充值记录</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.modBottomOther}>
            <TouchableOpacity onPress={() => islogin ? this.props.navigation.navigate('SignTab') : this._unlogin()}>
              <View style={styles.center}>
                <Icon name="gift" size={25} color={'#9400d3'} />
                <Text style={styles.fontS}>积分签到</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.modBottomOther}>
            <TouchableOpacity onPress={() => islogin ? this.props.navigation.navigate('Coupons') : this._unlogin()}>
              <View style={styles.center}>
                <Icon name="ticket" size={25} color={'#FFAB15'} />
                <Text style={styles.fontS}>领优惠券</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.modBottomOther}>
            <TouchableOpacity onPress={() => islogin ? null : this._unlogin()}>
              <View style={styles.center}>
                <Icon name="bell" size={25} color={'#6b8e23'} />
                <Text style={styles.fontS}>消息提醒</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.modBottomOther}>
            <TouchableOpacity onPress={() => islogin ? this.props.navigation.navigate('Address') : this._unlogin()}>
              <View style={styles.center}>
                <Icon name="map-marker" size={25} color={'#BF0000'} />
                <Text style={styles.fontS}>地址管理</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  //退出登陆
  renderLoginOut() {
    if (this.props.loginData.status === "success") {
      return (
        <View style={{ marginTop: 10, marginBottom: 10, backgroundColor: '#fff', padding: 10 }}>
          <TouchableOpacity onPress={() => this.props.dispatch(loginOut())}>
            <Text style={{ color: 'red', textAlign: 'center' }}>退出登陆</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

}

const styles = StyleSheet.create({
  fontIcon: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#fff',
    color: 'red',
    borderRadius: 10,
    position: 'absolute',
    top: 5,
    fontSize: 9,
    borderColor: 'red',
    borderWidth: 1,
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
  },
  fontWhite: {
    color: 'white',
  },
  topView: {
    height: 170,
    backgroundColor: '#C10001',
    paddingTop: 50
  },
  conf: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 15,
    paddingTop: 0,
  },
  icon: {
    fontSize: 18,
    marginLeft: 20,
  },
  userIconView: {
    width: 70,
    height: 70,
    backgroundColor: 'white',
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30
  },
  loginStatus: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  modView: {
    marginTop: 10,
    backgroundColor: '#fff'
  },
  modTop: {
    flexDirection: 'row',
    padding: 10,
  },
  modTopTextL: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 10,
  },
  modTopTextR: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  modBottom: {
    flexDirection: 'row',
  },
  modBottomList: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderB: {
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  modBottomOther: {
    width: (ScreenWidth - 10) / 4,
    marginTop: 10,
    marginBottom: 10,
  },
  fontS: {
    fontSize: 12,
    marginTop: 8
  }
});

function mapStateToProps(state) {
  return {
    loginData: state.loginReducer,
    memberData: state.memberInfoReducer,
  }
}

export default connect(mapStateToProps)(Member);