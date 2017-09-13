/**
 * 我的订单
 */

"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { orderList } from '../actions/orderListAction';
import FlatListJumoTop from '../component/flatListJumoTop';

class OrderList extends Component {

    constructor(...props) {
        super(...props);
        this.state = {
            search: {
                page: 1,
                status: '',//空为所有，0为待付款，1为待发货，2为待收货，3为已完成
                merchid: 0,
                _: Math.round(new Date().getTime()),
            }
        }
    }

    componentDidMount() {
        this.setState(Object.assign(
            this.state.search, this.props.navigation.state.params.search
        ))
        let token = this.props.loginData.data.result.token;
        this.props.dispatch(orderList(Object.assign(this.state.search, token)));
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderTab()}
                {this.renderList()}
            </View>
        )
    }

    renderTab() {
        return (
            <View>
                <View style={s.tabBox}>
                    <Text onPress={() => this._setTab('')} style={[s.tabText, this.state.search.status === '' ? s.tabTextRed : null]}>全部</Text>
                    <Text onPress={() => this._setTab(0)} style={[s.tabText, this.state.search.status === 0 ? s.tabTextRed : null]}>待付款</Text>
                    <Text onPress={() => this._setTab(1)} style={[s.tabText, this.state.search.status === 1 ? s.tabTextRed : null]}>待发货</Text>
                    <Text onPress={() => this._setTab(2)} style={[s.tabText, this.state.search.status === 2 ? s.tabTextRed : null]}>待收货</Text>
                    <Text onPress={() => this._setTab(3)} style={[s.tabText, this.state.search.status === 3 ? s.tabTextRed : null]}>已完成</Text>
                </View>
            </View>
        )
    }

    renderList() {
        if (this.props.orderListData.status == 'success') {
            let list = this.props.orderListData.list;
            let token = this.props.loginData.data.result.token;
            return (
                <FlatListJumoTop
                    keyExtractor={(item, index) => index}
                    data={list}
                    renderItem={({ item }) => <MyListItem item={item} />}
                    onEndReached={() => {
                        list.length < this.props.orderListData.total ?
                            this.props.dispatch(orderList(
                                Object.assign(
                                    this.state.search,
                                    { page: ++this.state.search.page },
                                    token
                                )
                            )) : null;
                    }}
                    onEndReachedThreshold={list.length > 4 ? 0.2 : 1}
                    ListFooterComponent={() => list.length < this.props.orderListData.total ? <ActivityIndicator size={40}></ActivityIndicator> : <Text style={{ textAlign: 'center' }}>DUANG~已经到底了哦</Text>
                    }
                    showsVerticalScrollIndicator={false}
                />
            );
        } else {
            return false;
        }

    }

    _setTab(type) {
        if (this.state.search.status !== type) {
            this.setState({
                search: {
                    ...this.state.search,
                    status: type
                }
            })
            let token = this.props.loginData.data.result.token;
            this.props.dispatch(orderList(Object.assign(this.state.search, token,{status: type})));
        }
        
    }

}

class MyListItem extends React.PureComponent {
    render() {
        let { item } = this.props;
        return (
            <View style={{ marginTop: 10 }}>
                <View style={s.listTop}>
                    <Text style={s.shop}>&#xe60c;</Text>
                    <Text style={{ flex: 9 }}>{item.merchname}&nbsp;&nbsp;<Icon name="angle-right" size={20} /></Text>
                    <Text style={{ flex: 3 }}>{item.statusstr}</Text>
                </View>
                {this.renderGoods(item.goods[0].goods)}
                <View style={s.listBottom}>
                    <Text>共<Text style={{ color: 'red' }}>{item.goods_num}</Text>件商品&nbsp;合计：<Text style={{ color: 'red' }}>&yen;{item.price}</Text></Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={s.btn}>删除订单</Text>
                        <Text style={s.btn}>评论</Text>
                    </View>
                </View>
            </View>
        )
    }
    renderGoods(goods) {
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
}

const s = StyleSheet.create({
    btn: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#aaa',
        margin: 10
    },
    listBottom: {
        alignItems: 'flex-end',
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingRight: 20
    },
    title: {
        color: '#000',
        fontWeight: 'bold'
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
    tabBox: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ddd'
    },
    tabText: {
        flex: 1,
        textAlign: 'center',
        padding: 10,
        backgroundColor: '#fff'
    },
    tabTextRed: {
        color: 'red',
        borderBottomWidth: 3,
        borderColor: 'red'

    }
})
function mapStateToProps(state) {
    return {
        loginData: state.loginReducer,
        orderListData: state.orderListReducer,
    }
}

export default connect(mapStateToProps)(OrderList);