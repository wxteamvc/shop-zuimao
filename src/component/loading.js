"use strict"
import React, { Component } from 'react';
import {
    Text,
    View,
    ActivityIndicator,
    Image,
} from 'react-native';
import { ScreenWidth } from '../common/global';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IconTwo from 'react-native-vector-icons/dist/EvilIcons';

export default class Loading extends Component {
    render() {
        if (this.props.status == 'faild') {
            return (
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <IconTwo name={'close-o'} size={150} color={'red'}/>
                        <Text style={{ marginTop: 30,fontSize:20,color:'red' }}>{this.props.errmessage}</Text>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size={100}></ActivityIndicator>
                        <Text style={{ marginTop: 30 }}>亲 别着急哦 页面正在加载中...</Text>
                    </View>
                </View>
            )
        }

    }
}




