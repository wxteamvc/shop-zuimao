//控制带跳转到顶部的scrollview组件
//调用组件的时候 ****必须传给FlatList要显示的数组和要渲染的样式
//             传入 color={}跳转按钮背景色     默认黑色
//             传入 right={}和bottom={}调整跳转按钮位置  默认bottom：30 right：20
//
"use strict";

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default class FlatListJumpTop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShow: false, //是否显示跳转到顶部按钮
        }
        this.range = this.props.range ? this.props.range : 150;
        this.right = this.props.right ? this.props.right : 20;
        this.bottom = this.props.bottom ? this.props.bottom : 30;
        this.backgroundColor = this.props.color ? this.props.color : '#000';
    }


    //滚动条监听事件
    showJumpTop(e) {
        let range = this.props.horizontal ? e.nativeEvent.contentOffset.x : e.nativeEvent.contentOffset.y;
        if (range > this.range) {
            this.state.isShow ? '' : this.setState({ isShow: true, });
        } else {
            this.state.isShow ? this.setState({ isShow: false, }) : '';
        }
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    {...this.props}
                    ref={(FlatList) => { this.FlatList = FlatList }}
                    onScroll={(e) => { this.showJumpTop(e) }}
                />
                <TouchableOpacity
                    onPress={() => { this.FlatList.scrollToIndex({ viewPosition: 0, index: 0 }) }}
                    style={[{ position: 'absolute', bottom: this.bottom, right: this.right },this.state.isShow ? '' : styles.btnHide]}
                >
                    <View style={[styles.btnShow, { backgroundColor: this.backgroundColor }]}>
                    </View>
                    <Icon name={'arrow-up'} size={20} color={'#fff'}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}




const styles = StyleSheet.create({
    btnShow: {
        height: 40,
        width: 40,
        borderRadius: 20,
        opacity: 0.5,
    },
    btnHide: {
        height: 0,
    },
    icon: {
        position: 'absolute',
        left:11,
        top:9,
    },
})