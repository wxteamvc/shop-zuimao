/**
 * Sample React Native App
 * 显示公告
 * @flow
 */
"use strict";

import React, { Component } from 'react';
import {
    WebView,
} from 'react-native';

export default class ShowNotice extends Component {

    constructor(...props) {
        super(...props);
    }

    render() {
        return (
            <WebView 
            source={{uri: this.props.navigation.state.params.url}}
            style={{flex:1}}>
            </WebView>
        )

    }

}
