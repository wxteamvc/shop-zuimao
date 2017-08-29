/**
 * 优惠券页面
 * 
 * 
 */
"use strict";


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Util from '../common/util';
import Loading from '../component/loading';
import FlatListJumoTop from '../component/flatListJumoTop'
import { NOWTIME, SIGNRECORD_URL, ScreenHeight } from '../common/global'


export default class Coupons extends Component{
     
    
    
    render(){
         return(
             <View>
                 <Text>优惠券</Text>
             </View>
         )
     }
}
