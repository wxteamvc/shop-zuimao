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
import { COUPONS_URL, ScreenWidth, DOMAIN } from '../common/global';

export default class Findgoods extends Component {

    constructor(...props) {
        super(...props);

    }

    //递归渲染魔术排版图片
    //data渲染的数据,flag控制横纵排列默认横向,max控制最大渲染个数默认4个
    renderImageList(data, flag = true, max = 4) {
        if (data.length === 0 || max === 0) return;
        return (
            <View style={{ flex: 1, flexDirection: flag ? 'row' : 'column',}}>
                <TouchableOpacity style={{ flex: 1 }}>
                    <Image
                        resizeMode={'stretch'}
                        source={{ uri: DOMAIN + data[0].img }}
                        style={{ flex: 1, margin: 3 }}
                    />
                </TouchableOpacity>
                {this.renderImageList(data.slice(1), !flag, max - 1)}

            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.bg_img}
                    source={require('../assets/images/fgbg.jpg')}
                    resizeMode={'stretch'}
                >
                    <View style={styles.head}>
                        <Text style={styles.head_text}>发现好货</Text>
                        <Text>你身边的好购物指南</Text>
                    </View>
                    <View style={styles.mf_container}>
                        {this.renderImageList(this.props.cubes.slice(0))}
                    </View>
                </Image>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: ScreenWidth, height: 300, marginTop: 15
    },
    bg_img: {
        width: ScreenWidth, height: 300,paddingBottom:20
    },
    head: {
        height: 40, justifyContent: 'center', alignItems: 'center', marginTop: 20
    },
    head_text: {
        fontSize: 26, color: 'red'
    },
    mf_container: {
        flex: 1, marginLeft: 15, marginRight: 15, marginTop: 15,
    }
})