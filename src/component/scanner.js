/**
 * Sample React Native App
 * 扫描二维码页面
 * @flow
 */
"use strict";

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    Image,
    RefreshControl,
    Platform
} from 'react-native';
import Toast from 'react-native-root-toast';
import {QRScannerView} from 'ac-qrcode';

export default class Scanner extends Component {
    render() {
        return (<QRScannerView
            onScanResultReceived={this
            .barcodeReceived
            .bind(this)}
            renderTopBarView={() => this._renderTitleBar()}
            renderBottomMenuView={() => this._renderMenu()}/>)
    }

    _renderTitleBar() {
        return (
            <Text
                style={{
                color: 'white',
                textAlignVertical: 'center',
                textAlign: 'center',
                font: 20,
                padding: 12
            }}>Here is title bar</Text>
        );
    }

    _renderMenu() {
        return (
            <Text
                style={{
                color: 'white',
                textAlignVertical: 'center',
                textAlign: 'center',
                font: 20,
                padding: 12
            }}>Here is bottom menu</Text>
        )
    }

    barcodeReceived(e) {
        Toast.show('Type: ' + e.type + '\nData: ' + e.data);
        //console.log(e)
    }
}