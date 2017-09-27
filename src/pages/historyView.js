/**
 * 我的足迹页面
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
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Toast from 'react-native-root-toast';
import Util from '../common/util';
import Loading from '../component/loading';
import FlatListJumoTop from '../component/flatListJumoTop'
import { HISTORY_URL, DELETEHISTORY_URL, ScreenWidth } from '../common/global'

class MyHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: false,
            errmessage: '',
            list: [],
            page: 1,
            infoStatus: 'more',
            ids: [],
            edit: false,
            chooseAll: false
        }
    }

    getHistory(isAdd = 0) {
        let { loginData } = this.props;
        let token = '';
        for (let key in loginData.data.result.token) {
            token = '&' + key + '=' + loginData.data.result.token[key]
        }
        let url = HISTORY_URL + '&_=' + Math.round(new Date().getTime() / 1000) + '&page=' + this.state.page + token;
        if (global.isConnected) {
            Util.get(url,
                (resq) => {
                    if (resq.status == 1) {
                        if (isAdd) {
                            if (resq.result.list.length > 0) {
                                this.setState({
                                    status: 'success',
                                    list: this.state.list.concat(resq.result.list),
                                })
                            } else {
                                this.setState({
                                    status: 'success',
                                    infoStatus: 'nomore'
                                })
                            }
                        } else {
                            this.setState({
                                status: 'success',
                                list: resq.result.list,
                            })
                        }
                    } else {
                        this.setState({
                            status: 'faild',
                            errmessage: resq.message,
                        })
                    }
                },
            )
        } else {
            this.setState({
                status: 'faild',
                errmessage: '当前没有网络！'
            })
        }
    }

    componentDidMount() {
        this.getHistory();
    }

    checkIsIn(id) {
        return this.state.ids.find((n) => n == id)
    }

    addIds(id) {
        this.setState({
            ids: this.state.ids.concat(id)
        })
    }

    minusIds(id) {
        let i = this.state.ids.findIndex((n) => n == id)
        let array = this.state.ids
        array.splice(i, 1)
        this.setState({
            ids: array
        })
    }

    chooseAll() {
        let ids = [];
        for (let i = 0; i < this.state.list.length; i++) {
            ids.push(this.state.list[i].id)
        }
        this.setState({
            ids: ids,
            chooseAll: true
        })
    }

    clearAll() {
        this.setState({
            ids: [],
            chooseAll: false
        })
    }

    deleteHistory() {
        let { loginData } = this.props;
        let token = '';
        for (let key in loginData.data.result.token) {
            token = '&' + key + '=' + loginData.data.result.token[key];
        }
        let url = DELETEHISTORY_URL + token;
        let ids = '';
        for (let i = 0; i < this.state.ids.length; i++) {
                ids += '&ids[]=' + this.state.ids[i]
        }
        if (global.isConnected) {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: ids,
            })
                .then(response =>
                    response.json()
                )
                .then(responseJson => {
                    if (responseJson.status == 1) {
                        this.setState({
                            page: 1,
                            infoStatus: 'more',
                            ids: [],
                            edit: false,
                            chooseAll: false
                        })
                        this.getHistory();
                        Toast.show('删除成功');
                    } else {
                        Toast.show('删除失败');
                    }
                })
                .catch((error) => {
                    Toast.show(error);
                });
        } else {
            this.setState({
                status: 'faild',
                errmessage: '当前没有网络！'
            })
        }
    }



    renderList({ item }) {
        return (
            <View style={{ backgroundColor: '#fff', marginTop: 10, paddingLeft: 10, paddingRight: 10 }}>
                <View style={[styles.rowBetween, { borderColor: '#ccc', borderBottomWidth: 0.5, paddingTop: 5, paddingBottom: 5 }]}>
                    <Text style={{ fontSize: 12 }}>{item.createtime}</Text>
                    <Text style={{ fontSize: 12 }}>{item.merchname}</Text>
                </View>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { this.props.navigation.navigate('GoodsInfo', { id: item.goodsid }) }}
                    style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }}>
                    {this.state.edit ?
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                            <TouchableOpacity
                                onPress={() => { this.checkIsIn(item.id) == undefined ? this.addIds(item.id) : this.minusIds(item.id) }}
                                style={{ width: 14, height: 14, borderRadius: 7, borderColor: '#ccc', borderWidth: 0.7, alignItems: 'center', justifyContent: 'center', backgroundColor: this.checkIsIn(item.id) == undefined ? '#fff' : 'red' }}>
                                <Icon name={'check'} color={'#fff'} />
                            </TouchableOpacity>
                        </View>
                        : false}
                    <Image source={{ uri: item.thumb }} style={{ width: 60, height: 60, borderRadius: 10, marginRight: 10 }} />
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <Text numberOfLines={1}>{item.title}</Text>
                        <Text style={{ color: 'red', marginTop: 5 }}>&yen; {item.marketprice}</Text>
                    </View>

                </TouchableOpacity>
            </View>
        )
    }



    render() {
        if (this.state.status == 'success') {
            return (
                <View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
                    <View style={styles.topNav}>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.goBack(null) }}
                            style={[styles.center, { flex: 0.15 }]}>
                            <Icon name={'angle-left'} size={20} />
                        </TouchableOpacity>
                        <View style={[styles.center, { flex: 0.7 }]}>
                            <Text>我的足迹</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => { this.setState({ edit: this.state.edit ? false : true, ids: [], chooseAll: false }) }}
                            style={[styles.center, { flex: 0.15 }]}>
                            <Text>{this.state.edit ? '完成' : '编辑'}</Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.list.length > 0 ?
                        <View style={{ flex: 1 }}>
                            <FlatListJumoTop
                                data={this.state.list}
                                keyExtractor={(item, index) => index}
                                renderItem={this.renderList.bind(this)}
                                showsVerticalScrollIndicator={false}
                                onEndReachedThreshold={0.3}
                                onEndReached={
                                    this.state.infoStatus == 'nomore' ? false :
                                        () => {
                                            this.setState({
                                                page: ++this.state.page
                                            })
                                            this.getHistory(1)
                                        }
                                }
                                ListFooterComponent={
                                    this.state.infoStatus == 'nomore' ?
                                        <View style={[{ flex: 1, paddingBottom: 15, paddingTop: 15 }, styles.center]}>
                                            <Text>亲~没有更多了哦</Text>
                                        </View> : false
                                }
                            />
                        </View> :
                        <View style={styles.center}>
                            <Icon name={'exclamation'} size={50} />
                            <Text style={{ marginTop: 10 }}>亲~~你没有足迹哦</Text>
                        </View>
                    }
                    {
                        this.state.edit ?
                            <View style={[styles.rowBetween, { height: 40, backgroundColor: '#fff', paddingLeft: 20, paddingRight: 20 }]}>
                                <TouchableOpacity style={styles.rowCenter}
                                    onPress={() => { this.state.chooseAll ? this.clearAll() : this.chooseAll() }}
                                    activeOpacity={1}
                                >
                                    <View
                                        style={{ width: 14, height: 14, borderRadius: 7, borderColor: '#ccc', borderWidth: 0.7, marginRight: 5, alignItems: 'center', justifyContent: 'center', backgroundColor: this.state.chooseAll ? 'red' : '#fff' }}
                                    >
                                        <Icon name={'check'} color={'#fff'} />
                                    </View>
                                    <Text>{this.state.chooseAll ? '取消全选' : '全选'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => { this.deleteHistory() }}
                                    disabled={this.state.ids.length > 0 ? false : true}
                                    style={{ padding: 5, paddingLeft: 15, paddingRight: 15, borderRadius: 6, backgroundColor: this.state.ids.length > 0 ? 'red' : '#ccc' }}
                                >
                                    <Text style={{ color: this.state.ids.length > 0 ? '#fff' : '#767676' }}>删除</Text>
                                </TouchableOpacity>
                            </View> : false
                    }
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
        flex: 1,
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

export default connect(mapStateToProps)(MyHistory);