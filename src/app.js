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
const App = StackNavigator({
    HomeTab: {
        screen: HomeTab,
        navigationOptions: {
            header:null
        },  
    },
    SignTab:{
        screen: SignTab,
        navigationOptions: {
            header:null
        },  
    },
    SignRecord:{
        screen: SignRecord,
        navigationOptions: {
            header:null
        },  
    }
});

export default App;