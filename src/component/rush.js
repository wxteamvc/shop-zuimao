/**
 * 首页的抢购栏目组件
 *         
 */
"use strict";


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { ScreenWidth, DOMAIN } from '../common/global';
import { init } from '../actions/initAction'

export default class RightBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            d: '00',
            h: '00',
            m: '00',
            s: '00',
        }
       this.int= setInterval(
            () => {
                this.time()
            }
            , 1000)
    }

    componentDidMount() {
        this.time();
    }
    
    componentWillUnmount() {
        clearInterval(this.int)
     }

    time() {
        let [d, h, m, s] = [null, null, null, null]
        let time = this.props.istime[0].timeend - Math.round(new Date().getTime() / 1000);
        if (time == 0) {
            this.props.dispatch(init())
        } else {
            d = parseInt(time / 86400)
            h = parseInt((time - 86400 * d) / 3600);
            m = parseInt((time - 86400 * d - 3600 * h) / 60);
            s = time - 86400 * d - 3600 * h - 60 * m;
            d = d < 10 ? '0' + d : d
            h = h < 10 ? '0' + h : h
            m = m < 10 ? '0' + m : m
            s = s < 10 ? '0' + s : s
            this.setState({
                d: d,
                h: h,
                m: m,
                s: s,
            })
        }
    }





    rendergoods({ item }) {
        return (
            <View style={{ marginLeft: 5,marginRight:5 }}>
                <Image
                    source={{ uri: DOMAIN + item.thumb }}
                    style={styles.goodImage}
                />
                <View style={{paddingLeft:5,paddingRight:5,paddingBottom:10}}>
                    <Text style={{ color: 'red' }}>&yen; {item.marketprice}</Text>
                    <Text style={styles.oldPrice}>&yen;{item.productprice}</Text>
                </View>
                <TouchableOpacity style={styles.buycar}>
                    <Icon name={'cart-outline'} color={'red'} size={14} />
                </TouchableOpacity>

            </View>
        )
    }


    render() {

        return (
            <View style={{ backgroundColor: '#fff', paddingBottom: 5 }}>
                <View style={styles.rush_head}>
                    <View style={{ flex: 0.4 }}>
                        <Image
                            resizeMode={'stretch'}
                            source={require('../assets/images/rush/jijiangdaoshi.png')}
                            style={{ width: 80, height: 35 }}
                        />
                    </View>
                    <View style={styles.rush_head_right}>
                        <Image
                            resizeMode={'stretch'}
                            source={require('../assets/images/rush/shengyushijian.png')}
                            style={{ width: 60, height: 18, marginRight: 10 }}
                        />
                        <Text style={styles.runTime}>{this.state.d}</Text>
                        <Text style={[styles.between_runTime]}>天</Text>
                        <Text style={styles.runTime}>{this.state.h}</Text>
                        <Text style={styles.between_runTime}>:</Text>
                        <Text style={styles.runTime}>{this.state.m}</Text>
                        <Text style={styles.between_runTime}>:</Text>
                        <Text style={styles.runTime}>{this.state.s}</Text>
                    </View>
                </View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={this.props.istime}
                    renderItem={this.rendergoods.bind(this)}
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rush_head: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15
    },
    rush_head_right: {
        flex: 0.6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    runTime: {
        padding: 3,
        paddingLeft: 6,
        paddingRight: 6,
        backgroundColor: '#595959',
        color: '#fff'
    },
    between_runTime: {
        paddingLeft: 3, paddingRight: 3, color: '#000', fontWeight: 'bold'
    },
    goodImage: {
        width: 100,
        height: 100,
        borderColor: '#ccc',
        borderWidth: 0.5,
        marginBottom: 5
    },
    oldPrice: {
        textDecorationLine: 'line-through',
        fontSize: 12
    },
    buycar: {
        position: 'absolute', bottom: 10, right: 0, width: 22, height: 22, borderRadius: 11, borderColor: '#ccc', borderWidth: 0.7, justifyContent: 'center', alignItems: 'center',
    }
})