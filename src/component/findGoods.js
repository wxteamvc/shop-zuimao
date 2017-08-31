//发现好货栏目组件
"use strict";
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { COUPONS_URL, ScreenWidth } from '../common/global';

export default class Findgoods extends Component{
   

     render(){
         switch(this.props.num){
              case 1:
              return(
                  <View style={{width:ScreenWidth,height:300,marginTop:15}}>
                    <Image 
                    style={{width:ScreenWidth,height:300}}
                    source={require('../assets/images/findgoods/fgbg.jpg')} 
                    resizeMode={'stretch'}
                    >
                    <View style={{height:40, justifyContent: 'center',alignItems: 'center',marginTop:20}}>
                        <Text style={{fontSize:26,color:'red'}}>发现好货</Text>
                        <Text>你身边的好购物指南</Text>
                    </View>

                    </Image>
                  </View>
              )
         }
     }


}