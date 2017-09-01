//控制带跳转到顶部的scrollview组件
//调用组件的时候 ****必须传给scrollView要显示的内容
//             传入 range={} 能控制滚动条滚动多少距离显示跳转按钮  默认150
//             传入 color={}跳转按钮背景色     默认黑色
//             传入 right={}和bottom={}调整跳转按钮位置  默认bottom：30 right：20
//
"use strict";

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default class ScrollViewJumpTop extends Component {
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
        if (e.nativeEvent.contentOffset.y > this.range) {
            this.state.isShow ? '' : this.setState({ isShow: true, })
        } else {
            this.state.isShow ? this.setState({ isShow: false, }) : ''
        }
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView
                    onScroll={(e) => { this.showJumpTop(e) }}
                    ref={(ScrollView) => { this.ScrollView = ScrollView }}
                >
                    {this.props.children}
                </ScrollView>
                <TouchableOpacity
                    onPress={() => { this.ScrollView.scrollTo({ x: 0, y: 0, animated: true }) }}
                    style={{ position: 'absolute', bottom: this.bottom, right: this.right }}
                >
                    <View style={[styles.btnShow, this.state.isShow ? '' : styles.btnHide, { backgroundColor: this.backgroundColor }]}>
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
        left: 11,
        top: 9,
    }
})