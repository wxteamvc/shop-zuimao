/**
 * 限时购列表页面
 */
"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput, ActivityIndicator, FlatList, StatusBar } from 'react-native';
import { goods } from '../actions/goodsAction';
import { connect } from 'react-redux';
import { ScreenWidth, ScreenHeight } from '../common/global';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
import IconTwo from 'react-native-vector-icons/dist/FontAwesome';
import IconThree from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FlatListJumoTop from '../component/flatListJumoTop';
import Loading from '../component/loading';

class IsTime extends Component {

    constructor(...props) {
        super(...props)
        this.state = {
            search: {                    //筛选条件
                keywords: "",
                isrecommand: "",
                ishot: "",
                isnew: "",
                isdiscount: "",
                issendfree: "",
                istime: "",
                cate: "",
                order: "timeend",
                by: "asc",
                merchid: "",
                page: 1,
                _: Math.round(new Date().getTime()),
            },
            timeDayA: 0,
            timeDayB: 0,
            timeHourA: 0,
            timeHourB: 0,
            timeMinA: 0,
            timeMinB: 0,
            timeSecA: 0,
            timeSecB: 0,
            // timeMsec:0,
        }
    }

    componentDidMount() {
        this.state.timer = setInterval(() => { this._timer() }, 1000);
        this.setState(Object.assign(
            this.state.search, this.props.navigation.state.params.search
        ))
        this.props.dispatch(goods(this.state.search));
    }
    componentWillUnmount() {
        this.state.timer && clearTimeout(this.state.timer);
    }

    _timer() {
        if (this.props.goodsData.status === 'success') {
            if (this.props.goodsData.list.length > 0) {
                let timeNow = Math.round(new Date().getTime() / 1000);
                let timeEnd = this.props.goodsData.list[0].timeend;
                let time = timeEnd - timeNow;
                if (time == 0) {
                    return this.props.dispatch(goods(this.state.search));
                }
                let d = Math.floor(time / 3600 / 24);
                let h = Math.floor((time - (d * 3600 * 24)) / 3600);
                let m = Math.floor((time - (d * 3600 * 24) - (h * 3600)) / 60);
                let s = time - d * 3600 * 24 - h * 3600 - m * 60;
                this.setState({
                    timeDayA: Math.floor(d / 10),
                    timeDayB: Math.floor(d % 10),
                    timeHourA: Math.floor(h / 10),
                    timeHourB: Math.floor(h % 10),
                    timeMinA: Math.floor(m / 10),
                    timeMinB: Math.floor(m % 10),
                    timeSecA: Math.floor(s / 10),
                    timeSecB: Math.floor(s % 10),
                });
            } else {
                this.state.timer && clearTimeout(this.state.timer);
            }
        }
    }

    render() {
        if (this.props.goodsData.status === 'success') {
            return (
                <View style={{ flex: 1, backgroundColor: '#C10001' }}>
                    {this.renderSearch()}
                    {this.renderGoodsList()}
                </View>
            );
        } else {
            return (<Loading />)
        }

    }

    renderSearch() {
        return (
            <View style={styles.container}>
                <StatusBar
                    translucent={true}
                    backgroundColor="transparent"
                />
                <View style={styles.search_body}>
                    <TouchableOpacity style={styles.serach_leftbtn} onPress={() => { this.props.navigation.goBack() }}>
                        <IconTwo name='angle-left' size={30} color={'white'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 0.7, height: 35, }}>
                        <View style={styles.search_mid}>
                        </View>
                        <View style={styles.seearch_mid_content}>
                            <IconTwo name={'search'}
                                size={18}
                                color={'#fff'}
                                style={{ marginLeft: 10, marginRight: 10 }}
                            />
                            <Text style={{ color: '#fff' }}>
                                输入您当前要搜索的商品
            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.serach_rightbtn}>
                        <Icon name={'bubble'} size={18} color={'#fff'} />
                        <Text style={styles.sreach_text}>消息</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    //商品列表
    renderGoodsList() {
        return this.renderListB()
    }

    renderTime() {
        return (
            <View style={styles.timeView}>
                <Text style={styles.timeText}>{this.state.timeDayA}</Text>
                <Text style={styles.timeText}>{this.state.timeDayB}</Text>
                <Text style={styles.timeTextA}>天</Text>
                <Text style={styles.timeText}>{this.state.timeHourA}</Text>
                <Text style={styles.timeText}>{this.state.timeHourB}</Text>
                <Text style={styles.timeTextA}>时</Text>
                <Text style={styles.timeText}>{this.state.timeMinA}</Text>
                <Text style={styles.timeText}>{this.state.timeMinB}</Text>
                <Text style={styles.timeTextA}>分</Text>
                <Text style={styles.timeText}>{this.state.timeSecA}</Text>
                <Text style={styles.timeText}>{this.state.timeSecB}</Text>
                <Text style={styles.timeTextA}>秒</Text>
                {/* <Text style={styles.timeTextB}>{this.state.timeMsec}</Text> */}
            </View>
        )
    }

    renderListA() {
        let listA = this.props.goodsData.list;
        let listArr = [];
        let count = listA.length > 4 ? 4 : listA.length;
        for (let i = 0; i < count; i++) {
            listArr.push(
                <View key={i} style={styles.ListA}>
                    <View style={styles.listABox}>
                        <TouchableOpacity style={{flex:1}} onPress={()=>this.props.navigation.navigate('GoodsInfo',{id:listA[i].id})}>
                            <Image source={{ uri: listA[i].thumb }}
                                style={styles.LAImg} />
                        </TouchableOpacity>    
                        <View style={styles.LATexTBox}>
                            <Text style={styles.LATitle} numberOfLines={2}>{listA[i].title}</Text>
                            <Text style={{ fontSize: 10 }}>{listA[i].sales}人购买</Text>
                            <Text style={styles.LAPrice}>&yen;{listA[i].marketprice}&nbsp;&nbsp;&nbsp;<Text style={styles.LAPriceA}>&yen;{listA[i].productprice}</Text></Text>
                        </View>
                        <TouchableOpacity style={{ flex: 1 }} onPress={()=>this.props.navigation.navigate('GoodsInfo',{id:listA[i].id})}>
                            <Text style={styles.btnMS}>立即秒杀</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        return listArr;
    }

    renderListB() {
        let listB = this.props.goodsData.list;
        if (listB.length > 4) {
            listB.splice(0,4);
            return (
                <FlatListJumoTop
                    horizontal={false}
                    numColumns={2}
                    keyExtractor={(item, index) => index}
                    data={listB}
                    renderItem={({ item }) => <MyListItem item={item} navigation={this.props.navigation} />}
                    columnWrapperStyle={{ flexWrap: 'wrap' }}
                    refreshing={true}
                    onEndReached={() => {
                        listB.length < this.props.goodsData.total ?
                            this.props.dispatch(goods(
                                Object.assign(
                                    this.state.search,
                                    { page: ++this.state.search.page }
                                )
                            )) : null;
                    }}
                    onEndReachedThreshold={0.2}
                    ListHeaderComponent={() => this._headView(listB.length)}
                    ListFooterComponent={() => listB.length < this.props.goodsData.total ? <ActivityIndicator size={40}></ActivityIndicator> : <Text style={{ textAlign: 'center' }}>DUANG~已经到底了哦</Text>
                    }
                    showsVerticalScrollIndicator={false}
                    style={styles.listB}
                />
            );
        } else {
            return this._headView(listB.length);
        }
    }
    _headView(length) {
        return (
            <View style={{ backgroundColor: '#C10001' }}>
                <Image source={require('../assets/images/is_time_top.jpg')} style={{ width: ScreenWidth, height: ScreenWidth * 0.5 }} />
                <Text style={{ textAlign: 'center', padding: 25, color: '#fff', fontWeight: 'bold', }}>——————距离限时抢购活动结束还剩——————</Text>
                {this.renderTime()}
                {this.renderListA()}
                {length>4?
                    <View style={styles.listBT}>
                    <Image source={require('../assets/images/ico_1.png')} style={styles.listBI} />
                    <Text style={styles.listBTitle}>第二件半价 省过瘾</Text>
                    <Image source={require('../assets/images/ico_2.png')} style={styles.listBI} />
                </View>:null}
                
            </View>
        )
    }
}

class MyListItem extends React.PureComponent {
    render() {
        let { item,navigation } = this.props;
        return (
            <View style={styles.LBBox}>
                <View style={styles.LBBoxView}>
                    <TouchableOpacity onPress={()=>navigation.navigate('GoodsInfo',{id:item.id})}>
                        <Image source={{ uri: item.thumb }} style={styles.LBImg} />
                    </TouchableOpacity>
                    <Text style={styles.LBGTitle} numberOfLines={1}>{item.title}</Text>
                    <View style={styles.LBGContent}>
                        <Text style={styles.LBGPTitle}>零售价：</Text>
                        <Text style={styles.LBGPriceA}>&yen;{item.marketprice}</Text>
                        <Text style={styles.LBGPriceB}>&yen;{item.productprice}</Text>
                        <TouchableOpacity style={styles.btnCart}>
                            <IconThree name={'cart-outline'} color={'red'} size={15} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EFEFEF',
    },
    search_body: {
        backgroundColor: '#C10001',
        height: 70,
        width: ScreenWidth,
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingBottom: 10
    },
    serach_leftbtn: {
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sreach_text: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold'
    },
    search_mid: {
        flex: 1,
        backgroundColor: '#000',
        opacity: 0.2,
        borderRadius: 5
    },
    seearch_mid_content: {
        flexDirection: "row",
        alignItems: 'center',
        position: 'absolute',
        left: 10,
        top: 8
    },
    serach_rightbtn: {
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    timeText: {
        backgroundColor: '#363636',
        borderRadius: 5,
        color: '#fff',
        padding: 5,
        marginLeft: 2
    },
    timeTextA: {
        padding: 5,
        color: '#fff'
    },
    timeTextB: {
        backgroundColor: '#FC9503',
        borderRadius: 5,
        color: '#fff',
        padding: 5,
        marginLeft: 2
    },
    ListA: {
        paddingLeft: 10,
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        marginTop: 20,
    },
    listABox: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 10
    },
    LAImg: {
        flex: 1,
        width: 100,
        height: 100
    },
    LATexTBox: {
        flex: 2.5,
        paddingLeft: 25
    },
    LATitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000'
    },
    LAPrice: {
        paddingTop: 10,
        fontSize: 18,
        color: '#ED6690'
    },
    LAPriceA: {
        textDecorationLine: 'line-through',
        fontSize: 12,
        color: '#ccc'
    },
    btnMS: {
        textAlign: 'center',
        backgroundColor: '#C10001',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 15,
        color: '#fff'
    },
    listB: {
        backgroundColor: '#EFEFEF',
        width: ScreenWidth
    },
    listBT: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EFEFEF'
    },
    listBI: {
        width: 50,
        height: 50
    },
    listBTitle: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold'
    },
    LBBox: {
        width: ScreenWidth * 0.5,
        padding: 5
    },
    LBBoxView: {
        backgroundColor: '#fff',
        padding: 10
    },
    LBImg: {
        width: ScreenWidth * 0.5 - 30,
        height: ScreenWidth * 0.5 - 30
    },
    LBGTitle: {
        fontSize: 14,
        color: '#000'
    },
    LBGContent: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    LBGPTitle: {
        fontSize: 11,
        color: '#000'
    },
    LBGPriceA: {
        fontSize: 13,
        color: '#FB3630'
    },
    LBGPriceB: {
        textDecorationLine: 'line-through',
        fontSize: 10,
        color: '#ccc'
    },
    btnCart: {
        borderWidth: 1,
        borderRadius: 18,
        borderColor: '#ddd',
        padding: 3
    },
});

function mapStateToProps(state) {
    return {
        goodsData: state.goodsReducer,
    }
}

export default connect(mapStateToProps)(IsTime);