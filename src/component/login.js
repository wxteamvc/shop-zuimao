/**
 * 登陆页面组件
 */
"use strict";

import React, { Component } from 'react';
import { ScreenWidth, ScreenHeight } from '../common/global';
import { StyleSheet, Text, View, ScrollView, TextInput, Switch, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Toast from 'react-native-root-toast';
import { login } from '../actions/memberAction';

class Login extends Component {

    constructor(...props) {
        super(...props);
        this.state = {
            mobile: null,
            pwd: null,
            showPwd:false,
        }
        
    }

    componentDidUpdate(nextProps) {
        if(this.props.loginData.status=='success'){
            Toast.show(this.props.loginData.message);
            this.props.navigation.goBack();
        }
      }

    render() {
        return (
            <View>
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
                       <View style={styles.inputPwd}>
                            <Icon name='lock' size={30} style={styles.icon}/>
                            <TextInput style={{flex:7}}
                                    onChangeText={(text) => this.setState({
                                        pwd: text
                                    })}
                                    underlineColorAndroid="transparent"
                                    placeholder='密码'
                                    secureTextEntry={!this.state.showPwd}
                            />
                            <Switch style={{flex:2,marginLeft:20}} value={this.state.showPwd} onTintColor='#4CD662' onValueChange={()=>this.setState({showPwd:!this.state.showPwd})} />
                        </View>
                    </View>
                    <View style={styles.textForget}>
                        <TouchableOpacity>
                            <Text>忘记密码?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.loginView}>
                        <TouchableOpacity onPress={()=>this._login()}>
                            <Text style={this.state.mobile && this.state.pwd ?styles.loginGreen:styles.loginGray}>登陆</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            
        );
    }

    _login(){
        let mobile = this.state.mobile;
        let pwd = this.state.pwd; 
        if(mobile&&pwd){
            this.props.dispatch(login({mobile:this.state.mobile,pwd:this.state.pwd,app:1}));
        }else{
            Toast.show("手机号或密码错误")
        }
    }

    // _register(){
    //     this.props.navigation.navigate('Register')
    // }

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
        padding:15
    },
    loginView:{
        padding:15,
    },
    loginGray:{
        textAlign:'center',
        flex:1,
        backgroundColor:'#ccc',
        color:'white',
        padding:15
    },
    loginGreen:{
        textAlign:'center',
        flex:1,
        backgroundColor:'#4CD662',
        color:'white',
        padding:15
    }
});

function mapStateToProps(state) {
    return {
      loginData: state.loginReducer,
    }
  }
  
export default connect(mapStateToProps)(Login);