/**
 * 余额充值页面
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
    TextInput
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Toast from 'react-native-root-toast';
import Util from '../common/util';
import Loading from '../component/loading';
import { MEMBERNOTICE_URL, ScreenWidth } from '../common/global'

class Recharge extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 'success',
            errmessage: '',
            money:'',
        }
    }


    render() {
        if (this.state.status == 'success') {
            return (
                <View style={{ flex: 1 }}>
                    <StatusBar
                        translucent={false}
                        backgroundColor="#000"
                    />
                    <View style={{ backgroundColor: '#fff', paddingLeft: 15, paddingRight: 15,marginTop:10 }}>
                        <View style={{ paddingTop: 10, paddingBottom: 10, borderColor: '#ccc', borderBottomWidth: 0.5, flexDirection: 'row', }}>
                            <Text>当前余额</Text>
                            <Text style={{ marginLeft: 15 }}>&yen; 100.00</Text>
                        </View>
                        <View style={[styles.rowCenter,{ paddingTop: 10, paddingBottom: 10, }]}>
                            <Text>充值金额</Text>
                            <TextInput
                            style={{flex:1,padding:0,paddingLeft:20}}
                            onChangeText ={(text)=>{
                                this.setState({money:text})
                            }}
                            autoFocus={true}
                            keyboardType={'numeric'}
                            underlineColorAndroid="transparent"
                            placeholder ={'请输入要充值的金额'}
                            placeholderTextColor={'#ccc'}
                            />
                        </View>
                    </View>
                    <View style={{padding:10,marginTop:10,backgroundColor:'#fff'}}> 
                        <Text>充值活动：充值满<Text style={{color:'red'}}>100</Text>元立即送<Text style={{color:'red'}}>5</Text>元</Text>
                    </View>
                    <TouchableOpacity 
                    onPress={()=>{alert(this.state.money)}}
                    style={[styles.center,{backgroundColor:'green',margin:30,borderRadius:10,paddingTop:10,paddingBottom:10}]}>
                        <Text style={{color:'#fff'}}>下一步</Text>
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

export default connect(mapStateToProps)(Recharge);