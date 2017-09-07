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

class IsDiscount extends Component {

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
                order: "isdiscount_time",
                by: "asc",
                merchid: "",
                page: 1,
                _: Math.round(new Date().getTime()),
            },
        }
    }

    componentDidMount() {
        this.setState(Object.assign(
            this.state.search, this.props.navigation.state.params.search
        ))
        this.props.dispatch(goods(this.state.search));
    }



    render() {
        if (this.props.goodsData.status === 'success') {
            return (
                <View style={{ flex: 1 }}>
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
                    <TouchableOpacity style={styles.serach_leftbtn}>
                        <Icon name={'frame'} size={18} color={'#fff'} />
                        <Text style={styles.sreach_text}>扫一扫</Text>
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

    renderListA() {
        let listA = this.props.goodsData.list;
        let listArr = [];
        let count = listA.length > 4 ? 4 : listA.length;
        for (let i = 0; i < count; i++) {
            let bgColor = {};
            if (i == 0) { bgColor = { backgroundColor: '#FFF3DD' } }
            if (i == 1) { bgColor = { backgroundColor: '#E6F9FD' } }
            if (i == 2) { bgColor = { backgroundColor: '#FEE6DC' } }
            if (i == 3) { bgColor = { backgroundColor: '#F8F2FF' } }
            if (i <= 2) {
                listArr.push(
                    <View key={i} style={[{ padding: 15, width: ScreenWidth / 3 - 10, margin: 5 }, bgColor]}>
                        <Text style={{ color: '#000', fontSize: 17, fontWeight: 'bold' }} numberOfLines={1}>{listA[i].title}</Text>
                        <TouchableOpacity>
                            <Text style={{ color: '#D4363B', fontSize: 10, fontWeight: 'bold', padding: 5, borderWidth: 1, borderColor: '#D4363B', textAlign: 'center', borderRadius: 10, marginTop: 15, marginBottom: 15 }}>立即进入</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={{ uri: listA[i].thumb }} style={{ width: ScreenWidth / 3 - 40, height: ScreenWidth / 3 - 40 }} />
                        </TouchableOpacity>
                    </View>
                )
            } else {
                listArr.push(
                    <View key={i} style={[{ padding: 15, width: ScreenWidth - 10, margin: 5, flexDirection: 'row' }, bgColor]}>
                        <TouchableOpacity>
                            <Image source={{ uri: listA[i].thumb }} style={{ width: (ScreenWidth - 40) / 2, height: (ScreenWidth - 40) / 4 }} />
                        </TouchableOpacity>
                        <View style={{ width: (ScreenWidth - 40) / 2, padding: 15, alignItems: 'center' }}>
                            <Text style={{ color: '#000', fontSize: 17, fontWeight: 'bold' }} numberOfLines={1}>{listA[i].title}</Text>
                            <TouchableOpacity>
                                <Text style={{ color: '#D4363B', fontSize: 10, fontWeight: 'bold', padding: 5, borderWidth: 1, borderColor: '#D4363B', textAlign: 'center', borderRadius: 10, marginTop: 15, marginBottom: 15, width: (ScreenWidth - 40) / 4 }}>立即进入</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }

        }
        return (
            <View>
                <Image source={require('../assets/images/is_discount_bg.jpg')} style={{ width: ScreenWidth, height: ScreenWidth + 10 }} />
                <View style={{ position: 'absolute', top: 0, alignItems: 'center' }}>
                    <Text style={{ color: '#F64348', fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>买满就减</Text>
                    <Text style={{ fontSize: 10 }}>你身边的好购物指南</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: ScreenWidth, marginTop: 10 }}>
                        {listArr}
                    </View>
                </View>
            </View>
        );
    }

    renderListB() {
        let listB = this.props.goodsData.list;
        if (listB.length > 4) {
            return (
                <FlatListJumoTop
                    horizontal={false}
                    numColumns={2}
                    keyExtractor={(item, index) => index}
                    data={listB}
                    renderItem={({ item }) => <MyListItem item={item} navigate={this.props.navigation} />}
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
                    ListHeaderComponent={() => this._headView()}
                    ListFooterComponent={() => listB.length < this.props.goodsData.total ? <ActivityIndicator size={40}></ActivityIndicator> : <Text style={{ textAlign: 'center' }}>DUANG~已经到底了哦</Text>
                    }
                    showsVerticalScrollIndicator={false}
                />
            );
        } else {
            return false;
        }
    }

    _headView() {
        return (
            <View style={styles.listB}>
                <Image source={require('../assets/images/is_discount_top.jpg')} style={{ width: ScreenWidth, height: ScreenWidth * 0.5 }} />
                {this.renderListA()}
                <View style={styles.listBT}>
                    <Image source={require('../assets/images/ico_1.png')} style={styles.listBI} />
                    <Text style={styles.listBTitle}>限时半价</Text>
                    <Image source={require('../assets/images/ico_2.png')} style={styles.listBI} />
                </View>
            </View>

        )
    }
}

class MyListItem extends React.PureComponent {
    render() {
        let { item } = this.props;
        return (
            <View style={styles.LBBox}>
                <View style={styles.LBBoxView}>
                    <Image source={{ uri: item.thumb }} style={styles.LBImg} />
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
    listB: {
        backgroundColor: '#EFEFEF',
        width: ScreenWidth
    },
    listBT: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
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

export default connect(mapStateToProps)(IsDiscount);