/**
 * 售后商品回寄页面
 */

"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar, TouchableOpacity, Alert,TextInput,Modal } from 'react-native';
import { ScreenWidth, ScreenHeight,REFUNDEXPRESS_URL } from '../common/global';
import Util from '../common/util';
import Toast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { orderList } from '../actions/orderListAction';

class RefundExpress extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        headerTitle: navigation.state.params.title,
        headerTitleStyle: { alignSelf: 'center' },
        headerRight: <Text></Text>
    });

    constructor(...props) {
        super(...props);
        this.state = {
            showMod: false,
            express:this.props.navigation.state.params.result.refund.express,
            expresscom: this.props.navigation.state.params.result.refund.expresscom,
            expresssn: this.props.navigation.state.params.result.refund.expresssn
        };
        this.result = this.props.navigation.state.params.result;
        this.token = this.props.navigation.state.params.token;
    }

    componentWillMount() {
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar translucent={false} backgroundColor="#000" />
                <ScrollView>
                    {this.renderMain()}
                </ScrollView>
                <View style={s.btnBox}>
                    <TouchableOpacity onPress={() => this._sub()}>
                        <Text style={s.btnRed}>提交快递单号</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Text style={s.btn}>返回</Text>
                    </TouchableOpacity>
                </View>
                {this.renderMod()}
            </View>
        );
    }

    _sub(){
        if(this.state.expresssn==''){
            return Toast.show('请填写运单号');
        }
        let params = '';
        let key, value;
        for (let i in this.token) {
            key = i;
            value = token[key]
        }
        params += '&id=' + this.result.order.id;
        params += '&refundid=' + this.result.refund.id;
        params += '&express=' + this.state.express;
        params += '&expresscom=' + this.state.expresscom;
        params += '&expresssn=' + this.state.expresssn;
        params += '&' + key + '=' + value;
        fetch(REFUNDEXPRESS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params,
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.status == 1) {
                    Toast.show('提交成功');
                    let { dispatch, search } = this.props.navigation.state.params;
                    dispatch(orderList(Object.assign({}, search, this.token)));
                    this.props.navigation.goBack();
                } else {
                    Toast.show(responseJson.result.message);
                }
            })
            .catch((error) => {
                Toast.show('服务器请求失败');
            });
    }

    renderMod() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.showMod}
                onRequestClose={() => this.setState({ showMod: false })}
            >
                <Text style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} onPress={() => this.setState({ showMod: false })}></Text>
                <View style={s.mod}>
                    {this.renderTouch()}
                </View>
            </Modal>
        )
    }

    renderTouch() {
        let view = [];
        let express_list = this.result.express_list
        for(let i = 0;i<express_list.length;i++){
            view.push(
                <TouchableOpacity key={i} onPress={() => this._modAct(express_list[i].name,express_list[i].express)}>
                    <Text style={s.modText}>{express_list[i].name}</Text>
                </TouchableOpacity>
            );
        }
        return (
            <ScrollView>
                {view}
            </ScrollView>
        )
    }

    _modAct(sn,exp) {
        this.setState({
            showMod: false,
            express:exp,
            expresscom: sn,
        })
    }

    renderMain() {
        return (
            <View style={s.box}>
                <View style={s.list}>
                    <Text style={{ flex: 1 }}>填写快递单号</Text>
                </View>
                <View style={s.list}>
                    <Text style={{ flex: 1 }}>快递公司</Text>
                    <TouchableOpacity style={{ flex: 3, flexDirection: 'row' }} onPress={() => { this.setState({ showMod: true }) }}>
                        <Text style={{ flex: 15 }}>{this.state.expresscom == '' ? '其他快递' : this.state.expresscom} </Text>
                        <Icon name="angle-right" size={20} style={{ flex: 1 }} />
                    </TouchableOpacity>

                </View>
                <View style={s.listInput}>
                    <Text style={{ flex: 1 }}>快递单号</Text>
                    <TextInput
                        style={{ flex: 3, margin: 0, padding: 0 }}
                        onChangeText={(text) => this.setState({
                            expresssn: text
                        })}
                        multiline={true}
                        placeholder={this.state.expresssn==''?'输入运单号':this.state.expresssn}
                        underlineColorAndroid="transparent"
                    />
                </View>
            </View>
        )
    }

}

const s = StyleSheet.create({
    modText: {
        textAlign: 'center',
        padding: 10
    },
    mod: { width: ScreenWidth * 0.6, height: ScreenWidth * 0.4, backgroundColor: '#fff', position: 'absolute', top: ScreenHeight * 0.5 - ScreenWidth * 0.2, left: ScreenWidth * 0.2, borderRadius: 5 },
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
    listInput: {
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
})

export default RefundExpress;