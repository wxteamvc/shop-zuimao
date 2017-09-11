/**
 * 商品列表页面
 */
"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput, ActivityIndicator, FlatList, StatusBar } from 'react-native';
import { goods } from '../actions/goodsAction';
import { category } from '../actions/categoryAction';
import { connect } from 'react-redux';
import { ScreenWidth, ScreenHeight } from '../common/global';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconTwo from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FlatListJumoTop from '../component/flatListJumoTop';
import Loading from '../component/loading';
import AddToCart from '../component/addToCart';

class Goods extends Component {

    constructor(...props) {
        super(...props)
        this.state = {
            orderBy: 'default',          //默认综合排序default;另外销量：sale;价格：price;筛选：filter
            priceOrder: null,            //up价格升，down价格降
            filterShow: false,           //筛选框显示状态
            leftSelectedBar: null,       //一级分类选中状态
            leftSelectedBarId: null,     //一级分类id
            rightSelectedBarId: null,    //二级分类id
            showType: true,              //显示大图为true,小图为false，默认大图
            showModel: false,            //显示加入购物车模态框
            goodsInfo: null,             //加入入购物车商品信息
            search: {                    //筛选条件
                keywords: "",
                isrecommand: "",
                ishot: "",
                isnew: "",
                isdiscount: "",
                issendfree: "",
                istime: "",
                cate: "",
                order: "",
                by: "",
                merchid: "",
                page: 1,
                _: Math.round(new Date().getTime()),
            }
        }
    }

    componentDidMount() {
        this.setState(Object.assign(
            this.state.search, this.props.navigation.state.params.search
        ))
        this.props.dispatch(goods(this.state.search));
    }
    componentDidUpdate(){
       
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    translucent={false}
                    backgroundColor="#000"
                />
                {this.renderSearch()}
                {this.renderOrderBy()}
                {this.renderGoodsList()}
                {this.renderFilter()}
                {this.state.showModel?<AddToCart goodsInfo={this.state.goodsInfo} showModel={this.state.showModel} hide={()=>this.setState({showModel:false})} dispatch={this.props.dispatch} loginData={this.props.loginData}/>:null}
            </View>
        );
    }

    renderSearch() {
        return (
            <View style={styles.searchView}>
                <View style={styles.goBack}>
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                        <Icon name='angle-left' size={30} color={'white'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.searchInput}>
                    <View style={{ flex: 1 }}><Icon name='search' size={20} /></View>
                    <View style={{ flex: 12 }}>
                        <TextInput
                            style={{ color: '#666', padding: 0 }}
                            onChangeText={(text) => this.setState({
                                search: {
                                    ...this.state.search,
                                    keywords: text
                                }
                            })}
                            placeholder='输入关键字'
                            underlineColorAndroid="transparent"
                            returnKeyType='search'
                            returnKeyLabel='搜索'
                            onSubmitEditing={() => this.props.dispatch(goods(this.state.search))}
                        />
                    </View>
                </View>
                <View style={styles.changeView}>
                    <TouchableOpacity onPress={() => {
                        this.setState({
                            showType: !this.state.showType
                        })
                    }}>
                        <Icon name={this.state.showType == true ? 'th-list' : 'th-large'} size={30} color={'white'} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    // 排序视图 
    renderOrderBy() {
        return (
            <View style={styles.orderView}>
                <View style={styles.orderViewChildern}>
                    <TouchableOpacity onPress={() => {
                        this.setState({ orderBy: 'default' });
                        this.props.dispatch(goods(Object.assign(
                            this.state.search,
                            { order: '', by: '', page: 1 }
                        )));
                    }}>
                        <Text style={this.state.orderBy == 'default' ? styles.orderTextChecked : null}>综合</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.orderViewChildern}>
                    <TouchableOpacity onPress={() => {
                        this.setState({ orderBy: 'sale' });
                        this.props.dispatch(goods(
                            Object.assign(
                                this.state.search,
                                { order: 'sales', by: 'desc', page: 1 }
                            )
                        ));
                    }}>
                        <Text style={this.state.orderBy == 'sale' ? styles.orderTextChecked : null}>销量</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.orderPrice}>
                    <TouchableOpacity onPress={() => this._priceOrder()}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={this.state.orderBy == 'price' ? styles.orderTextChecked : null}>价格</Text>
                            </View>
                            <View style={{ justifyContent: 'center' }}>
                                {this.renderIconUpDown()}
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.orderViewChildern}>
                    <TouchableOpacity onPress={() => {
                        this.setState({
                            orderBy: 'filter', filterShow: true, search: {
                                ...this.state.search,
                                keywords: ""
                            }
                        });
                        this.props.dispatch(category())
                    }}>
                        <Text style={this.state.orderBy == 'filter' ? styles.orderTextChecked : null}>筛选</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    //商品列表
    renderGoodsList() {
        if (this.props.goodsData.status == 'success') {
            let goodsList = this.props.goodsData.list;
            return (
                <FlatListJumoTop
                    horizontal={false}
                    numColumns={2}
                    keyExtractor={(item, index) => index}
                    data={goodsList}
                    renderItem={this.state.showType ? this.renderDigView : this.renderSmallView}
                    extraData={this.state.showType}
                    columnWrapperStyle={{ flexWrap: 'wrap' }}
                    refreshing={true}
                    onEndReached={() => {
                        goodsList.length < this.props.goodsData.total ?
                            this.props.dispatch(goods(
                                Object.assign(
                                    this.state.search,
                                    { page: ++this.state.search.page }
                                )
                            )) : null;
                    }}
                    onEndReachedThreshold={goodsList.length > 6 ? 0.2 : 1}
                    ListFooterComponent={() => goodsList.length < this.props.goodsData.total ? <ActivityIndicator size={40}></ActivityIndicator> : <Text style={{ textAlign: 'center' }}>DUANG~已经到底了哦</Text>
                    }
                    showsVerticalScrollIndicator={false}
                />
            )
        }
    }

    //大图显示
    renderDigView = ({ item }) => {
        return (
            <MyListItem item={item} renderType={'big'} navigate={this.props.navigation} fun={(item)=>this.setState({goodsInfo:item,showModel:true})}/>
        )
    }

    //小图显示
    renderSmallView = ({ item }) => {
        return (
            <MyListItem item={item} renderType={'small'} navigate={this.props.navigation} />
        )
    }

    //排序筛选
    renderFilter() {
        if (this.state.filterShow == true && this.state.orderBy == 'filter') {
            let btnObj = {
                btn: [
                    { title: '推荐商品', state: 'isrecommand' },
                    { title: '新品上市', state: 'isnew' },
                    { title: '热卖商品', state: 'ishot' },
                    { title: '促销商品', state: 'isdiscount' },
                    { title: '卖家包邮', state: 'issendfree' },
                    { title: '限时抢购', state: 'istime' }
                ]
            };
            let btnArr = [];
            for (let i = 0; i < btnObj.btn.length; i++) {
                btnArr.push(
                    <View key={i} style={styles.filterchildren}>
                        <TouchableOpacity onPress={() => {
                            this._changeSearch(btnObj.btn[i].state);
                        }}><Text style={this.state.search[btnObj.btn[i].state] == 1 ? styles.BtnChecked : styles.BtnUnchecked}>{btnObj.btn[i].title}</Text></TouchableOpacity>
                    </View>
                )
            }
            return (
                <View style={styles.filterView}>
                    <View style={styles.filterBox}>
                        {btnArr}
                    </View>
                    <View>
                        <View style={{ padding: 5 }}>
                            <Text style={styles.filterCateText}>选择分类</Text>
                        </View>
                            <View style={styles.filterCateView}>
                                <View style={styles.cateFirst}>
                                    {this.renderFirstCatList()}
                                </View>
                                <View style={{ flex: 1 }}>
                                    {this.renderSecondCatList()}
                                </View>
                            </View>
                    </View>
                    <View style={styles.filterBottom}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => this.setState({ filterShow: false })}>
                                <Text style={styles.filterBtnBack}>取消筛选</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => {
                                this.setState({ filterShow: false });
                                this.props.dispatch(goods(
                                    Object.assign(
                                        this.state.search,
                                        { page: 1 }
                                    )
                                ))
                            }}>
                                <Text style={styles.filterBtnOk}>确定</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }
    }

    //一级分类列表
    renderFirstCatList() {
        var firstCatList = this.props.categoryData.data.result.category.parent[0];
        var firstCatListArr = [];
        for (let i = 0; i < firstCatList.length; i++) {
            firstCatListArr.push(
                <View key={i} style={{ margin: 5, padding: 5, backgroundColor: this.state.leftSelectedBar == i ? '#ccc' : null }}>
                    <TouchableOpacity onPress={() => {
                        this.setState({
                            leftSelectedBar: i,
                            leftSelectedBarId: firstCatList[i].id,
                            rightSelectedBarId: null,
                            search: {
                                ...this.state.search,
                                cate: firstCatList[i].id,
                            }
                        })
                    }}>
                        <Text style={{ textAlign: 'center' }}>{firstCatList[i].name}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        return (
            <ScrollView style={{ height: ScreenHeight / 4 }}>
                {firstCatListArr}
            </ScrollView>
        )
    }

    //二级分类列表
    renderSecondCatList() {
        if (this.props.categoryData.status == 'success' && this.state.leftSelectedBarId != null) {
            var secondCatList = this.props.categoryData.data.result.category.children[this.state.leftSelectedBarId];
            var secondCatListArr = [];
            for (let i = 0; i < secondCatList.length; i++) {
                secondCatListArr.push(
                    <View key={i} style={{ margin: 5, padding: 5, backgroundColor: this.state.rightSelectedBarId == secondCatList[i].id ? '#ccc' : null }}>
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                rightSelectedBarId: secondCatList[i].id,
                                search: {
                                    ...this.state.search,
                                    cate: secondCatList[i].id,
                                }
                            })
                        }}>
                            <Text style={{ textAlign: 'center' }}>{secondCatList[i].name}</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
        return (
            <ScrollView style={{ height: ScreenHeight / 4 }}>
                {secondCatListArr}
            </ScrollView>
        )
    }

    //价格升降图标
    renderIconUpDown() {
        if (this.state.priceOrder == 'down' && this.state.orderBy == 'price') {
            return (
                <Text style={{ color: 'red', fontSize: 10, height: 11 }}>  ▲</Text>
            )
        } else if (this.state.priceOrder == 'up' && this.state.orderBy == 'price') {
            return (
                <Text style={{ color: 'red', fontSize: 10, height: 11 }}>  ▼</Text>
            )
        }
    }

    //价格升降排序
    _priceOrder() {
        if (this.state.priceOrder == null) {
            this.setState({
                orderBy: 'price',
                priceOrder: 'up',
            });
            this.props.dispatch(goods(
                Object.assign(
                    this.state.search,
                    { order: 'marketprice', by: 'desc', page: 1 }
                )
            ));
        } else if (this.state.priceOrder == 'up') {
            this.setState({
                orderBy: 'price',
                priceOrder: 'down'
            });
            this.props.dispatch(goods(
                Object.assign(
                    this.state.search,
                    { order: 'marketprice', by: 'asc', page: 1 }
                )
            ));
        } else {
            this.setState({
                orderBy: 'price',
                priceOrder: 'up'
            });
            this.props.dispatch(goods(
                Object.assign(
                    this.state.search,
                    { order: 'marketprice', by: 'desc', page: 1 }
                )
            ));
        }
    }

    _changeSearch(key) {
        this.setState({
            search: {
                ...this.state.search,
                [key]: this.state.search[key] == 1 ? "" : 1,
            }
        })
    }
}

class MyListItem extends React.PureComponent {
    render() {
        let { item, renderType,fun } = this.props;
        if (renderType === "big") {
            return (
                <View style={styles.bigView}>
                    <View style={styles.bigViewA}>
                        <TouchableOpacity onPress={() => this.props.navigate.navigate('GoodsInfo',{id:item.id})}>
                            <Image source={{ uri: item.thumb }} style={styles.bigImg} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ padding: 5 }}>
                        <View>
                            <TouchableOpacity>
                                <Text numberOfLines={1}>{item.title}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.goodsTitle}>
                            <View style={{ flex: 5 }}>
                                <Text style={{ color: 'red' }}>￥{item.marketprice}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <View style={styles.addCat}>
                                    <TouchableOpacity onPress={()=>fun(item)}>
                                        <Icon name="shopping-cart" size={15} color={'#fff'} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )
        } else if (renderType == "small") {
            return (
                <View style={{ backgroundColor: '#fff' }}>
                    <TouchableOpacity style={styles.item_container} onPress={() => { this.props.navigate.navigate('GoodsInfo', { id: item.id }) }}>
                        <View style={styles.item_left}>
                            <Image source={{ uri: item.thumb }} style={styles.item_img} />
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
                        <TouchableOpacity style={styles.buy_car} onPress={() => { alert('我是购物车') }}>
                            <IconTwo name={'cart-outline'} color={'red'} size={20} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return <View></View>
        }
    }
}

const styles = StyleSheet.create({
    searchView: {
        flexDirection: 'row',
        backgroundColor: '#C10001',
        paddingTop: 10,
        paddingBottom: 10,
    },
    goBack: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchInput: {
        flex: 8,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'white',
        height: 30
    },
    changeView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10
    },
    filterView: {
        width: ScreenWidth,
        position: 'absolute',
        backgroundColor: '#fff',
        top: 55,
    },
    filterBox: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    filterchildren: {
        width: ScreenWidth / 3,
        padding: 5,
    },
    BtnChecked: {
        borderWidth: 1,
        padding: 5,
        borderColor: 'red',
        color: 'red',
        borderRadius: 10,
        textAlign: 'center',
    },
    BtnUnchecked: {
        borderWidth: 1,
        padding: 5,
        borderColor: '#ccc',
        borderRadius: 10,
        textAlign: 'center'
    },
    filterCateText: {
        textAlign: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        padding: 5,
    },
    filterCateView: {
        padding: 5,
        flexDirection: 'row',
        height: 150,
    },
    cateFirst: {
        flex: 1,
        borderRightWidth: 1,
        borderColor: '#ccc'
    },
    filterBottom: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        flexDirection: 'row',
        padding: 10,
        borderColor: '#ccc'
    },
    filterBtnBack: {
        textAlign: 'left',
    },
    filterBtnOk: {
        textAlign: 'right',
        color: 'red'
    },
    orderView: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 45,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#ccc'
    },
    orderViewChildern: {
        flex: 1,
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: '#ccc'
    },
    orderPrice: {
        flex: 1,
        alignItems: 'center'
    },
    orderTextChecked: {
        color: 'red',
    },
    bigView: {
        width: ScreenWidth / 2,
    },
    bigViewA: {
        marginTop: 5,
        marginLeft: 5,
        marginBottom: 5
    },
    bigImg: {
        width: ScreenWidth / 2 - 10,
        height: ScreenWidth / 2 - 5
    },
    goodsTitle: {
        flexDirection: 'row',
        paddingTop: 10
    },
    addCat: {
        width: 24,
        height: 24,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 2
    },
    smallView: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        width: ScreenWidth,
        flexDirection: 'row',
        padding: 5
    },
    smallViewA: {
        flex: 1,
        padding: 10
    },
    smallImg: {
        width: ScreenWidth / 6,
        height: ScreenWidth / 6
    },
    smallViewB: {
        flexDirection: 'column',
        flex: 4
    },
    smallViewBA: {
        flexDirection: 'row',
        padding: 5
    },
    item_container: {
        height: 120, borderBottomWidth: 0.5, borderColor: '#ccc', flexDirection: 'row', paddingTop: 20, paddingBottom: 20, paddingRight: 20, width: ScreenWidth
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
});

function mapStateToProps(state) {
    return {
        goodsData: state.goodsReducer,
        categoryData: state.categoryReducer,
        loginData:state.loginReducer,
    }
}

export default connect(mapStateToProps)(Goods);