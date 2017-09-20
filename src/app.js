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
            headerTitle: '积分签到',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <View style={{ flex: 0.1 }}></View>,
        }),
    },
    SignRecord: {
        screen: SignRecord,
        navigationOptions: ({ navigation }) => ({
            headerTitle: '详细记录',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <View style={{ flex: 0.1 }}></View>,
        }),
    },
    Coupons: {
        screen: Coupons,
        navigationOptions: ({ navigation }) => ({
            headerTitle: '领券中心',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <View style={{ flex: 0.1 }}></View>,
        }),
    },
    Login: {
        screen: Login,
        navigationOptions: ({ navigation }) => ({
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
            headerTitle: '收货地址管理',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <Text></Text>
        }),
    },
    OrderCreateView: {
        screen: OrderCreateView,
        navigationOptions: ({ navigation }) => ({
            headerTitle: '确认订单',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <Text></Text>
        }),
    },
    AddressEdit: {
        screen: AddressEdit,
        navigationOptions: ({ navigation }) => ({
            headerTitle: '编辑收货地址',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <Text></Text>
        }),
    },
    AddressAdd: {
        screen: AddressAdd,
        navigationOptions: ({ navigation }) => ({
            headerTitle: '新增收货地址',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <Text></Text>
        }),
    },
    WebView: {
        screen: WebView,
        navigationOptions: ({ navigation }) => ({
            headerTitle: '公告',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <View style={{ flex: 0.1 }}></View>,
        }),
    },
    Notice: {
        screen: Notice,
        navigationOptions: ({ navigation }) => ({
            headerTitle: '热点',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <View style={{ flex: 0.1 }}></View>,
        }),
    },
    CouponInfo: {
        screen: CouponInfo,
        navigationOptions: ({ navigation }) => ({
            headerTitle: '优惠券详情',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <View style={{ flex: 0.1 }}></View>,
        }),
    },
    OrderList: {
        screen: OrderList,
        navigationOptions: ({ navigation }) => ({
            headerTitle: '我的订单',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <Text></Text>
        }),
    },
    Express: {
        screen: Express,
        navigationOptions: ({ navigation }) => ({
            headerTitle: '物流信息',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <Text></Text>
        }),
    },
    OrderDetail: {
        screen: OrderDetail,
        navigationOptions: ({ navigation }) => ({
            headerTitle: '订单详情',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <Text></Text>
        }),
    },
    Comment: {
        screen: Comment,
        // navigationOptions: ({ navigation }) => ({
        //     headerTitle: '评论',
        //     headerTitleStyle: { alignSelf: 'center' },
        //     headerRight: <Text></Text>
        // }),
    },
    Scanner: {
        screen: Scanner,
    }
});

export default App;