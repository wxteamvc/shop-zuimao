/**
 * 商品列表页面
 */
"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput, FlatList } from 'react-native';
import { goods } from '../actions/goodsAction';
import { category } from '../actions/categoryAction';
import { connect } from 'react-redux';
import { ScreenWidth, ScreenHeight } from '../common/global';
import Icon from 'react-native-vector-icons/FontAwesome';

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
            showType: true,               //显示大图为true,小图为false，默认大图
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
                nowtime: "",
            }
        }
    }

    componentDidMount() {
        this.setState(Object.assign(
            this.state.search, this.props.navigation.state.params.search
        ))
        this.props.dispatch(goods(this.state.search));
    }

    render() {
        return (
            <View>
                {this.renderSearch()}
                {this.renderOrderBy()}
                {this.renderGoodsList()}
                {this.renderFilter()}
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
                    <TouchableOpacity onPress={() => { this.setState({ showType: !this.state.showType }) }}>
                        <Icon name={this.state.showType == true ? 'th-list' : 'th-large'} size={30} color={'white'} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    // 排序视图 
    renderOrderBy() {
        return (
            <View style={{ flexDirection: 'row', backgroundColor: '#fff', height: 45, alignItems: 'center', borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#ccc' }}>
                <View style={{ flex: 1, alignItems: 'center', borderRightWidth: 1, borderColor: '#ccc' }}>
                    <TouchableOpacity onPress={
                        () => {
                            this.setState({ orderBy: 'default' });
                            this.props.dispatch(goods(Object.assign(
                                this.state.search,
                                { order: '', by: '' }
                            )));
                        }
                    }>
                        <Text style={{ color: this.state.orderBy == 'default' ? 'red' : null, fontSize: 16 }}>综合</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignItems: 'center', borderRightWidth: 1, borderColor: '#ccc' }}>
                    <TouchableOpacity onPress={
                        () => {
                            this.setState({ orderBy: 'sale' });
                            this.props.dispatch(goods(
                                Object.assign(
                                    this.state.search,
                                    { order: 'sales', by: 'desc' }
                                )
                            ));
                        }
                    }>
                        <Text style={{ color: this.state.orderBy == 'sale' ? 'red' : null, fontSize: 16 }}>销量</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this._priceOrder()}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={{ color: this.state.orderBy == 'price' ? 'red' : null, fontSize: 16 }}>价格</Text>
                            </View>
                            <View style={{ justifyContent: 'center' }}>
                                {this.renderIconUpDown()}
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignItems: 'center', borderLeftWidth: 1, borderColor: '#ccc' }}>
                    <TouchableOpacity onPress={
                        () => {
                            this.setState({
                                orderBy: 'filter', filterShow: true, search: {
                                    ...this.state.search,
                                    keywords: ""
                                }
                            });
                            this.props.dispatch(category())
                        }}>
                        <Text style={{ color: this.state.orderBy == 'filter' ? 'red' : null, fontSize: 16 }}>筛选</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    // 商品列表视图
    renderGoodsList() {
        let goodsList = this.props.goodsData;
        if (goodsList.status == 'success') {
            var goodsListObj = goodsList.data.result.list;
            var goodsListArr = [];
            //默认显示大图
            if (this.state.showType == true) {
                for (let i = 0; i < goodsListObj.length; i++) {
                    goodsListArr.push(
                        <View key={i} style={{ width: ScreenWidth / 2 }}>
                            <View style={{ marginTop: 5, marginLeft: 5, marginBottom: 5 }}>
                                <TouchableOpacity>
                                    <Image source={{ uri: goodsListObj[i].thumb }} style={{ width: ScreenWidth / 2 - 10, height: ScreenWidth / 2 - 5 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ padding: 5 }}>
                                <View>
                                    <TouchableOpacity>
                                        <Text numberOfLines={1}>{goodsListObj[i].title}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                                    <View style={{ flex: 5 }}>
                                        <Text style={{ color: 'red' }}>￥{goodsListObj[i].marketprice}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <View style={{ width: 24, height: 24, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', borderRadius: 10, padding: 2 }}>
                                            <TouchableOpacity>
                                                <Icon name="shopping-cart" size={15} color={'#fff'} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                }
            } else {
                for (let i = 0; i < goodsListObj.length; i++) {
                    goodsListArr.push(
                        <View key={i} style={{ borderBottomWidth: 1, borderColor: '#ccc', width: ScreenWidth, flexDirection: 'row', padding: 5 }}>
                            <View style={{ flex: 1, padding: 10 }}>
                                <TouchableOpacity>
                                    <Image source={{ uri: goodsListObj[i].thumb }} style={{ width: ScreenWidth / 6, height: ScreenWidth / 6 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'column', flex: 4 }}>
                                <View style={{ padding: 5 }}>
                                    <TouchableOpacity>
                                        <Text numberOfLines={2} style={{ padding: 5 }}>{goodsListObj[i].title}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', padding: 5 }}>
                                    <View style={{ flex: 4 }}>
                                        <Text style={{ color: 'red' }}>￥{goodsListObj[i].marketprice}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <View style={{ width: 24, height: 24, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', borderRadius: 10, padding: 2 }}>
                                            <TouchableOpacity>
                                                <Icon name="shopping-cart" size={15} color={'#fff'} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                }
            }
        }
        return (
            <ScrollView onMomentumScrollEnd = {(e)=>this._contentViewScroll(e)}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 150 }}>{goodsListArr}</View>
            </ScrollView>
        )
    }

    renderFilter() {
        if (this.state.filterShow == true && this.state.orderBy == 'filter') {
            return (
                <View style={styles.filterView}>
                    <View style={styles.filterBox}>
                        <View style={styles.filterchildren}>
                            <TouchableOpacity onPress={() => {
                                this._changeSearch('isrecommand');
                            }}><Text style={this.state.search.isrecommand == 1 ? styles.BtnChecked : styles.BtnUnchecked}>推荐商品</Text></TouchableOpacity>
                        </View>
                        <View style={styles.filterchildren}>
                            <TouchableOpacity onPress={() => {
                                this._changeSearch('isnew');
                            }}><Text style={this.state.search.isnew == 1 ? styles.BtnChecked : styles.BtnUnchecked}>新品上市</Text></TouchableOpacity>
                        </View>
                        <View style={styles.filterchildren}>
                            <TouchableOpacity onPress={() => {
                                this._changeSearch('ishot');
                            }}><Text style={this.state.search.ishot == 1 ? styles.BtnChecked : styles.BtnUnchecked}>热卖商品</Text></TouchableOpacity>
                        </View>
                        <View style={styles.filterchildren}>
                            <TouchableOpacity onPress={() => {
                                this._changeSearch('isdiscount');
                            }}><Text style={this.state.search.isdiscount == 1 ? styles.BtnChecked : styles.BtnUnchecked}>促销商品</Text></TouchableOpacity>
                        </View>
                        <View style={styles.filterchildren}>
                            <TouchableOpacity onPress={() => {
                                this._changeSearch('issendfree');
                            }}><Text style={this.state.search.issendfree == 1 ? styles.BtnChecked : styles.BtnUnchecked}>卖家包邮</Text></TouchableOpacity>
                        </View>
                        <View style={styles.filterchildren}>
                            <TouchableOpacity onPress={() => {
                                this._changeSearch('istime');
                            }}><Text style={this.state.search.istime == 1 ? styles.BtnChecked : styles.BtnUnchecked}>限时抢购</Text></TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <View style={{ padding: 5 }}>
                            <Text style={styles.filterCateText}>选择分类</Text>
                        </View>
                        <View style={styles.filterCateView}>
                            <View style={styles.cateFirst}>
                                {/* 一级分类列表 */}
                                {this.renderFirstCatList()}

                            </View>
                            <View style={{ flex: 1 }}>
                                {/* 二级分类列表 */}
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
                                this.props.dispatch(goods(this.state.search))
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
        if (this.props.categoryData.status == 'success') {
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
                priceOrder: 'up'
            });
            this.props.dispatch(goods(
                Object.assign(
                    this.state.search,
                    { order: 'marketprice', by: 'desc' }
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
                    { order: 'marketprice', by: 'asc' }
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
                    { order: 'marketprice', by: 'desc' }
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

    _contentViewScroll(e){
        var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
        if (offsetY + oriageScrollHeight >= contentSizeHeight){
            //滚动到底部
            // this.props.dispatch(goods(
            //     Object.assign(
            //         this.state.search,
            //         { page: this.state.search.page+1}
            //     )
            // ));
        }
    }

}

const styles = StyleSheet.create({
    searchView: {
        flexDirection: 'row',
        backgroundColor: '#C10001',
        paddingTop: 30,
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
    },
    filterView: {
        width: ScreenWidth,
        position: 'absolute',
        backgroundColor: '#fff',
        top: 75,
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
    }
});

function mapStateToProps(state) {
    return {
        goodsData: state.goodsReducer,
        categoryData: state.categoryReducer,
    }
}

export default connect(mapStateToProps)(Goods);