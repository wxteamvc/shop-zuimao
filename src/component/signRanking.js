/**
 * 签到排行页面
 * 
 * 
 */
"use strict"
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Image,
    TouchableOpacity,
} from 'react-native';
import { ScreenWidth, SIGNRANK_URL } from '../common/global';
import Util from '../common/util';
import { connect } from 'react-redux';
import Loading from '../component/loading';
import FlatListJumpTop from '../component/flatListJumoTop';

class RankItem extends React.PureComponent {
    render() {
        let { item, index } = this.props.item
        let url = null;
        if (item.avatar) {
            url = { uri: item.avatar }
        } else {
            url = require('../assets/images/header.jpg')
        }
        return (
            <View style={[styles.rowCenter, { padding: 10, borderColor: '#ccc', borderBottomWidth: 0.7 }]}>
                <View style={[styles.center, { flex: 0.15, }]}>
                    <Image
                        style={{ height: 60, width: 60, borderRadius: 30, }}
                        source={url}
                    />
                    <View style={styles.rankIcon}>
                        <Text style={{ fontSize: 12, color: '#fff', }}>{index + 1}</Text>
                    </View>
                </View>
                <View style={{ flex: 0.85, justifyContent: 'center', paddingLeft: 20 }}>
                    <Text style={{ color: '#000' }}>{item.nickname}</Text>
                    <Text style={{ fontSize: 12, marginTop: 5 }}>{this.props.type == 'orderday' ?
                        '当前连续签到' + item.order + '天' :
                        '当前总签到' + item.sum + '天'
                    }</Text>
                </View>
            </View>
        )
    }
}

class SigngRanking extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: false,
            errmessage: '',
            type: 'orderday',
            list: [],
            page: 1,
            infoStatus: 'more',
        }
    }

    componentDidMount() {
        this.getRank();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.type != this.state.type) {
            this.getRank();
        }
    }

    jumpToTop = (myFlatListJumpTop) => {
        if (!this.FlatListJumpTop) this.FlatListJumpTop = myFlatListJumpTop;
    }

    getRank(isAdd = 0) {
        let { loginData } = this.props;
        let token = '';
        for (let key in loginData.data.result.token) {
            token = '&' + key + '=' + loginData.data.result.token[key]
        }
        let url = SIGNRANK_URL + '&type=' + this.state.type + '&page=' + this.state.page + '&_=' + Math.round(new Date().getTime() / 1000) + token;
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

    renderRankList = (item) => {
        return (
            <RankItem item={item} type={this.state.type} />
        )
    }



    render() {
        if (this.state.status == 'success') {
            return (
                <View style={{ flex: 1 }}>
                    <View style={styles.topNav}>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ type: 'orderday', page: 1, infoStatus: 'more' })
                                this.FlatListJumpTop.scrollToIndex({ viewPosition: 0, index: 0 })
                            }}
                            style={[styles.center, { borderColor: this.state.type == 'orderday' ? '#24B2F4' : '#ccc', borderBottomWidth: this.state.type == 'orderday' ? 2 : 1 }]}>
                            <Text style={{ color: this.state.type == 'orderday' ? '#24B2F4' : '#ccc', fontSize: 16 }}>连续签到排行</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ type: 'sum', page: 1, infoStatus: 'more' })
                                this.FlatListJumpTop.scrollToIndex({ viewPosition: 0, index: 0 })
                            }}
                            style={[styles.center, { borderColor: this.state.type == 'sum' ? '#24B2F4' : '#ccc', borderBottomWidth: this.state.type == 'sum' ? 2 : 1 }]}>
                            <Text style={{ color: this.state.type == 'sum' ? '#24B2F4' : '#ccc', fontSize: 16 }}>总签到排行</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatListJumpTop
                        jumpToTop={this.jumpToTop}
                        style={{ flex: 1, backgroundColor: '#fff' }}
                        data={this.state.list}
                        keyExtractor={(item, index) => index}
                        renderItem={this.renderRankList}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        onEndReached={
                            this.state.infoStatus == 'nomore' ? false :
                                () => {
                                    this.setState({
                                        page: ++this.state.page
                                    })
                                    this.getRank(1)
                                }
                        }
                        ListFooterComponent={
                            this.state.infoStatus == 'nomore' ?
                                <View style={[{ flex: 1, paddingBottom: 15, paddingTop: 15 }, styles.center]}>
                                    <Text>亲~没有更多了哦</Text>
                                </View> : false
                        }
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
    rankIcon: {
        padding: 3, paddingLeft: 8, paddingRight: 8, borderRadius: 20, backgroundColor: '#24B2F4', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, right: 0

    }
})




function mapStateToProps(state) {
    return {
        loginData: state.loginReducer,
    }
}

export default connect(mapStateToProps)(SigngRanking);