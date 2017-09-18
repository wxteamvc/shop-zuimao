/**
 * 订单详情
 */

"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, StatusBar, TouchableOpacity } from 'react-native';
import { ScreenWidth, ScreenHeight,COMMENT_URL } from '../common/global';
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

    componentWillMount() {
        let oid = this.props.navigation.state.params.id;
        let token = this.props.navigation.state.params.token;
        this._getData(COMMENT_URL, Object.assign({ id: oid, app: 1 }, token))
    }

    _getData(url, params = {}) {
        Util.post(url, params,
            (responseJson) => {
                if (responseJson.status == 1) {
                    this.setState({
                        commentData: responseJson.result,
                    })
                } else {
                    Toast.show(responseJson.message);
                }
            },
            (error) => {
                Toast.show('服务器请求失败！');
            },
        )
    }

    render() {
        if (this.state.commentData != '') {
            // console.log('====================================');
            // console.log(this.state.commentData);
            // console.log('====================================');
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
        let goods = this.state.commentData.goods;
        let goodsArr=[];
        for (let i = 0; i < goods.length; i++) {
            goodsArr.push(
                <View key={i}>
                    <View style={s.top}>
                        <Image source={{uri:goods[i].thumb}} style={{width:50,height:50,marginRight:20}}/>
                        {this.renderStar(goods[i].id)}
                    </View>
                </View>
            )
        }
        return goodsArr;
    }

    renderStar(gid){
        let starArr=[];
        for (var i = 0; i < 5; i++) {
            starArr.push(
                <TouchableOpacity key={i}><Icon name="star-o" size={25} style={s.star}/></TouchableOpacity>
            )
            
        }
        return (
            <View style={s.starBox}>
                {starArr}
                <Text>未评分</Text>
            </View>
        )
    }
}

const s = StyleSheet.create({
    star:{
        marginLeft:10,
        marginRight:10
    },
    starBox:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    top:{
        flexDirection:'row',
        padding:10,
        backgroundColor:'#fff',
        borderBottomWidth:1,
        borderColor:'#ddd'
    }
})

export default Comment;