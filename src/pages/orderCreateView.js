/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
"use strict";

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    Image,
    RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import ScrollViewJumpTop from '../component/scrollViewJumpTop';
import FlatListJumpTop from '../component/flatListJumoTop';
import { ORDERCREATE_URL, ScreenWidth, DOMAIN, StatusBarHeight } from '../common/global';
import Loading from '../component/loading';
import Util from '../common/util';


class OrderCreate extends Component {

    constructor(...props) {
        super(...props);
        this.state = {
            status: false,
            data: {},
            goodsNum: 1,
            errmessage:'',
        }
    }

    componentDidMount() {
        let { data, goodsNum } = this.props.navigation.state.params
        this.setState({
            data: data,
            goodsNum: goodsNum,
            status:'success'
        })
        let token='';
        for( let key in this.props.loginData.data.result.token){
             token = '&'+key+'='+this.props.loginData.data.result.token[key]
        }
        let url = ORDERCREATE_URL+token
        // let terms={}
        // Util.post(url,
        //     (resq) => {
        //         if (resq.status == 1) {
        //             this.setState({
        //                 status: 'success',
        //                 data: resq.result.list,
                        
        //             })
        //         } else {
        //             this.setState({
        //                 status: 'faild',
        //                 errmessage: resq.message,
                       
        //             })
        //         }
        //     },
        //     (error) => {
        //         this.setState({
        //             status: 'faild',
        //             errmessage: error.message,
        //         })
        //     })
    }



    render() {
        if (this.state.status == 'success') {
            return (
                <View style={styles.container}>
                    <View style={{ height: 100,backgroundColor:'#fff' }}></View>
                    <Image
                        source={require('../assets/images/border.jpg')}
                        resizeMode={'cover'}
                        style={{ height: 5, marginBottom: 10 }}
                    />
                    <ScrollView>
                        <View style={{ backgroundColor: '#fff', paddingBottom: 10, paddingTop: 10 }}>
                            <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                                <Text>醉猫商城</Text>
                            </View>
                            <View style={{ flexDirection: 'row', backgroundColor: '#EFEFEF',paddingTop:10,paddingBottom:10 }}>
                                <View style={[{ flex: 1 / 3},styles.center]}>
                                    <Image source={{ uri: this.state.data.thumb }} style={{ height: 100, width: 100 }} />
                                </View>
                                <View style={[styles.columnBetween, { flex: 2 / 3 }]}>
                                    <View>
                                        <Text style={{color:'#000'}}>
                                            {this.state.data.title}
                                        </Text>
                                    </View>
                                    <View style={styles.rowBetween}>
                                        <Text style={{ color: 'red' }}>
                                        &yen;{this.state.data.marketprice}
                                        </Text>
                                        <Text>&times;&nbsp;{this.state.goodsNum}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ height: 300}}></View>
                    </ScrollView>
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1, }}>
                    <Loading status={this.state.status} errmessage={this.state.errmessage} />
                </View>
            )
        }


    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFEF',
    },
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
    //垂直两端布局
    columnBetween: {
        flexDirection: 'column', justifyContent: 'space-between', padding: 10,
    },
    //水平两端布局
    rowBetween: {
        flexDirection: 'row', justifyContent: 'space-between',
    },
})


function mapStateToProps(state) {
    return {
        loginData: state.loginReducer,
    }
}

export default connect(mapStateToProps)(OrderCreate);