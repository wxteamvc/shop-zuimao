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
import { DOMAIN } from '../common/global';
export default class Banner extends Component {
    constructor(props) {
        super(props);

    }

    banner = () => {
        var val = [];
        for (let i = 0; i < this.props.banner.length; i++) {
            val.push(
                <TouchableOpacity key={i} >
                    <Image source={{ uri: DOMAIN + this.props.banner[i].thumb }} style={{ height: 200 }} resizeMode={'cover'}></Image>
                </TouchableOpacity>
            )
        };
        return (val);

    }
    render() {
        return (
            <View>
                <Swiper
                    height={200}
                    dotStyle={{ height: 2, }}
                    activeDotStyle={{ height: 4, }}
                    showsButtons={false}
                    autoplay={true}
                    showsVerticalScrollIndicator={true}
                >
                    {this.banner()}
                </Swiper>
            </View>
        )
    }
}

