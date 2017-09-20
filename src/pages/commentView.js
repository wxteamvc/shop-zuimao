/**
 * 评价
 */

"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, StatusBar, TouchableOpacity, TextInput, Platform } from 'react-native';
import { ScreenWidth, ScreenHeight, COMMENT_URL } from '../common/global';
import Util from '../common/util';
import Toast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { orderList } from '../actions/orderListAction';
import ImagePicker from 'react-native-image-picker';
var options = {
    title: '请选择图片',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照片',
    chooseFromLibraryButtonTitle: '我的相册',
    quality: 0.75,
    allowsEditing: true,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
}

class Comment extends Component {

    constructor(...props) {
        super(...props);
        this.state = {
            commentData: '',
            avatarSource: [],
            comments:{},
        }
    }

    componentWillMount() {
        let oid = this.props.navigation.state.params.id;
        let token = this.props.navigation.state.params.token;
        this._getData(COMMENT_URL, Object.assign({ id: oid, app: 1 }, token))
    }

    _getData(url, params = {}) {
        Util.post(url, params,
            (responseJson) => {
                if (responseJson.status == 1) {
                    this.setState({
                        commentData: responseJson.result,
                    })
                } else {
                    Toast.show(responseJson.message);
                }
            },
            (error) => {
                Toast.show('服务器请求失败！');
            },
        )
    }

    render() {
        if (this.state.commentData != '') {
            console.log('====================================');
            console.log(this.state.comments);
            console.log('====================================');
            return (
                <View style={{ flex: 1 }}>
                    <StatusBar
                        translucent={false}
                        backgroundColor="#000"
                    />
                    <ScrollView>
                        {this.renderGoods()}
                    </ScrollView>
                    <View style={s.btnBox}>
                        <TouchableOpacity>
                            <Text style={s.btn}>确认评价</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        } else {
            return false;
        }

    }

    renderGoods() {
        let goods = this.state.commentData.goods;
        let goodsArr = [];
        for (let i = 0; i < goods.length; i++) {
            goodsArr.push(
                <View key={i} style={{marginTop:10}}>
                    <View style={s.top}>
                        <Image source={{ uri: goods[i].thumb }} style={{ width: 50, height: 50, marginRight: 20 }} />
                        {this.renderStar(goods[i].id)}
                    </View>
                    <View style={s.centet}>
                        <TextInput
                            style={{ textAlignVertical: 'top' }}
                            numberOfLines={5}
                            onChangeText={(text) => {
                                this.setState({
                                    comment:Object.assign({},this.state.comments[i],{content:text})
                                })
                            }}
                            multiline={true}
                            placeholder='宝贝满足您的期待吗？说说它的有点和美中不足的地方吧'
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <View style={s.pic}>
                        <TouchableOpacity style={s.addPic} onPress={() => {
                            this._imagePicker(i)
                        }}>
                            <Icon name="camera" size={30} />
                            <Text style={{ fontSize: 11 }}>添加图片</Text>
                        </TouchableOpacity>
                        {this.renderImg()}
                    </View>
                </View>
            )
        }
        return goodsArr;
    }

    renderImg() {
        let imgs = this.state.avatarSource;
        let imgArr = [];
        if (imgs.length > 0) {
            for (let i = 0; i < imgs.length; i++) {
                imgArr.push(
                    <View key={i}>
                        <Image source={{ uri: imgs[i].uri }} style={s.img} />
                        <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0}} onPress={()=>this._delImg(i)}>
                            <Icon name="times-circle"size={20} color={'red'} style={{backgroundColor:'#fff',borderRadius:20}}/>
                        </TouchableOpacity>
                    </View>
                )

            }
        }
        return imgArr;
    }

    _delImg(i){
        let imgs = this.state.avatarSource;
        imgs.splice(i,1);
        this.setState({
            avatarSource:imgs
        })
    }

    _imagePicker = (i) => {
        ImagePicker.showImagePicker(options, (res) => {
            if (res.didCancel) {  // 返回
                return
            } else {
                let source;  // 保存选中的图片
                source = { uri: 'data:image/jpeg;base64,' + res.data };
                if (Platform.OS === 'android') {
                    source = { uri: res.uri };
                } else {
                    source = { uri: res.uri.replace('file://', '') };
                }
                this.setState({
                    avatarSource: [...this.state.avatarSource, source]
                });
            }
        })
    }

    renderStar(gid) {
        let starArr = [];
        for (var i = 0; i < 5; i++) {
            starArr.push(
                <TouchableOpacity key={i}><Icon name="star-o" size={25} style={s.star} /></TouchableOpacity>
            )

        }
        return (
            <View style={s.starBox}>
                {starArr}
                <Text>未评分</Text>
            </View>
        )
    }
}

const s = StyleSheet.create({
    img: {
        height: 70, width: 70, margin: 5,
    },
    addPic: {
        padding: 15, borderWidth: 1, borderColor: '#ddd', width: 80, alignItems: 'center'
    },
    btn: {
        textAlign: 'center',
        padding: 10,
        backgroundColor: 'red',
        color: '#fff',
        borderRadius: 5,
    },
    btnBox: {
        padding: 10
    },
    pic: {
        flexDirection: 'row',
        paddingLeft: 15,
        paddingTop: 10,
        paddingBottom: 15,
        backgroundColor: '#fff',
        flexWrap: 'wrap',
    },
    centet: {
        padding: 10,
        backgroundColor: '#fff'
    },
    star: {
        marginLeft: 10,
        marginRight: 10
    },
    starBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    top: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#ddd'
    }
})

export default Comment;