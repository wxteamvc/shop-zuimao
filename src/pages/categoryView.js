"use strict";
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { category } from '../actions/categoryAction';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScreenWidth } from '../common/global';

class Catergry extends Component {

    constructor(...props) {
        super(...props);
        this.state = {
            selectedBar: 'isrecommand',
            selectedBarId: 'isrecommand'
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
                        {this._leftBar()}
                        {/* 右边列表 */}
                        {this._rightList()}
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

    _leftBar() {
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

    _rightList() {
        let category = this.props.categoryData.data.result.category;
        if (this.state.selectedBarId != 'isrecommand') {
            var catid = this.state.selectedBarId;
            var GoodsList = category.children[catid];
            var GoodsArr = [];
            for (let i = 0; i < GoodsList.length; i++) {
                GoodsArr.push(
                    <TouchableOpacity key={i} onPress={() => { this.props.navigation.navigate('Goods', { search: { cate: GoodsList[i].id } }) }}>
                        <View style={styles.rightListView}>
                            <Image source={{ uri: GoodsList[i].thumb }} style={styles.rightListImg} />
                            <Text>{GoodsList[i].name}</Text>
                        </View>
                    </TouchableOpacity>
                )
            }
            return (
                <View style={styles.rightListBox}>
                    <ScrollView> 
                        <View style={styles.rightList}>
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
                                    <Image source={{ uri: GoodsList[i][j].thumb }} style={styles.rightListImg} />
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
}

const styles = StyleSheet.create({
    f1: { flex: 1 },
    bgcw: { backgroundColor: 'white' },
    bgcr: { backgroundColor: 'red' },
    bgct: { backgroundColor: 'transparent' },
    fdr: { flexDirection: 'row' },
    fdc: { flexDirection: 'column' },
    searchBar: {
        backgroundColor: 'red',
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
    rightListBox:{
        flex: 3,
        backgroundColor:'white'
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
        marginBottom:50,
    }
})

function mapStateToProps(state) {
    return {
        categoryData: state.categoryReducer
    }
}

export default connect(mapStateToProps)(Catergry);