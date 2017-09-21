/**
 * 评价
 */

"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, StatusBar, TouchableOpacity, TextInput, Platform } from 'react-native';
import { ScreenWidth, ScreenHeight, COMMENT_URL, UPLOADER_URL, COMMENTSSUB_URL } from '../common/global';
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

    static navigationOptions = ({ navigation, screenProps }) => ({
        headerTitle: navigation.state.params.title,
        headerTitleStyle: { alignSelf: 'center' },
        headerRight: <Text></Text>
    });

    constructor(...props) {
        super(...props);
        this.state = {
            commentData: '',
            avatarSource: [],
            comments: {},
        }
        this.comments = [];
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
                        <TouchableOpacity onPress={() => this._commetSub()}>
                            <Text style={s.btn}>确认评价</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        } else {
            return false;
        }

    }

    _commetSub() {
        let params = '';
        for (let k in this.comments) {
            params += '&comments[' + k + '][goodsid]=' + this.comments[k].goodsid;
            if (this.comments[k].level != undefined && this.comments[k].level != '' && this.comments[k].level != null) {
                params += '&comments[' + k + '][level]=' + this.comments[k].level;
            } else {
                this.comments.length == 1 ?
                    Toast.show('商品没有评分') :
                    Toast.show('第' + (k * 1 + 1) + '个商品没有评分');
                return false;
            }
            if (this.comments[k].content != undefined && this.comments[k].content != '' && this.comments[k].content != null) {
                params += '&comments[' + k + '][content]=' + this.comments[k].content;
            } else {
                this.comments.length == 1 ?
                    Toast.show('商品没有评论') :
                    Toast.show('第' + (k * 1 + 1) + '个商品没有评论');
                return false;
            }
            if (this.comments[k].images != undefined && this.comments[k].images != '' && this.comments[k].images != null) {
                for (let a in this.comments[k].images) {
                    params += '&comments[' + k + '][images][]=' + this.comments[k].images[a].uri;
                }
            }
        }
        let token = this.props.navigation.state.params.token;
        let key, value;
        for (let i in token) {
            key = i;
            value = token[key]
        }
        params += '&orderid=' + this.props.navigation.state.params.id + '&' + key + '=' + value;
        fetch(COMMENTSSUB_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params,
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.status == 1) {
                    Toast.show('评论成功');
                    this.props.navigation.goBack();
                } else {
                    Toast.show(responseJson.result.message);
                }
            })
            .catch((error) => {
                Toast.show('服务器请求失败');
            });
    }

    renderGoods() {
        let goods = this.state.commentData.goods;
        let goodsArr = [];
        for (let i = 0; i < goods.length; i++) {
            this.comments[i] = Object.assign({}, this.comments[i], { goodsid: goods[i].id });
            goodsArr.push(
                <View key={i} style={{ marginTop: 10 }}>
                    <View style={s.top}>
                        <Image source={{ uri: goods[i].thumb }} style={{ width: 50, height: 50, marginRight: 20 }} />
                        {this.renderStar(i)}
                    </View>
                    <View style={s.centet}>
                        <TextInput
                            style={{ textAlignVertical: 'top' }}
                            numberOfLines={5}
                            onChangeText={(text) => {
                                this.comments[i] = Object.assign({}, this.comments[i], { content: text })
                                {/* this.setState({
                                    comments: this.comments
                                }) */}
                            }}
                            multiline={true}
                            placeholder='宝贝满足您的期待吗？说说它的有点和美中不足的地方吧'
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <View style={s.pic}>
                        {this.renderImg(i)}
                        <TouchableOpacity style={s.addPic} onPress={() => {
                            this._imagePicker(i)
                        }}>
                            <Icon name="camera" size={25} />
                            <Text style={{ fontSize: 11 }}>添加图片</Text>
                            <Text style={{ fontSize: 11 }}>{this.comments[i].hasOwnProperty("images") ? this.comments[i].images.length : '0'}/5</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        return goodsArr;
    }

    _imagePicker = (i) => {
        if (this.comments[i].hasOwnProperty("images") && this.comments[i].images.length >= 5) {
            Toast.show('最多上传5张图片');
        } else {
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
                    this._uploadImage(source.uri, i);
                }
            })
        }
    }

    _uploadImage(url, i) {
        let formData = new FormData();
        let file = { uri: url, type: 'multipart/form-data', name: 'image.png' };

        formData.append("file", file);//键名必须为file
        formData.append("app", 1);

        fetch(UPLOADER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.status == 'success') {
                    this._uploadNext(i, responseData.filename, responseData.url)
                } else {
                    Toast.show('上传失败');
                }
            })
            .catch((error) => { Toast.show('服务器请求失败') });

    }

    _uploadNext(i, filename, imgurl) {
        this.comments[i] && this.comments[i].hasOwnProperty("images") ?
            this.comments[i] = Object.assign({}, this.comments[i], { images: [...this.comments[i].images, { uri: filename, url: imgurl }] }) :
            this.comments[i] = Object.assign({}, this.comments[i], { images: [{ uri: filename, url: imgurl }] });
        this.setState({
            comments: this.comments
        });
    }


    renderImg(i) {
        if (this.state.comments[i] && this.state.comments[i].hasOwnProperty("images")) {
            let imgs = this.state.comments[i].images;
            let imgArr = [];
            if (imgs.length > 0) {
                for (let j = 0; j < imgs.length; j++) {
                    imgArr.push(
                        <View key={j}>
                            <Image source={{ uri: imgs[j].url }} style={s.img} />
                            <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0 }} onPress={() => this._delImg(i, j)}>
                                <Icon name="times-circle" size={20} color={'red'} style={{ backgroundColor: '#fff', borderRadius: 20 }} />
                            </TouchableOpacity>
                        </View>
                    )
                }
            }
            return imgArr;
        }
    }

    _delImg(i, j) {
        this.comments[i].images.splice(j, 1);
        this.setState({
            comments: this.comments
        })
    }

    renderStar(i) {
        let starArr = [];
        for (let j = 0; j < 5; j++) {
            starArr.push(
                <TouchableOpacity key={j} onPress={(text) => {
                    this.comments[i] = Object.assign({}, this.comments[i], { level: j * 1 + 1 })
                    this.setState({
                        comments: this.comments
                    })
                }}>
                    <Icon name="star-o" size={25} style={s.star} color={this._starcolor(i, j)} />
                </TouchableOpacity>
            )

        }
        return (
            <View style={s.starBox}>
                {starArr}
                {this._renderPinText(i)}
            </View>
        )
    }

    _renderPinText(i) {
        if (this.state.comments[i] && this.state.comments[i].hasOwnProperty("level")) {
            switch (this.state.comments[i].level) {
                case 1:
                    return (<Text style={[s.pinText, { backgroundColor: '#aaa' }]}>差评</Text>);
                    break;
                case 2:
                    return (<Text style={[s.pinText, { backgroundColor: '#0290BE' }]}>一般</Text>);
                    break;
                case 3:
                    return (<Text style={[s.pinText, { backgroundColor: '#04AB02' }]}>还好</Text>);
                    break;
                case 4:
                    return (<Text style={[s.pinText, { backgroundColor: '#FF9326' }]}>满意</Text>);
                    break;
                case 5:
                    return (<Text style={[s.pinText, { backgroundColor: '#EF4F4F' }]}>非常满意</Text>);
                    break;
                default:
                    break;
            }
        } else {
            return (<Text>未评分</Text>)
        }
    }

    _starcolor(i, j) {
        if (this.state.comments[i] && this.state.comments[i].hasOwnProperty("level")) {
            if (this.state.comments[i].level >= (j * 1 + 1)) {
                return 'red';
            }
        }
    }
}

const s = StyleSheet.create({
    pinText: {
        color: '#fff',
        paddingLeft: 5,
        paddingRight: 5
    },
    img: {
        height: 70, width: 70, margin: 5,
    },
    addPic: {
        padding: 10, borderWidth: 1, borderColor: '#ddd', width: 80, alignItems: 'center', marginLeft: 10
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
        marginRight: 10,
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