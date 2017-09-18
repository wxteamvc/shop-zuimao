/**
 * 订单详情
 */

"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, StatusBar, FlatList, TouchableOpacity, Alert, Modal,ActivityIndicator } from 'react-native';
import { ScreenWidth, ScreenHeight,ORDERDELETE_URL, ORDERCANCEL_URL, ORDERFINISH_URL, ORDERDETAIL_URL } from '../common/global';
import Util from '../common/util';
import Toast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { orderList } from '../actions/orderListAction';

class Comment extends Component {

    constructor(...props) {
        super(...props);
        this.state = {
            commentData:''
        }
    }

    render() {
        if (this.state.commentData != '') {
            return (
                <View style={{ flex: 1 }}>
                    <StatusBar
                        translucent={false}
                        backgroundColor="#000"
                    />
                    <ScrollView>
                        {this.renderGoods()}
                    </ScrollView>
                </View>
            )
        } else {
            return false;
        }

    }

    renderGoods() {
        let data = this.state.commentData;
        // return (
        //     <View style={{ marginTop: 10 }}>
        //         <View style={s.listTop}>
        //             <Text style={s.shop}>&#xe60c;</Text>
        //             <Text style={{ flex: 9 }}>aaa&nbsp;&nbsp;<Icon name="angle-right" size={20} /></Text>
        //         </View>
        //         {this.renderGoodsList(data.goods)}
        //     </View>
        // )
    }


    renderGoodsList(goods) {
        let goodsArr = [];
        for (let j = 0; j < goods.length; j++) {
            goodsArr.push(
                <View key={j} style={s.listMid}>
                    <Image source={{ uri: goods[j].thumb }} style={s.img} />
                    <View style={s.goods}>
                        <Text style={s.title} numberOfLines={2}>aaa</Text>
                    </View>
                    <View style={s.price}>
                        <Text style={{ color: 'red', fontWeight: 'bold' }}>&yen;40</Text>
                        <Text style={{ color: 'red' }}>×111</Text>
                    </View>
                </View>
            )
        }
        return goodsArr;
    }

}
const s = StyleSheet.create({
    price: {
        flex: 0.5,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 15
    },
    goods: {
        flex: 2,
        paddingLeft: 20,
        justifyContent: 'center'
    },
    img: {
        flex: 0.5
    },
    listMid: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#F8F8F8',
        height: 80,
    },
    shop: {
        fontFamily: 'iconfont',
        fontSize: 25,
        marginRight: 10,
        flex: 1
    },
    listTop: {
        backgroundColor: 'white',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#eee',
        padding: 10,
        alignItems: 'center'
    },
    title: {
        color: '#000',
        fontWeight: 'bold'
    },
})

export default Comment;