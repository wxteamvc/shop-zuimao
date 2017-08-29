/**
 * APP整体导航架构
 * 
 */
"use strict";

import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeTab from './pages/homeTab';
import SignTab from './pages/signTab';
import SignRecord from './pages/signRecordView';
import Coupons from './pages/couponsView';
import RightBtn from './component/rightBtn';
import Login from './component/login';





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
            headerRight: <RightBtn name={'home'} size={30} navigation={navigation} path={'HomeTab'} />

        }),
    },
    SignRecord: {
        screen: SignRecord,
        navigationOptions: ({ navigation }) => ({
            headerTitle: '详细记录',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <RightBtn name={'home'} size={30} navigation={navigation}
                path={'HomeTab'} />

        }),
    },
    Coupons: {
        screen: Coupons,
        navigationOptions: ({ navigation }) => ({
            headerTitle: '优惠券领取中心',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <RightBtn name={'user'} size={30} navigation={navigation}
                path={'HomeTab'} />
        }),
    },
    Login: {
        screen: Login,
        navigationOptions: ({ navigation }) => ({
            headerTitle: '登录',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight:  
                <TouchableOpacity>
                    <Text style={{marginRight:20,fontWeight:'bold'}}>注册</Text>
                </TouchableOpacity>
        }),
    },
});

export default App;