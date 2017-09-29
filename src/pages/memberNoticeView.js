/**
 * 消息提醒设置页面
 * 
 * 
 */
"use strict";


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Image,
    StatusBar,
    TouchableOpacity,
    Switch,
    FlatList
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Toast from 'react-native-root-toast';
import Util from '../common/util';
import Loading from '../component/loading';
import { MEMBERNOTICE_URL, ScreenWidth } from '../common/global'

class MemberNotice extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: false,
            errmessage: '',
            typelist: {
                submit: 0,
                carrier: 0,
                cancel: 0,
                pay: 0,
                send: 0,
                finish: 0,
                refund: 0,
                refunding: 0,
                refund1: 0,
                refund2: 0,
                upgrade: 0,
                recharge_ok: 0,
                recharge_refund: 0,
                withdraw: 0,
                withdraw_ok: 0,
                withdraw_fail: 0,
            },
            menu: [
                {
                    title: '订单类', list: [
                        { name: '订单提交', value: 'submit' },
                        { name: '自提订单', value: 'carrier' },
                        { name: '订单取消', value: 'cancel' },
                        { name: '购买成功', value: 'pay' },
                        { name: '订单发货', value: 'send' },
                        { name: '订单收货', value: 'finish' },
                        { name: '退款申请', value: 'refund' },
                        { name: '退款进度', value: 'refunding' },
                        { name: '退款结果', value: 'refund1' },
                        { name: '退款失败', value: 'refund2' },
                    ]
                },
                {
                    title: '会员类', list: [
                        { name: '会员升级', value: 'upgrade' },
                    ]
                },
                {
                    title: '充值类', list: [
                        { name: '充值成功', value: 'recharge_ok' },
                        { name: '充值退款', value: 'recharge_refund' },
                    ]
                },
                {
                    title: '提现类', list: [
                        { name: '提现申请', value: 'withdraw' },
                        { name: '提现成功', value: 'withdraw_ok' },
                        { name: '提现失败', value: 'withdraw_fail' },
                    ]
                },
            ]
        }
    }

    getNotice() {
        let { loginData } = this.props;
        let token = '';
        for (let key in loginData.data.result.token) {
            token = '&' + key + '=' + loginData.data.result.token[key]
        }
        let url = MEMBERNOTICE_URL + token + '&app=1';
        if (global.isConnected) {
            Util.get(url,
                (resq) => {
                    if (resq.status == 1) {
                        this.setState(
                            Object.assign(this.state.typelist,resq.result.notice)
                        )
                        this.setState({status:'success'})
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
                        errmessage: error,
                    })
                },
            )
        } else {
            this.setState({
                status: 'faild',
                errmessage: '当前没有网络！'
            })
        }
    }

    setNotice(value){
        let { loginData } = this.props;
        let token = '';
        for (let key in loginData.data.result.token) {
            token = '&' + key + '=' + loginData.data.result.token[key]
        }
        let params={
                    type:value,
                    checked:this.state.typelist[value]
        }
        let url = MEMBERNOTICE_URL + token ;
        if (global.isConnected) {
            Util.post(url,params,
                (resq) => {
                    if (resq.status != 1) {
                        Toast.show('设置失败')
                    } 
                }
            )
        } else {
            this.setState({
                status: 'faild',
                errmessage: '当前没有网络！'
            })
        }
    }

    componentDidMount() {
        this.getNotice();
    }


    valueChange(value) {
        this.setNotice(value)
        this.setState(Object.assign(this.state.typelist, {
            [value]: this.state.typelist[value] ? 0 : 1
        })
        )
    }

    renderList({ item }) {
        let list = [];
        for (let i = 0; i < item.list.length; i++) {
            list.push(
                <View key={i} style={[styles.rowBetween, { borderColor: '#ccc', borderBottomWidth: 0.5, paddingTop: 5, paddingBottom: 5 }]}>
                    <Text style={{ fontSize: 12, marginLeft: 20 }}>{item.list[i].name}</Text>
                    <Switch
                        onValueChange={() => { this.valueChange(item.list[i].value) }}
                        value={this.state.typelist[item.list[i].value] ? false : true}
                        style={{ marginRight: 20 }} />
                </View>
            )
        }
        return (
            <View>
                <View style={[styles.center, { padding: 10, borderColor: '#ccc', borderBottomWidth: 0.5 }]}>
                    <Text>{item.title}</Text>
                </View>
                <View style={{ backgroundColor: '#fff' }}>
                    {list}
                </View>
            </View>
        )
    }


    render() {
        if (this.state.status == 'success') {
            return (
                <View style={{ flex: 1 }}>
                     <StatusBar
                        translucent={false}
                        backgroundColor="#000"
                    />
                    <FlatList
                        data={this.state.menu}
                        extraData={this.state}
                        keyExtractor={(item, index) => index}
                        renderItem={this.renderList.bind(this)}
                        showsVerticalScrollIndicator={false}
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



const styles = StyleSheet.create({
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
    //水平两端布局
    rowBetween: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    },
    topNav: {
        height: 40, flexDirection: 'row', backgroundColor: '#fff'
    },
})


function mapStateToProps(state) {
    return {
        loginData: state.loginReducer,
    }
}

export default connect(mapStateToProps)(MemberNotice);