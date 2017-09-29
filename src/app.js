/**
 * APP整体导航架构
 * 
 */
"use strict";

import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeTab from './pages/homeTab';
// import SignTab from './pages/signTab';
import SignRecord from './pages/signRecordView';
import Coupons from './pages/couponsView';
import RightBtn from './component/rightBtn';
import Login from './component/login';
import Register from './component/register';
import Goods from './pages/goodsView';
import GoodsInfo from './pages/goodsInfoView';
import IsTime from './pages/isTimeView';
import IsDiscount from './pages/isDiscountView';
import Search from './pages/searchView';
import Address from './pages/addressView';
import OrderCreateView from './pages/orderCreateView';
import AddressEdit from './pages/addressEditView';
import AddressAdd from './pages/addressAddView';
import WebView from './pages/webView';
import Notice from './pages/noticeView';
import CouponInfo from './pages/couponsInfoView';
import ShowNotice from './pages/webView';
import OrderList from './pages/orderListView';
import Express from './pages/expressView';
import Sign from './pages/signView';
import OrderDetail from './pages/orderDetailView';
import Scanner from './component/scanner';
import Comment from './pages/commentView';
import MyCoupons from './pages/myCouponsView';
import Refund from './pages/refundView';
import Refunding from './pages/refundingView';
import RefundExpress from './pages/refundExpressView';
import AboutUs from './pages/aboutUsView';
import Favorite from './pages/favoriteView';
import Pay from './pages/payView';
import MyHistory from './pages/historyView';
import RechargeRecord from './pages/rechargeRecordView';
import PaySuccess from './pages/paySuccessView';
import MemberNotice from './pages/memberNoticeView';
import Recharge from './pages/rechargeView';
import MemberInfo from './pages/memberInfoView';
import MemberBind from './pages/memberBindView';
import CreditGoodInfo from './pages/creditGoodInfo';

const App = StackNavigator({
    HomeTab: {
        screen: HomeTab,
        navigationOptions: {
            header: null
        },
    },
    Sign: {
        screen: Sign,
        navigationOptions: ({ navigation }) => ({
            headerStyle:{height:40},
            headerTitle: '积分签到',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <View style={{ flex: 0.1 }}></View>,
        }),
    },
    SignRecord: {
        screen: SignRecord,
        navigationOptions: ({ navigation }) => ({
            headerStyle:{height:40},
            headerTitle: '详细记录',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <View style={{ flex: 0.1 }}></View>,
        }),
    },
    Coupons: {
        screen: Coupons,
        navigationOptions: ({ navigation }) => ({
            headerStyle:{height:40},
            headerTitle: '领券中心',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <View style={{ flex: 0.1 }}></View>,
        }),
    },
    Login: {
        screen: Login,
        navigationOptions: ({ navigation }) => ({
            headerStyle:{height:40},
            headerTitle: '登录',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight:
            <TouchableOpacity onPress={() => { navigation.navigate('Register') }}>
                <Text style={{ marginRight: 20, fontWeight: 'bold' }}>注册</Text>
            </TouchableOpacity>
        }),
    },
    Register: {
        screen: Register,
        navigationOptions: ({ navigation }) => ({
            headerStyle:{height:40},
            headerTitle: '注册',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <Text></Text>
        }),
    },
    Goods: {
        screen: Goods,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },
    GoodsInfo: {
        screen: GoodsInfo,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },
    IsTime: {
        screen: IsTime,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },
    IsDiscount: {
        screen: IsDiscount,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },
    Search: {
        screen: Search,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    Address: {
        screen: Address,
        navigationOptions: ({ navigation }) => ({
            headerStyle:{height:40},
            headerTitle: '收货地址管理',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <Text></Text>
        }),
    },
    OrderCreateView: {
        screen: OrderCreateView,
        navigationOptions: ({ navigation }) => ({
            headerStyle:{height:40},
            headerTitle: '确认订单',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <Text></Text>
        }),
    },
    AddressEdit: {
        screen: AddressEdit,
        navigationOptions: ({ navigation }) => ({
            headerStyle:{height:40},
            headerTitle: '编辑收货地址',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <Text></Text>
        }),
    },
    AddressAdd: {
        screen: AddressAdd,
        navigationOptions: ({ navigation }) => ({
            headerStyle:{height:40},
            headerTitle: '新增收货地址',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <Text></Text>
        }),
    },
    WebView: {
        screen: WebView,
        navigationOptions: ({ navigation }) => ({
            headerStyle:{height:40},
            headerTitle: '公告',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <View style={{ flex: 0.1 }}></View>,
        }),
    },
    Notice: {
        screen: Notice,
        navigationOptions: ({ navigation }) => ({
            headerStyle:{height:40},
            headerTitle: '热点',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <View style={{ flex: 0.1 }}></View>,
        }),
    },
    CouponInfo: {
        screen: CouponInfo,
        navigationOptions: ({ navigation }) => ({
            headerStyle:{height:40},
            headerTitle: '优惠券详情',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <View style={{ flex: 0.1 }}></View>,
        }),
    },
    OrderList: {
        screen: OrderList,
        // navigationOptions: ({ navigation }) => ({
            //headerStyle:{height:40},
        //     headerTitle: '我的订单',
        //     headerTitleStyle: { alignSelf: 'center' },
        //     headerRight: <Text></Text>
        // }),
    },
    Express: {
        screen: Express,
        navigationOptions: ({ navigation }) => ({
            headerStyle:{height:40},
            headerTitle: '物流信息',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <Text></Text>
        }),
    },
    OrderDetail: {
        screen: OrderDetail,
        navigationOptions: ({ navigation }) => ({
            headerStyle:{height:40},
            headerTitle: '订单详情',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <Text></Text>
        }),
    },
    Comment: {
        screen: Comment,
        navigationOptions: ({ navigation }) => ({
            headerStyle:{height:40},
            headerTitle: '评论',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <Text></Text>
        }),
    },
    Scanner: {
        screen: Scanner,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },
    MyCoupons: {
        screen: MyCoupons,
        navigationOptions: ({ navigation }) => ({
            headerStyle:{height:40},
            headerTitle: '我的优惠券',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <Text></Text>
        }),
    },
    AboutUs: {
        screen: AboutUs,
        navigationOptions: ({ navigation }) => ({
            headerStyle:{height:40},
            headerTitle: '关于我们',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <Text></Text>
        }),
    },
    Favorite: {
        screen: Favorite,
        navigationOptions: ({ navigation }) => ({
            headerStyle:{height:40},
            headerTitle: '我的关注',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <Text></Text>
        }),
    },
    MyHistory: {
        screen: MyHistory,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },
    RechargeRecord: {
        screen: RechargeRecord,
        navigationOptions: ({ navigation }) => ({
            headerStyle:{height:40},
            headerTitle: '充值记录',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <Text></Text>
        }),
    },
    MemberNotice: {
        screen: MemberNotice,
        navigationOptions: ({ navigation }) => ({
            headerStyle:{height:40},
            headerTitle: '消息提醒设置',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <Text></Text>
        }),
    },
    Recharge: {
        screen: Recharge,
        navigationOptions: ({ navigation }) => ({
            headerStyle:{height:40},
            headerTitle: '账户充值',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <Text></Text>
        }),
    },
    CreditGoodInfo: {
        screen: CreditGoodInfo,
        navigationOptions: ({ navigation }) => ({
            headerStyle:{height:40},
            headerTitle: '签到商品详情',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <Text></Text>
        }),
    },

    Refund: {
        screen: Refund,
    },
    Refunding: {
        screen: Refunding,
    },
    RefundExpress:{
        screen: RefundExpress,
    },
    Pay:{
        screen: Pay,
    },
    PaySuccess:{
        screen: PaySuccess,
    },
    MemberInfo:{
        screen: MemberInfo,
    },
    MemberBind:{
        screen: MemberBind,
    }
});

export default App;