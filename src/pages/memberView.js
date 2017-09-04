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

class Member extends Component {

  constructor(...props) {
    super(...props);
  }

  componentDidUpdate(nextProps) {
    //请求用户信息
    if (this.props.loginData.status === "success" && this.props.memberData.status === false) {
      let token = this.props.loginData.data.result.token;
      this.props.dispatch(memberInfo(token))
    }
  }

  render() {
    return (
      <View>
        <ScrollView>
          <View style={styles.topView}>
            <View style={styles.conf}>
              <TouchableOpacity>
                <Icon name='cog' color={'white'} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name='commenting-o' color={'white'} style={styles.icon} />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <View style={styles.userIconView}>
                <Icon name='user-o' color={'#E14135'} size={50} />
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
          <View style={{height:50}}></View>
        </ScrollView>
      </View>
    );
  }

  //登陆状态文字
  renderText() {
    if (this.props.loginData.status === "success" && this.props.memberData.status === "success") {
      let memberData = this.props.memberData.data.result.member;
      let name = memberData.realname == null || memberData.realname == '' ? memberData.nickname : memberData.realname;
      let levelname = memberData.levelname == null || memberData.levelname == '' ? '[普通会员]' : memberData.levelname;
      return (
        <View>
          <Text style={styles.fontWhite}>{name}</Text>
          <Text style={styles.fontWhite}>{levelname}</Text>
        </View>

      )
    } else {
      return (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.fontWhite}>登陆/注册 〉</Text>
        </TouchableOpacity>
      )
    }
  }

  //订单
  renderOrder() {
    return (
      <View style={styles.modView}>
        <View style={styles.modTop}>
          <View style={styles.modTopTextL}>
            <Text style={{ marginLeft: 5 }}>我的订单</Text>
          </View>
          <TouchableOpacity>
            <View style={styles.modTopTextR}>
              <Text style={{ marginRight: 5 }}>查看全部订单</Text>
              <Icon name="angle-right" size={20} color={'#ccc'} style={{ marginRight: 5 }} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.modBottom}>
            <View style={styles.modBottomList}>
                <TouchableOpacity>
                    <View style={styles.center}>
                        <Icon name="address-card-o" size={30} color={'#aaa'}/>
                        <Text>待付款</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.modBottomList}>
                <TouchableOpacity>
                    <View style={styles.center}>
                        <Icon name="cube" size={30} color={'#aaa'}/>
                        <Text>待发货</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.modBottomList}>
                <TouchableOpacity>
                    <View style={styles.center}>
                        <Icon name="truck" size={30} color={'#aaa'}/>
                        <Text>待收货</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.modBottomList}>
                <TouchableOpacity>
                    <View style={styles.center}>
                        <Icon name="plug" size={30} color={'#aaa'}/>
                        <Text>退换货</Text>
                    </View>
                </TouchableOpacity>
            </View>
          </View>
      </View>
    )
  }

  //我的钱包
  renderMoney(){
    if (this.props.loginData.status === "success" && this.props.memberData.status === "success") {
      let memberData = this.props.memberData.data.result.member;
      var credit2= memberData.credit2;
      var credit1= memberData.credit1;
      var coupon= memberData.coupon;
    }else{
      var credit2= '0.00';
      var credit1= '0';
      var coupon= '0';
    }
    return(
      <View style={styles.modView}>
      <View style={styles.modTop}>
        <View style={[styles.modTopTextL,styles.borderB]}>
          <Text style={{ marginLeft: 5 }}>我的钱包</Text>
        </View>
        <TouchableOpacity>
          <View style={[styles.modTopTextR,styles.borderB]}>
            <Text style={{ marginRight: 5 }}>查看明细</Text>
            <Icon name="angle-right" size={20} color={'#ccc'} style={{ marginRight: 5 }} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.modBottom}>
        <View style={styles.modBottomList}>
            <TouchableOpacity>
                <View style={styles.center}>
                  <Text>{credit2}</Text>
                  <Text>账户余额</Text>
                </View>
            </TouchableOpacity>
        </View>
        <View style={styles.modBottomList}>
            <TouchableOpacity>
                <View style={styles.center}>
                  <Text>{coupon}</Text>
                  <Text>优惠券</Text>
                </View>
            </TouchableOpacity>
        </View>
        <View style={styles.modBottomList}>
            <TouchableOpacity>
                <View style={styles.center}>
                  <Text>{credit1}</Text>
                  <Text>积分</Text>
                </View>
            </TouchableOpacity>
        </View>
      </View>
    </View>
    )
  }

  //其他
  renderOther(){
    return(
      <View style={styles.modView}>
        <View style={[styles.modBottom,{flexWrap:'wrap'}]}>
            <View style={styles.modBottomOther}>
                <TouchableOpacity>
                    <View style={styles.center}>
                        <Icon name="heart" size={30} color={'#FB585E'}/>
                        <Text style={styles.fontS}>我的关注</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.modBottomOther}>
                <TouchableOpacity>
                    <View style={styles.center}>
                        <Icon name="shopping-cart" size={30} color={'#1D9D73'}/>
                        <Text style={styles.fontS}>购物车</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.modBottomOther}>
                <TouchableOpacity>
                    <View style={styles.center}>
                        <IconT name="foot" size={30} color={'#1B8EFF'}/>
                        <Text style={styles.fontS}>我的足迹</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.modBottomOther}>
                <TouchableOpacity>
                    <View style={styles.center}>
                        <Icon name="credit-card" size={30} color={'#FFAB15'}/>
                        <Text style={styles.fontS}>充值记录</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.modBottomOther}>
                <TouchableOpacity>
                    <View style={styles.center}>
                        <Icon name="gift" size={30} color={'#9400d3'}/>
                        <Text style={styles.fontS}>积分签到</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.modBottomOther}>
                <TouchableOpacity>
                    <View style={styles.center}>
                        <Icon name="ticket" size={30} color={'#FFAB15'}/>
                        <Text style={styles.fontS}>优惠券</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.modBottomOther}>
                <TouchableOpacity>
                    <View style={styles.center}>
                        <Icon name="bell" size={30} color={'#6b8e23'}/>
                        <Text style={styles.fontS}>消息提醒</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.modBottomOther}>
                <TouchableOpacity>
                    <View style={styles.center}>
                        <Icon name="map-marker" size={30} color={'#BF0000'}/>
                        <Text style={styles.fontS}>地址管理</Text>
                    </View>
                </TouchableOpacity>
            </View>
          </View>
      </View>
    )
  }

  //退出登陆
  renderLoginOut(){
    if (this.props.loginData.status === "success" && this.props.memberData.status === "success") {
      return(
        <View style={{marginTop:10,backgroundColor:'#fff',padding:10}}>
            <TouchableOpacity  onPress={()=>this.props.dispatch(loginOut())}>
                <Text style={{color:'red',textAlign:'center'}}>退出登陆</Text>
            </TouchableOpacity>
        </View>
      )
    }
  }

}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  fontWhite: {
    color: 'white',
  },
  topView: {
    height: 170,
    backgroundColor: '#E14135',
    paddingTop: 20
  },
  conf: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 15,
  },
  icon: {
    fontSize: 18,
    marginLeft: 20,
  },
  userIconView: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 60,
    padding: 10,
    alignItems: 'center',
    marginLeft: 30
  },
  loginStatus: {
    flex: 6,
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
    paddingBottom:10,
  },
  modTopTextR: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom:10,
  },
  modBottom:{
    flexDirection:'row',
  },
  modBottomList:{
    flex:1,
    marginTop:10,
    marginBottom:10,
  },
  center:{
    justifyContent:'center',
    alignItems:'center',
  },
  borderB:{
    borderBottomWidth:1,
    borderColor:'#eee',
  },
  modBottomOther:{
    width:(ScreenWidth-10)/4,
    marginTop:10,
    marginBottom:10,
  },
  fontS:{
    fontSize:12
  }
});

function mapStateToProps(state) {
  return {
    loginData: state.loginReducer,
    memberData: state.memberInfoReducer,
  }
}

export default connect(mapStateToProps)(Member);