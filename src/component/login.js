/**
 * 登陆页面组件
 */
"use strict";

import React, { Component } from 'react';
import { ScreenWidth, ScreenHeight } from '../common/global';
import { Text, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Toast from 'react-native-root-toast';

export default class Login extends Component {

    constructor(...props) {
        super(...props);
        this.state = {
            mobile: null,
            pwd: null
        }
    }

    render() {
        return (
            <View>
                <View >
                    <View>
                        <Icon name="chevron-left"/>
                    </View>
                    <View>
                        
                    </View>
                    <View>
                        
                    </View>
                </View>
                <ScrollView>
                    <Text>123</Text>
                </ScrollView>
            </View>
            
        );
    }

    // _login(){
    //     let mobile = this.state.mobile;
    //     let pwd = this.state.pwd; 
    //     if(mobile&&pwd){
    //         this.props.dispatch(login({mobile:this.state.mobile,pwd:this.state.pwd}))
    //     }else{
    //         ToastAndroid.show('手机号或密码输入错误！', ToastAndroid.SHORT);
    //     }
    // }

    // _register(){
    //     this.props.navigation.navigate('Register')
    // }

}

// const styles = StyleSheet.create({
//     top:{
//     } 
// });