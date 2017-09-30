/*  加入购物车模态框
    传入参数:
    goodsInfo:商品信息
    showModel：是否显示模态框，此状态需要写在此组件的父级组件状态内，值默认为false
    hide()：回调函数，用于隐藏父级状态showModel;
    statusBarTranslucent:状态栏是否是沉浸式
*/
"use strict";
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal } from 'react-native';
import { ScreenWidth, ScreenHeight, StatusBarHeight, ADD_CART_URL, StatusBar } from '../common/global';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { cart } from '../actions/cartAction';
import Toast from 'react-native-root-toast';
import { connect } from 'react-redux';

export class AddToCart extends Component {

    constructor(...props) {
        super(...props);
        this.state = {
            bottom: 0,
            num: 1,
        }
    }

    // componentDidMount() {
    //     let goodsInfo = this.props.goodsInfo;
    //     this.timer = setInterval(() => { this._timer(), 0 });
    // }

    // _timer() {
    //     if (this.state.bottom === 0) {
    //         this._clearTimer();
    //     } else {
    //         this.setState({
    //             bottom: this.state.bottom + 70,
    //         })
    //     }
    // }

    // componentWillUnmount() {
    //     this._clearTimer();
    // }
    // _clearTimer() {
    //     this.timer && clearTimeout(this.timer);
    // }
    render() {
        let { goodsInfo, showModel, hide, statusBarTranslucent } = this.props;
        // let modH=statusBarTranslucent===true?ScreenHeight-StatusBarHeight:ScreenHeight;
        let modH = statusBarTranslucent === true ? ScreenHeight - StatusBarHeight * 2 : ScreenHeight;

        if (this.props.showModel) {
            return (
                <View style={{ backgroundColor: 'rgba(0,0,0,0.7)', width: ScreenWidth, height: modH, position: 'absolute', top: 0 }} >
                    <Modal
                        visible={this.props.showModel}
                        animationType={'slide'}
                        transparent={true}
                        onRequestClose={() => {
                            hide()
                        }}
                    >
                        <Text style={{ flex: 1 }} onPress={() => { hide(); }}></Text>
                        <View style={{ backgroundColor: '#fff', width: ScreenWidth, position: 'absolute', bottom: 0 }}>
                            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ddd', padding: 25 }}>
                                <Text style={{ flex: 1 }}></Text>
                                <Text style={{ flex: 1, color: 'red', fontSize: 18, textAlign: 'center' }}>&yen;{this.props.goodsInfo.marketprice}</Text>
                                <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end' }} onPress={() => { hide(); }}>
                                    <Icon name={'close'} size={18} color={'#ccc'} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', padding: 15 }}>
                                <Text style={{ flex: 8, paddingLeft: 15 }}>数量</Text>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity 
                                    activeOpacity={1}
                                    onPress={() => this._total('minus')}>
                                        <Text style={styles.minusPlus}>-</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1 }}><Text style={styles.num}>{this.state.num}</Text></View>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity 
                                    activeOpacity={1}
                                    onPress={() => this._total('plus')}>
                                        <Text style={styles.minusPlus}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={{ flex: 1 }} onPress={() => this._addToCart()}>
                                    <Text style={{ flex: 1, textAlign: 'center', padding: 15, color: '#fff', backgroundColor: '#FE9402' }}>加入购物车</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flex: 1 }}>
                                    <Text style={{ flex: 1, textAlign: 'center', padding: 15, color: '#fff', backgroundColor: '#FD5555' }}>立刻购买</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ width: 100, height: 100, position: 'absolute', bottom: 120, backgroundColor: '#fff', left: 25, borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 5 }}>
                            <Image source={{ uri: this.props.goodsInfo.thumb }} style={{ width: 90, height: 90 }} />
                        </View>
                    </Modal>
                </View>
            )
        } else {
            return false;
        }

    }

    _addToCart() {
        if (this.props.loginData.status === 'success') {
            let token = this.props.loginData.data.result.token;
            let key, value;
            for (let i in token) {
                key = i;
                value = token[key]
            }
            let params = '&id=' + this.props.goodsInfo.id + '&optionid=0&total=' + this.state.num + '&diyformdata=false&' + key + '=' + value;
            this._fetch(ADD_CART_URL, params);
        } else {
            Toast.show('请先登陆');
        }
    }

    _fetch(url, params) {
        let { hide } = this.props;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params,
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.status == 1) {
                    Toast.show('加入购物车成功');
                    this.props.dispatch(cart(this.props.loginData.data.result.token));
                    //this._clearTimer();
                    hide();
                } else {
                    Toast.show('加入购物车失败');
                    this.props.dispatch(cart(this.props.loginData.data.result.token))
                }
            })
            .catch((error) => {
                Toast.show('服务器请求失败');
            });
    }

    _total(type) {
        if (type === 'minus' && this.state.num > 1) {
            this.setState({ num: this.state.num * 1 - 1 })
        }
        if (type === 'plus') {
            this.setState({ num: this.state.num * 1 + 1 })
        }
    }
}
const styles = StyleSheet.create({
    minusPlus: {
        flex: 1, borderWidth: 1, borderColor: '#aaa', textAlign: 'center', paddingTop: 3, paddingBottom: 3
    },
    num: {
        flex: 1.5, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#aaa', textAlign: 'center', paddingTop: 3, paddingBottom: 3
    },
    price: {
        color: 'red',
    }
})

function mapStateToProps(state) {
    return {
        loginData: state.loginReducer,
        cartData: state.cartReducer
    }
}

export default connect(mapStateToProps)(AddToCart);