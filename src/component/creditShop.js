/**
 * 签到积分商店页面
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
import { connect } from 'react-redux';
import { ScreenWidth, CREDITSHOP_URL } from '../common/global';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Loading from '../component/loading';
import Util from '../common/util';

class CreditShop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: false,
            data: {},
            errmessage: '',
        }
    }

    componentDidMount() {
        let { loginData } = this.props;
        let token = '';
        for (let key in loginData.data.result.token) {
            token = '&' + key + '=' + loginData.data.result.token[key]
        }
        let url = CREDITSHOP_URL + token;
        if (global.isConnected) {
            Util.get(url,
                (resq) => {
                    if (resq.status == 1) {
                        this.setState({
                            status: 'success',
                            data: resq.result,
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
                }
            )
        } else {
            this.setState({
                status: 'faild',
                errmessage: '当前没有网络！'
            })
        }
    }


    render() {
        if (this.state.status == 'success') {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ backgroundColor: '#fff', flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                        <TouchableOpacity style={[{ flex: 1 }, styles.rowCenter]}>
                            <Icon name={'database'} size={20} />
                            <Text style={{ marginLeft: 5 }}>
                                {this.state.data.credittext} : {this.state.data.credit}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={()=>{this.props.navigation.navigate('CreditShopRecord',{credit:this.state.data.credit})}}
                        style={[{ flex: 1 }, styles.rowCenter]}>
                            <Icon name={'list'} size={20} />
                            <Text style={{ marginLeft: 5 }}>参与记录</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{  flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#fff', marginTop: 10 }}>
                    <TouchableOpacity
                            style={styles.rowCenter}
                        >
                            <Icon name={'th-large'} size={20} />
                            <Text style={{ marginLeft: 5 }}>全部商品</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.rowCenter}
                        >
                            <Icon name={'user-o'} size={20} />
                            <Text style={{ marginLeft: 5 }}>我的兑换</Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.data.exchanges.length > 0 ?
                        <ShopList 
                        {...this.props}
                        icon={'gift'} title={'积分实物兑换'} list={this.state.data.exchanges} />
                        : false}
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

class ShopList extends Component {
    constructor(props) {
        super(props)

    }


    componentWillMount() {
        this.list = this.props.list.slice(0, 2)
    }


    render() {
        let itemPart = [];
        for (let i = 0; i < this.list.length; i++) {
            itemPart.push(
                <TouchableOpacity 
                onPress={()=>{this.props.navigation.navigate('CreditGoodInfo')}}
                style={[{ flex: 1 / 3, padding: 10 }, styles.center]} key={i}>
                    <View>
                        <Image
                            source={{ uri: this.list[i].thumb }}
                            style={{ width: 100, height: 100 }}
                        />
                    </View>
                    <View style={{padding:5}}>
                        <Text numberOfLines={1} style={{ color: '#000'}}>{this.list[i].title}</Text>
                    </View>
                    <View style={styles.rowCenter}>
                        <Text>{this.list[i].credit}积分</Text>
                        <TouchableOpacity style={{ backgroundColor: 'red', padding: 3,paddingTop:0,paddingBottom:0, borderRadius: 5,marginLeft:20 }}>
                            <Text style={{ color: '#fff' }}>兑换</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            )
        }
        return (
            <View style={{ backgroundColor: '#fff', marginTop: 15 }} >
                <View style={{ padding: 10, flexDirection: 'row', borderColor: '#ccc', borderBottomWidth: 0.7 }}>
                    <View style={{ flex: 0.85, flexDirection: 'row', alignItems: 'center', }}>
                        <Icon name={this.props.icon} size={20} />
                        <Text style={{ marginLeft: 5 }}>{this.props.title} </Text>
                    </View>
                    <TouchableOpacity
                        style={[{ flex: 0.15 }, styles.center]}
                    >
                        <Text>...更多</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {itemPart}
                </View>
            </View>
        )
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

export default connect(mapStateToProps)(CreditShop);