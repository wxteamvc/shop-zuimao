/**
 * 分类页面
 */
"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { category } from '../actions/categoryAction';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScreenWidth } from '../common/global';
import Swiper from 'react-native-swiper';

class Catergry extends Component {

    constructor(...props) {
        super(...props);
        this.state = {
            selectedBar: 'isrecommand',
            selectedBarId: 'isrecommand',
        }
    }

    componentWillMount() {
        this.props.dispatch(category());
    }

    render() {
        if (this.props.categoryData.status == 'success') {
            return (
                <View style={styles.f1}>
                    {/* 顶部搜索 */}
                    <View style={styles.searchBar}>
                        {/* <Search lbtn={'扫码'} search={'星空乐园系列'} h={30} rbtn={'搜索'} navigate={this.props.navigation} page={'Search'} /> */}
                    </View>
                    <View style={styles.main}>
                        {/* 左边导航 */}
                        {this.renderLeftBar()}
                        {/* 右边列表 */}
                        {this.renderRightList()}
                    </View>
                </View>
            );
        } else {
            // return (
            //     <Loading />
            // )
            return false
        }
    }

    renderLeftBar() {
        let category = this.props.categoryData.data.result.category;
        if (category.parent == undefined) {
            return (
                <View><Text>loading</Text></View>
            )
        } else {
            var leftBarList = category.parent[0];
            var leftBarArr = [];
            for (let i = 0; i < leftBarList.length; i++) {
                leftBarArr.push(
                    <TouchableOpacity key={i} onPress={() => { this.setState({ selectedBar: i, selectedBarId: leftBarList[i].id }) }}>
                        <View style={[styles.fdr, this.state.selectedBar == i ? styles.bgcw : styles.bgct]}>
                            <View style={[styles.f1, this.state.selectedBar == i ? styles.bgcr : styles.bgct]}></View>
                            <View style={styles.leftBarText}><Text>{leftBarList[i].name}</Text></View>
                        </View>
                    </TouchableOpacity>
                )
            };
            return (
                <View style={[styles.f1, styles.fdc]}>
                    <TouchableOpacity onPress={() => { this.setState({ selectedBar: 'isrecommand', selectedBarId: 'isrecommand' }) }}>
                        <View style={[styles.fdr, this.state.selectedBar == 'isrecommand' ? styles.bgcw : styles.bgct]}>
                            <View style={[styles.f1, this.state.selectedBar == 'isrecommand' ? styles.bgcr : styles.bgct]}></View>
                            <View style={styles.leftBarText}><Text>推荐分类</Text></View>
                        </View>
                    </TouchableOpacity>
                    {leftBarArr}
                </View>
            );
        }
    }

    renderRightList() {
        let category = this.props.categoryData.data.result.category;
        if (this.state.selectedBarId != 'isrecommand') {
            var catid = this.state.selectedBarId;
            var GoodsList = category.children[catid];
            var GoodsArr = [];
            for (let i = 0; i < GoodsList.length; i++) {
                GoodsArr.push(
                    <TouchableOpacity key={i} onPress={() => { this.props.navigation.navigate('Goods', { search: { cate: GoodsList[i].id } }) }}>
                        <View style={styles.rightListView}>
                            {GoodsList[i].thumb == '' || GoodsList[i].thumb == null ?
                                <Image source={require('../assets/images/nopic.jpg')} style={styles.rightListImg} /> :
                                <Image source={{ uri: GoodsList[i].thumb }} style={styles.rightListImg} />
                            }
                            <Text>{GoodsList[i].name}</Text>
                        </View>
                    </TouchableOpacity>
                )
            }
            return (
                <View style={styles.rightListBox}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.rightList}>
                            {/* 轮播 */}
                            <View style={styles.swiperView}>
                                <Swiper height={200} loop={true} index={0} autoplay={true} horizontal={true}>
                                    {this.renderImg()}
                                </Swiper>
                            </View>
                            <View style={{width: ScreenWidth * 0.75-20,margin:10,flexDirection:'row',alignItems:'center',backgroundColor:'#eee',height:35}}>
                                <Text style={{width:5,backgroundColor:'#C10001',flex:0.2,height:35}}>&nbsp;</Text>
                                <Text style={{flex:7,paddingLeft:10,fontSize:12}}>品牌</Text>
                                <TouchableOpacity style={{flex:3,flexDirection:'row',alignItems:'center'}} onPress={() => { this.props.navigation.navigate('Goods', { search: { cate:this.state.selectedBarId} }) }}>
                                    <Text style={{flex:6,fontSize:12}}>查看所有</Text>
                                    <Icon name="angle-right" size={20} style={{ marginRight: 5 ,flex:1}} />
                                </TouchableOpacity>
                            </View>
                            {GoodsArr}
                        </View>
                    </ScrollView>
                </View>
            );
        } else {
            var GoodsList = category.children;
            var GoodsArr = [];
            for (let i in GoodsList) {
                for (let j = 0; j < GoodsList[i].length; j++) {
                    if (GoodsList[i][j].isrecommand == '1') {
                        GoodsArr.push(
                            <TouchableOpacity key={i + '-' + j} onPress={() => { this.props.navigation.navigate('Goods', { search: { cate: GoodsList[i][j].id } }) }}>
                                <View style={styles.rightListView}>
                                    {GoodsList[i][j].thumb == '' || GoodsList[i][j].thumb == null ?
                                        <Image source={require('../assets/images/nopic.jpg')} style={styles.rightListImg} /> :
                                        <Image source={{ uri: GoodsList[i][j].thumb }} style={styles.rightListImg} />
                                    }
                                    <Text>{GoodsList[i][j].name}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                }
            }
            return (
                <View style={styles.rightListBox}>
                    <ScrollView>
                        <View style={styles.rightList}>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Goods', { search: {} }) }}>
                                <View style={styles.rightListView}>
                                    <View style={styles.rightListIcon}>
                                        <Icon name='list' size={20} />
                                    </View>
                                    <Text>所有商品</Text>
                                </View>
                            </TouchableOpacity>
                            {GoodsArr}
                        </View>
                    </ScrollView>
                </View>
            )
        }
    }

    renderImg() {
        var selectedBar = this.state.selectedBar;
        var imgs = {
            0: [
                { url: 'http://www.zuimaowang.cn/attachment/images/1/2017/04/pT7Dsf7DfdSQBtTJqff7fUH30TwLa1.jpg' },
                { url: 'http://www.zuimaowang.cn/attachment/images/1/2017/04/pT7Dsf7DfdSQBtTJqff7fUH30TwLa1.jpg' },
            ],
            1: [
                { url: 'http://www.zuimaowang.cn/attachment/images/1/2017/04/pT7Dsf7DfdSQBtTJqff7fUH30TwLa1.jpg' },
                { url: 'http://www.zuimaowang.cn/attachment/images/1/2017/04/pT7Dsf7DfdSQBtTJqff7fUH30TwLa1.jpg' },
            ],
            2: [
                { url: 'http://www.zuimaowang.cn/attachment/images/1/2017/04/pT7Dsf7DfdSQBtTJqff7fUH30TwLa1.jpg' },
                { url: 'http://www.zuimaowang.cn/attachment/images/1/2017/04/pT7Dsf7DfdSQBtTJqff7fUH30TwLa1.jpg' },
            ],
            3: [
                { url: 'http://www.zuimaowang.cn/attachment/images/1/2017/04/pT7Dsf7DfdSQBtTJqff7fUH30TwLa1.jpg' },
                { url: 'http://www.zuimaowang.cn/attachment/images/1/2017/04/pT7Dsf7DfdSQBtTJqff7fUH30TwLa1.jpg' },
            ],
        };
        var imgarr = [];
        var imgItem = {};
        for (var i = 0; i < imgs[selectedBar].length; i++) {
            imgarr.push(
                <TouchableOpacity key={i} style={{ flex: 1 }}>
                    <Image key={i} style={{ flex: 1 }} resizeMode={'stretch'} source={{ uri: imgs[selectedBar][i].url }} />
                </TouchableOpacity>
            );
        }
        return imgarr;
    }
}

const styles = StyleSheet.create({
    f1: { flex: 1 },
    bgcw: { backgroundColor: 'white' },
    bgcr: { backgroundColor: '#C10001' },
    bgct: { backgroundColor: 'transparent' },
    fdr: { flexDirection: 'row' },
    fdc: { flexDirection: 'column' },
    searchBar: {
        backgroundColor: '#C10001',
        width: ScreenWidth,
        height: 40,
        justifyContent: 'center'
    },
    main: {
        flex: 13,
        flexDirection: 'row'
    },
    leftBarText: {
        flex: 50,
        padding: 5,
        alignItems: 'center'
    },
    rightListBox: {
        flex: 3,
        backgroundColor: 'white'
    },
    rightListView: {
        flexDirection: 'column',
        width: ScreenWidth * 0.75 / 3,
        alignItems: 'center',
        marginTop: 20
    },
    rightListImg: {
        width: 50,
        height: 50,
        borderRadius: ScreenWidth * 0.75 / 3,
    },
    rightListIcon: {
        width: 50,
        height: 50,
        padding: 15,
    },
    rightList: {
        flexDirection: 'row',
        backgroundColor: 'white',
        flexWrap: 'wrap',
        marginBottom: 50,
    },
    swiperView: {
        width: ScreenWidth * 0.75,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 10,
    }
})

function mapStateToProps(state) {
    return {
        categoryData: state.categoryReducer
    }
}

export default connect(mapStateToProps)(Catergry);