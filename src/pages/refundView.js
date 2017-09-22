/**
 * 申请退款/售后
 */

"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, StatusBar, TouchableOpacity, TextInput, Modal, Platform } from 'react-native';
import { ScreenWidth, ScreenHeight, REFUNDSUB_URL, UPLOADER_URL } from '../common/global';
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

class Refund extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        headerTitle: navigation.state.params.title,
        headerTitleStyle: { alignSelf: 'center' },
        headerRight: <Text></Text>
    });

    constructor(...props) {
        super(...props);
        this.state = {
            showMod: false,
            modType: null,
            id: null,
            rtype: null,//0为退款(仅退款不退货)，1为退货退款，2为换货
            reason: '不想要了',
            centent: null,
            images: [],
            price: this.props.navigation.state.params.order.price,
            imgurl: []
        }
        this.order = this.props.navigation.state.params.order;
        this.token = this.props.navigation.state.params.token;
    }

    componentWillMount() {
        if (this.props.navigation.state.params.title == '申请退款') {
            this.setState({ rtype: 0 })
        } else {
            this.setState({ rtype: 1 })
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar translucent={false} backgroundColor="#000" />
                <ScrollView>
                    {this.renderMain()}
                </ScrollView>
                <View style={s.btnBox}>
                    <TouchableOpacity onPress={() => this._refundSub()}>
                        <Text style={s.btnRed}>提交申请</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Text style={s.btn}>取消</Text>
                    </TouchableOpacity>
                </View>
                {this.renderMod()}
            </View>
        )
    }

    _refundSub() {
        let params = '';
        let key, value;
        for (let i in this.token) {
            key = i;
            value = token[key]
        }
        params += '&rtype=' + this.state.rtype;
        params += '&reason=' + this.state.reason;
        params += '&content=' + this.state.content;
        params += '&price=' + this.state.price;
        for (let j in this.state.images) {
            params += '&images[]=' + this.state.images[j];
        }
        params += '&id=' + this.props.navigation.state.params.order.id + '&' + key + '=' + value;
        fetch(REFUNDSUB_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params,
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.status == 1) {
                    Toast.show('申请成功');
                    let { dispatch, search } = this.props.navigation.state.params;
                    dispatch(orderList(Object.assign({}, search, this.token)));
                    this.props.navigation.goBack(this.props.navigation.state.params.routeKey);
                } else {
                    Toast.show(responseJson.result.message);
                }
            })
            .catch((error) => {
                Toast.show('服务器请求失败');
            });
    }

    renderMod() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.showMod}
                onRequestClose={() => this.setState({ showMod: false })}
            >
                <Text style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} onPress={() => this.setState({ showMod: false })}></Text>
                <View style={s.mod}>
                    {this.renderTouch()}
                </View>
            </Modal>
        )
    }

    renderTouch() {
        let view = [], i = 0, modType = this.state.modType;
        if (modType == 'rtype') {
            if (this.order.status == 2 || this.order.status == 3) {
                view.push(
                    <TouchableOpacity key={++i} onPress={() => this._modAct(1)}>
                        <Text style={s.modText}>退货退款</Text>
                    </TouchableOpacity>
                );
                view.push(
                    <TouchableOpacity key={++i} onPress={() => this._modAct(2)}>
                        <Text style={s.modText}>换货</Text>
                    </TouchableOpacity>
                );
            }
            view.push(
                <TouchableOpacity key={++i} onPress={() => this._modAct(0)}>
                    <Text style={s.modText}>退款(仅退款不退货)</Text>
                </TouchableOpacity>
            );
        }
        if (modType == 'reason') {
            view.push(
                <TouchableOpacity key={++i} onPress={() => this._modAct('不想要了')}>
                    <Text style={s.modText}>不想要了</Text>
                </TouchableOpacity>
            );
            view.push(
                <TouchableOpacity key={++i} onPress={() => this._modAct('卖家缺货')}>
                    <Text style={s.modText}>卖家缺货</Text>
                </TouchableOpacity>
            );
            view.push(
                <TouchableOpacity key={++i} onPress={() => this._modAct('拍错了/订单信息错误')}>
                    <Text style={s.modText}>拍错了/订单信息错误</Text>
                </TouchableOpacity>
            );
            view.push(
                <TouchableOpacity key={++i} onPress={() => this._modAct('其它')}>
                    <Text style={s.modText}>其它</Text>
                </TouchableOpacity>
            );
        }


        return (
            <ScrollView>
                {view}
            </ScrollView>
        )
    }

    _modAct(text) {
        if (this.state.modType == 'rtype') {
            this.setState({
                showMod: false,
                rtype: text
            })
        }
        if (this.state.modType == 'reason') {
            this.setState({
                showMod: false,
                reason: text
            })
        }
    }

    renderMain() {
        let rtypeText = [];
        rtypeText[0] = '退款（仅退款不退货）';
        rtypeText[1] = '退货退款';
        rtypeText[2] = '换货';
        return (
            <View style={s.main}>
                <View style={s.list}>
                    <Text style={{ flex: 5 }}>处理方式</Text>
                    <TouchableOpacity style={{ flex: 16, flexDirection: 'row' }} onPress={() => { this.setState({ showMod: true, modType: 'rtype' }) }}>
                        <Text style={{ flex: 15 }}>{rtypeText[this.state.rtype]}</Text>
                        <Icon name="angle-right" size={20} style={{ flex: 1 }} />
                    </TouchableOpacity>
                </View>
                <View style={s.list}>
                    <Text style={{ flex: 5 }}>原因</Text>
                    <TouchableOpacity style={{ flex: 16, flexDirection: 'row' }} onPress={() => { this.setState({ showMod: true, modType: 'reason' }) }}>
                        <Text style={{ flex: 15 }}>{this.state.reason}</Text>
                        <Icon name="angle-right" size={20} style={{ flex: 1 }} />
                    </TouchableOpacity>
                </View>
                <View style={s.list}>
                    <Text style={{ flex: 1 }}>备注说明</Text>
                    <TextInput
                        style={{ flex: 3, margin: 0, padding: 0 }}
                        onChangeText={(text) => this.setState({
                            centent: text
                        })}
                        multiline={true}
                        placeholder='选填'
                        underlineColorAndroid="transparent"
                    />
                </View>
                <View style={s.list}>
                    <Text style={{ flex: 1 }}>退款金额</Text>
                    <Text style={{ flex: 3 }}>&yen;{this.state.price}</Text>
                </View>
                <View style={{ padding: 10 }}>
                    <Text>上传凭证</Text>
                    <View style={s.pic}>
                        {this.renderImg()}
                        <TouchableOpacity style={s.addPic} onPress={() => {
                            this._imagePicker()
                        }}>
                            <Icon name="camera" size={25} />
                            <Text style={{ fontSize: 11 }}>添加图片</Text>
                        </TouchableOpacity>
                    </View>
                    <Text>提示：您可退款的最大金额为<Text style={{ color: 'red' }}>&yen;{this.state.price}</Text></Text>
                </View>
            </View>
        )
    }

    _imagePicker = () => {
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
                this._uploadImage(source.uri);
            }
        })
    }

    _uploadImage(url) {
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
                    this._uploadNext(responseData.filename, responseData.url)
                } else {
                    Toast.show('上传失败');
                }
            })
            .catch((error) => { Toast.show('服务器请求失败') });

    }

    _uploadNext(filename, imgurl) {
        this.setState({
            images: [...this.state.images, filename],
            imgurl: [...this.state.imgurl, imgurl]
        });
    }

    renderImg() {
        let imgs = this.state.imgurl;
        let imgArr = [];
        if (imgs.length > 0) {
            for (let j = 0; j < imgs.length; j++) {
                imgArr.push(
                    <View key={j}>
                        <Image source={{ uri: imgs[j] }} style={s.img} />
                        <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0 }} onPress={() => this._delImg(j)}>
                            <Icon name="times-circle" size={20} color={'red'} style={{ backgroundColor: '#fff', borderRadius: 20 }} />
                        </TouchableOpacity>
                    </View>
                )
            }
        }
        return imgArr;
    }

    _delImg(j) {
        let imgs = this.state.images;
        let urls = this.state.imgurl;
        imgs.splice(j, 1);
        urls.splice(j, 1);
        this.setState({
            images: imgs,
            imgurl: urls
        })
    }
}

const s = StyleSheet.create({
    img: {
        height: 70, width: 70, margin: 5,
    },
    modText: {
        textAlign: 'center',
        padding: 10
    },
    mod: { width: ScreenWidth * 0.6, height: ScreenWidth * 0.4, backgroundColor: '#fff', position: 'absolute', top: ScreenHeight * 0.5 - ScreenWidth * 0.2, left: ScreenWidth * 0.2, borderRadius: 5 },
    addPic: {
        padding: 15, borderWidth: 1, borderColor: '#ddd', width: 80, alignItems: 'center', marginLeft: 10
    },
    pic: {
        flexDirection: 'row',
        paddingLeft: 15,
        paddingTop: 10,
        paddingBottom: 15,
        backgroundColor: '#fff',
        flexWrap: 'wrap',
    },
    main: {
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        backgroundColor: '#fff'
    },
    list: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        padding: 10,
    },
    btnBox: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20
    },
    btn: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#aaa',
        margin: 5,
        fontSize: 11
    },
    btnRed: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'red',
        margin: 5,
        color: 'red',
        fontSize: 11
    }
})

export default Refund;