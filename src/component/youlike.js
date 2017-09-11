//发猜你喜欢栏目组件
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
import { ScreenWidth, DOMAIN } from '../common/global';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

export default class YouLike extends Component {

    constructor(...props) {
        super(...props);
    }

    renderYouLike({ item }) {
        let { fun } = this.props;
        return (
            <TouchableOpacity style={styles.item_container} onPress={() => { this.props.navigate.navigate('GoodsInfo', { id: item.id }) }}>
                <View style={styles.item_left}>
                    <Image source={{ uri: DOMAIN + item.thumb }} style={styles.item_img} />
                </View>
                <View style={styles.item_right}>
                    <View >
                        <Text numberOfLines={1} style={styles.item_title}>
                            {item.title}
                        </Text>
                        <Text style={styles.item_sale}>{item.sales}人已购买</Text>
                    </View>
                    <View style={styles.item_price_container}>
                        <Text style={styles.item_price}>&yen; {item.marketprice}</Text>
                        <Text style={styles.item_oldprice}> {item.productprice == 0 ? null : '￥' + item.productprice}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.buy_car} onPress={() => { item.thumb = DOMAIN + item.thumb; fun(item) }}>
                    <Icon name={'cart-outline'} color={'red'} size={20} />
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View>
                <View style={styles.head}>
                    <Text style={styles.head_text}>───── 猜你喜欢 ─────</Text>
                </View>
                <FlatList
                    style={{ backgroundColor: '#fff' }}
                    showsHorizontalScrollIndicator={false}
                    data={this.props.youlike}
                    renderItem={this.renderYouLike.bind(this)}
                    keyExtractor={(item, index) => index}
                    ListFooterComponent={<View style={styles.footer}><Text style={{ fontSize: 12 }}>DUANG~已经到底了哦</Text></View>}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    head: {
        height: 40, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 5,
    },
    head_text: {
        color: '#8ADDAA', fontSize: 18, fontWeight: 'bold'
    },
    item_container: {
        height: 120, borderBottomWidth: 0.5, borderColor: '#ccc', flexDirection: 'row', paddingTop: 20, paddingBottom: 20, paddingRight: 20
    },
    item_left: {
        flex: 0.25, justifyContent: 'center', alignItems: 'center',
    },
    item_right: {
        flex: 0.75, paddingLeft: 15, justifyContent: 'space-between'
    },
    item_img: {
        width: 80, height: 80
    },
    item_title: {
        color: '#000', fontSize: 16
    },
    item_sale: {
        fontSize: 12, color: '#ccc', marginTop: 5
    },
    item_price_container: {
        flexDirection: 'row', alignItems: 'center',
    },
    item_price: {
        color: 'red', fontSize: 18
    },
    item_oldprice: {
        textDecorationLine: 'line-through', marginLeft: 10, color: '#ccc'
    },
    buy_car: {
        position: 'absolute', bottom: 25, right: 20, height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', borderColor: '#ccc', borderWidth: 0.7
    },
    footer: {
        justifyContent: 'center', alignItems: 'center', paddingTop: 8, paddingBottom: 8, backgroundColor: '#F6F7FB'
    }
})