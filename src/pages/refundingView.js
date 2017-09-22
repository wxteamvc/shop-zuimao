/**
 * 退款中/售后中
 */

"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar, TouchableOpacity, TextInput, Alert } from 'react-native';
import { ScreenWidth, ScreenHeight, REFUNDCANCEL_URL } from '../common/global';
import Util from '../common/util';
import Toast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { orderList } from '../actions/orderListAction';
class Refunding extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        headerTitle: navigation.state.params.title,
        headerTitleStyle: { alignSelf: 'center' },
        headerRight: <Text></Text>
    });

    constructor(...props) {
        super(...props);
        this.state = {
            id: null,
            rtype: null,//0为退款(仅退款不退货)，1为退货退款，2为换货
            reason: '不想要了',
            centent: null,
            price: this.props.navigation.state.params.result.order.price,
        }
        this.order = this.props.navigation.state.params.result.order;
        this.token = this.props.navigation.state.params.token;
    }

    componentWillMount() {
        if (this.props.navigation.state.params.title == '申请退款') {
            this.setState({ rtype: 0 })
        } else {
            this.setState({ rtype: 1 })
        }
    }

    render() {
        let refund = this.props.navigation.state.params.result.refund;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar translucent={false} backgroundColor="#000" />
                <ScrollView>
                    {this.renderTop()}
                    {this.renderMain()}
                </ScrollView>
                <View style={s.btnBox}>
                    {refund.status >= 3 ?
                        <TouchableOpacity onPress={()=>this._refundExpress()}>
                            <Text style={s.btnBlue}>{refund.express==''?'填写':'修改'}快递单号</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => this._refund()}>
                            <Text style={s.btnRed}>修改申请</Text>
                        </TouchableOpacity>}
                    <TouchableOpacity onPress={() => this._refundCancel(this.order.id)}>
                        <Text style={s.btn}>取消申请</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _refundExpress(){
        let { dispatch, search, result} = this.props.navigation.state.params;
        this.props.navigation.navigate('RefundExpress', { result: result, token: this.token, title: '填写快递单号', dispatch: dispatch, search: search })
    }

    _fetch(url, params = {}, token = {}) {
        let { dispatch, search } = this.props.navigation.state.params;
        Util.post(url, params,
            (responseJson) => {
                this.setState({
                    showActivityIndicator: false,
                })
                if (responseJson.status == 1) {
                    dispatch(orderList(Object.assign({}, search, token)));
                    this.props.navigation.goBack(this.props.navigation.state.params.routeKey);
                    url == REFUNDCANCEL_URL ? Toast.show('取消成功') : null;
                } else {
                    Toast.show(responseJson.result.message);
                    dispatch(orderList(Object.assign({}, search, token)));
                }
            },
            (error) => {
                this.setState({
                    showActivityIndicator: false,
                })
                Toast.show('服务器请求失败！');
            },
        )
    }

    _refundCancel(oid) {
        Alert.alert('温馨提醒', '确定取消申请吗?', [
            { text: '取消' },
            {
                text: '确定', onPress: () => {
                    this._fetch(REFUNDCANCEL_URL, Object.assign({}, this.token, { id: oid }), this.token)
                }
            }
        ])
    }

    _refund() {
        let tit;
        let { dispatch, search } = this.props.navigation.state.params;
        if (this.order.status == 1) {
            tit = '申请退款'
        } else {
            tit = '申请售后'
        }

        this.props.navigation.navigate('Refund', { order: this.order, token: this.token, title: tit, dispatch: dispatch, search: search })
    }

    renderTop() {
        return (
            <View style={[s.box, { backgroundColor: '#C10001', padding: 10 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <Icon name="exclamation-circle" size={50} color={'#fff'} style={{ flex: 1 }} />
                    <Text style={{ flex: 5, color: '#fff', fontSize: 18 }}>{this.renderTopText()}</Text>
                </View>
                {this.renderRefundText()}
            </View>
        )
    }

    renderTopText() {
        let { refund, order } = this.props.navigation.state.params.result;
        let text = '';
        if (refund.status == 0) {
            text += '等待商家处理';
            if (order.status == 1) {
                text += '退款';
            } else {
                text += '售后';
            }
            text += '申请';
        }
        if (refund.status >= 3) {
            text += '商家已通过';
            if (order.status == 1) {
                text += '退款';
            } else {
                text += '售后';
            }
            text += '申请';
        }
        return text;
    }

    renderRefundText() {
        if (this.order.status == 1) {
            return (
                <View>
                    <Text style={{ color: '#fff' }}>退款申请流程：</Text>
                    <Text style={{ color: '#fff' }}>1、发起退款申请</Text>
                    <Text style={{ color: '#fff' }}>2、商家确认后退款到您的账户 如果商家未处理：请及时与商家联系</Text>
                </View>
            )
        } else {
            return (
                <View>
                    <Text style={{ color: '#fff' }}>退款退货申请流程：</Text>
                    <Text style={{ color: '#fff' }}>1、发起退款退货申请</Text>
                    <Text style={{ color: '#fff' }}>2、退货需将退货商品邮寄至商家指定地址，并在系统内输入快递单号</Text>
                    <Text style={{ color: '#fff' }}>3、商家后货后确认无误</Text>
                    <Text style={{ color: '#fff' }}>4、退款到您的账户</Text>
                </View>
            )
        }
    }

    renderMain() {
        let rtypeText = [];
        rtypeText[0] = '退款（仅退款不退货）';
        rtypeText[1] = '退货退款';
        rtypeText[2] = '换货';
        let refund = this.props.navigation.state.params.result.refund;
        return (
            <View style={s.box}>
                {refund.rtype==1 || refund.rtype==2?
                    <View style={s.list}>
                    <Text style={{ flex: 1 ,color:'red'}}>{refund.rtype==1?'退货':'换货'}状态</Text>
                    <Text style={{ flex: 3 }}>{this._refundStatusText(refund)}</Text>
                </View>:null}
                <View style={s.list}>
                    <Text style={{ flex: 1 }}>处理方式</Text>
                    <Text style={{ flex: 3 }}>{rtypeText[this.state.rtype]}</Text>
                </View>
                <View style={s.list}>
                    <Text style={{ flex: 1 }}>原因</Text>
                    <Text style={{ flex: 3 }}>{this.state.reason}</Text>
                </View>
                <View style={s.list}>
                    <Text style={{ flex: 1 }}>备注说明</Text>
                    <Text style={{ flex: 3 }}>{refund.content == 'undefined' ? '无' : refund.content}</Text>
                </View>
                <View style={s.list}>
                    <Text style={{ flex: 1 }}>退款金额</Text>
                    <Text style={{ flex: 3 }}>&yen;{this.state.price}</Text>
                </View>
                <View style={s.time}>
                    <Text style={{ flex: 1 }}>申请时间</Text>
                    <Text style={{ flex: 3 }}>{this.order.createtime}</Text>
                </View>
            </View>
        )
    }

    _refundStatusText(refund){
        if(refund.status==3){
            return (
                <Text style={{color:'green'}}>需填写快递单号</Text>
            )
        }
        if(refund.status==4){
            return (
                <Text style={{color:'green'}}>等待商家确认</Text>
            )
        }
        if(refund.status==5){
            return (
                <Text style={{color:'green'}}>商家已经发货</Text>
            )
        }

    }
}

const s = StyleSheet.create({
    box: {
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        backgroundColor: '#fff'
    },
    list: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        padding: 10,
    },
    time: {
        flexDirection: 'row',
        padding: 10,
    },
    btnBox: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20
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
    },
    btnBlue: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#0290BE',
        margin: 5,
        color: '#0290BE',
        fontSize: 11
    }
})

export default Refunding;