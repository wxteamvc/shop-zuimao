//轮播图组件
"use strict";
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { DOMAIN,ScreenWidth } from '../common/global';
export default class Banner extends Component {
    constructor(props) {
        super(props);
        this.state={
            isShow:false,
        }

    }

    componentDidMount(){
       this.timeOut = setTimeout(()=>{
            this.setState({
             isShow:true,
         })
        },0); 
     }

     componentWillUnmount() {
        this.timeOut && clearTimeout(this.timeOut)
     }

    banner = () => {
        var val = [];
        for (let i = 0; i < this.props.banner.length; i++) {
            val.push(   
                <TouchableWithoutFeedback key={i}  onPress={()=>{alert('我要跳啦')}}>
                    <Image source={{uri:DOMAIN + this.props.banner[i].thumb}} style={{ flex:1 }} resizeMode={'stretch'}></Image>
                </TouchableWithoutFeedback>
            )
        };
        return (val);

    }
    render() {
        if(this.state.isShow){
        return (
            <View style={{height:160,width:ScreenWidth}}>
                <Swiper
                    height={160}
                    dotStyle={{ height:0, }}
                    activeDotStyle={{ height: 0, }}
                    showsButtons={false}
                    autoplay={true}
                    showsVerticalScrollIndicator={true}
                >
                    {this.banner()}
                </Swiper>
            </View>
        )
    }else{
        return(
            <View style={{height:160}}></View>
        )
    }
 }
}


