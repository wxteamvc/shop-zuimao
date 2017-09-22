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
import { MYCOUPONS_URL, ScreenWidth } from '../common/global'

class MyCoupons extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: false,
            errmessage: '',
            list: [],
            page: 1,
            cate: '',
            infoStatus: 'more'
        }
    }

    getCoupons(isAdd = 0) {
        let { loginData } = this.props;
        let token = '';
        for (let key in loginData.data.result.token) {
            token = '&' + key + '=' + loginData.data.result.token[key]
        }
        let url = MYCOUPONS_URL + '&_=' + Math.round(new Date().getTime() / 1000) + '&cate='+ this.state.cate +'&page='+this.state.page+ token;
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
                (error) => {
                    this.setState({
                        status: 'faild',
                        errmessage: error.message,
                    })
                })
        } else {
            this.setState({
                status: 'faild',
                errmessage: '当前没有网络！'
            })
        }
    }

    componentDidMount() {
        this.getCoupons();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.cate != this.state.cate) {
            this.getCoupons();
        }
    }

    renderCoupons = ({ item }) => {
        let color = '';
        switch (item.color) {
            case 'blue':
                color = '#24B2F4';
                break;
            case 'red ':
                color = 'red';
                break;
            case 'org':
                color = 'orange';
                break;
            case 'pink':
                color = 'pink';
                break;
        }

        return (
            <View style={{ height: 120, width: ScreenWidth, flexDirection: 'row', padding: 10 }}>
                <TouchableOpacity 
                activeOpacity={1}
              onPress={()=>{this.props.navigation.navigate('CouponInfo',{id:item.couponid})}}
                style={{ flex: 0.8, backgroundColor: '#fff', borderRadius: 10 }}>
                    <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                        <View style={{ backgroundColor: color, borderRadius: 5, paddingLeft: 15, paddingRight: 15 }}>
                            <Text style={{ color: '#fff', fontSize: 12 }}>{item.tagtitle}</Text>
                        </View>
                    </View>
                    <View style={[styles.center, { flexDirection: 'row' }]}>
                        <View style={[styles.center, { flex: 1 / 3 }]}>
                            <Image source={item.thumb ? { uri: item.thumb } : require('../assets/images/coupons/default.png')} style={{ width: 60, height: 60 }} />
                        </View>
                        <View style={{ flex: 2 / 3 }}>
                            <Text style={{ color: '#000' }}>{item.couponname}</Text>
                            <Text style={{ fontSize: 10, color: color, marginBottom: 10 }}>{item.title2}</Text>
                            <Text style={{ fontSize: 10 }}>{item.timestr ? '有效期至' + item.timestr : '永久有效'}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{ flex: 0.2, backgroundColor: color, borderRadius: 10, alignItems: 'center', justifyContent: 'center', }}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{ width: (ScreenWidth - 20) * 0.2, height: (ScreenWidth - 20) * 0.2, borderRadius: (ScreenWidth - 20) * 0.2 / 2,alignItems: 'center', justifyContent: 'center', }}
                    >
                        <Text style={{ color: '#fff' }}>立即</Text>
                        <Text style={{ color: '#fff' }}>使用</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    jumpToTop = (myFlatListJumpTop) => {
        if (!this.FlatListJumpTop) this.FlatListJumpTop = myFlatListJumpTop;
    }


    render() {
        if (this.state.status == 'success') {
            return (
                <View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
                    <View style={styles.topNav}>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ cate: '', page: 1, infoStatus: 'more' })
                                //this.FlatListJumpTop.scrollToIndex({ viewPosition: 0, index: 0 })
                            }}
                            style={[styles.center, { borderColor: this.state.cate == '' ? 'red' : '#ccc', borderBottomWidth: this.state.type == '' ? 2 : 1 }]}>
                            <Text style={{ color: this.state.cate == '' ? 'red' : '#767676', fontSize: 16 }}>未使用</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ cate: 'used', page: 1, infoStatus: 'more' })
                                //this.FlatListJumpTop.scrollToIndex({ viewPosition: 0, index: 0 })
                            }}
                            style={[styles.center, { borderColor: this.state.cate == 'used' ? 'red' : '#ccc', borderBottomWidth: this.state.cate == 'used' ? 2 : 1 }]}>
                            <Text style={{ color: this.state.cate == 'used' ? 'red' : '#767676', fontSize: 16 }}>已使用</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ cate: 'past', page: 1, infoStatus: 'more' })
                                //this.FlatListJumpTop.scrollToIndex({ viewPosition: 0, index: 0 })
                            }}
                            style={[styles.center, { borderColor: this.state.cate == 'past' ? 'red' : '#ccc', borderBottomWidth: this.state.cate == 'past' ? 2 : 1 }]}>
                            <Text style={{ color: this.state.cate == 'past' ? 'red' : '#767676', fontSize: 16 }}>已过期</Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.list.length > 0 ?
                        <View style={{ flex: 1 }}>
                            <FlatListJumoTop
                                jumpToTop={this.jumpToTop}
                                data={this.state.list}
                                keyExtractor={(item, index) => index}
                                renderItem={this.renderCoupons}
                                showsVerticalScrollIndicator={false}
                                onEndReachedThreshold={0.3}
                                onEndReached={
                                    this.state.infoStatus == 'nomore' ? false :
                                        () => {
                                            this.setState({
                                                page: ++this.state.page
                                            })
                                            this.getCoupons(1)
                                        }
                                }
                            />
                        </View> :
                        <View style={styles.center}>
                            <Icon name={'exclamation'} size={50} />
                            <Text style={{ marginTop: 10 }}>亲~~没有优惠券哦</Text>
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
    coupons: {
        flexDirection: 'row', marginTop: 10, marginLeft: 20, marginRight: 20,
    },
    coupons_img: {
        width: ScreenWidth - 40, height: 140, borderRadius: 5
    },
    coupons_bottom: {
        height: 55, width: ScreenWidth - 90, position: 'absolute', bottom: 0, right: 0, flexDirection: 'row',
    },
    coupons_bottom_left: {
        flex: 1, justifyContent: 'center',
    },
    coupons_bottom_right: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
    },
    coupons_top_left: {
        width: (ScreenWidth - 40) / 3, height: 82, position: 'absolute', top: 0, left: 0
    },
    coupons_top_left_top: {
        alignItems: 'flex-start', marginLeft: 10, marginTop: 10
    },
    fontSize18: {
        color: '#fff', fontSize: 18,
    },
    fontSize22: {
        color: '#fff', fontSize: 22,
    },
    fontSize30: {
        color: '#fff', fontSize: 30,
    },
})


function mapStateToProps(state) {
    return {
        loginData: state.loginReducer,
    }
}

export default connect(mapStateToProps)(MyCoupons);