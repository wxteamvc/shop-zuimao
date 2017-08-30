//首页按钮组件
"use strict";
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import { DOMAIN, ScreenWidth } from '../common/global';


export default class icon extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: ['葡萄酒', '白酒', '洋酒', '精选', '签到', '领券', '拼团', '限时', '促销', '充值',]
        }
    }


    render() {
        let url = null;
        let icon = [];
        for (let i = 0; i < this.state.list.length; i++) {
            switch (i) {
                case 0:
                    url = require('../assets/images/icon/0.png');
                    break;
                case 1:
                    url = require('../assets/images/icon/1.png');
                    break;
                case 2:
                    url = require('../assets/images/icon/2.png');
                    break;
                case 3:
                    url = require('../assets/images/icon/3.png');
                    break;
                case 4:
                    url = require('../assets/images/icon/4.png');
                    break;
                case 5:
                    url = require('../assets/images/icon/5.png');
                    break;
                case 6:
                    url = require('../assets/images/icon/6.png');
                    break;
                case 7:
                    url = require('../assets/images/icon/7.png');
                    break;
                case 8:
                    url = require('../assets/images/icon/8.png');
                    break;
                case 9:
                    url = require('../assets/images/icon/9.png');
                    break;
                default:
                    break;
            }
            icon.push(
                <TouchableOpacity key={i} style={styles.listbtn} onPress={()=>{this.props.navigation.navigate('Coupons')}}>
                    <Image source={url} style={styles.image} />
                    <Text >{this.state.list[i]}</Text>
                </TouchableOpacity>
            )

        }




        return (
            <View style={styles.container}>
                {icon}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
         flexWrap: 'wrap',
         backgroundColor:'#fff'
    },
    listbtn:{
        width: ScreenWidth / 5, 
        height: ScreenWidth / 5, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    image:{
        width: 45, 
        height: 45 
    }
})