/**
 * 注册页面组件
 */
"use strict";

import React, { Component } from 'react';
import { VERIFY_CODE_URL,REGISTER_URL} from '../common/global';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity,StatusBar } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IconT from 'react-native-vector-icons/dist/Foundation';
import Toast from 'react-native-root-toast';
import { login } from '../actions/memberAction';

class Login extends Component {

    constructor(...props) {
        super(...props);
        this.state = {
            mobile:null,
            verifycode:null,
            pwd:null,
            pwdSure:null,
            isRegistered:false,
        }
    }

    componentDidUpdate(nextProps) {
        if(this.state.isRegistered){
            this.props.navigation.goBack();
        }
    }

    render() {
        return (
            <View>
                <StatusBar translucent={false} backgroundColor="#000" />
                <ScrollView>
                    <View style={styles.inputView}>
                        <View style={styles.inputMobile}>
                            <Icon name='mobile' size={35} style={styles.icon}/>
                            <TextInput style={{flex:9}}
                                onChangeText={(text) => this.setState({
                                    mobile: text
                                })}
                                underlineColorAndroid="transparent"
                                placeholder='手机号'
                            />
                       </View>
                       <View style={styles.inputMobile}>
                            <View style={styles.codeView}>
                            <IconT name='shield' size={30} style={styles.icon}/>
                            <TextInput 
                                style={styles.codeText}
                                onChangeText={(text) => this.setState({
                                    verifycode: text
                                })}
                                placeholder='验证码'
                                underlineColorAndroid="transparent"
                            />
                            </View>
                            <View style={styles.codeBtn}>
                                <TouchableOpacity onPress={()=>this._verifycode()}>
                                    <Text style={styles.codeBtnText}>获取验证码</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.inputMobile}>
                            <Icon name='lock' size={30} style={styles.icon}/>
                            <TextInput style={{flex:7}}
                                onChangeText={(text) => this.setState({
                                    pwd: text
                                })}
                                underlineColorAndroid="transparent"
                                placeholder='密码'
                                secureTextEntry={true}
                            />
                        </View>
                        <View style={styles.inputPwd}>
                            <Icon name='lock' size={30} style={styles.icon}/>
                            <TextInput style={{flex:7}}
                                onChangeText={(text) => this.setState({
                                    pwdSure: text
                                })}
                                underlineColorAndroid="transparent"
                                placeholder='确认密码'
                                secureTextEntry={true}
                            />
                        </View>
                    </View>
                    <View style={styles.registerBtn}>
                        <TouchableOpacity onPress={()=>this._registerNow()}>
                            <Text style={this.state.mobile && this.state.verifycode&&this.state.verifycode&& this.state.pwd&& this.state.pwdSure ?styles.loginGreen:styles.loginGray} allowFontScaling={false}>立即注册</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            
        );
    }

    _verifycode(){
        var mobile = this.state.mobile;
        var isMobile = this._checkMobile(mobile);
        if(isMobile){
            fetch(VERIFY_CODE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'mobile=' + mobile + '&temp=sms_reg'
            })
            .then(response => response.json())
            .then(
                responseJson => {
                    Toast.show(responseJson.result.message);
                }
            ).catch((error) => {
                Toast.show("验证码发送请求失败！");
            });
            
        }else{
            Toast.show("手机号格式不正确");
        }
    }

    _checkMobile(mobile){
        let re = /^1[3|4|5|7|8][0-9]{9}$/;
        if (re.test(mobile)) {
            return true;
        }else{
            return false;
        }           
    }

    _registerNow(){
        var mobile = this.state.mobile;
        var pwd = this.state.pwd;
        var verifycode = this.state.verifycode;
        if(this.state.pwd===this.state.pwdSure){
            fetch(REGISTER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'mobile=' + mobile + '&pwd=' + pwd + '&verifycode=' + verifycode + '&app=1'
            })
                .then(response => response.json())
                .then(
                    responseJson => {
                        //判断返回码
                        //{ status: 0, result: { message: '*******' } }
                        if(responseJson.status==1){
                            this.setState({
                                isRegistered:true,
                            });
                            Toast.show(responseJson.result.message);
                        }else{
                            Toast.show(responseJson.result.message);
                        }
                    }
                ).catch((error) => {
                   
                    Toast.show('服务器请求失败！');
                });
        }else{
            Toast.show('两次密码不一致！');
        }
    }

}

const styles = StyleSheet.create({
    inputView:{
        backgroundColor:'white',
        padding:15,
    },
    inputMobile:{
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#aaa',
        justifyContent:'center',
    },
    inputPwd:{
        flexDirection:'row',
    },
    icon:{
        flex:1,
        paddingTop:8,
    },
    textForget:{
        padding:15,
    },
    loginView:{
        padding:15,
    },
    loginGray:{
        textAlign:'center',
        flex:1,
        backgroundColor:'#ccc',
        color:'white',
        padding:15,
    },
    loginGreen:{
        textAlign:'center',
        flex:1,
        backgroundColor:'#4CD662',
        color:'white',
        padding:15,
    },
    codeView:{
        flex:2.5,
        flexDirection:'row',
    },
    codeText:{
        borderRadius:10,
        backgroundColor:'#fff',
        flex:5,
    },
    codeBtn:{
        flex:1.5,
        justifyContent:'center',
    },
    codeBtnText:{
        textAlign:'center',
        backgroundColor:'#0271BC',
        padding:8,
        marginLeft:10,
        borderRadius:10,
        color:'#fff',
    },
    registerBtn:{
        padding:15,
    }
});

function mapStateToProps(state) {
    return {
      loginData: state.loginReducer,
    }
  }
  
export default connect(mapStateToProps)(Login);