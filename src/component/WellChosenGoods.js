//发现好货栏目组件
"use strict";
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { ScreenWidth, DOMAIN } from '../common/global';

export default class WellChosen extends Component {

    constructor(...props) {
        super(...props);
        this.state = {
            isShow: false,
            logo: [
                'http://www.zuimaowang.cn/attachment/images/1/2016/11/Mr4BGRF59EGDHrJROHf7BRmrb4B7SE.jpg',
                'http://www.zuimaowang.cn/attachment/images/1/2016/11/D9znu8r11AqCC1aY1rrWIRZVUYvyRc.jpg',
                'http://www.zuimaowang.cn/attachment/images/1/2016/11/o4yHTYt4k728h6RzDZrB6ETKs8hd6P.jpg',
                'http://www.zuimaowang.cn/attachment/images/1/2016/11/R72pzU7GgnU6pUGbhpWhBnYp2474BI.jpg',
                'http://www.zuimaowang.cn/attachment/images/1/2016/11/la6QqH6hWQrNZszw2hvQV0S6wkQnnH.png',
                'http://www.zuimaowang.cn/attachment/images/1/2016/11/V6sSTZk122O5OkooEko42gg3WOk5zT.png',
                'http://www.zuimaowang.cn/attachment/images/1/2016/11/s6P14epd4NP0z54NOtyO6770YYHny6.jpg'
            ],
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                isShow: true,
            })
        }, 0);
    }

    rendergoods({ item }) {
        return (
            <View style={styles.goodContainer}>
                <Image
                    source={{ uri: DOMAIN + item.thumb }}
                    style={styles.goodImage}
                />
                <View style={styles.goodTextContainer}>
                    <View style={{flex:1}}>
                        <Text numberOfLines={1} style={{ color: '#000' }}>{item.title}</Text>
                    </View>
                    <View  style={{flex:1, flexDirection: 'row'}}>
                        <Text style={{ color: 'red',flex:1 }}>&yen;{item.marketprice}</Text>
                        <Text style={{ textDecorationLine: 'line-through',flex:1 }}>{item.productprice == 0 ? null : '￥' + item.productprice}</Text>
                    </View>
                </View>
            </View>
        )
    }

    renderLogoList(num) {
        let list2 = [];
        if (this.props.category.length - num > 6) {
            var times = 6;
        } else {
            var times = this.props.category.length - num;
        }
        for (let k = 0; k < times; k++) {
            list2.push(
                <TouchableOpacity key={k} style={styles.logoListBtn}>
                    <Image source={{ uri:DOMAIN+this.props.category[num].thumb }} style={{ width: 60, height: 60 }} />
                </TouchableOpacity>
            );
            num++;
        }
        return (list2)
    }
    renderLogoBanner() {
        var nav = []
        for (var i = 0; i < Math.ceil(this.props.category.length / 6); i++) {
            nav.push(
                <View key={i} style={styles.logoBanner}>
                    {this.renderLogoList(i * 6)}
                </View>
            )

        }
        return (nav)
    }

    renderImg() {
        if (this.props.ad.length != 0) {
            return (
                <View>
                    <Image
                        source={{ uri: DOMAIN + this.props.ad[0].thumb }}
                        style={{ height: 100, width: ScreenWidth }}
                        resizeMode={'stretch'}
                    />
                </View>
            )
        } else {
            return (false)
        }
    }

    render() {
        if (this.state.isShow) {
            return (
                <View>
                    <View style={styles.head}>
                        <Text style={styles.head_text}>───── 精选好酒 ─────</Text>
                    </View>
                    {this.renderImg()}
                    <FlatList
                        style={{ backgroundColor: '#fff' }}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        data={this.props.recommands}
                        renderItem={this.rendergoods.bind(this)}
                        keyExtractor={(item, index) => index}
                    />
                    <View style={{ height: 130, backgroundColor: '#fff',paddingTop:15,paddingBottom:5 }}>
                        <Swiper
                            height={110}
                            dot={<View style={{backgroundColor:'rgba(0,0,0,.2)', width: 6, height: 6,borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}}/>}
                            activeDot={<View style={{backgroundColor: 'red', width: 6, height: 6, borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
                            activeDotStyle={{ height: 4}}
                            paginationStyle={{position: 'absolute',bottom:15}}
                            showsButtons={false}
                            autoplay={true}
                            showsVerticalScrollIndicator={true}
                            autoplayTimeout={3}
                        >
                            {this.renderLogoBanner()}
                        </Swiper>
                    </View>
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
    head: {
        height: 40, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 5,
    },
    head_text: {
        color: '#C776EA', fontSize: 18, fontWeight: 'bold'
    },
    goodImage: {
        width: 100,
        height: 100,
    },
    logoBanner: {
        flexDirection: "row", alignItems: 'center', marginTop: 20,
    },
    logoListBtn: {
        flex: 1 / 6, alignItems: 'center', justifyContent: 'center'
    },
    goodContainer: {
        width: ScreenWidth / 3, alignItems: 'center', marginTop: 20
    },
    goodTextContainer: {
        width: ScreenWidth / 3, paddingLeft: 10, paddingRight: 10
    }
})