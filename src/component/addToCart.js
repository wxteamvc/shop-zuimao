/*  加入购物车模态框
    传入参数:
    goodsInfo:商品信息
    showModel：是否显示模态框，此状态需要写在此组件的父级组件状态内，值默认为false
    hide()：回调函数，用于隐藏父级状态showModel;
*/
"use strict";
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { ScreenWidth, ScreenHeight, StatusBarHeight } from '../common/global';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

export default class AddToCart extends Component {

    constructor(...props) {
        super(...props);
        this.state = {
            bottom: -210,
            num: 1,
        }
    }

    componentDidMount() {
        let goodsInfo = this.props.goodsInfo;
        this.state.timer = setInterval(() => { this._timer(),0 });
    }

    _timer(){
        if(this.state.bottom===0){
            this._clearTimer();
        }else{
            this.setState({
                bottom:this.state.bottom + 70,
            })
        }
    }

    componentWillUnmount() {
        this._clearTimer();
    }
    _clearTimer(){
        this.state.timer && clearTimeout(this.state.timer);
    }
    render() {
        let { goodsInfo, showModel, hide } = this.props;
        if (this.props.showModel) {
            return (
                <View style={{ position: 'absolute', height: ScreenHeight }}>
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.7)', width: ScreenWidth, height: ScreenHeight, position: 'absolute', top: 0 }}></View>
                    <View style={{ backgroundColor: '#fff', width: ScreenWidth, position: 'absolute', bottom: this.state.bottom + StatusBarHeight }}>
                        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ddd', padding: 25 }}>
                            <Text style={{ flex: 1 }}></Text>
                            <Text style={{ flex: 1, color: 'red', fontSize: 18, textAlign: 'center' }}>&yen;{this.props.goodsInfo.marketprice}</Text>
                            <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end' }} onPress={() => {hide();this._clearTimer();}}>
                                <Icon name={'close'} size={18} color={'#ccc'} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 15 }}>
                            <Text style={{ flex: 8, paddingLeft: 15 }}>数量</Text>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={() => this._total('minus')}>
                                    <Text style={styles.minusPlus}>-</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}><Text style={styles.num}>{this.state.num}</Text></View>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={() => this._total('plus')}>
                                    <Text style={styles.minusPlus}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ flex: 1, textAlign: 'center', padding: 15, color: '#fff', backgroundColor: '#FE9402' }}>加入购物车</Text>
                            <Text style={{ flex: 1, textAlign: 'center', padding: 15, color: '#fff', backgroundColor: '#FD5555' }}>立刻购买</Text>
                        </View>
                    </View>
                    <View style={{ width: 100, height: 100, position: 'absolute', bottom: this.state.bottom+150, backgroundColor: '#fff', left: 25, borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 5 }}>
                        <Image source={{ uri: this.props.goodsInfo.thumb }} style={{ width: 90, height: 90 }} />
                    </View>
                </View>
            )
        } else {
            return false;
        }

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