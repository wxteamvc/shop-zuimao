"use strict"
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    TextInput,
    ToastAndroid,
} from 'react-native';
import { DOMAIN, ScreenWidth, ScreenHeight } from '../common/global';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IconOc from 'react-native-vector-icons/dist/Octicons';
import { connect } from 'react-redux'
import { searchHistory, clear } from '../actions/searchAction'
class Serach extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            hasKeyWord: false,
            recommend:[],
        }
    }
    

    componentDidMount() {
        let goods=[];
        let{children} = this.props.goods.data.result.category
        for (var key in children) {
            goods.push.apply(goods,children[key])
        }
        goods.sort(() =>0.5-Math.random())
        this.recommands =goods.slice(0,10)
        alert(this.recommands.length)
    }
    // _hot() {
    //     let recommands = this.props.data.data.recommands;
    //     if (recommands.length >= 4) {
    //         var num = 4;
    //     } else {
    //         var num = recommands.length
    //     }
    //     var hotlist = [];
    //     for (var i = 0; i < num; i++) {
    //         hotlist.push(
    //             <View key={i} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //                 <Image source={{ uri: DOMAIN + recommands[i].thumb }} style={{ width: 80, height: 80, borderRadius: 10 }} />
    //             </View>
    //         )
    //     }
    //     return (hotlist)
    // }

    getText(text) {
        this.setState({
            text: text,
            hasKeyWord: true,
        })
    }

    jump = () => {
        if (this.state.hasKeyWord) {
            this.props.dispatch(searchHistory(this.state.text))
            this.props.navigation.navigate('Goods', { search: { keywords: this.state.text } })
        } else {
            ToastAndroid.show('请输入要搜索的内容', ToastAndroid.SHORT)
        }
    }

    _history() {
        var content = [];
        for (let i = 0; i < this.props.history.keyWords.length; i++) {
            content.push(
                <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('Goods', { search: { keywords: this.props.history.keyWords[i] } })}>
                    <View style={{ borderBottomWidth: 1, borderColor: '#ccc', paddingBottom: 10, paddingTop: 10 }}>
                        <Text style={{ marginLeft: 10 }}>{this.props.history.keyWords[i]}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        return (content)
    }

    clear() {
        this.props.dispatch(clear())
    }

    renderHistory() {
        if (this.props.history.hasHistory) {
            return (
                <View>
                    <View style={{ borderTopWidth: 1, borderColor: '#ccc', marginTop: 20 }}>
                        <Text style={{ marginTop: 20, marginLeft: 10 }}>搜索历史:</Text>
                        {this._history()}
                    </View>
                    <TouchableOpacity style={{ height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }} onPress={() => { this.clear() }}>
                        <IconOc name={'trashcan'} size={16} /><Text>清空历史记录</Text>
                    </TouchableOpacity>
                </View>

            )
        } else {
            return false;

        }
    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <StatusBar
                    translucent={false}
                    backgroundColor="#000"
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#C10001', height: 40 }}>
                    <TouchableOpacity style={{ flex: 0.15, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name={'angle-left'} size={25} color='#fff' />
                    </TouchableOpacity>
                    <TextInput style={{ flex: 0.7, backgroundColor: '#fff', padding: 0, paddingLeft: 20, borderRadius: 15, height: 30, }}
                        textAlignVertical='center'
                        placeholder='输入要搜索的内容'
                        placeholderTextColor='#000'
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.getText(text)}
                        returnKeyType='search'
                        returnKeyLabel='搜索'
                        onSubmitEditing={this.jump}
                    >
                    </TextInput>
                    <TouchableOpacity
                        onPress={this.jump}
                        style={{ flex: 0.15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name={'search'} size={20} color={'#fff'} />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View>
                        <Text style={{ marginTop: 20, marginLeft: 20 }}>热门推荐</Text>
                        {/* <View style={{ flexDirection: 'row', marginTop: 30, }}>
                            {this._hot()}
                        </View> */}
                        {this.renderHistory()}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        goods: state.categoryReducer,
        history: state.HistoryReducer,
    }
}

export default connect(mapStateToProps)(Serach);