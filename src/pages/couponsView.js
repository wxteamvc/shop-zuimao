/**
 * 优惠券页面
 * 
 * 
 */
"use strict";


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Util from '../common/util';
import Loading from '../component/loading';
import FlatListJumoTop from '../component/flatListJumoTop'
import { COUPONS_URL, ScreenWidth } from '../common/global'


export default class Coupons extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: false,
            errmessage: '',
            data: [],
        }
    }

    componentDidMount() {
        let url = COUPONS_URL + Math.round(new Date().getTime() / 1000) + '&__ice_shop_member_session_1=eyJpZCI6IjM3NzMiLCJvcGVuaWQiOiJ3YXBfdXNlcl8xXzE1MTkwMzE0NzUyIiwibW9iaWxlIjoiMTUxOTAzMTQ3NTIiLCJwd2QiOiJmODA4ZWIwMzBiNzhlM2JjYjBkZmFjNTE5NWI1M2NkNSIsInNhbHQiOiJINllZT0JINFdiUVJGcGY2IiwiaWNlX3Nob3BfbWVtYmVyX2hhc2giOiI3Y2I4ODNjZjRiMjYxOGYyM2E1ZmEwY2RkZjhiODUwNCJ9';

        if (global.isConnected) {
            Util.get(url,
                (resq) => {
                    if (resq.status == 1) {
                        console.log(resq)
                        this.setState({
                            status: 'success',
                            data: resq.result.list,
                        })

                    } else {
                        this.setState({
                            status: 'faild',
                            errmessage: resq.message,
                        })
                    }
                },
                (error) => {
                    this.setState({
                        status: 'faild',
                        errmessage: error.message,
                    })
                })
        } else {
            this.setState({
                status: 'faild',
                errmessage: '当前没有网络！'
            })
        }
    }

    rendermain(item) {
        return(
            <View style={{ width: (ScreenWidth - 40) / 3, height: 82, position: 'absolute', top: 0, left: 0 }}>
            <View style={{ alignItems: 'flex-start', marginLeft: 10, marginTop: 10 }}>
                <Text style={{ color: '#fff', fontSize: 22, }}>
                    {item.backstr}
                </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 30, }}>
                    {item._backmoney}
                </Text>
            </View>
        </View>
        )
    }
    coupons({ item }) {
        let url = null;
        let main = null;
        switch (item.backtype) {
            case '0':
                url = require('../assets/images/yh.jpg');
                main = this.rendermain(item)
                break;
            case '1':
                url = require('../assets/images/zhekou.jpg');
                main = this.rendermain(item)
                break;
            case '2':
                url = require('../assets/images/fanxian.jpg');
                main = <View style={{ width: (ScreenWidth - 40) / 3, height: 82, position: 'absolute', top: 0, left: 0 }}>
                    <View style={{ alignItems: 'flex-start', marginLeft: 10, marginTop: 10 }}>
                        <Text style={{ color: '#fff', fontSize: 22, }}>
                            {item.backstr}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: 18, }}
                        adjustsFontSizeToFit={true}
                        >
                            返{item.backmoney}元余额
                        </Text>
                    </View>
                </View>
                break;
            default:
                break;
        }
        return (
            <TouchableOpacity>
                <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 20, marginRight: 20, }}>
                    <Image
                        resizeMode={'stretch'}
                        style={{ width: ScreenWidth - 40, height: 140, borderRadius: 5 }}
                        source={url}>
                        <View style={{ height: 55, width: ScreenWidth - 90, position: 'absolute', bottom: 0, right: 0, flexDirection: 'row', }}>
                            <View style={{ flex: 1, justifyContent: 'center', }}>
                                <Text style={{ color: '#000' }}>
                                    {item.title4}
                                </Text>
                                <Text style={{ color: '#000' }}>
                                    {item.title2}
                                </Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                <Text
                                    numberOfLines={2}
                                    style={{ fontSize: 20 }}>{item.couponname}
                                </Text>
                            </View>
                        </View>
                        {main}
                    </Image>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        if (this.state.status == 'success') {
            return (
                <View style={{ flex: 1, backgroundColor: '#1C173F' }}>
                    <FlatListJumoTop
                        range={400}
                        extraData={this.state}
                        ListHeaderComponent={<Image
                            source={require('../assets/images/top.jpg')}
                            resizeMode={'stretch'}
                            style={{ width: ScreenWidth, height: 300 }} />}
                        data={this.state.data}
                        renderItem={this.coupons.bind(this)}
                        keyExtractor={(item, index) => index}

                    />
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Loading status={this.state.status} errmessage={this.state.errmessage} />
                </View>
            )
        }

    }
}
