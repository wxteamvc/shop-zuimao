/**
 * APP整体导航架构
 * 
 */
"use strict";

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import HomeTab from './pages/homeTab'

const App = StackNavigator({
    HomeTab: {
        screen: HomeTab,
        navigationOptions: {
            header:null
        },
    },
});

export default App;