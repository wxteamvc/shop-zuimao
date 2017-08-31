//发现好货栏目组件
"use strict";
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import { COUPONS_URL, ScreenWidth } from '../common/global';

export default class Findgoods extends Component {

    constructor(...props) {
        super(...props);
        this.state = {
            img: [
                'http://www.zuimaowang.cn/attachment/images/1/2017/08/b3Le686Ezedn2wBE6dc7zTNDTiWTC3.jpg',
                'http://www.zuimaowang.cn/attachment/images/1/2017/08/Eeh5H4RYygHA2h49AeS4a8E2hHae8S.jpg',
                'http://www.zuimaowang.cn/attachment/images/1/2017/08/Qoo2j8DDsPoSSKPCKPlo5p6mlLlp2h.jpg',
                'http://www.zuimaowang.cn/attachment/images/1/2017/08/Qoo2j8DDsPoSSKPCKPlo5p6mlLlp2h.jpg'
            ]
        }
    }

    //递归渲染魔术排版图片
    //data渲染的数据,flag控制横纵排列默认横向,max控制最大渲染个数默认4个
    renderImageList(data, flag = true, max = 4) {
        if (data.length === 0 || max === 0) return;
        return (
            <View style={{ flex: 1, flexDirection: flag ? 'row' : 'column', }}>
                <Image
                    source={{ uri: data[0] }}
                    style={{ flex: 1 ,margin:5}}
                />
                {this.renderImageList(data.slice(1), !flag, max - 1)}
            </View>
        );
    }

    render() {
        return (
            <View style={{ width: ScreenWidth, height: 300, marginTop: 15 }}>
                <Image
                    style={{ width: ScreenWidth, height: 300 }}
                    source={require('../assets/images/findgoods/fgbg.jpg')}
                    resizeMode={'stretch'}
                >
                    <View style={{ height: 40, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <Text style={{ fontSize: 26, color: 'red' }}>发现好货</Text>
                        <Text>你身边的好购物指南</Text>
                    </View>
                    <View style={{flex:1,marginLeft:15,marginRight:15,marginTop:15}}>
                    {this.renderImageList(this.state.img.slice(0))}
                    </View>
                </Image>
            </View>
        )
    }
}