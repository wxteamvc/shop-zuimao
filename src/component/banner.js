//轮播图组件
"use strict";
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
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
        setTimeout(()=>{
            this.setState({
             isShow:true,
         })
        },0); 
     }
    banner = () => {
        var val = [];
        for (let i = 0; i < this.props.banner.length; i++) {
            val.push( 
                  
                <TouchableOpacity key={i} >
                    <Image source={{uri:DOMAIN + this.props.banner[i].thumb}} style={{ height: 200,width:ScreenWidth }} resizeMode={'stretch'}></Image>
                </TouchableOpacity>
            )
        };
        return (val);

    }
    render() {
        if(this.state.isShow){
        return (
            <View style={{height:200,width:ScreenWidth}}>
                <Swiper
                    height={200}
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
            <View style={{height:200}}></View>
        )
    }
 }
}


