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
import SignIndex from '../component/signIndex';
import SignRanking from '../component/signRanking';
import CreditShop from '../component/creditShop';

class Sign extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: false,
            page: 1,
        }
      
    }


    componentWillMount() {
       this.props.navigation.state.params.page?  this.setState({ page: this.props.navigation.state.params.page }):false; 
    }



    show() {
        if (this.state.page == 1) {
            return <SignIndex {...this.props} />
        } else if (this.state.page == 2) {
            return <SignRanking {...this.props} />
        } else {
            return <CreditShop {...this.props} />
        }
    }
    render() {
        if (this.props.loginData.status === 'success') {
            return (
                <View style={{ flex: 1 }}>
                    <StatusBar
                        translucent={false}
                        backgroundColor="#000"
                    />
                    {this.show()}
                    <View style={styles.bottomNav}>
                        <TouchableOpacity
                            onPress={() => { this.setState({ page: 1 }) }}
                            activeOpacity={1}
                            style={[styles.center, { flex: 1 }]}
                        >
                            <Icon name={"gift"} size={30} color={this.state.page == 1 ? 'red' : '#757575'} />
                            <Text style={{ color: this.state.page == 1 ? 'red' : '#757575', fontSize: 10 }}>
                                积分签到
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { this.setState({ page: 2 }) }}
                            activeOpacity={1}
                            style={[styles.center, { flex: 1 }]}
                        >
                            <Icon name={"line-chart"} size={25} color={this.state.page == 2 ? 'red' : '#757575'} />
                            <Text style={{ color: this.state.page == 2 ? 'red' : '#757575', fontSize: 10 }}>
                                签到排行
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { this.setState({ page: 3 }) }}
                            activeOpacity={1}
                            style={[styles.center, { flex: 1 }]}
                        >
                            <Icon name={"diamond"} size={25} color={this.state.page == 3 ? 'red' : '#757575'} />
                            <Text style={{ color: this.state.page == 3 ? 'red' : '#757575', fontSize: 10 }}>
                                积分商城
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.navigate('HomeTab') }}
                            activeOpacity={1}
                            style={[styles.center, { flex: 1 }]}
                        >
                            <Text style={{ fontFamily: 'iconfont', fontSize: 30 }}>&#xe613;</Text>
                            <Text style={{ fontSize: 10 }}>
                                首页
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.navigate('Member') }}
                            activeOpacity={1}
                            style={[styles.center, { flex: 1 }]}
                        >
                            <Text style={{ fontFamily: 'iconfont', fontSize: 25 }}>&#xe610;</Text>
                            <Text style={{ fontSize: 10 }}>
                                我的
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <StatusBar
                        translucent={false}
                        backgroundColor="#000"
                    />
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
    // 居中
    center: {
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
    bottomNav: {
        height: 50, backgroundColor: '#fff', borderColor: '#ccc', borderTopWidth: 0.7, flexDirection: 'row',
    }
})

function mapStateToProps(state) {
    return {
        loginData: state.loginReducer,
    }
}

export default connect(mapStateToProps)(Sign);