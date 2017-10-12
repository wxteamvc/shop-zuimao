/**
 * 签到商品兑换参与记录页面
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
import { ScreenWidth, CREDITSHOPRECORD_URL } from '../common/global';
import Util from '../common/util';
import { connect } from 'react-redux';
import Loading from '../component/loading';
import FlatListJumpTop from '../component/flatListJumoTop';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
class CreditShopRecord extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: false,
            errmessage: '',
            list: [
            ],
            page: 1,
            infoStatus: 'more',

        }
    }

    componentDidMount() {
        this.getList();
    }


    getList(isAdd = 0) {
        let { loginData } = this.props;
        let token = '';
        for (let key in loginData.data.result.token) {
            token = '&' + key + '=' + loginData.data.result.token[key]
        }
        let url = CREDITSHOPRECORD_URL + '&page=' + this.state.page + '&_=' + Math.round(new Date().getTime() / 1000) + token;
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



    renderList({ item }) {
        if (item.type == '0') {
            return (
                <View style={{ borderColor: '#ccc', borderBottomWidth: 0.5 }}>
                    <View style={[styles.rowBetween, { borderColor: '#ccc', borderBottomWidth: 0.5 }]}>
                        <Text style={styles.text12}>{item.title}</Text>
                        <Text style={styles.text12}>{item.createtime}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center',padding:10 }}>
                        <View>
                            <Image
                                source={{ uri: item.thumb }}
                                style={{ height: 50, width: 50, borderRadius: 20 }}
                            />
                        </View>
                        <View>
                            <Text style={[styles.text12,{color:'red'}]}>-{item.credit}积分</Text>
                            <Text style={styles.text12}>已兑换</Text>
                        </View>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={{ borderColor: '#ccc', borderBottomWidth: 0.5 }}>
                    <View style={[styles.rowBetween, { borderColor: '#ccc', borderBottomWidth: 0.5 }]}>
                        <Text style={styles.text12}>{item.title}</Text>
                        <Text style={styles.text12}>{item.createtime}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={[styles.center, { flex: 0.3, paddingTop: 10, paddingBottom: 10 }]}>
                            <Image
                                source={{ uri: item.thumb }}
                                style={{ height: 50, width: 50, borderRadius: 20 }}
                            />
                        </View>
                        <View style={[styles.rowBetween, { flex: 1, paddingRight: 20 }]}>
                        <Text style={[styles.text12,{color:'red'}]}>-{item.credit}积分</Text>
                        <Text style={styles.text12}>{item.status=='1'?'未中奖':'已中奖'}</Text>
                        </View>
                    </View>
                </View>
            )
        }

    }


    render() {
        if (this.state.status == 'success') {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#fff', marginBottom: 10 }}>
                        <Icon name={'database'} size={15} />
                        <Text style={[styles.text12, { marginLeft: 5 }]}>我的积分：{this.props.navigation.state.params.credit}</Text>
                    </View>
                    <FlatListJumpTop
                        style={{ flex: 1, backgroundColor: '#fff' }}
                        data={this.state.list}
                        keyExtractor={(item, index) => index}
                        renderItem={this.renderList}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        onEndReached={
                            this.state.infoStatus == 'nomore' ? false :
                                () => {
                                    this.setState({
                                        page: ++this.state.page
                                    })
                                    this.getList(1)
                                }
                        }
                        ListFooterComponent={
                            this.state.infoStatus == 'nomore' ?
                                <View style={[{ flex: 1, paddingBottom: 15, paddingTop: 15 }, styles.center]}>
                                    <Text style={{ fontSize: 10 }}>亲~没有更多了哦</Text>
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
    text12: {
        fontSize: 12
    }
})




function mapStateToProps(state) {
    return {
        loginData: state.loginReducer,
    }
}

export default connect(mapStateToProps)(CreditShopRecord);