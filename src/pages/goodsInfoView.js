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
import ScrollViewJumpTop from '../component/scrollViewJumpTop';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IconEvil from 'react-native-vector-icons/dist/EvilIcons';
import Swiper from 'react-native-swiper';
import { DOMAIN, ScreenWidth, ScreenHeight, StatusBarHeight, GOODINFO_URL } from '../common/global';
import Util from '../common/util';
import Loading from '../component/loading';

export default class GoodsInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            errmsg: null,
            page: 1,
            goodsNum: 1,
            showUnSend: false,
            showRights: false,
            showNum: false,
            data: {},

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

            ],
            uSend: [
                '乌鲁木齐市', '克拉玛依市', '乌鲁木齐市', '克拉玛依市', '乌鲁木齐市', '克拉玛依市', '乌鲁木齐市', '克拉玛依市', '乌鲁木齐市', '克拉玛依市', '乌鲁木齐市', '克拉玛依市', '乌鲁木齐市', '克拉玛依市', '乌鲁木齐市', '克拉玛依市', '乌鲁木齐市', '克拉玛依市', '乌鲁木齐市', '克拉玛依市', '乌鲁木齐市', '克拉玛依市', '乌鲁木齐市', '克拉玛依市', '乌鲁木齐市', '克拉玛依市', '乌鲁木齐市', '克拉玛依市', '乌鲁木齐市', '克拉玛依市', '乌鲁木齐市', '克拉玛依市', '乌鲁木齐市', '克拉玛依市'
            ],
            rights: [
                '满99免基础运费（20kg以内）', '醉猫售后', '醉猫准达', '211限时达', '货到付款', '自提',
            ]

        }
    }


    componentDidMount() {
        let { id } = this.props.navigation.state.params;

        let url = GOODINFO_URL + '&id=' + id;
        Util.get(url,
            (responseJson) => {
                if (responseJson.status == 1) {
                    this.setState({
                        status: 'success',
                        data: responseJson.result.goods_detail
                    })
                } else {
                    this.setState({
                        status: 'faild',
                        errmsg: responseJson.message
                    })
                }
            },
            (errormsg) => {
                this.setState({
                    status: 'faild',
                    errmsg: errormsg
                })
            },
        )
    }

    render() {
        if (this.state.status == 'success') {
            return (
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <StatusBar
                        translucent={false}
                        backgroundColor="#000"
                    />
                    <View style={{ flex: 1, }}>
                        <View style={styles.topNav}>
                            <TouchableOpacity style={[{ flex: 0.1, },]} onPress={() => { this.props.navigation.goBack() }}>
                                <Icon name={'angle-left'} size={30} color={'#ccc'} style={{ marginLeft: 10 }} />
                            </TouchableOpacity>
                            <View style={styles.topNavRight}>
                                <View style={[{ borderColor: this.state.page == 1 ? 'red' : '#ccc', }, styles.top]}>
                                    <TouchableOpacity onPress={() => { this.setState({ page: 1 }) }}>
                                        <Text style={{ fontSize: 16, color: this.state.page == 1 ? 'red' : '#000', }}>商品</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={[{ borderColor: this.state.page == 2 ? 'red' : '#ccc', }, styles.top]}>
                                    <TouchableOpacity onPress={() => { this.setState({ page: 2 }) }}>
                                        <Text style={{ fontSize: 16, color: this.state.page == 2 ? 'red' : '#000', }}>详情</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={[{ borderColor: this.state.page == 3 ? 'red' : '#ccc', }, styles.top]}>
                                    <TouchableOpacity onPress={() => { this.setState({ page: 3 }) }}>
                                        <Text style={{ fontSize: 16, color: this.state.page == 3 ? 'red' : '#000', }}>参数</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={[{ borderColor: this.state.page == 4 ? 'red' : '#ccc', }, styles.top]}>
                                    <TouchableOpacity onPress={() => { this.setState({ page: 4 }) }}>
                                        <Text style={{ fontSize: 16, color: this.state.page == 4 ? 'red' : '#000', }}>评价</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        {this.show()}
                        <View style={[{ height: 50, }, styles.rowCenter]}>
                            <View style={[{ flex: 0.4 }, styles.rowCenter]}>
                                <TouchableOpacity style={[{ flex: 1 }, styles.center]}>
                                    <Icon name={'heart-o'} size={20} color={'#ccc'} />
                                    <Text style={{ fontSize: 10 }}>关注</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[{ flex: 1 }, styles.center]}>
                                    <Icon name={'shopping-bag'} size={20} color={'#ccc'} />
                                    <Text style={{ fontSize: 10 }}>店铺</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[{ flex: 1 }, styles.center]}>
                                    <Icon name={'shopping-cart'} size={20} color={'#ccc'} />
                                    <Text style={{ fontSize: 10 }}>购物车</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={[styles.bottomCar, styles.center]}>
                                <Text style={styles.bottomText}>加入购物车</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.bottomBuy, styles.center]}>
                                <Text style={styles.bottomText}>立即购买</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {this.renderUnSend()}
                    {this.renderRights()}
                    {this.renderNum()}
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1, }}>
                    <Loading status={this.state.status} errmessage={this.state.errmessage} />
                </View>
            )
        }

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
    //渲染选择数量面板
    renderNum() {
        if (this.state.showNum) {
            return (
                <View style={styles.motaiContainer}>
                    <View style={styles.motaiTop}></View>
                    <View style={styles.motaiBottom}>
                        <View style={[styles.rowCenter, styles.usbTop, { height: 60 }]}>
                            <View style={[{ flex: 0.9 }]}>
                                <Text style={styles.showNumTopText}>&yen;16666666</Text>
                            </View>
                            <View style={[{ flex: 0.1, }, styles.center]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ goodsNum: 1, showNum: false })
                                    }}>
                                    <Icon name={'close'} size={16} color={'#ccc'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.rowCenter, styles.showNummid]}>
                            <Text>数量</Text>
                            <View style={[styles.rowCenter, { borderColor: '#ccc', borderWidth: 0.7 }]}>
                                <TouchableOpacity
                                    onPress={() => { this.state.goodsNum > 1 ? this.setState({ goodsNum: --this.state.goodsNum }) : '' }}
                                    style={styles.showNumMidText}>
                                    <Text>-</Text>
                                </TouchableOpacity>
                                <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                                    <Text>{this.state.goodsNum}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => { this.setState({ goodsNum: ++this.state.goodsNum }) }}
                                    style={[styles.showNumMidText, { borderLeftWidth: 0.7, borderRightWidth: 0 }]}>
                                    <Text>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => { this.setState({ showNum: false }) }}>
                            <View style={[styles.showNumBottom, styles.center]}>
                                <Text style={{ color: '#fff' }}>确定</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Image
                        style={styles.showNumImg}
                        source={{ uri: 'http://www.zuimaowang.cn/attachment/images/1/2017/08/I8nOeWnby798WZ9WFYOYFYYHnEe2E8.jpg' }} />
                </View>
            )
        }
    }



    //不配送区域列表
    renderUnSendArea({ item }) {
        return (
            <View style={[styles.center, { flex: 1, marginBottom: 10, }]}>
                <Text style={[styles.smallBtn, { borderRadius: 15 }]}>{item}</Text>
            </View>
        )

    }



    renderUnSend() {
        if (this.state.showUnSend) {
            return (
                <View style={styles.motaiContainer}>
                    <View style={styles.motaiTop}></View>
                    <View style={styles.motaiBottom}>
                        <View style={[styles.rowCenter, styles.usbTop]}>
                            <View style={styles.unSendTopLeft}>
                                <Text>不配送区域</Text>
                            </View>
                            <View style={styles.unSendTopRight} >
                                <TouchableOpacity
                                    onPress={() => { this.setState({ showUnSend: false }) }}>
                                    <Icon name={'close'} size={16} color={'#ccc'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <FlatList
                            data={this.info.uSend}
                            keyExtractor={(item, index) => index}
                            renderItem={this.renderUnSendArea.bind(this)}
                            numColumns={3}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
            )
        }
    }



    //评论
    renderChat() {
        return (
            <View style={{ flex: 1, }}>
                <View style={styles.rowBetween}>
                    <Text>商品评价( 8人评论 )</Text>
                    <Text>好评度<Text style={{ color: 'red' }}>100%</Text></Text>
                </View>
                <FlatList
                    data={this.info.chat}
                    keyExtractor={(item, index) => index}
                    renderItem={this.renderChatList.bind(this)}
                    showsVerticalScrollIndicator={false}

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
            <View style={styles.chatList}>
                <View style={styles.chatListTop}>
                    <Text style={{ color: '#ccc' }}>{item.user}</Text>
                    <Text style={{ color: '#ccc' }}>{item.date}</Text>
                </View>
                <View style={styles.chatListStar}>{star}</View>
                <View><Text style={{ color: '#000' }}>{item.chat}</Text></View>
            </View>
        )
    }

    renderParameterList({ item }) {
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
                data={this.state.data.params}
                renderItem={this.renderParameterList}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}

            />
        )
    }

    //渲染所有权益
    renderRights() {
        if (this.state.showRights) {
            return (
                <View style={styles.motaiContainer}>
                    <View style={styles.motaiTop}></View>
                    <View style={styles.motaiBottom}>
                        <View style={[styles.rowCenter, styles.usbTop]}>
                            <View style={styles.unSendTopLeft}>
                                <Text>服务说明</Text>
                            </View>
                            <View style={styles.unSendTopRight}
                            >
                                <TouchableOpacity onPress={() => { this.setState({ showRights: false }) }}>
                                    <Icon name={'close'} size={16} color={'#ccc'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <FlatList
                            data={this.info.rights}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item }) => {
                                return (
                                    <View style={styles.rightsList}>
                                        <Icon name={'check-circle-o'} color={'orange'} size={20} />
                                        <Text numberOfLines={1} style={{ marginLeft: 5 }}>{item}</Text>
                                    </View>
                                )
                            }}
                            showsVerticalScrollIndicator={false}

                        />
                    </View>
                </View>
            )
        }


    }

    //取前三条权益渲染
    renderThreeRights() {
        let rights = []
        for (let i = 0; i < this.info.rights.slice(0, 3).length; i++) {
            rights.push(
                <View key={i} style={styles.rightsList}>
                    <Icon name={'check-circle-o'} color={'green'} size={20} />
                    <Text style={{ marginLeft: 5 }}>{this.info.rights[i]}</Text>
                </View>
            )
        }
        return (rights)
    }


    renderInfo() {
        let img = [];
        for (let i = 0; i < this.state.data.goods.content.length; i++) {
            img.push(
                <Image 
                key={i}
                style={{height:400,width:420}} 
                source={{uri: this.state.data.goods.content[i]}}
                />
            )

        }
        return (
            <ScrollViewJumpTop style={{ flex:1 }}>
              {img}  
            </ScrollViewJumpTop>
        )
    }

    renderGoods() {
        var val = [];
        for (let index in this.state.data.thumbs) {
            val.push(
                <Image key={index} source={{ uri: DOMAIN + this.state.data.thumbs[index] }} style={{ height: 350 }} resizeMode={'stretch'}></Image>
            )
        }
        return (
            <View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <Swiper
                        height={350}
                        dotStyle={{ height: 2, }}
                        activeDotStyle={{ height: 4, }}
                        showsButtons={false}
                        autoplay={true}
                    >
                        {val}
                    </Swiper>
                    <View style={[styles.rightsList, { backgroundColor: '#fff' }]}>
                        <Text
                            numberOfLines={2}
                            style={styles.goodsTitle}>
                            {this.state.data.goods.title}
                        </Text>
                        <View style={[{ flex: 0.15, }, styles.center]}>
                            <Icon name={'share-alt'} size={20} color={'#ccc'} />
                            <Text>分享</Text>
                        </View>
                    </View>
                    <View style={styles.goodsAfterTitle}>
                        <View style={styles.rowYCenter}>
                            <Text style={styles.goodsNowPrice}>&yen;{this.state.data.goods.marketprice}</Text>
                            <Text style={styles.goodsOldPrice}>&yen;{this.state.data.goods.productprice}</Text>
                        </View>
                        <View style={[styles.rowYCenter, { paddingTop: 5, paddingLeft: 5 }]}>
                            <Text numberOfLines={1} style={{ flex: 1 }}>快递：{this.state.data.goods.issendfree ? '包邮' : this.state.data.goods.dispatchprice + '元'}</Text>
                            <Text numberOfLines={1} style={{ flex: 1 }}>库存：{this.state.data.goods.total}</Text>
                            <Text numberOfLines={1} style={{ flex: 1 }}>销量：{this.state.data.goods.sales}</Text>
                            <Text numberOfLines={1} style={{ flex: 1 }}>{this.state.data.goods.province}{this.state.data.goods.city}</Text>
                        </View>
                    </View>
                    <View style={styles.goodsUnSend}>
                        <TouchableOpacity
                            onPress={() => { this.setState({ showUnSend: true }) }}
                            style={[styles.rowCenter, { padding: 10, paddingTop: 15, paddingBottom: 15 }]}>
                            <View style={{ flex: 0.95 }}>
                                <Text numberOfLines={1} style={{ fontSize: 12 }}>
                                    不配送区域：<Text style={{ fontSize: 14 }}>乌鲁木齐市 克拉玛依市 吐鲁番地区 哈密...</Text>
                                </Text>
                            </View>
                            <View style={[{ flex: 0.05 }, styles.center]}>
                                <Icon name={'angle-right'} size={25} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.goodsRights}>
                        <View style={styles.goodsRightsLeft}>
                            {this.renderThreeRights()}
                        </View>
                        <View style={[{ flex: 0.1 }, styles.center]}>
                            <TouchableOpacity onPress={() => this.setState({ showRights: true })}>
                                <Text style={{ fontSize: 20 }}>...</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <TouchableOpacity activeOpacity={1} onPress={() => { this.setState({ showNum: true }) }}>
                        <View style={styles.goodsNum}>
                            <Text style={{ fontSize: 16 }}>数量<Text>{this.state.goodsNum != 1 ? ':已选择' + this.state.goodsNum + '件' : null}</Text></Text>
                            <Icon name={'angle-right'} size={25} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.goodsChat}>
                        <View style={styles.rowBetween}>
                            <Text>商品评价( 8人评论 )</Text>
                            <Text>好评度<Text style={{ color: 'red' }}>100%</Text></Text>
                        </View>
                        <FlatList
                            data={this.info.chat}
                            keyExtractor={(item, index) => index}
                            renderItem={this.renderChatList.bind(this)}
                            showsVerticalScrollIndicator={false}
                            ListFooterComponent={
                                <View style={[{ flex: 1, paddingBottom: 15, paddingTop: 15 }, styles.center]}>
                                    <TouchableOpacity
                                        style={{ flex: 0.4 }}
                                        onPress={() => { this.setState({ page: 4 }) }}>
                                        <Text style={[styles.btn, { color: 'red' }]}>点击查看所有评论</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                    </View>
                    <View style={styles.goodsBottom}>
                        <View style={[{ marginTop: 50 }, styles.rowCenter]}>
                            <View style={[styles.goodsBottomTop, styles.center]}>
                                <Text style={styles.goodsBottomText1}>72</Text><Text style={styles.goodsBottomText2}>全部</Text>
                            </View>
                            <View style={[styles.goodsBottomTop, styles.center]}>
                                <Text style={styles.goodsBottomText1}>32</Text><Text style={styles.goodsBottomText2}>新品</Text>
                            </View>
                            <View style={[{ flex: 1, }, styles.center]}>
                                <Text style={styles.goodsBottomText1}>26</Text><Text style={styles.goodsBottomText2}>促销</Text>
                            </View>
                        </View>
                        <View style={[{ marginTop: 30, marginBottom: 15 }, styles.rowCenter]}>
                            <TouchableOpacity style={[styles.btn, { marginRight: 40, }]}>
                                <Text style={{ color: 'red' }}>
                                    全部商品
                                    </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn}>
                                <Text style={{ color: 'red' }}>
                                    进店逛逛
                                    </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={[styles.center, { height: 40 }]} onPress={() => { this.setState({ page: 2 }) }}><Text>点击查看图片详情</Text></TouchableOpacity>
                </ScrollView>
            </View>
        );

    }


}




const styles = StyleSheet.create({
    //顶部导航
    top: {
        flex: 1,
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
    //水平分布垂直居中
    rowYCenter: {
        flexDirection: 'row', alignItems: 'center',
    },
    //水平两端布局
    rowBetween: {
        flexDirection: 'row', justifyContent: 'space-between', padding: 10,
    },
    //按钮
    btn: {
        padding: 3,
        borderWidth: 0.7,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 15,
        borderColor: 'red',
    },
    smallBtn: {
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#ccc',
    },
    topNav: {
        height: 50, flexDirection: 'row', alignItems: 'center',
    },
    topNavRight: {
        flex: 0.8, flexDirection: 'row', alignItems: 'center'
    },
    bottomCar: {
        flex: 0.3, backgroundColor: '#FE9402', height: 50
    },
    bottomText: {
        fontSize: 14, color: '#fff'
    },
    bottomBuy: {
        flex: 0.3, backgroundColor: '#FD5555', height: 50
    },
    motaiContainer: {
        width: ScreenWidth, height: ScreenHeight - StatusBarHeight, position: 'absolute',
    },
    motaiTop: {
        flex: 0.7, backgroundColor: '#000', opacity: 0.7,
    },
    motaiBottom: {
        flex: 0.3, backgroundColor: '#fff'
    },
    usbTop: {
        padding: 10, borderColor: '#ccc', borderBottomWidth: 0.7, marginBottom: 15
    },
    showNumTopText: {
        color: 'red', fontSize: 20, marginLeft: 130
    },
    showNummid: {
        flex: 1, padding: 15, justifyContent: 'space-between'
    },
    showNumMidText: {
        padding: 10, borderColor: '#ccc', borderRightWidth: 0.7, paddingTop: 2, paddingBottom: 2
    },
    showNumBottom: {
        height: 40, backgroundColor: '#FD5555'
    },
    showNumImg: {
        width: 100, height: 100, borderColor: '#ccc', borderWidth: 1, position: 'absolute',
        top: (ScreenHeight - StatusBarHeight) * 0.7 - 40, left: 20, backgroundColor: '#fff'
    },
    unSendTopLeft: {
        flex: 0.6, flexDirection: 'row', justifyContent: 'flex-end'
    },
    unSendTopRight: {
        flex: 0.4, flexDirection: 'row', justifyContent: 'flex-end'
    },
    rightsList: {
        flexDirection: 'row', alignItems: 'center', padding: 10,
    },
    chatList: {
        padding: 5, paddingLeft: 10, paddingRight: 10, borderBottomWidth: 0.7, borderColor: '#ccc'
    },
    chatListTop: {
        flexDirection: 'row', justifyContent: 'space-between'
    },
    chatListStar: {
        flexDirection: 'row', marginTop: 10, marginBottom: 5
    },
    goodsTitle: {
        paddingTop: 5, flex: 0.85, color: '#000', fontSize: 16, borderRightWidth: 1, borderColor: '#ccc'
    },
    goodsAfterTitle: {
        padding: 10, paddingTop: 0, borderColor: '#ccc', borderBottomWidth: 1, backgroundColor: '#fff'
    },
    goodsNowPrice: {
        fontSize: 20, color: 'red',
    },
    goodsOldPrice: {
        fontSize: 14, textDecorationLine: 'line-through', marginLeft: 10
    },
    goodsUnSend: {
        borderColor: '#ccc', borderBottomWidth: 0.3, marginTop: 8, backgroundColor: '#fff'
    },
    goodsRights: {
        borderColor: '#ccc', borderBottomWidth: 0.7, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginTop: 8
    },
    goodsRightsLeft: {
        flex: 0.9, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'
    },
    goodsNum: {
        height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', padding: 20
    },
    goodsChat: {
        backgroundColor: '#fff', marginTop: 8
    },
    goodsBottom: {
        borderColor: '#ccc', borderBottomWidth: 0.3, backgroundColor: '#fff', marginTop: 8
    },
    goodsBottomTop: {
        flex: 1, borderColor: '#ccc', borderRightWidth: 1
    },
    goodsBottomText1: {
        fontSize: 18, color: '#000'
    },
    goodsBottomText2: {
        fontSize: 12
    }


})  