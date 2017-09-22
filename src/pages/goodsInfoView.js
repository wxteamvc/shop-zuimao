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
    Modal,
    Easing,
} from 'react-native';
import ScrollViewJumpTop from '../component/scrollViewJumpTop';
import { cart } from '../actions/cartAction';
import Toast from 'react-native-root-toast';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IconEvil from 'react-native-vector-icons/dist/EvilIcons';
import Swiper from 'react-native-swiper';
import { DOMAIN, ScreenWidth, ScreenHeight, StatusBarHeight, GOODINFO_URL, GOODCHATCOUNT_URL, GOODCHATLIST_URL, FOUCS_URL, ADD_CART_URL, BEFOREBUY } from '../common/global';
import Util from '../common/util';
import Loading from '../component/loading';
import co from 'co';
import FlatListJumpTop from '../component/flatListJumoTop';
import ImageViewer from 'react-native-image-zoom-viewer';

class GoodsInfo extends Component {
    constructor(...props) {
        super(...props);
        this.state = {
            status: false,
            chatCountStatus: false,
            chatListStatus: false,
            errmsg: null,
            page: 1,
            chatPage: 1,
            level: '',
            goodsNum: 1,
            data: {
                citys: [],
                godds: {},
                params: [],
                statics: {},
                thumbs: {},
            },
            chatCount: {},
            chat: [],
            modalVisible: false,
            modalUnsend: false,
            modalNum: false,
            modalValue: [],
            modalText: '',
            d: '00',
            h: '00',
            m: '00',
            s: '00',
            isFavorite: false,
            cartCount: 0,
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    gen = function* () {
        let { id } = this.props.navigation.state.params;
        let url = GOODINFO_URL + '&id=' + id;
        let f1 = yield fetch(url)
            .then((resq) => resq.json())
            .then((responseJson) => {
                if (responseJson.status == 1) {
                    console.log(responseJson)
                    this.setState({
                        status: 'success',
                        data: responseJson.result.goods_detail,
                        isFavorite: responseJson.result.goods_detail.isFavorite,
                        cartCount: responseJson.result.goods_detail.cartCount,
                    })
                    this.unSendText = '';
                    for (let i = 0; i < this.state.data.citys.length; i++) {
                        this.unSendText += this.state.data.citys[i] + " " + " "
                    }
                    if (this.state.data.goods.istime == 1) {
                        let date = Math.round(new Date().getTime() / 1000);
                        if (date < this.state.data.goods.timestart) {
                            this.text = '距离限时购开始'
                            this.isrush = true;
                            this.timer = setInterval(
                                () => {
                                    this.rushtime(this.state.data.goods.timestart)
                                }
                                , 1000)
                        } else if (date >= this.state.data.goods.timestart && date < this.state.data.goods.timeend) {
                            this.text = '距离限时购结束'
                            this.isrush = true;
                            this.timer = setInterval(
                                () => {
                                    this.rushtime(this.state.data.goods.timeend)
                                }
                                , 1000)
                        } else {
                            this.text = '限时购已经结束'
                            this.isrush = false;
                        }
                    } else if (this.state.data.goods.isdiscount == 1) {
                        let date = Math.round(new Date().getTime() / 1000);
                        if (date < this.state.data.goods.isdiscount_time) {
                            this.text = this.state.data.goods.isdiscount_title
                            this.isrush = true;
                            this.timer = setInterval(
                                () => {
                                    this.rushtime(this.state.data.goods.isdiscount_time)
                                }
                                , 1000)
                        } else {
                            this.text = '';
                            this.isrush = false;
                        }

                    }

                } else {

                    this.setState({
                        status: 'faild',
                        errmsg: responseJson.message
                    })
                }
            })


        let chatCountUrl = GOODCHATCOUNT_URL + '&id=' + id + '&_=' + Math.round(new Date().getTime() / 1000)
        let f2 = yield fetch(chatCountUrl)
            .then((resq) => resq.json())
            .then((responseJson) => {
                if (responseJson.status == 1) {
                    console.log(responseJson)
                    this.setState({
                        chatCountStatus: 'success',
                        chatCount: responseJson.result
                    })
                } else {
                    this.setState({
                        chatCountStatus: 'faild',
                        errmsg: responseJson.message
                    })
                }
            })
    }



    componentDidMount() {
        co(this.gen.bind(this)).then(function () {
            console.log('加载完成')
        })


    }

    focus() {
        let { loginData } = this.props;
        if (loginData.status == 'success') {
            let data = { id: this.props.navigation.state.params.id, isfavorite: this.state.isFavorite ? 0 : 1 }
            let token = '';
            for (let key in loginData.data.result.token) {
                token = '&' + key + '=' + loginData.data.result.token[key]
            }
            let url = FOUCS_URL + token
            Util.post(url, data,
                (resq) => {
                    if (resq.status == 1) {
                        this.setState({
                            isFavorite: resq.result.isfavorite
                        })
                    } else {
                        Toast.show(resq.message, { duration: Toast.durations.LONG, });
                    }
                },
                (error) => {
                    this.setState({
                        errmessage: error.message,
                    })
                })
        } else {
            Toast.show('亲 请先登录哦！', { duration: Toast.durations.SHORT, });
        }
    }



    addCart() {
        let { loginData } = this.props;
        if (loginData.status == 'success') {
            let data = { id: this.props.navigation.state.params.id, optionid: 0, total: this.state.goodsNum, diyformdata: false }
            let token = '';
            for (let key in loginData.data.result.token) {
                token = '&' + key + '=' + loginData.data.result.token[key]
            }
            let url = ADD_CART_URL + token
            Util.post(url, data,
                (resq) => {
                    if (resq.status == 1) {
                        this.setState({
                            cartCount: resq.result.cartcount
                        })
                        this.props.dispatch(cart(this.props.loginData.data.result.token));
                        Toast.show('添加购物车成功', { duration: Toast.durations.SHORT, });
                    } else {
                        Toast.show(resq.message, { duration: Toast.durations.SHORT, });
                        this.props.dispatch(cart(this.props.loginData.data.result.token));
                    }
                },
                (error) => {
                    this.setState({
                        errmessage: error.message,
                    })
                })
        } else {
            Toast.show('亲 请先登录哦！', { duration: Toast.durations.SHORT, });
        }
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
                            <TouchableOpacity style={[{ flex: 0.1, },]} onPress={() => {
                                this.props.navigation.goBack(null)
                            }}>
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
                                {this.state.data.params.length != 0 ?
                                    <View style={[{ borderColor: this.state.page == 3 ? 'red' : '#ccc', }, styles.top]}>
                                        <TouchableOpacity onPress={() => { this.setState({ page: 3 }) }}>
                                            <Text style={{ fontSize: 16, color: this.state.page == 3 ? 'red' : '#000', }}>参数</Text>
                                        </TouchableOpacity>
                                    </View> : null}
                                {this.state.chatCountStatus == 'success' && this.state.chatCount.count.all > 0 ?
                                    <View style={[{ borderColor: this.state.page == 4 ? 'red' : '#ccc', }, styles.top]}>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({ page: 4 })
                                            this.getChatList()
                                        }}>
                                            <Text style={{ fontSize: 16, color: this.state.page == 4 ? 'red' : '#000', }}>评价</Text>
                                        </TouchableOpacity>
                                    </View> : false
                                }
                            </View>
                        </View>
                        {this.show()}
                        <View style={[styles.bottombox, styles.rowCenter]}>
                            <View style={[{ flex: 0.4, height: 50 }, styles.rowCenter]}>
                                <TouchableOpacity
                                    onPress={() => { this.focus() }}
                                    style={[{ flex: 1 }, styles.center]}>
                                    <Icon name={this.state.isFavorite ? 'heart' : 'heart-o'} size={20} color={this.state.isFavorite ? 'red' : '#767676'} />
                                    <Text style={{ fontSize: 10 }}>{this.state.isFavorite ? '已关注' : '关注'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[{ flex: 1 }, styles.center]}>
                                    <Text style={{ fontFamily: 'iconfont', fontSize: 20 }}>&#xe60c;</Text>
                                    <Text style={{ fontSize: 10 }}>店铺</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => { this.props.navigation.navigate('Cart') }}
                                    style={[{ flex: 1 }, styles.center]}>
                                    <Icon name={'shopping-cart'} size={20} color={'#767676'} />
                                    <Text style={{ fontSize: 10 }}>购物车</Text>
                                    {/* {this.state.cartCount > 0 ? <View
                                        style={[styles.center, styles.bottomCarIcon]}
                                    ><Text style={styles.bottomCarIconText}>{this.state.cartCount}</Text>
                                    </View> : false} */}
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                onPress={() => { this.addCart() }}
                                style={[styles.bottomCar, styles.center]}>
                                <Text style={styles.bottomText}>加入购物车</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={
                                    () => {
                                        this.props.loginData.status == 'success' ?
                                            this.props.navigation.navigate('OrderCreateView', { data: this.state.data.goods, goodsNum: this.state.goodsNum }) :
                                            Toast.show('亲 请先登录哦！', { duration: Toast.durations.SHORT, })
                                    }
                                }
                                style={[styles.bottomBuy, styles.center]}>
                                <Text style={styles.bottomText}>立即购买</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {this.renderUnSend()}
                    {this.renderNum()}
                    <Modal
                        visible={this.state.modalVisible}
                        transparent={true}
                        onRequestClose={() => {
                            this.setModalVisible(false)
                        }}
                    >
                        <ImageViewer
                            style={{ backgroundColor: '#fff' }}
                            imageUrls={this.state.modalValue}
                            renderHeader={() => this.renderImageViwerHerder()}
                            renderFooter={() => this.renderImageViwerHerder()}
                        />
                    </Modal>
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

    renderImageViwerHerder() {
        return (
            <View style={styles.ImageViewerHead}>
                <TouchableOpacity
                    onPress={() => { this.setModalVisible(false) }}
                    style={[{ flex: 0.1 }, styles.center]}>
                    <Icon name={'angle-left'} color={'#000'} size={30} />
                </TouchableOpacity>
            </View>
        )
    }


    renderImageViwerFooter() {
        return (
            <View style={{ backgroundColor: '#fff', opacity: 0.7, width: ScreenWidth, height: 500 }}>
                <Text style={{ color: '#000' }}>{this.state.modalText}</Text>
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
    //渲染选择数量面板
    renderNum() {
        return (
            <Modal
                visible={this.state.modalNum}
                animationType={'slide'}
                transparent={true}
                onRequestClose={() => {
                    this.setstate({ modalNum: false })
                }}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => { this.setState({ modalNum: false }) }}
                    style={[styles.motaiTop, { flex: 0.7 }]}>
                </TouchableOpacity>
                <View style={[styles.motaiBottom, { flex: 0.3 }]}>
                    <View style={[styles.rowCenter, styles.usbTop, { height: 60 }]}>
                        <View style={[{ flex: 0.9 }]}>
                            <Text style={styles.showNumTopText}>&yen;{this.state.data.goods.marketprice}</Text>
                        </View>
                        <View style={[{ flex: 0.1, }, styles.center]}>
                            <TouchableOpacity
                                style={[styles.center, { padding: 10 }]}
                                onPress={() => {
                                    this.setState({ goodsNum: 1, modalNum: false })
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
                    <TouchableOpacity onPress={() => { this.setState({ modalNum: false }) }}>
                        <View style={[styles.showNumBottom, styles.center]}>
                            <Text style={{ color: '#fff' }}>确定</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Image
                    style={styles.showNumImg}
                    source={{ uri: this.state.data.goods.thumb }} />
            </Modal>
        )
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
        return (
            <Modal
                visible={this.state.modalUnsend}
                animationType={'slide'}
                transparent={true}
                onRequestClose={() => {
                    this.setstate({ modalUnsend: false })
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => { this.setState({ modalUnsend: false }) }}
                    style={[styles.motaiTop]}>
                </TouchableOpacity>
                <View style={styles.motaiBottom}>
                    <View style={[styles.rowCenter, styles.usbTop]}>
                        <View style={styles.unSendTopLeft}>
                            <Text>不配送区域</Text>
                        </View>
                        <View style={styles.unSendTopRight} >
                            <TouchableOpacity
                                style={[styles.center, { padding: 10 }]}
                                onPress={() => {
                                    this.setState({
                                        modalUnsend: false,
                                    })
                                }}>
                                <Icon name={'close'} size={16} color={'#ccc'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <FlatList
                        data={this.state.data.citys}
                        keyExtractor={(item, index) => index}
                        renderItem={this.renderUnSendArea.bind(this)}
                        numColumns={3}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </Modal>
        )
    }

    getChatList(condition = {}, isAdd = 0) {
        let data = {
            id: this.props.navigation.state.params.id,
            date: Math.round(new Date().getTime() / 1000)
        }
        Object.assign(data, condition);
        fetch(GOODCHATLIST_URL(data))
            .then((resq) => resq.json())
            .then((responseJson) => {
                if (responseJson.status == 1) {
                    if (isAdd) {
                        this.setState({
                            chatListStatus: 'success',
                            chat: this.state.chat.concat(responseJson.result.list)
                        })
                    } else {
                        this.setState({
                            chatListStatus: 'success',
                            chat: responseJson.result.list
                        })
                    }

                } else {
                    this.setState({
                        chatListStatus: 'faild',
                        errmsg: responseJson.message
                    })
                }
            })
    }

    //评论
    renderChat() {
        if (this.state.chatListStatus == 'success') {
            return (
                <View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
                    <View style={styles.chatTop}>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    chatPage: 1,
                                    level: '',
                                })
                                let data = {
                                    page: 1,
                                    level: ''
                                }
                                this.getChatList(data)
                            }}
                            style={[styles.chatBtn, { backgroundColor: this.state.level == '' ? 'orange' : '#FFEEEE' }]}
                        >
                            <Text style={{ color: this.state.level == '' ? '#fff' : '#000' }}>全部({this.state.chatCount.count.all})</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    chatPage: 1,
                                    level: 'good',
                                })
                                let data = {
                                    page: 1,
                                    level: 'good'
                                }
                                this.getChatList(data)
                            }}
                            style={[styles.chatBtn, { backgroundColor: this.state.level == 'good' ? 'orange' : '#FFEEEE' }]}>
                            <Text style={{ color: this.state.level == 'good' ? '#fff' : '#ccc' }}>好评({this.state.chatCount.count.good})</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    chatPage: 1,
                                    level: 'normal',
                                })
                                let data = {
                                    page: 1,
                                    level: 'normal'
                                }
                                this.getChatList(data)
                            }}
                            style={[styles.chatBtn, { backgroundColor: this.state.level == 'normal' ? 'orange' : '#FFEEEE' }]}>
                            <Text style={{ color: this.state.level == 'normal' ? '#fff' : '#ccc' }}>中评({this.state.chatCount.count.normal})</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    chatPage: 1,
                                    level: 'bad',
                                })
                                let data = {
                                    page: 1,
                                    level: 'bad'
                                }
                                this.getChatList(data)
                            }}
                            style={[styles.chatBtn, { backgroundColor: this.state.level == 'bad' ? 'orange' : '#ccc' }]}>
                            <Text style={{ color: this.state.level == 'bad' ? '#fff' : '#000' }}>差评({this.state.chatCount.count.bad})</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    chatPage: 1,
                                    level: 'pic',
                                })
                                let data = {
                                    page: 1,
                                    level: 'pic'
                                }
                                this.getChatList(data)
                            }}
                            style={[styles.chatBtn, { backgroundColor: this.state.level == 'pic' ? 'orange' : '#FFEEEE' }]}>
                            <Text style={{ color: this.state.level == 'pic' ? '#fff' : '#ccc' }}>晒图({this.state.chatCount.count.pic})</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatListJumpTop
                        style={{ flex: 1 }}
                        data={this.state.chat}
                        keyExtractor={(item, index) => index}
                        renderItem={this.renderChatList.bind(this)}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        onEndReached={
                            () => {
                                this.setState({
                                    chatPage: ++this.state.chatPage
                                })
                                let data = {
                                    page: this.state.chatPage,
                                    level: this.state.level
                                }
                                this.getChatList(data, 1)
                            }}
                        ListFooterComponent={
                            <View style={[{ flex: 1, paddingBottom: 15, paddingTop: 15 }, styles.center]}>
                                <Text>亲~没有更多评论了哦</Text>
                            </View>
                        }
                    />
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Loading status={this.state.chatListStatus} errmessage={this.state.errmsg} />
                </View>
            )
        }
    }

    setModalVisible(visible, value = [], text = '') {
        this.setState({
            modalVisible: visible,
            modalValue: value,
            modalText: text,
        });
    }

    renderChatList({ item }) {
        let star = []
        for (let i = 0; i < item.level; i++) {
            star.push(
                <Icon key={i} name={'star'} color={'orange'} />
            )
        }
        let url = null;
        if (item.headimgurl) {
            url = { uri: item.headimgurl }
        } else {
            url = require('../assets/images/header.jpg')
        }
        let img = [];
        let modalImages = [];

        for (let i = 0; i < item.images.length; i++) {
            modalImages.push({ url: item.images[i] })
            img.push(
                <TouchableOpacity
                    key={i}
                    onPress={() => { this.setModalVisible(true, modalImages, item.content) }}
                >
                    <Image
                        resizeMode={'cover'}
                        source={{ uri: item.images[i] }}
                        style={{ width: (ScreenWidth - 20) / 3, height: (ScreenWidth - 20) / 3 }}
                    />
                </TouchableOpacity>
            )
        }
        return (
            <View style={[styles.chatList, { marginTop: 10 }]}>
                <View style={styles.chatListTop}>
                    <View style={styles.rowCenter}>
                        <Image
                            source={url} style={styles.chatListUserPhoto} />
                        <Text style={{ color: '#000' }}>{item.nickname}</Text>
                    </View>
                    <Text style={{ color: '#ccc' }}>{item.createtime}</Text>
                </View>
                <View style={styles.chatListStar}>{star}</View>
                <View style={{ paddingTop: 10, paddingBottom: 10 }}><Text style={{ color: '#000' }}>{item.content}</Text>
                </View>
                {item.images.length > 0 ?
                    <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginTop: 10, marginBottom: 10 }}>
                        {img}
                    </View> : false}
                {item.reply_content ?
                    <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                        <View style={{ backgroundColor: '#EFEFEF', padding: 10, }}>
                            <Text>[ 醉猫回复 ]：{item.reply_content}</Text>
                        </View>
                        <View style={{ width: 0, height: 0, borderWidth: 8, borderColor: 'transparent', borderBottomColor: '#EFEFEF', position: 'absolute', top: -5, left: 18 }}></View>
                    </View>
                    : false}
                {item.append_content ?
                    <View style={{ padding: 10 }}>
                        <Text style={{ color: 'red', marginBottom: 5 }}>[ 用户追加评论 ]：</Text>
                        <Text>{item.append_content}</Text>
                    </View>
                    : false}
                {item.append_reply_content ?
                    <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                        <View style={{ backgroundColor: '#EFEFEF', padding: 10, }}>
                            <Text>[ 醉猫回复 ]：{item.append_reply_content}</Text>
                        </View>
                        <View style={{ width: 0, height: 0, borderWidth: 8, borderColor: 'transparent', borderBottomColor: '#EFEFEF', position: 'absolute', top: -5, left: 18 }}></View>
                    </View>
                    : false}
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




    renderInfo() {
        let img = [];
        for (let i = 0; i < this.state.data.goods.content.length; i++) {
            img.push(
                <Image
                    key={i}
                    resizeMode={'center'}
                    style={{ flex: 1 }}
                    source={{ uri: this.state.data.goods.content[i] }}
                />
            )

        }
        return (
            <ScrollViewJumpTop style={{ flex: 1 }}>
                {img}
            </ScrollViewJumpTop>
        )
    }

    renderGoodsChatList({ item }) {
        let star = []
        for (let i = 0; i < item.level; i++) {
            star.push(
                <Icon key={i} name={'star'} color={'orange'} />
            )
        }
        return (
            <View style={[styles.chatList, { marginTop: 10 }]}>
                <View style={styles.chatListTop}>
                    <Text style={{ color: '#000' }}>{item.nickname}</Text>
                    <Text style={{ color: '#ccc' }}>{item.createtime}</Text>
                </View>
                <View style={styles.chatListStar}>{star}</View>
                <View><Text style={{ color: '#000' }}>{item.content}</Text></View>
            </View>
        )
    }
    renderGoodsChat() {
        if (this.state.chatCountStatus == 'success' && this.state.chatCount.list.length > 0) {
            return (
                <View style={styles.goodsChat}>
                    <View style={styles.rowBetween}>
                        <Text>商品评价( {this.state.chatCount.count.all}人评论 )</Text>
                        {this.state.chatCount.count.all != 0 ? <Text>好评度<Text style={{ color: 'red' }}>{this.state.chatCount.percent}%</Text></Text> : null}
                    </View>
                    <FlatList
                        data={this.state.chatCount.list}
                        keyExtractor={(item, index) => index}
                        renderItem={this.renderGoodsChatList.bind(this)}
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={
                            <View style={[{ flex: 1, paddingBottom: 15, paddingTop: 15 }, styles.center]}>
                                <TouchableOpacity
                                    style={{ flex: 0.4 }}
                                    onPress={() => {
                                        this.setState({ page: 4 })
                                        this.getChatList()
                                    }}>
                                    <Text style={[styles.btn, { color: 'red' }]}>点击查看所有评论</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    />
                </View>
            )

        } else {
            return (false)
        }

    }
    rushtime(date) {
        let [d, h, m, s] = [null, null, null, null];
        let time = date - Math.round(new Date().getTime() / 1000);
        if (time == 0) {
            co(this.gen.bind(this)).then(function () {
                console.log('加载完成')
            })
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
                istimer: false,
                d: d,
                h: h,
                m: m,
                s: s,
            })
        }

    }

    rush = () => {
        return (
            <View style={styles.rush_head}>
                {this.text ? <View style={styles.rush_head_left}><Text style={[{ color: '#fff' }, styles.rushText]}>{this.text}</Text></View> : false}
                {this.isrush ?
                    <View style={styles.rush_head_right}>
                        <Text style={[styles.rushText]}>{this.state.d}</Text>
                        <Text style={styles.rushText}>天</Text>
                        <Text style={[styles.rushText]}>{this.state.h}</Text>
                        <Text style={styles.rushText}>时</Text>
                        <Text style={[styles.rushText]}>{this.state.m}</Text>
                        <Text style={styles.rushText}>分</Text>
                        <Text style={[styles.rushText]}>{this.state.s}</Text>
                    </View> : false
                }
            </View>
        )
    }

    renderGoods() {
        var val = [];
        for (let index in this.state.data.thumbs) {
            val.push(
                <Image key={index} source={{ uri: DOMAIN + this.state.data.thumbs[index] }} style={{ height: 400 }} resizeMode={'stretch'}></Image>
            )
        }

        return (
            <View style={{ flex: 1, backgroundColor: '#EFEFEF' }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <Swiper
                        height={400}
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
                        {this.state.data.goods.istime == 1 || this.state.data.goods.isdiscount == 1 ? this.rush() : false}
                        <View style={[styles.rowYCenter, { paddingTop: 5, paddingLeft: 5 }]}>
                            <Text numberOfLines={1} style={{ flex: 1 }}>快递：{this.state.data.goods.issendfree ? '包邮' : this.state.data.goods.dispatchprice + '元'}</Text>
                            <Text numberOfLines={1} style={{ flex: 1 }}>库存：{this.state.data.goods.total}</Text>
                            <Text numberOfLines={1} style={{ flex: 1 }}>销量：{this.state.data.goods.sales}</Text>
                            <Text numberOfLines={1} style={{ flex: 1 }}>
                                {this.state.data.goods.province == '请选择省份' ? null : this.state.data.goods.province}
                                {this.state.data.goods.city == '请选择城市' ? null : this.state.data.goods.city}
                            </Text>
                        </View>
                    </View>
                    {this.state.data.citys.length > 0 ?
                        <View style={styles.goodsUnSend}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ modalUnsend: true })
                                }}
                                style={[styles.rowCenter, { padding: 10, paddingTop: 15, paddingBottom: 15 }]}>
                                <View style={{ flex: 0.95 }}>
                                    <Text numberOfLines={1} style={{ fontSize: 12 }}>
                                        不配送区域：
                                    <Text style={{ fontSize: 14 }} numberOfLines={1}>
                                            {this.unSendText}
                                        </Text>
                                    </Text>
                                </View>
                                <View style={[{ flex: 0.05 }, styles.center]}>
                                    <Icon name={'angle-right'} size={25} />
                                </View>
                            </TouchableOpacity>
                        </View> : false
                    }
                    <View style={styles.goodsRights}>
                        {this.state.data.goods.cash == 2 ?
                            <View style={styles.rightsList}>
                                <Icon name={'check-circle-o'} color={'orange'} size={20} />
                                <Text style={styles.rightsText}>货到付款</Text>
                            </View>
                            : false}
                        {this.state.data.goods.quality == 1 ?
                            <View style={styles.rightsList}>
                                <Icon name={'check-circle-o'} color={'orange'} size={20} />
                                <Text style={styles.rightsText}>正品保障</Text>
                            </View>
                            : false}
                        {this.state.data.goods.repair == 1 ?
                            <View style={styles.rightsList}>
                                <Icon name={'check-circle-o'} color={'orange'} size={20} />
                                <Text style={styles.rightsText}>保修</Text>
                            </View>
                            : false}
                        {this.state.data.goods.invoice == 1 ?
                            <View style={styles.rightsList}>
                                <Icon name={'check-circle-o'} color={'orange'} size={20} />
                                <Text style={styles.rightsText}>发票</Text>
                            </View>
                            : false}
                        {this.state.data.goods.seven == 1 ?
                            <View style={styles.rightsList}>
                                <Icon name={'check-circle-o'} color={'orange'} size={20} />
                                <Text style={styles.rightsText}>7天退换</Text>
                            </View>
                            : false}
                    </View>
                    <TouchableOpacity
                        style={styles.goodsNum}
                        activeOpacity={1}
                        onPress={() => {
                            this.setState({ modalNum: true })
                        }}>
                        <Text style={{ fontSize: 16 }}>数量<Text>{this.state.goodsNum != 1 ? ':已选择' + this.state.goodsNum + '件' : null}</Text></Text>
                        <Icon name={'angle-right'} size={25} />
                    </TouchableOpacity>
                    {this.renderGoodsChat()}
                    <View style={styles.goodsBottom}>
                        <View style={[{ marginTop: 50 }, styles.rowCenter]}>
                            <View style={[styles.goodsBottomTop, styles.center]}>
                                <Text style={styles.goodsBottomText1}>{this.state.data.statics.all}</Text><Text style={styles.goodsBottomText2}>全部</Text>
                            </View>
                            <View style={[styles.goodsBottomTop, styles.center]}>
                                <Text style={styles.goodsBottomText1}>{this.state.data.statics.new}</Text><Text style={styles.goodsBottomText2}>新品</Text>
                            </View>
                            <View style={[{ flex: 1, }, styles.center]}>
                                <Text style={styles.goodsBottomText1}>{this.state.data.statics.discount}</Text><Text style={styles.goodsBottomText2}>促销</Text>
                            </View>
                        </View>
                        <View style={[{ marginTop: 30, marginBottom: 15 }, styles.rowCenter]}>
                            <TouchableOpacity
                                onPress={() => { this.props.navigation.navigate('Goods', { search: {} }) }}
                                style={[styles.btn, { marginRight: 40, }]}>
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
    bottombox: {
        height: 50, borderColor: '#fff', borderTopWidth: 0.7
    },
    bottomCar: {
        flex: 0.3, backgroundColor: '#FE9402', height: 50
    },
    bottomCarIcon: {
        paddingLeft: 4, paddingRight: 4, borderRadius: 10, position: 'absolute', top: 0, left: 30, borderColor: 'red', borderWidth: 0.7, backgroundColor: '#fff'
    },
    bottomCarIconText: {
        color: 'red', fontSize: 10
    },
    bottomText: {
        fontSize: 14, color: '#fff'
    },
    bottomBuy: {
        flex: 0.3, backgroundColor: '#FD5555', height: 50
    },
    motaiContainer: {
        width: ScreenWidth, height: ScreenHeight - StatusBarHeight, position: 'absolute', bottom: 0
    },
    motaiTop: {
        flex: 0.6, backgroundColor: '#000', opacity: 0.7,
    },
    motaiBottom: {
        flex: 0.4, backgroundColor: '#fff'
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
        flex: 1, padding: 5, paddingLeft: 10, paddingRight: 10, borderBottomWidth: 0.7, borderColor: '#ccc', backgroundColor: '#fff'
    },
    chatListUserPhoto: {
        height: 30, width: 30, borderRadius: 15, marginRight: 10
    },
    chatListTop: {
        flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10
    },
    chatListStar: {
        flexDirection: 'row', paddingTop: 10,
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
        borderColor: '#ccc', borderBottomWidth: 0.7, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', backgroundColor: '#fff', marginTop: 8
    },
    goodsNum: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', padding: 15
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
    },
    chatTop: {
        flexDirection: 'row', flexWrap: 'wrap', borderColor: '#ccc', borderBottomWidth: 0.5, padding: 15, paddingTop: 0, backgroundColor: '#fff'
    },
    chatBtn: {
        padding: 5, borderRadius: 15, marginRight: 10, marginTop: 10, paddingLeft: 15, paddingRight: 15
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
    rush_head: {
        flexDirection: 'row', paddingTop: 5, paddingBottom: 5
    },
    rush_head_left: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EF4F4F',
        padding: 3,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5
    },
    rush_head_right: {
        marginLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',

    },
    rushText: {
        fontSize: 12,
        paddingLeft: 2
    },
    ImageViewerHead: {
        backgroundColor: '#fff', opacity: 0.7, height: 30, flexDirection: 'row',
    },
    rightsText: {
        marginLeft: 5, fontSize: 12
    }


})


function mapStateToProps(state) {
    return {
        loginData: state.loginReducer,
    }
}

export default connect(mapStateToProps)(GoodsInfo);