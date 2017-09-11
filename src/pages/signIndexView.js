/**
 * 签到页面
 * 
 * 
 */
"use strict";


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import { SIGNINDEX_URL, SIGN_URL, SIGN_MONTHCHANGE_URL } from '../common/global'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Util from '../common/util';
import Loading from '../component/loading';
import Select from 'teaset/components/Select/Select';
import Toast from 'react-native-root-toast';

class SignIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: false,
            errmessage: '',
            orderday: 0,
            text: {},
            sum: 0,
            points: 0,
            signed: 0,
            member: {},
            month: {},
            calendar: {},
            now: '',
            contect: false,
        }
    }

    getSign() {
        let { loginData } = this.props;
        if (loginData.status === "success" && this.state.contect === false) {
            let token='';
            for(let key in loginData.data.result.token){
               token = '&'+key+'='+loginData.data.result.token[key]
            };
            let url = SIGNINDEX_URL + token;
            if (global.isConnected) {
                Util.get(url,
                    (resq) => {
                        if (resq.status == 1) {
                            console.log(resq)
                            this.setState(Object.assign(this.state, resq.result, { status: 'success', contect: true }))

                        } else {
                            this.setState({
                                status: 'faild',
                                errmessage: resq.message,
                                contect: true
                            })
                        }
                    },
                    (error) => {
                        this.setState({
                            status: 'faild',
                            errmessage: error.message,
                            contect: true
                        })
                    })
            } else {
                this.setState({
                    status: 'faild',
                    errmessage: '当前没有网络！'
                })
            }
        }

    }

    componentDidMount() {
        this.getSign()
    }

    componentDidUpdate() {
        this.getSign()
    }

    changeMonth(item) {
        let { loginData } = this.props;
        let token='';
        for(let key in loginData.data.result.token){
            token = '&'+key+'='+loginData.data.result.token[key]
        }
        this.setState({
            now: item.value,
        })
        let url = SIGN_MONTHCHANGE_URL + item.value + token;
        if (global.isConnected) {
            Util.post(url, {},
                (resq) => {
                    if (resq.status == 1) {
                        this.setState({
                            calendar: resq.result
                        })
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

    sign() {
        let { loginData } = this.props;
        let token='';
        for(let key in loginData.data.result.token){
          token = '&'+key+'='+loginData.data.result.token[key]
        }
        let url = SIGN_URL + token;
        if (global.isConnected) {
            Util.post(url, {},
                (resq) => {
                    if (resq.status == 1) {
                        Toast.show(resq.result.message)
                        this.setState({
                            signed: 1,
                            orderday: resq.result.signorder,
                            sum: resq.result.signsum,
                            points: resq.result.credit
                        })
                    } else {
                        // console.log(resq)
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

    renderBtn() {
        return (
            <TouchableOpacity style={[{ flex: 0.15, }, styles.center]}>
                <Icon name={'home'} size={30} />
            </TouchableOpacity>
        )
    }

    renderDateList({ item }) {
        let date = [];
        for (let i in item) {
            let flag = item[i].signed || (item[i].today && this.state.signed);
            date.push(
                <View key={i} style={[styles.dateList, { borderRightWidth: i == item.length - 1 ? 0 : 0.7 }, item[i].today ? styles.dateListBorder : false]}>
                    <Text style={styles.dateText}>{item[i].day ? item[i].day : ''}
                    </Text>
                    {flag ?
                        <Icon name={'check'} size={20} color={'#24B2F4'} style={{ marginLeft: 5, marginTop: 10 }} /> :
                        false
                    }
                </View>
            )
        }
        return (
            <View style={{ flexDirection: 'row', height: 50, }}>
                {date}
            </View>
        )
    }

    selectItems() {
        let month = this.state.month
        month.reverse();   //让数组倒序排序
        let items = [];
        for (let i = 0; i < month.length; i++) {
            items.push({
                text: month[i].year + '年' + month[i].month + '月',
                value: month[i].year + '-' + month[i].month,
            })

        }

        return items
    }

    render() {
        if (this.props.loginData.status === 'success') {
            if (this.state.status == 'success') {
                return (
                    <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
                        <StatusBar
                            translucent={false}
                            backgroundColor="#000"
                        />
                        <View style={styles.header}>
                            <View style={[styles.header_item, { flex: 0.3 }]}>
                                <Text style={[styles.font, { fontSize: 18 }]}>连续签到</Text>
                                <Text style={styles.font2}>{this.state.orderday}天</Text>
                            </View>
                            <View style={[styles.header_item, { flex: 0.4 }]}>
                                <Image
                                    source={this.state.member.avatar?{uri:this.state.member.avatar}:require('../assets/images/header.jpg')}
                                    style={styles.image}
                                />
                                <Text style={styles.font}>{this.state.member.realname?this.state.member.realname:this.state.member.nickname}</Text>
                                <Text style={styles.font}>我的积分：{this.state.points}积分</Text>
                                <TouchableOpacity
                                    disabled={this.state.signed ? true : false}
                                    onPress={() => { this.sign() }}
                                    style={[styles.btn, { marginTop: 5 }]}>
                                    <Text style={{ fontSize: 18, color: '#fff' }}>{this.state.signed ? '今日已签' : '点击签到'}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.header_item, { flex: 0.3 }]}>
                                <Text style={[styles.font, { fontSize: 18 }]}>总签到</Text>
                                <Text style={styles.font2}>{this.state.sum}天</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => { this.props.navigation.navigate('SignRecord') }}
                                style={[styles.floatbtn, styles.btn]}>
                                <Text style={[styles.font, { marginTop: 0 }]}>详细记录</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.select, { padding: 5, marginBottom: 2, marginTop: 5, marginLeft: 4, marginRight: 4 }]}>
                            <Icon name={'calendar'} size={20} color={'#24B2F4'} style={{ marginRight: 10, marginLeft: 10 }} />
                            <Select
                                style={{ width: 200 }}
                                value={this.state.now}
                                valueStyle={{ color: '#24B2F4' }}
                                items={this.selectItems()}
                                getItemValue={(item, index) => item.value}
                                getItemText={(item, index) => item.text}
                                onSelected={this.changeMonth.bind(this)}
                                pickerType='popover'
                                placeholderTextColor='#24B2F4'
                            />
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#fff', marginLeft: 4, marginRight: 4, padding: 10, paddingBottom: 0, }}>
                            <FlatList
                                data={this.state.calendar}
                                extraData={this.state}
                                renderItem={this.renderDateList.bind(this)}
                                keyExtractor={(item, index) => index}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={{ flex: 1 }}>
                        <Loading status={this.state.status} errmessage={this.state.errmessage} />
                    </View>
                )
            }
        } else {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 20 }}>您还没有登陆哦~</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={{ textAlign: 'center', fontSize: 18, backgroundColor: '#0271BC', borderRadius: 10, padding: 10, color: '#fff', marginTop: 10 }}>立即登录</Text>
                    </TouchableOpacity>
                </View>
            )
        }



    }
}



const styles = StyleSheet.create({
    header: {
        height: 180,
        backgroundColor: '#24B2F4',
        flexDirection: 'row',
    },
    header_item: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    font: {
        marginTop: 5,
        color: '#fff',
        fontSize: 16,
    },
    font2: {
        color: 'yellow',
        fontSize: 18,
    },
    image: {
        height: 70,
        width: 70,
        borderRadius: 35,
    },
    floatbtn: {
        position: 'absolute',
        right: 5,
        top: 5,
    },
    btn: {
        padding: 2,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 25,
    },
    select: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: 5,
        alignItems: 'center',
    },
    dateList: {
        flex: 1,
        flexDirection: 'row',
        borderColor: '#ccc',
        borderRightWidth: 0.7,
        borderBottomWidth: 0.7
    },
    dateListBorder: {
        borderColor: '#24B2F4',
        borderWidth: 1,
    },
    dateText: {
        fontSize: 18,
        marginLeft: 6,
        marginTop: 6
    }
})


function mapStateToProps(state) {
    return {
        loginData: state.loginReducer,
    }
}

export default connect(mapStateToProps)(SignIndex);