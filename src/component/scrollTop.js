//控制scrollview跳转到顶部
"use strict";

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const mycolor = "#000";
export default class JumpTop extends Component {
    constructor(props) {
        super(props)
        this.mycolor = this.props.color ? this.props.color : mycolor;
    }

    render() {
        return (
            <TouchableOpacity
                onPress={() => { this.props.item.scrollTo({ x: 0, y: 0, animated: true }) }}
                style={{ position: 'absolute', bottom: this.props.bottom ? this.props.bottom : 30, right: this.props.right ? this.props.right : 20, }}
            >
                <View style={[styles.btnShow, this.props.isShow ? '' : styles.btnHide, { backgroundColor: this.props.color ? this.props.color : '#000' }]}>
                </View>
                <Icon name={'arrow-up'} size={20} color={'#fff'}
                    style={styles.icon}
                />
            </TouchableOpacity>
        )
    }
}




const styles = StyleSheet.create({
    btnShow: {
        height: 40,
        width: 40,
        borderRadius: 20,
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnHide: {
        height: 0,
    },
    icon: {
        position: 'absolute',
        left: 11,
        top: 9,
    }
})