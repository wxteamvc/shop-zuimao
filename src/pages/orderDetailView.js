/**
 * 物流信息
 */

"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, StatusBar, FlatList, TouchableOpacity, Alert, Modal,ActivityIndicator } from 'react-native';
import { ScreenWidth, ScreenHeight,ORDERDELETE_URL, ORDERCANCEL_URL, ORDERFINISH_URL, ORDERDETAIL_URL } from '../common/global';
import Util from '../common/util';
import Toast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { orderList } from '../actions/orderListAction';

class OrderDetail extends Component {

    constructor(...props) {
        super(...props);
        this.state = {
            detailData: '',
            showMod: false,
            showActivityIndicator:false,
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
                    {this.renderBtns(this.state.detailData.order.status)}
                    {this.renderModel()}
                    {this.renderActivityIndicator()}
                </View>
            )
        } else {
            return false;
        }

    }

    renderActivityIndicator(){
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.showActivityIndicator}
                onRequestClose={()=>null}
            >
                <Text style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}></Text>
                <ActivityIndicator style={s.load} color={'#fff'}/>
            </Modal>
        )
    }

    renderModel() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.showMod}
                onRequestClose={() => this.setState({ showMod: false })}
            >
                <Text style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} onPress={() => this.setState({ showMod: false })}></Text>
                <View style={s.mod}>
                    <ScrollView>
                        <TouchableOpacity onPress={() => this.setState({ showMod: false })}>
                            <Text style={s.modText}>不想取消了</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._cancel('我不想买了')}>
                            <Text style={s.modText}>我不想买了</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._cancel('信息填写错误，重新拍')}>
                            <Text style={s.modText}>信息填写错误，重新拍</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._cancel('同城见面交易')}>
                            <Text style={s.modText}>同城见面交易</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._cancel('其他原因')}>
                            <Text style={s.modText}>其他原因</Text>
                        </TouchableOpacity>

                    </ScrollView>
                </View>
            </Modal>
        )
    }

    _cancel(text) {
        let token = this.props.navigation.state.params.token;
        let oid = this.props.navigation.state.params.id;
        Alert.alert('温馨提醒', '确定取消吗?', [
            { text: '取消' },
            {
                text: '确定', onPress: () => {
                    this.setState({
                        showMod: false,
                        showActivityIndicator:true,
                    })
                    this._fetch(ORDERCANCEL_URL, Object.assign({}, token, { id: oid, remark: text }), token)
                }
            }
        ])
    }

    _delete(oid) {
        let token = this.props.navigation.state.params.token;
        Alert.alert('温馨提醒', '确定删除吗?', [
            { text: '取消' },
            {
                text: '确定', onPress: () => {
                    this.setState({
                        showActivityIndicator:true,
                    })
                    // userdeleted 为1时放到回收站，为2彻底删除
                    this._fetch(ORDERDELETE_URL, Object.assign({}, token, { id: oid, userdeleted: 1 }), token)
                }
            }
        ])
    }

    _finish(oid) {
        let token = this.props.navigation.state.params.token;
        Alert.alert('温馨提醒', '确定收货吗?', [
            { text: '取消' },
            {
                text: '确定', onPress: () => {
                    this.setState({
                        showActivityIndicator:true,
                    })
                    this._fetch(ORDERFINISH_URL, Object.assign({}, token, { id: oid }), token)
                }
            }
        ])
    }

    _fetch(url, params = {}, token = {}) {
        let {dispatch,search} = this.props.navigation.state.params;
        Util.post(url, params,
            (responseJson) => {
                this.setState({
                    showActivityIndicator:false,
                })
                if (responseJson.status == 1) {
                    dispatch(orderList(Object.assign({}, search, token)));
                    this.props.navigation.goBack();
                    url==ORDERCANCEL_URL?Toast.show('取消成功'):null;
                    url==ORDERFINISH_URL?Toast.show('确认成功'):null;
                    url==ORDERDELETE_URL?Toast.show('删除成功'):null;
                    
                } else {
                    Toast.show(responseJson.result.message);
                    dispatch(orderList(Object.assign({}, search, token)));
                }
            },
            (error) => {
                this.setState({
                    showActivityIndicator:false,
                })
                Toast.show('服务器请求失败！');
            },
        )
    }

    renderBtns(status) {
        let oid = this.state.detailData.order.id;
        switch (status) {
            case '-1':
                return (
                    <View style={s.btnBox}>
                        <TouchableOpacity onPress={() => this._delete(oid)}>
                            <Text style={s.btn}>删除订单</Text>
                        </TouchableOpacity>
                    </View>
                )

                break;
            case '0':
                return (
                    <View style={s.btnBox}>
                        <TouchableOpacity onPress={() => this.setState({ showMod: true })}>
                            <Text style={s.btn}>取消订单</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={s.btnRed}>支付订单</Text>
                        </TouchableOpacity>
                    </View>
                )
                break;
            case '1':
                return (
                    <View style={s.btnBox}>
                        <TouchableOpacity>
                            <Text style={s.btn}>申请退款</Text>
                        </TouchableOpacity>
                    </View>
                )
                break;
            case '2':
                return (
                    <View style={s.btnBox}>
                        <TouchableOpacity>
                            <Text style={s.btn}>申请售后</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._finish(oid)}>
                            <Text style={s.btnRed}>确认收货</Text>
                        </TouchableOpacity>
                    </View>
                )
                break;
            case '3':
                return (
                    <View style={s.btnBox}>
                        <TouchableOpacity onPress={() => this._delete(oid)}>
                            <Text style={s.btn}>删除订单</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={s.btnRed}>评价</Text>
                        </TouchableOpacity>
                    </View>
                )
                break;
            default:
                break;
        }
    }

    renderGoods() {
        let data = this.state.detailData;
        return (
            <View style={{ marginTop: 10 }}>
                <View style={s.listTop}>
                    <Text style={s.shop}>&#xe60c;</Text>
                    <Text style={{ flex: 9 }}>{data.shopname}&nbsp;&nbsp;<Icon name="angle-right" size={20} /></Text>
                </View>
                {this.renderGoodsList(data.goods)}
                <View style={s.listBottom}>
                    <Text>小计：<Text style={{ color: 'red' }}>&yen;{data.order.goodsprice}</Text></Text>
                    <Text>运费：<Text style={{ color: 'red' }}>&yen;{data.order.dispatchprice}</Text></Text>
                    {this.renderYouhui()}
                    <Text>总计（含运费）：<Text style={{ color: 'red' }}>&yen;{data.order.price}</Text></Text>
                </View>
                {this.renderSn()}
            </View>
        )
    }

    renderSn() {
        let order = this.state.detailData.order;
        return (
            <View style={s.listSn}>
                <Text>订单编号：{order.ordersn}</Text>
                <Text>创建时间：{order.createtime}</Text>
                {order.status >= 1 ? <Text>支付时间：{order.paytime}</Text> : null}
                {order.status >= 2 ? <Text>发货时间：{order.sendtime}</Text> : null}
                {order.status == 3 ? <Text>完成时间：{order.createtime}</Text> : null}
            </View>
        )
    }

    renderYouhui() {
        let order = this.state.detailData.order;
        if (order.ispackage == 0) {
            if (order.deductenough > 0) {
                return (
                    <Text>满额立减：<Text style={{ color: 'red' }}>-&yen;{order.deductenough}</Text></Text>
                )
            }
            if (order.couponprice > 0) {
                return (
                    <Text>优惠券优惠：<Text style={{ color: 'red' }}>-&yen;{order.couponprice}</Text></Text>
                )
            }
            if (order.buyagainprice > 0) {
                return (
                    <Text>重复购买优惠：<Text style={{ color: 'red' }}>-&yen;{order.buyagainprice}</Text></Text>
                )
            }
            if (order.discountprice > 0) {
                return (
                    <Text>会员优惠：<Text style={{ color: 'red' }}>-&yen;{order.discountprice}</Text></Text>
                )
            }
            if (order.isdiscountprice > 0) {
                return (
                    <Text>促销优惠：<Text style={{ color: 'red' }}>-&yen;{order.isdiscountprice}</Text></Text>
                )
            }
            if (order.deductprice > 0) {
                return (
                    <Text>抵扣：<Text style={{ color: 'red' }}>-&yen;{order.deductprice}</Text></Text>
                )
            }
            if (order.deductcredit2 > 0) {
                return (
                    <Text>抵扣：<Text style={{ color: 'red' }}>-&yen;{order.deductcredit2}</Text></Text>
                )
            }
            if (order.seckilldiscountprice > 0) {
                return (
                    <Text>秒杀优惠：<Text style={{ color: 'red' }}>-&yen;{order.seckilldiscountprice}</Text></Text>
                )
            }
        }
    }

    renderGoodsList(goods) {
        let goodsArr = [];
        for (let j = 0; j < goods.length; j++) {
            goodsArr.push(
                <View key={j} style={s.listMid}>
                    <Image source={{ uri: goods[j].thumb }} style={s.img} />
                    <View style={s.goods}>
                        <Text style={s.title} numberOfLines={2}>{goods[j].title}</Text>
                    </View>
                    <View style={s.price}>
                        <Text style={{ color: 'red', fontWeight: 'bold' }}>&yen;{goods[j].price}</Text>
                        <Text style={{ color: 'red' }}>×{goods[j].total}</Text>
                    </View>
                </View>
            )
        }
        return goodsArr;
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
    load: {position: 'absolute', top: ScreenHeight * 0.5, left: ScreenWidth * 0.5, },
    modText: {
        textAlign: 'center',
        padding: 10
    },
    mod: { width: ScreenWidth * 0.6, height: ScreenWidth * 0.4, backgroundColor: '#fff', position: 'absolute', top: ScreenHeight * 0.5 - ScreenWidth * 0.2, left: ScreenWidth * 0.2, borderRadius: 5 },
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
    listSn: {
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        marginTop: 10,
        paddingLeft: 20,
        marginBottom: 10,
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
    btnBox: {
        flexDirection: 'row', backgroundColor: '#fff', justifyContent: 'flex-end', padding: 10, borderTopWidth: 1, borderColor: '#eee'
    },
    btnRed: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'red',
        margin: 5,
        color: 'red',
        fontSize: 11
    }
})

export default OrderDetail;