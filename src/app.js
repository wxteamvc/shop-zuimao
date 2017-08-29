/**
 * APP整体导航架构
 * 
 */
"use strict";

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import HomeTab from './pages/homeTab'
import SignTab from './pages/signTab'
import SignRecord from './pages/signRecordView'
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
            header:null
        },  
            header: null
        },
    },
    SignTab:{
    SignTab: {
        screen: SignTab,
        navigationOptions: {
            header:null
        },  
        navigationOptions: ({ navigation }) => ({
            headerTitle: '积分签到',
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: <RightBtn name={'home'} size={30} navigation={navigation} path={'HomeTab'} />

        }),
    },
    SignRecord:{
    SignRecord: {
        screen: SignRecord,
        navigationOptions: {
            header:null
        },  
    }
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
	Login:{
        screen: Login,
        navigationOptions: {
            // header:null
        },  
    },
});

export default App;