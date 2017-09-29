/**
 * 签到商品详情页面
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
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Toast from 'react-native-root-toast';
import Util from '../common/util';
import Loading from '../component/loading';
import ScrollViewJumpTop from '../component/scrollViewJumpTop';
import { ScreenWidth } from '../common/global'

class CreditGoodInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 'success',
            errmessage: '',
            type: 'good',
            recommend: [
                {
                    img: 'http://www.zuimaowang.cn/attachment/images/1/2017/02/nU31CFo11fsccOcLlZ1l3ZnOLuosFm.png',
                    title: '积分商品',
                    text: '1积分',
                }
            ],
            record: [
                {
                    img: '',
                    name: '139xxxx5479',
                    time: '2017/09/27 10:49'
                },
                {
                    img: '',
                    name: '139xxxx5479',
                    time: '2017/09/27 10:49'
                },
            ]
        }
    }

    renderRecommendList({ item }) {
        return (
            <TouchableOpacity style={[styles.center, { width: ScreenWidth / 3, paddingTop: 10, paddingBottom: 10 }]}>
                <Image source={{ uri: item.img }} style={{ width: 60, height: 60 }} />
                <Text style={[styles.text12, { marginTop: 5, marginBottom: 5 }]}>{item.title}</Text>
                <Text style={[styles.text12, { color: 'red' }]}>{item.text}</Text>
            </TouchableOpacity>
        )
    }

    renderGoodInfo() {
        return (
            <View style={[styles.center, { backgroundColor: '#fff', padding: 10 }]}>
                <Text>暂无商品详情</Text>
            </View>
        )
    }

    renderRecord() {
        let list = [];
        for (let i = 0; i < this.state.record.length; i++) {
            list.push(
                <View key={i} style={{ flexDirection: 'row', alignItems: 'center',  borderColor: '#ccc', borderBottomWidth: 0.5 }}>
                    <View style={{ padding: 10 }}>
                        <Image
                            source={this.state.record[i].img ? { uri: item.img } : require('../assets/images/header.jpg')}
                            style={{ height: 40, width: 40, borderRadius: 20 }}
                        />
                    </View>
                    <View style={[styles.rowBetween, { flex: 1, paddingRight: 20 }]}>
                        <Text style={styles.text12}>{this.state.record[i].name}</Text>
                        <Text style={styles.text12}>{this.state.record[i].time}</Text>
                    </View>
                </View>
            )

        }
        return (
            <View style={{backgroundColor: '#fff',}}>
                {list}
                <TouchableOpacity style={[styles.center,{padding:10}]}>
                        <Text style={styles.text12}>点击查看更多</Text>
                </TouchableOpacity>
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
                    <ScrollViewJumpTop>
                        <View style={[styles.center]}>
                            <Image
                                source={{ uri: 'http://www.zuimaowang.cn/attachment/images/1/2017/02/nU31CFo11fsccOcLlZ1l3ZnOLuosFm.png' }}
                                style={{ width: 200, height: 200 }}
                            />
                        </View>
                        <View style={{ backgroundColor: '#fff', padding: 10, borderColor: '#ccc', borderBottomWidth: 0.5 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ backgroundColor: 'red', paddingLeft: 3, paddingRight: 3, borderRadius: 5, marginRight: 5 }}>
                                    <Text style={[styles.text12, { color: '#fff' }]}>商品</Text>
                                </View>
                                <Text style={styles.text12}>积分商品</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 5 }}>
                                <Text style={[styles.text12, { marginRight: 5 }]}>仅限：98份</Text>
                                <Text style={styles.text12}>已参与：1次</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.text12}>邮费：包邮</Text>
                            </View>
                        </View>
                        <View style={{ padding: 10, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.text12, { color: 'red', marginRight: 10 }]}>1积分</Text>
                            <Text style={[styles.text12, { textDecorationLine: 'line-through' }]}>原价：100.00元</Text>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#fff', marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', height: 40 }}>
                                <TouchableOpacity
                                    onPress={() => { this.setState({ type: 'good' }) }}
                                    style={[styles.center, { flex: 1, borderColor: this.state.type == 'good' ? 'red' : '#ccc', borderBottomWidth: this.state.type == 'good' ? 2 : 1 }]}>
                                    <Text style={{ color: this.state.type == 'good' ? 'red' : '#767676' }}>商品详情</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => { this.setState({ type: 'record' }) }}
                                    style={[styles.center, { flex: 1, borderColor: this.state.type == 'record' ? 'red' : '#ccc', borderBottomWidth: this.state.type == 'record' ? 2 : 1 }]}>
                                    <Text style={{ color: this.state.type == 'record' ? 'red' : '#767676' }}>参与记录</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {this.state.type == 'good' ? this.renderGoodInfo() : this.renderRecord()}
                        <View style={{ backgroundColor: '#fff', marginTop: 10 }}>
                            <View style={{ padding: 10, borderColor: '#ccc', borderBottomWidth: 0.5, }}>
                                <Text>为您推荐</Text>
                            </View>
                            <FlatList
                                data={this.state.recommend}
                                keyExtractor={(item, index) => index}
                                horizontal={true}
                                renderItem={this.renderRecommendList}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </ScrollViewJumpTop>
                    <TouchableOpacity style={[styles.center, { backgroundColor: 'red', height: 40 }]}>
                        <Text style={{ color: '#fff' }}>立即兑换</Text>
                    </TouchableOpacity>

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
        alignItems: 'center',
        justifyContent: 'center',
    },
    //水平分布居中
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
    text12: {
        fontSize: 10
    }
})


function mapStateToProps(state) {
    return {
        loginData: state.loginReducer,
    }
}

export default connect(mapStateToProps)(CreditGoodInfo);