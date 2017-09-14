/**
 * Sample React Native App
 * 显示热点列表
 * @flow
 */
"use strict";

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Image,
    RefreshControl
} from 'react-native';
import FlatListJumpTop from '../component/flatListJumoTop';
import { ScreenWidth, DOMAIN, StatusBarHeight, JUMP } from '../common/global';

export default class OrderCreate extends Component {
    constructor(...props) {
        super(...props);

    }

    renderNoticeList({ item }) {
        return (
            <TouchableOpacity
                onPress={() => { JUMP(item.link, this.props.navigation) }}
                style={{ padding: 10, backgroundColor: '#fff', marginTop: 10 }}
            >
                <Text>{item.title}</Text>
                {item.thumb ? <Image source={{ uri: DOMAIN + item.thumb }}
                    resizeMode={'stretch'}
                    style={{ width: ScreenWidth - 20, height: 100, marginTop: 10 }}
                /> : false}
            </TouchableOpacity>
        )
    }

    
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    translucent={false}
                    backgroundColor="#000"
                />
                <FlatListJumpTop
                    style={{ flex: 1 }}
                    data={this.props.navigation.state.params.notice}
                    keyExtractor={(item, index) => index}
                    renderItem={this.renderNoticeList.bind(this)}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )

    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFEF',
    },
    // 居中
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    //水平分布居中
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    //水平分布垂直居中
    rowYCenter: {
        flexDirection: 'row', alignItems: 'center',
    },
    //垂直两端布局
    columnBetween: {
        flexDirection: 'column', justifyContent: 'space-between', padding: 10,
    },
    //水平两端布局
    rowBetween: {
        flexDirection: 'row', justifyContent: 'space-between',
    },
})
