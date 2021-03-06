/**
 * 我的优惠券页面
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
import Icon from 'react-native-vector-icons/dist/EvilIcons';
import Util from '../common/util';
import Loading from '../component/loading';
import FlatListJumoTop from '../component/flatListJumoTop'
import { FAVORITEGOODS_URL, FAVORITESHOPS_URL, ScreenWidth } from '../common/global'

class Favorite extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: false,
            errmessage: '',
            list: [],
            page: 1,
            cate: 'goods',
            infoStatus: 'more'
        }
    }

    getFavorite(isAdd = 0) {
        let { loginData } = this.props;
        let token = '';
        for (let key in loginData.data.result.token) {
            token = '&' + key + '=' + loginData.data.result.token[key]
        }
        let url = FAVORITEGOODS_URL + '&_=' + Math.round(new Date().getTime() / 1000) + '&page=' + this.state.page + token;
        if (this.state.cate == 'shop') {
            url = FAVORITESHOPS_URL + '&_=' + Math.round(new Date().getTime() / 1000) + '&page=' + this.state.page + token;
        }
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
        this.getFavorite();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.cate != this.state.cate) {
            this.getFavorite();
        }
    }



    jumpToTop = (myFlatListJumpTop) => {
        if (!this.FlatListJumpTop) this.FlatListJumpTop = myFlatListJumpTop;
    }


    renderGoodsList({ item }) {
        return (
            <View style={{ flex: 1 / 2, backgroundColor: '#fff', marginTop: 10, marginLeft: 5, marginRight: 5, borderRadius: 5 ,}}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { this.props.navigation.navigate('GoodsInfo', { id: item.goodsid }) }}
                >
                    <Image source={{ uri: item.thumb }} style={{ width: (ScreenWidth - 30) / 2, height: (ScreenWidth - 30) / 2,borderTopLeftRadius:5,borderTopRightRadius:5 }} />
                    <View style={{ padding: 5, justifyContent: 'center', borderColor: '#ccc', borderTopWidth: 0.5 }}>
                        <Text numberOfLines={1} style={{ fontSize: 12 }}>{item.title}</Text>
                        <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>&yen;&nbsp;{item.marketprice}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    renderShopsList() {

    }

    render() {
        if (this.state.status == 'success') {
            return (
                <View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
                     <StatusBar
                        translucent={false}
                        backgroundColor="#000"
                    />
                    <View style={styles.topNav}>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ cate: 'goods', page: 1, infoStatus: 'more' })
                                //this.FlatListJumpTop.scrollToIndex({ viewPosition: 0, index: 0 })
                            }}
                            style={[styles.center, { borderColor: this.state.cate == 'goods' ? '#FF9326' : '#ccc', borderBottomWidth: this.state.cate == 'goods' ? 2 : 1 }]}>
                            <Text style={{ color: this.state.cate == 'goods' ? '#FF9326' : '#767676', fontSize: 16 }}>商品</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ cate: 'shop', page: 1, infoStatus: 'more' })
                                //this.FlatListJumpTop.scrollToIndex({ viewPosition: 0, index: 0 })
                            }}
                            style={[styles.center, { borderColor: this.state.cate == 'shop' ? '#FF9326' : '#ccc', borderBottomWidth: this.state.cate == 'shop' ? 2 : 1 }]}>
                            <Text style={{ color: this.state.cate == 'shop' ? '#FF9326' : '#767676', fontSize: 16 }}>商家</Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.list.length > 0 ?
                        <View style={{ flex: 1, paddingLeft: 5, paddingRight: 5 }}>
                            <FlatListJumoTop
                                jumpToTop={this.jumpToTop}
                                data={this.state.list}
                                keyExtractor={(item, index) => index}
                                renderItem={this.renderGoodsList.bind(this)}
                                numColumns={2}
                                showsVerticalScrollIndicator={false}
                                onEndReachedThreshold={0.3}
                                onEndReached={
                                    this.state.infoStatus == 'nomore' ? false :
                                        () => {
                                            this.setState({
                                                page: ++this.state.page
                                            })
                                            this.getFavorite(1)
                                        }
                                }
                            />
                        </View> :
                        <View style={styles.center}>
                            <Icon name={'exclamation'} size={50} />
                            <Text style={{ marginTop: 10 }}>亲~~你还没有关注哦</Text>
                        </View>
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
        flexDirection: 'row', justifyContent: 'space-between', padding: 10,
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

export default connect(mapStateToProps)(Favorite);