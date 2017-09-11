//广告图组件
"use strict";
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
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
                    <TouchableWithoutFeedback key={i}>
                        <Image
                            source={{ uri: DOMAIN + this.props.ad[i].thumb }}
                            style={styles.ad}
                            resizeMode={'cover'} />
                    </TouchableWithoutFeedback>
                )

            }
            return (
                <View>
                        {ad}
                </View>
            )
        } else {
            return (
                false
            )
        }

    }

}

const styles = StyleSheet.create({
    ad: {
        height: 100, width: ScreenWidth,marginBottom:10
    },
})