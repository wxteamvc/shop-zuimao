/**
 * 我的订单
 */

"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, ActivityIndicator, StatusBar, Alert, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { orderList } from '../actions/orderListAction';
import FlatListJumoTop from '../component/flatListJumoTop';
import Util from '../common/util';
import { ScreenWidth, ScreenHeight, ORDERDELETE_URL, ORDERCANCEL_URL, ORDERFINISH_URL } from '../common/global';
import Toast from 'react-native-root-toast';
import { memberInfo } from '../actions/memberAction';
import Loading from '../component/loading';

class OrderList extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        headerTitle: '我的订单',
        headerTitleStyle: { alignSelf: 'center' },
        headerRight: <Text style={{ marginRight: 20, color: navigation.state.params.headerRightColor }} onPress={() => navigation.state.params.huishou()}>回收站</Text>
    });

    constructor(...props) {
        super(...props);
        this.state = {
            search: {
                page: 1,
                status: '',//空为所有，0为待付款，1为待发货，2为待收货，3为已完成,4为退换货，5为回收站
                merchid: 0,
                _: Math.round(new Date().getTime()),
            },
            showMod: false,
            oid: null,
            showActivityIndicator: false,
        }
    }

    _huishou() {
        this.props.navigation.setParams({ headerRightColor: 'red' })
        this.setState(Object.assign(
            this.state.search, { status: 5 }
        ))
        let token = this.props.loginData.data.result.token;
        this.props.dispatch(orderList(Object.assign({}, this.state.search, token)));
    }

    componentDidMount() {
        /**  
         * 将单击回调函数作为参数传递  
         */
        this.props.navigation.setParams({
            huishou: () => this._huishou()
        });

        this.setState(Object.assign(
            this.state.search, this.props.navigation.state.params.search
        ))
        let token = this.props.loginData.data.result.token;
        this.props.dispatch(orderList(Object.assign({}, this.state.search, token)));
    }

    componentWillUnmount() {
        let token = this.props.loginData.data.result.token;
        this.props.dispatch(memberInfo(token));
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    translucent={false}
                    backgroundColor="#000"
                />
                {this.renderTab()}
                {this.renderList()}
                {this.renderModel()}
                {this.renderActivityIndicator()}
            </View>
        )
    }

    renderActivityIndicator() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.showActivityIndicator}
                onRequestClose={() => null}
            >
                <Text style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}></Text>
                <ActivityIndicator style={s.load} color={'#fff'} />
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
                        <TouchableOpacity onPress={() => this._modAct('我不想买了')}>
                            <Text style={s.modText}>我不想买了</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._modAct('信息填写错误，重新拍')}>
                            <Text style={s.modText}>信息填写错误，重新拍</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._modAct('同城见面交易')}>
                            <Text style={s.modText}>同城见面交易</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._modAct('其他原因')}>
                            <Text style={s.modText}>其他原因</Text>
                        </TouchableOpacity>

                    </ScrollView>
                </View>
            </Modal>
        )
    }

    _modAct(text) {
        Alert.alert('温馨提醒', '确定取消吗?', [
            { text: '取消' },
            {
                text: '确定', onPress: () => {
                    this.setState({
                        showMod: false,
                        showActivityIndicator: true,
                    })
                    let token = this.props.loginData.data.result.token;
                    this._cancel(ORDERCANCEL_URL, Object.assign({}, token, { id: this.state.oid, remark: text }), token)
                }
            }
        ])
    }

    renderTab() {
        if (this.state.search.status !== 4) {
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
        } else {
            return (
                <View>
                    <View style={s.tabBox}>
                        <Text onPress={() => this._setTab(4)} style={[s.tabText, this.state.search.status === 4 ? s.tabTextRed : null]}>退换货</Text>
                    </View>
                </View>
            )
        }

    }

    renderList() {
        if (this.props.orderListData.status == 'success') {
            let list = this.props.orderListData.list;
            let token = this.props.loginData.data.result.token;
            if (list.length == 0) {
                return (
                    <View style={{ marginTop: ScreenHeight * 0.3, alignItems: 'center' }}>
                        <Icon name="frown-o" size={60} />
                        <Text>暂时没有订单</Text>
                    </View>
                );
            } else {
                return (
                    <FlatListJumoTop
                        keyExtractor={(item, index) => index}
                        data={list}
                        renderItem={({ item }) => <MyListItem item={item} token={token} navigation={this.props.navigation} dispatch={this.props.dispatch} search={this.state.search} show={(id) => {
                            this.setState({
                                showMod: true,
                                oid: id
                            })
                        }}
                            loading={() => this.setState({ showActivityIndicator: true })}
                            loaded={() => this.setState({ showActivityIndicator: false })} />}
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
                        ListFooterComponent={() => list.length < this.props.orderListData.total ? <ActivityIndicator size={40}></ActivityIndicator> : null
                        }
                        showsVerticalScrollIndicator={false}
                    />
                );
            }
        } else {
            return (<Loading />);
        }

    }

    _setTab(type) {
        if (this.state.search.status !== type) {
            this.props.navigation.setParams({ headerRightColor: null })
            this.setState({
                search: {
                    ...this.state.search,
                    status: type
                }
            })
            let token = this.props.loginData.data.result.token;
            this.props.dispatch(orderList(Object.assign({}, this.state.search, token, { status: type })));
        }

    }

    _cancel(url, params = {}, token = {}) {
        Util.post(url, params,
            (responseJson) => {
                this.setState({
                    showActivityIndicator: false,
                })
                if (responseJson.status == 1) {
                    this.props.dispatch(orderList(Object.assign({}, this.state.search, token)));
                } else {
                    Toast.show(responseJson.result.message);
                    this.props.dispatch(orderList(Object.assign({}, this.state.search, token)));
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

}

class MyListItem extends React.PureComponent {

    constructor(...props) {
        super(...props);
    }

    render() {
        let { item } = this.props;

        return (
            <View style={{ marginTop: 10 }}>
                <View style={s.listTop}>
                    <Text style={s.shop}>&#xe60c;</Text>
                    <Text style={{ flex: 9 }}>{item.merchname}&nbsp;&nbsp;<Icon name="angle-right" size={20} /></Text>
                    <Text style={{ flex: 2, color: '#FFAA25' }}>{item.statusstr}</Text>
                </View>
                {this.renderGoods(item.goods[0].goods, item.id)}
                <View style={s.listBottom}>
                    <Text style={{ fontSize: 11 }}>共<Text style={{ color: 'red' }}>{item.goods_num}</Text>件商品&nbsp;合计：<Text style={{ color: 'red' }}>&yen;{item.price}</Text></Text>
                    {this.renderbtns(item.status, item.id, item.iscomment)}
                </View>
            </View>
        )
    }

    renderbtns(status, oid, iscomment) {
        let { show, search } = this.props;
        switch (status) {
            case '-1':
                if (search.status !== 5) {
                    return (
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => this._delete(oid)}>
                                <Text style={s.btn}>删除订单</Text>
                            </TouchableOpacity>
                        </View>
                    );
                } else {
                    return (
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => this._deleteSure(oid)}>
                                <Text style={s.btn}>彻底删除</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }
                break;
            case '0':
                return (
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => show(oid)}>
                            <Text style={s.btn}>取消订单</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Pay',{id:oid,token:this.props.token})}>
                            <Text style={s.btnRed}>立即支付</Text>
                        </TouchableOpacity>
                    </View>
                );
                break;
            case '1':
                break;
            case '2':
                return (
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this._express(oid)}>
                            <Text style={s.btn}>查看物流</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._finish(oid)}>
                            <Text style={s.btnRed}>确认收货</Text>
                        </TouchableOpacity>
                    </View>
                );
                break;
            case '3':
                if (search.status !== 5) {
                    return (
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => this._delete(oid)}>
                                <Text style={s.btn}>删除订单</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._express(oid)}>
                                <Text style={s.btn}>查看物流</Text>
                            </TouchableOpacity>
                            {iscomment == 1 ?
                                <TouchableOpacity onPress={() => this._comment(oid, iscomment)}>
                                    <Text style={s.btnRed}>追加评价</Text>
                                </TouchableOpacity> : null}
                            {iscomment == 0 ?
                                <TouchableOpacity onPress={() => this._comment(oid, iscomment)}>
                                    <Text style={s.btnRed}>评价</Text>
                                </TouchableOpacity> : null}
                        </View>
                    );
                } else {
                    return (
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => this._deleteSure(oid)}>
                                <Text style={s.btn}>彻底删除</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._recovery(oid)}>
                                <Text style={s.btn}>恢复订单</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }

                break;
            default:
                break;
        }
    }

    _comment(oid, iscomment) {
        let tit = iscomment == 1 ? '追加评价' : '评价'
        this.props.navigation.navigate('Comment', { id: oid, token: this.props.token, title: tit })
    }

    _recovery(oid) {
        Alert.alert('温馨提醒', '确定恢复吗?', [
            { text: '取消' },
            {
                text: '确定', onPress: () => {
                    this.props.loading();
                    let token = this.props.token;
                    // userdeleted 为1时放到回收站，为2彻底删除
                    this._fetch(ORDERDELETE_URL, Object.assign({}, token, { id: oid, userdeleted: 0 }), token)
                }
            }
        ])
    }

    _deleteSure(oid) {
        Alert.alert('温馨提醒', '确定彻底删除吗?', [
            { text: '取消' },
            {
                text: '确定', onPress: () => {
                    this.props.loading();
                    let token = this.props.token;
                    // userdeleted 为1时放到回收站，为2彻底删除
                    this._fetch(ORDERDELETE_URL, Object.assign({}, token, { id: oid, userdeleted: 2 }), token)
                }
            }
        ])
    }

    _finish(oid) {
        Alert.alert('温馨提醒', '确定收货吗?', [
            { text: '取消' },
            {
                text: '确定', onPress: () => {
                    this.props.loading();
                    let token = this.props.token;
                    this._fetch(ORDERFINISH_URL, Object.assign({}, token, { id: oid }), token)
                }
            }
        ])
    }

    _express(oid) {
        this.props.navigation.navigate('Express', { id: oid, token: this.props.token })
    }

    _delete(oid) {
        Alert.alert('温馨提醒', '确定删除吗?', [
            { text: '取消' },
            {
                text: '确定', onPress: () => {
                    this.props.loading();
                    let token = this.props.token;
                    // userdeleted 为1时放到回收站，为2彻底删除
                    this._fetch(ORDERDELETE_URL, Object.assign({}, token, { id: oid, userdeleted: 1 }), token)
                }
            }
        ])
    }

    renderGoods(goods, oid) {
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
        return (
            <TouchableOpacity onPress={() => this._orderDetail(oid)}>
                {goodsArr}
            </TouchableOpacity>
        );
    }

    _orderDetail(oid) {
        this.props.navigation.navigate('OrderDetail', { id: oid, token: this.props.token, dispatch: this.props.dispatch, search: this.props.search })
    }

    _fetch(url, params = {}, token = {}) {
        Util.post(url, params,
            (responseJson) => {
                this.props.loaded();
                if (responseJson.status == 1) {
                    this.props.dispatch(orderList(Object.assign({}, this.props.search, token)));
                } else {
                    Toast.show(responseJson.result.message);
                    this.props.dispatch(orderList(Object.assign({}, this.props.search, token)));
                }
            },
            (error) => {
                this.props.loaded();
                Toast.show('服务器请求失败！');
            },
        )
    }
}

const s = StyleSheet.create({
    load: { position: 'absolute', top: ScreenHeight * 0.5, left: ScreenWidth * 0.5, },
    modText: {
        textAlign: 'center',
        padding: 10
    },
    mod: { width: ScreenWidth * 0.6, height: ScreenWidth * 0.4, backgroundColor: '#fff', position: 'absolute', top: ScreenHeight * 0.5 - ScreenWidth * 0.2, left: ScreenWidth * 0.2, borderRadius: 5 },
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
    listBottom: {
        alignItems: 'flex-end',
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20
    },
    title: {
        color: '#000',
        fontWeight: 'bold'
    },
    price: {
        flex: 1,
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
function mapStateToProps(state) {
    return {
        loginData: state.loginReducer,
        orderListData: state.orderListReducer,
    }
}

export default connect(mapStateToProps)(OrderList);