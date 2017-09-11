/**
 * Home页面
 * 底部tabnavigation导航
 */
"use strict";

import React, { Component } from 'react';
import {
    Text,
  } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IconTwo from 'react-native-vector-icons/dist/SimpleLineIcons';
import HomeView from './homeView';
import Category from './categoryView';
import Cart from './cartView';
import Member from './memberView';

const HomeTab = TabNavigator({
    HomeView: {
        screen: HomeView,
        navigationOptions:({navigation}) => ({
            tabBarLabel:'首页',  
            tabBarIcon:({focused,tintColor}) => ( 
                <Text style={{fontFamily:'iconfont',color:tintColor,fontSize:30}}>&#xe613;</Text>
            )    
        }),
    },
    Category: {
        screen: Category,
        navigationOptions:({navigation}) => ({
            tabBarLabel:'分类',  
            tabBarIcon:({focused,tintColor}) => ( 
                <Text style={{fontFamily:'iconfont',color:tintColor,fontSize:25}}>&#xe682;</Text>
            )    
        }),
    },
    Cart: {
        screen: Cart,
        navigationOptions:({navigation}) => ({
            tabBarLabel:()=>{
                if(navigation.state.hasOwnProperty("params")){
                    return `购物车 ${navigation.state.params.num}`;
                }else{
                    return "购物车"
                }  
            },  
            tabBarIcon:({focused,tintColor}) => ( 
                <Text style={{fontFamily:'iconfont',color:tintColor,fontSize:30}}>&#xe62c;</Text>    
            )    
        }),
    },
    Member: {
        screen: Member,
        navigationOptions:({navigation}) => ({
            tabBarLabel:'我的',  
            tabBarIcon:({focused,tintColor}) => ( 
                <Text style={{fontFamily:'iconfont',color:tintColor,fontSize:25}}>&#xe610;</Text>    
            )    
        }),
    },
},{  
    // animationEnabled: false, // 切换页面时不显示动画
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: false, // 禁止左右滑动
    backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
    tabBarOptions: {
        activeTintColor: 'red', // 文字和图片选中颜色
        inactiveTintColor: '#000', // 文字和图片默认颜色
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        showLabel:true,
        indicatorStyle: {height: 0}, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了， 不知道还有没有其它方法隐藏？？？
        style: {
            backgroundColor: '#fff', // TabBar 背景色
            height:50,
            
        },
        labelStyle: {
            marginTop:0,
            fontSize:10
        },
        iconStyle :{
            marginTop:-5,
            width:30,
            height:30,
        },
        tabStyle :{
            //...
        }
    },
});

export default HomeTab;