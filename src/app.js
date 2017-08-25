/**
 * APP整体导航架构
 * 
 */
"use strict";

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import HomeTab from './pages/homeTab'
import SignIndex from './pages/SignIndexView'
const App = StackNavigator({
    HomeTab: {
        screen: HomeTab,
        navigationOptions: {
            header:null
        },
    },
});

export default SignIndex;