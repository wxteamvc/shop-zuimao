/**
 * stacknavigation自带的顶部导航右侧按钮组件
 * 需要传4个参数  name：图标名字   必传
 *               size：图标大小  可选 默认30
 *               navigation：导航 必传
 *               path：导航路径  必传 指明要跳转的页面 
 */
"use strict";


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
export default class RightBtn extends Component {
    render() {
        return (
            <TouchableOpacity 
            onPress={()=>{this.props.navigation.navigate(this.props.path)}}
            style={[{ flex: 1,marginRight:10 }, styles.center]}>
                <Icon name={this.props.name} size={this.props.size?this.props.size:30} />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})