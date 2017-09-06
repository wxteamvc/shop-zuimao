/**
 * APP整体导航架构
 * 
 */
"use strict";

import React, { Component } from 'react';
import { Text, TouchableOpacity,View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeTab from './pages/homeTab';
import SignTab from './pages/signTab';
import SignRecord from './pages/signRecordView';
import Coupons from './pages/couponsView';
import RightBtn from './component/rightBtn';
import Login from './component/login';
import Register from './component/register';
import Goods from './pages/goodsView';
import GoodsInfo from './pages/goodsInfoView';
import IsTime from './pages/isTimeView';


const App = StackNavigator({
    HomeTab: {
        screen: HomeTab,
        navigationOptions: {
            header: null
        },
    },
    SignTab: {
        screen: SignTab,
        navigationOptions: ({ navigation }) => ({
            headerTitle: '积分签到',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight:<View style={{flex:0.1}}></View>
            

        }),
    },
    SignRecord: {
        screen: SignRecord,
        navigationOptions: ({ navigation }) => ({
            headerTitle: '详细记录',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight:<View style={{flex:0.1}}></View>

           

        }),
    },
    Coupons: {
        screen: Coupons,
        navigationOptions: ({ navigation }) => ({
            headerTitle: '领券中心',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight:<View style={{flex:0.1}}></View>
           
        }),
    },
    Login: {
        screen: Login,
        navigationOptions: ({ navigation }) => ({
            headerTitle: '登录',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight:  
                <TouchableOpacity onPress={()=>{navigation.navigate('Register')}}>
                    <Text style={{marginRight:20,fontWeight:'bold'}}>注册</Text>
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
    GoodsInfo:{
        screen: GoodsInfo,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },
    IsTime:{
        screen: IsTime,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    }
});

export default App;