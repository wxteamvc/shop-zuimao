/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
"use strict";

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { init } from '../actions/initAction'
import Toast from 'react-native-root-toast';
import JumpTop from '../component/scrollTop'

class HomeView extends Component {
  
  constructor(...props){
    super(...props);
    this.state={
      isShow:false, //是否显示跳转到顶部按钮
    }
  }

  componentDidMount() {
    this.props.dispatch(init())
        
  }

  componentWillReceiveProps(){
    if(this.props.homeData.status=='failed'){
      Toast.show(this.props.homeData.message)
    }
  }
 
  //滚动条监听事件
  showJumpTop(e){
       if(e.nativeEvent.contentOffset.y>200){
         this.state.isShow?'':this.setState({isShow:true,})
       }else{
         this.state.isShow?this.setState({isShow:false,}):''
       }
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          首页
        </Text>
        <ScrollView 
        onScroll={(e)=>{this.showJumpTop(e)}}
        ref ={(ScrollView)=>{ this.ScrollView=ScrollView}}
        >
          <View style={{height:500,width:420,backgroundColor:'yellow'}}></View>
          <View style={{height:500,width:420,backgroundColor:'red'}}></View>
        </ScrollView>      
        <JumpTop item={this.ScrollView} isShow={this.state.isShow}/>
        </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

function mapStateToProps(state) {
  return {
      homeData:state.initReducer,
  }
}

export default connect(mapStateToProps)(HomeView);