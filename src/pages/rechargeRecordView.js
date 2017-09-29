/**
 * 充值记录页面
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
import { RECHARGERECORD_URL, ScreenWidth } from '../common/global'

class RechargeRecord extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: false,
            errmessage: '',
            list: [],
            page: 1,
            type: 0,
            infoStatus: 'more'
        }
    }

    getRecord() {
        let { loginData } = this.props;
        let token = '';
        for (let key in loginData.data.result.token) {
            token = '&' + key + '=' + loginData.data.result.token[key]
        }
        let url = RECHARGERECORD_URL + '&_=' + Math.round(new Date().getTime() / 1000) + '&page=' + this.state.page + '&type=' + this.state.type + token;
        if (global.isConnected) {
            Util.get(url,
                (resq) => {
                    if (resq.status == 1) {
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
        this.getRecord();
    }

    renderList({ item }) {
        let text1 = '';
        let text2 = '';
        let color = '';
        switch (item.type) {
            case '0':
                text1 = '充值金额:';
                break;
            case '1':
                text1 = '提现金额:';
                break;
            case '2':
                text1 = '佣金打款:';
                break;
        };
        switch (item.status) {
            case '0':
                if (item.type == 0) {
                    text2 = '未充值';
                } else {
                    text2 = '申请中';
                }
                color = '#D4D4D4';
                break;
            case '1':
                text2 = '成功';
                color = '#4AAA4A';
                break;
            case '-1':
                text2 = '失败';
                color = '#D7342E';
                break;
            case '3':
                text2 = '退款';
                color = '#E0690C';
                break;
        };
        return (
            <View style={{
                backgroundColor: '#fff', marginTop: 10, borderRadius: 5
            }}>
                <View style={{ paddingLeft: 20, paddingTop: 5, paddingBottom: 5, borderColor: '#ccc', borderBottomWidth: 0.5 }}>
                    <Text style={{ fontSize: 10 }}>{item.createtime}</Text>
                </View>
                <View style={[styles.rowCenter, { paddingTop: 10, paddingBottom: 10 }]}>
                    <View style={[styles.center, { flex: 0.2 }]}>
                        <View style={{ paddingLeft: 5, paddingRight: 5, borderRadius: 6, backgroundColor: color }}>
                            <Text style={{ color: '#fff', fontSize: 10 }}>{text2}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.8, paddingLeft: 10 }}>
                        <Text>{text1}{item.money}</Text>
                        {item.type == 1 ?
                            <Text>(提现方式:{item.typestr}，实际{item.status == 1 ? '到账' : '金额'}：{item.deductionmoney > 0 ? item.realmoney : item.money}元，手续费:{item.deductionmoney}元 )</Text>
                            : false}
                    </View>
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
                    {this.state.list.length > 0 ?
                        <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}>
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
                                            this.getRecord()
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
                            <Text style={{ marginTop: 10 }}>亲~~暂时没有记录哦</Text>
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

export default connect(mapStateToProps)(RechargeRecord);