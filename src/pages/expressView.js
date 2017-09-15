/**
 * 物流信息
 */

"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, StatusBar, FlatList } from 'react-native';
import { EXPRESS_URL } from '../common/global';
import Util from '../common/util';
import Toast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

class Express extends Component {

    constructor(...props) {
        super(...props);
        this.state = {
            expressData: '',
        }
    }

    componentDidMount() {
        let oid = this.props.navigation.state.params.id;
        let token = this.props.navigation.state.params.token;
        this._getExpress(EXPRESS_URL, Object.assign({ id: oid, app: 1 }, token))
    }

    _getExpress(url, params = {}) {
        Util.post(url, params,
            (responseJson) => {
                if (responseJson.status == 1) {
                    this.setState({
                        expressData: responseJson.result,
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
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    translucent={false}
                    backgroundColor="#000"
                />
                {this.renderExpress()}
            </View>
        )
    }

    renderExpress() {
        let data = this.state.expressData;
        if (data !== '') {
            return (
                <View style={{ flex: 1 }}>
                    <View style={s.top}>
                        <Image source={{ uri: data.goods[0].thumb }} style={{ flex: 1 }} />
                        <View style={{ flex: 2.8, paddingLeft: 30 }}>
                            <Text style={{ fontSize: 16, color: '#000' }}>物流状态：<Text style={{ color: 'green' }}>{data.status}</Text></Text>
                            <Text>快递公司：<Text>{data.order.expresscom}</Text></Text>
                            <Text>快递单号：<Text>{data.order.expresssn}</Text></Text>
                            <Text>商品数量：<Text style={{ color: 'red' }}>{data.goods.length}</Text></Text>
                        </View>
                    </View>
                    <View style={{ flex: 5, paddingTop: 10 }}>
                        {data.expresslist == undefined || data.expresslist == '' || data.expresslist.length == 0 ?
                            <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                                <Icon name="truck" size={80} color={'#aaa'} />
                                <Text>暂时没有物流信息</Text>
                            </View> :
                            <FlatList
                                keyExtractor={(item, index) => index}
                                data={data.expresslist}
                                renderItem={({ item, index }) => this.renderList(item, index, data.status)}
                            />
                        }
                    </View>
                </View>
            )
        }
    }

    renderList(item, index, status) {
        let cc = status == '已签收' ? 'gray' : 'green';
        return (
            <View style={s.list}>
                <View style={{ flex: 1 }}>
                    <Text style={[index == 0 ? s.lineFirst : s.line, { borderColor: cc }]}></Text>
                    <Text style={[s.yuan, index == 0 ? { backgroundColor: 'green' } : { backgroundColor: cc }]}></Text>
                </View>
                <View style={s.textBox}>
                    <Text style={[s.step, index == 0 ? { color: 'green' } : { color: cc }]} numberOfLines={2}>{item.step}</Text>
                    <Text style={[s.time, index == 0 ? { color: 'green' } : { color: cc }]}>{item.time}</Text>
                </View>
            </View>
        )
    }
}

const s = StyleSheet.create({
    top: {
        flex: 1, padding: 10, flexDirection: 'row', backgroundColor: '#fafafa'
    },
    list: {
        flexDirection: 'row', backgroundColor: '#fff'
    },
    yuan: {
        width: 16, height: 16, borderRadius: 15, position: 'absolute', top: 30, left: 15
    },
    lineFirst: {
        height: 70, borderLeftWidth: 2, position: 'absolute', top: 30, left: 22
    },
    line: {
        height: 100, borderLeftWidth: 2, position: 'absolute', top: 0, left: 22
    },
    textBox: {
        flex: 8, borderBottomWidth: 1, borderColor: '#ccc', height: 100
    },
    step: {
        paddingTop: 10, paddingRight: 15, height: 60
    },
    time: {
        paddingBottom: 10, paddingRight: 15
    }
})

export default Express;