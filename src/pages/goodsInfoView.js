//商品详细页
"use strict";


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    Image,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IconEvil from 'react-native-vector-icons/dist/EvilIcons';
import Swiper from 'react-native-swiper';
import { DOMAIN, ScreenWidth, ScreenHeight, StatusBarHeight } from '../common/global';

export default class GoodsInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            goodsNum: 1,
            showClass: false,
            specs: {},
            specsValue: {},
        }
        this.info = {
            thumbs: [
                'images/1/2016/11/lMZ54Omk3K7kR7kTJZ94T9KU5BKOzb.jpg',
                'images/1/2016/11/lMZ54Omk3K7kR7kTJZ94T9KU5BKOzb.jpg',
                'images/1/2016/11/YXwA66Ez0x0wKm6367eP6wB7P7EaPz.jpg'
            ],
            goods: {
                title: '9城堡干红葡萄酒 750ml 12度',
                issendfree: 1,
                sales: 200,
                marketprice: 188,
            },
            params: [
                { title: '产品类型', value: '干型' },
                { title: '产地', value: '法国' },
                { title: '保质期', value: '10年' },
                { title: '生产日期', value: '2014年12月2日' },
                { title: '酒精度', value: '12%VOL' },
                { title: '类型', value: '优质餐酒' },
                { title: '规格', value: '750ml' },
                { title: '保存方式', value: '避光阴凉处平放' },

            ],
            chat: [
                { user: '风在云端', date: '2017-03-13', star: 5, chat: '性价比可以的' },
                { user: '云在彼端', date: '2017-03-13', star: 5, chat: '口感很好，价格实惠又大气' },
                { user: '风云彼端', date: '2017-03-13', star: 5, chat: '很好 ，下次还会再来' },

            ]

        }
    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <StatusBar
                    translucent={false}
                    backgroundColor="#000"
                />
                <View style={{ flex: 1, }}>
                    <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', }}>
                        <TouchableOpacity style={{ flex: 0.125, }} onPress={() => { this.props.navigation.goBack() }}>
                            <Icon name={'chevron-left'} size={20} color={'#ccc'} style={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                        <View style={[{ borderColor: this.state.page == 1 ? 'red' : '#ccc', }, styles.top]}>
                            <TouchableOpacity onPress={() => { this.setState({ page: 1 }) }}>
                                <Text style={{ fontSize: 18, color: this.state.page == 1 ? 'red' : '#000', }}>商品</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[{ borderColor: this.state.page == 2 ? 'red' : '#ccc', }, styles.top]}>
                            <TouchableOpacity onPress={() => { this.setState({ page: 2 }) }}>
                                <Text style={{ fontSize: 18, color: this.state.page == 2 ? 'red' : '#000', }}>详情</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[{ borderColor: this.state.page == 3 ? 'red' : '#ccc', }, styles.top]}>
                            <TouchableOpacity onPress={() => { this.setState({ page: 3 }) }}>
                                <Text style={{ fontSize: 18, color: this.state.page == 3 ? 'red' : '#000', }}>参数</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[{ borderColor: this.state.page == 4 ? 'red' : '#ccc', }, styles.top]}>
                            <TouchableOpacity onPress={() => { this.setState({ page: 4 }) }}>
                                <Text style={{ fontSize: 18, color: this.state.page == 4 ? 'red' : '#000', }}>评价</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {this.show()}
                    <View style={[{ height: 50, }, styles.rowCenter]}>
                        <View style={[{ flex: 0.4 }, styles.rowCenter]}>
                            <TouchableOpacity style={[{ flex: 1 }, styles.center]}>
                                <Icon name={'heart-o'} size={20} color={'#ccc'} />
                                <Text>关注</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[{ flex: 1 }, styles.center]}>
                                <Icon name={'shopping-bag'} size={20} color={'#ccc'} />
                                <Text>店铺</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[{ flex: 1 }, styles.center]}>
                                <Icon name={'shopping-cart'} size={20} color={'#ccc'} />
                                <Text>购物车</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={[{ flex: 0.3, backgroundColor: '#FE9402', height: 50 }, styles.center]}>
                            <Text style={{ fontSize: 18, color: '#fff' }}>加入购物车</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[{ flex: 0.3, backgroundColor: '#FD5555', height: 50 }, styles.center]}>
                            <Text style={{ fontSize: 18, color: '#fff' }}>立即购买</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* {this._goodClass()} */}
            </View>
        )
    }

    show() {
        if (this.state.page == 1) {
            return (this.renderGoods())
        } else if (this.state.page == 2) {
            return (this.renderInfo())
        } else if (this.state.page == 3) {
            return (this.renderParameter())
        } else {
            return (this.renderChat())
        }
    }

    renderChat() {
        return (
            <View style={{ flex: 1,}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, }}>
                    <Text>商品评价( 8人评论 )</Text>
                    <Text>好评度<Text style={{ color: 'red' }}>100%</Text></Text>
                </View>
                <FlatList
                    data={this.info.chat}
                    keyExtractor={(item, index) => index}
                    renderItem={this.renderChatList.bind(this)}

                />
            </View>
        )
    }


    renderChatList({ item }) {
        let star = []
        for (let i = 0; i < item.star; i++) {
            star.push(
                <Icon key={i} name={'star'} color={'orange'} />
            )

        }
        return (
            <View style={{ padding: 5, paddingLeft: 10, paddingRight: 10, borderBottomWidth: 0.7, borderColor: '#ccc' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#ccc' }}>{item.user}</Text>
                    <Text style={{ color: '#ccc' }}>{item.date}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 5 }}>{star}</View>
                <View><Text style={{ color: '#000' }}>{item.chat}</Text></View>
            </View>
        )
    }

    renderList({ item }) {
        return (
            <View style={[styles.rowCenter, { borderColor: '#ccc', borderBottomWidth: 1 }]}>
                <View style={[{ flex: 0.2, padding: 10 }]}><Text>{item.title}</Text></View>
                <View style={[{ flex: 0.8, padding: 10, marginLeft: 10 }]}><Text>{item.value}</Text></View>
            </View>
        )
    }

    renderParameter() {
        return (
            <FlatList
                data={this.info.params}
                renderItem={this.renderList}
                keyExtractor={(item, index) => index}
            />
        )
    }



    renderInfo() {
        return (
            <View style={{ flex: 1, backgroundColor: '#000' }}></View>
        )
    }

    renderGoods() {
        var val = [];
        for (let index in this.info.thumbs) {
            val.push(
                <Image key={index} source={{ uri: DOMAIN + this.info.thumbs[index] }} style={{ height: 400 }} resizeMode={'stretch'}></Image>
            )
        }
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <Swiper
                        height={400}
                        dotStyle={{ height: 2, }}
                        activeDotStyle={{ height: 4, }}
                        showsButtons={false}
                        autoplay={true}
                        showsVerticalScrollIndicator={true}
                    >
                        {val}
                    </Swiper>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                        <Text
                            numberOfLines={2}
                            style={{ paddingTop: 5, flex: 0.85, color: '#000', fontSize: 16, borderRightWidth: 1, borderColor: '#ccc' }}>{this.info.goods.title}
                        </Text>
                        <View style={[{ flex: 0.15, }, styles.center]}>
                            <Icon name={'share-alt'} size={20} color={'#ccc'} />
                            <Text>分享</Text>
                        </View>
                    </View>
                    <View style={{ padding: 10, paddingTop: 0, borderColor: '#ccc', borderBottomWidth: 1, }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={{ fontSize: 20, color: 'red', }}>￥{this.info.goods.marketprice}</Text>
                            <Text style={{ fontSize: 14, textDecorationLine: 'line-through', marginLeft: 10 }}>￥288</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5, paddingLeft: 5 }}>
                            <Text numberOfLines={1} style={{ flex: 1 }}>快递：{this.info.goods.issendfree ? '包邮' : this.info.goods.dispatchprice + '元'}</Text>
                            <Text numberOfLines={1} style={{ flex: 1 }}>库存：100000</Text>
                            <Text numberOfLines={1} style={{ flex: 1 }}>销量：{this.info.goods.sales}</Text>
                            <Text numberOfLines={1} style={{ flex: 1 }}>江苏省无锡市</Text>
                        </View>
                    </View>







                    <View>
                          <TouchableOpacity>
                            <View>
                          <Text>不配送区域：乌鲁木齐市 克拉玛依市 吐鲁番地区 哈密...</Text>
                          </View>
                          <View>
                              <Icon/>
                          </View>
                          </TouchableOpacity>
                    </View>
                    <View></View>
                    <View></View>











                    <View style={{ height: 50, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.7, borderColor: '#ccc' }}>
                        <View style={{ flex: 0.2, justifyContent: 'center', }}>
                            <Text style={{ marginLeft: 15, fontSize: 18 }}>数量</Text>
                        </View>
                        <View style={[styles.rowCenter, { flex: 0.8, justifyContent: 'flex-start', }]}>
                            <TouchableOpacity
                                onPress={() => { this.state.goodsNum > 1 ? this.setState({ goodsNum: --this.state.goodsNum }) : '' }}
                                style={styles.smallBtn}>
                                <Icon name={'minus'} size={16} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 16, padding: 2.5, paddingLeft: 15, paddingRight: 15, backgroundColor: '#ccc', marginLeft: 3, marginRight: 3 }}>{this.state.goodsNum}</Text>
                            <TouchableOpacity
                                onPress={() => { this.setState({ goodsNum: ++this.state.goodsNum }) }}
                                style={styles.smallBtn}>
                                <Icon name={'plus'} size={16} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, }}>
                            <Text>商品评价( 8人评论 )</Text>
                            <Text>好评度<Text style={{ color: 'red' }}>100%</Text></Text>
                        </View>
                        <FlatList
                            data={this.info.chat}
                            keyExtractor={(item, index) => index}
                            renderItem={this.renderChatList.bind(this)}
                            ListFooterComponent={
                                <TouchableOpacity onPress={() => { this.setState({ page: 4 }) }}>
                                    <View style={[styles.center, { padding: 5 }]}>
                                        <Text>点击查看所有评论</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                        />
                    </View>




                    <View style={{ borderColor: '#ccc', borderBottomWidth: 0.7 }}>
                        <View style={[{ marginTop: 50 }, styles.rowCenter]}>
                            <View style={[{ flex: 1, borderColor: '#ccc', borderRightWidth: 1 }, styles.center]}>
                                <Text style={{ fontSize: 16 }}>72</Text><Text style={{ fontSize: 16 }}>全部</Text>
                            </View>
                            <View style={[{ flex: 1, borderColor: '#ccc', borderRightWidth: 1 }, styles.center]}>
                                <Text style={{ fontSize: 16 }}>32</Text><Text style={{ fontSize: 16 }}>新品</Text>
                            </View>
                            <View style={[{ flex: 1, }, styles.center]}>
                                <Text style={{ fontSize: 16 }}>26</Text><Text style={{ fontSize: 16 }}>促销</Text>
                            </View>
                        </View>
                        <View style={[{ marginTop: 30, marginBottom: 15 }, styles.rowCenter]}>
                            <TouchableOpacity style={[styles.btn, { marginRight: 40 }]}>
                                <Text>全部商品</Text
                                ></TouchableOpacity>
                            <TouchableOpacity style={styles.btn}>
                                <Text>进店逛逛</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={[styles.center, { height: 60 }]} onPress={() => { this.setState({ page: 2 }) }}><Text>点击查看图片详情</Text></TouchableOpacity>
                </ScrollView>
            </View>
        );

    }


}




const styles = StyleSheet.create({
    //顶部导航
    top: {
        flex: 0.25,
        borderBottomWidth: 1,
        alignItems: 'center',
        padding: 5,
    },
    // 居中
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    //水平分布居中
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    //按钮
    btn: {
        padding: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 15,
        paddingRight: 15,
    },
    smallBtn: {
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#ccc',
    }
})