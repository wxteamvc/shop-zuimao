/**
 * 头部导航
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
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
export default class SignIndex extends Component {
    constructor(props) {
        super(props)
        this.color = this.props.color ? this.props.color : '#fff'
    }

    render() {
        let {btn,navigation,title} = this.props
        
        return (
            <View style={[styles.topNav, { backgroundColor: this.color }]}>
                <TouchableOpacity onPress={() => { navigation.goBack() }} style={[{ flex: 0.15 }, styles.center]}><Icon name={'chevron-left'} size={20} />
                </TouchableOpacity>
                <View style={[{ flex: 0.7 }, styles.center]}>
                    <Text style={{ fontSize: 20, color: '#000' }}>
                        {title}</Text>
                </View>
                {btn}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    topNav: {
        height: 50,
        flexDirection: 'row',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})