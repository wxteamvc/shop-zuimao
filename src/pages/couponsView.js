/**
 * 优惠券页面
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
import Util from '../common/util';
import Loading from '../component/loading';
import FlatListJumoTop from '../component/flatListJumoTop'
import { COUPONS_URL, ScreenWidth } from '../common/global'


class Coupons extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: false,
            errmessage: '',
            data: [],
            contect: false,
        }
    }

    getCoupons() {
        let { loginData } = this.props;
        if (loginData.status === "success" && this.state.contect === false) {
            let token='';
            for( let key in loginData.data.result.token){
                 token = '&'+key+'='+loginData.data.result.token[key]
            }
            let url = COUPONS_URL + Math.round(new Date().getTime() / 1000) + token
            if (global.isConnected) {
                Util.get(url,
                    (resq) => {
                        if (resq.status == 1) {
                            this.setState({
                                status: 'success',
                                data: resq.result.list,
                                contect: true,
                            })

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
         this.getCoupons()
    }

    componentDidUpdate(prevProps, prevState) {
        this.getCoupons()
    }


    rendermain(item) {
        return (
            <View style={styles.coupons_top_left}>
                <View style={styles.coupons_top_left_top}>
                    <Text style={styles.fontSize22}>
                        {item.backstr}
                    </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.fontSize30}>
                        {item._backmoney}
                    </Text>
                </View>
            </View>
        )
    }
    coupons({ item }) {
        let url = null;
        let main = null;
        switch (item.backtype) {
            case '0':
                url = require('../assets/images/coupons/yh.jpg');
                main = this.rendermain(item)
                break;
            case '1':
                url = require('../assets/images/coupons/zhekou.jpg');
                main = this.rendermain(item)
                break;
            case '2':
                url = require('../assets/images/coupons/fanxian.jpg');
                main = <View style={styles.coupons_top_left}>
                    <View style={styles.coupons_top_left_top}>
                        <Text style={styles.fontSize22}>
                            {item.backstr}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.fontSize18}
                            adjustsFontSizeToFit={true}
                        >
                            返{item.backmoney}元余额
                        </Text>
                    </View>
                </View>
                break;
            default:
                break;
        }
        return (
            <TouchableWithoutFeedback onPress={() => { this.props.navigation.navigate('CouponInfo',{id:item.id}) }}>
                <View style={styles.coupons}>
                    <Image
                        resizeMode={'stretch'}
                        style={styles.coupons_img}
                        source={url}>
                        <View style={styles.coupons_bottom}>
                            <View style={styles.coupons_bottom_left}>
                                <Text style={{ color: '#000' }}>
                                    {item.title4}
                                </Text>
                                <Text style={{ color: '#000' }}>
                                    {item.title2}
                                </Text>
                            </View>
                            <View style={styles.coupons_bottom_right}>
                                <Text
                                    numberOfLines={2}
                                    style={{ fontSize: 20 }}>{item.couponname}
                                </Text>
                            </View>
                        </View>
                        {main}
                    </Image>
                </View>
            </TouchableWithoutFeedback>
        )
    }
   
    render() {
        if (this.props.loginData.status === 'success') {
            if (this.state.status == 'success') {
                return (
                    <View style={styles.container}>
                        <StatusBar
                            translucent={false}
                            backgroundColor="#000"
                        />
                        <FlatListJumoTop
                            range={400}
                            extraData={this.state}
                            ListHeaderComponent={<Image
                                source={require('../assets/images/coupons/top.jpg')}
                                resizeMode={'stretch'}
                                style={{ width: ScreenWidth, height: 300 }} />}
                            data={this.state.data}
                            renderItem={this.coupons.bind(this)}
                            keyExtractor={(item, index) => index}

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
    container: {
        flex: 1, backgroundColor: '#1C173F'
    },
    coupons: {
        flexDirection: 'row', marginTop: 10, marginLeft: 20, marginRight: 20,
    },
    coupons_img: {
        width: ScreenWidth - 40, height: 120, borderRadius: 5
    },
    coupons_bottom: {
        height: 50, width: ScreenWidth - 90, position: 'absolute', bottom: 0, right: 0, flexDirection: 'row',
    },
    coupons_bottom_left: {
        flex: 1, justifyContent: 'center',
    },
    coupons_bottom_right: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
    },
    coupons_top_left: {
        width: (ScreenWidth - 40) / 3, height: 80, position: 'absolute', top: 0, left: 0
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
        color: '#fff', fontSize: 25,
    },

})

function mapStateToProps(state) {
    return {
        loginData: state.loginReducer,
    }
}

export default connect(mapStateToProps)(Coupons);