/**
 * 物流信息
 */

"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { ORDERDETAIL_URL } from '../common/global';
import Util from '../common/util';
import Toast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

class OrderDetail extends Component {

    constructor(...props) {
        super(...props);
        this.state = {
            detailData: '',
        }
    }

    componentDidMount() {
        let oid = this.props.navigation.state.params.id;
        let token = this.props.navigation.state.params.token;
        this._getDetail(ORDERDETAIL_URL, Object.assign({ id: oid, app: 1 }, token))
    }

    _getDetail(url, params = {}) {
        Util.post(url, params,
            (responseJson) => {
                if (responseJson.status == 1) {
                    this.setState({
                        detailData: responseJson.result,
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
        if (this.state.detailData != '') {
            return (
                <View style={{ flex: 1 }}>
                    <StatusBar
                        translucent={false}
                        backgroundColor="#000"
                    />
                    <ScrollView>
                        {this.renderHeader()}
                        {this.renderAddress()}
                        {this.renderGoods()}
                    </ScrollView>
                </View>
            )
        } else {
            return false;
        }

    }

    renderGoods() {
        // return (
        //     <View style={{ marginTop: 10 }}>
        //         <View style={s.listTop}>
        //             <Text style={s.shop}>&#xe60c;</Text>
        //             <Text style={{ flex: 9 }}>aaa&nbsp;&nbsp;<Icon name="angle-right" size={20} /></Text>
        //             <Text style={{ flex: 2, color: '#FFAA25' }}>{item.statusstr}</Text>
        //         </View>
        //         <View key={j} style={s.listMid}>
        //             <Image source={{ uri: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png'}} style={s.img} />
        //             <View style={s.goods}>
        //                 <Text style={s.title} numberOfLines={2}>sadkjska</Text>
        //             </View>
        //             <View style={s.price}>
        //                 <Text style={{ color: 'red', fontWeight: 'bold' }}>&yen;45</Text>
        //                 <Text style={{ color: 'red' }}>×22</Text>
        //             </View>
        //         </View>
        //         <View style={s.listBottom}>
        //             <Text style={{ fontSize: 11 }}>共<Text style={{ color: 'red' }}>3333</Text>件商品&nbsp;合计：<Text style={{ color: 'red' }}>&yen;999</Text></Text>
        //             <View style={{ flexDirection: 'row' }}>
        //                 <TouchableOpacity>
        //                     <Text style={s.btn}>按钮1</Text>
        //                 </TouchableOpacity>
        //                 <TouchableOpacity>
        //                     <Text style={s.btn}>按钮2</Text>
        //                 </TouchableOpacity>
        //             </View>
        //         </View>
        //     </View>
        // )
    }

    renderAddress() {
        let { order, address } = this.state.detailData;
        return (
            <View style={s.top}>
                {order['status'] == 3 ? this.renderExpress(order.id) : null}
                <View style={s.address}>
                    <Icon name="map-marker" size={25} style={{ flex: 1, paddingLeft: 5 }} />
                    <View style={{ flex: 9 }}>
                        <View style={s.name}>
                            <Text>收货人：{address.realname}</Text>
                            <Text>{address.mobile}</Text>
                        </View>
                        <Text numberOfLines={2} style={{ paddingLeft: 15 }}>收货地址：{address.area}{address.city}{address.province}{address.address}</Text>
                    </View>
                </View>
            </View>
        )
    }

    renderExpress(oid) {
        return (
            <View style={s.express}>
                <Icon name="truck" size={25} style={{ flex: 1 }} color={'green'} />
                <TouchableOpacity style={s.touch} onPress={() => this._express(oid)}>
                    <Text style={s.expressT}>交易成功</Text>
                    <Icon name="chevron-right" size={15} style={{ flex: 1 }} />
                </TouchableOpacity>
            </View>
        )
    }
    _express(oid) {
        this.props.navigation.navigate('Express', { id: oid, token: this.props.token })
    }

    renderHeader() {
        let order = this.state.detailData.order;
        let icon, text;
        if (order['status'] == 0) {
            icon = <Icon name="exclamation-circle" size={50} color={'#fff'} style={{ flex: 1 }} />;
            if (order['paytype'] == 3) {
                text = '货到付款，等待发货';
            } else {
                text = '等待付款';
            }
        } else if (order['status'] == 1) {
            icon = <Icon name="credit-card" size={50} color={'#fff'} style={{ flex: 1 }} />;
            text = '买家已付款';
        } else if (order['status'] == 2) {
            icon = <Icon name="truck" size={50} color={'#fff'} style={{ flex: 1 }} />;
            text = '卖家已发货';
        } else if (order['status'] == 3) {
            icon = <Icon name="check-circle-o" size={50} color={'#fff'} style={{ flex: 1 }} />;
            text = '交易已完成';
        } else if (order['status'] == -1) {
            icon = <Icon name="times-circle-o" size={50} color={'#fff'} style={{ flex: 1 }} />;
            text = '交易关闭';
        }

        return (
            <View style={s.header}>
                {icon}
                <View style={s.headerTextV}>
                    <Text style={s.textB}>{text}</Text>
                    <Text style={s.text}>订单金额（含运费）：&yen;{order.price}</Text>
                </View>
            </View>
        )
    }

}

const s = StyleSheet.create({
    name: {
        flexDirection: 'row', justifyContent: 'space-between',
        padding: 15,
        paddingBottom: 5
    },
    address: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    touch: {
        flex: 9, flexDirection: 'row', alignItems: 'center'
    },
    top: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#fff'
    },
    express: {
        flexDirection: 'row',
        marginBottom: 10
    },
    header: {
        backgroundColor: '#C10001',
        padding: 15,
        flexDirection: 'row',
        marginTop: 10
    },
    headerTextV: {
        flex: 2,
        justifyContent: 'center'
    },
    textB: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    text: {
        color: '#fff',
    },
    expressT: {
        flex: 9,
        color: 'green',
        paddingLeft: 35
    },
    listBottom: {
        alignItems: 'flex-end',
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20
    },
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
    btn: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#aaa',
        margin: 5,
        fontSize: 11
    },
})

export default OrderDetail;