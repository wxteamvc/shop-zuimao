//广告图组件
"use strict";
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import { COUPONS_URL, ScreenWidth, DOMAIN } from '../common/global';

export default class MidAd extends Component {

    constructor(...props) {
        super(...props);
    }
    render() {
        if (this.props.ad.length != 0) {
            let ad = []
            for (let i = 0; i < this.props.ad.length; i++) {
                ad.push(
                    <TouchableOpacity key={i}>
                        <Image
                            source={{ uri: DOMAIN + this.props.ad[i].thumb }}
                            style={styles.ad}
                            resizeMode={'stretch'} />
                    </TouchableOpacity>
                )

            }
            return (
                <View>
                        {ad}
                </View>
            )
        } else {
            return (
                <View></View>
            )
        }

    }

}

const styles = StyleSheet.create({
    ad: {
        height: 100, width: ScreenWidth,marginBottom:10
    },
})