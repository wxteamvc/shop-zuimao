/**
 * Sample React Native App
 * 扫描二维码页面
 * @flow
 */
"use strict";

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    Image,
    RefreshControl,
    Platform,
    Linking,
    Clipboard
} from 'react-native';
import Toast from 'react-native-root-toast';
import { QRScannerView } from 'ac-qrcode';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default class Scanner extends Component {
    constructor(...props) {
        super(...props)
        this.state = {
            status: true,
            url: '',
            type: 'qrcode',
            hintText: '将二维码放入框内，即可自动扫描',
            rectWidth: 200,
            rectHeight: 200,
            isShowScanBar:true,
        }
    }


    render() {
        if (this.state.status) {
            return (
                <View style={{ flex: 1 }}>
                    <QRScannerView
                        onScanResultReceived={this
                            .barcodeReceived
                            .bind(this)}
                        renderTopBarView={() => this._renderTitleBar()}
                        renderBottomMenuView={() => this._renderMenu()}
                        hintText={this.state.hintText}
                        rectWidth={this.state.rectWidth}
                        rectHeight={this.state.rectHeight}
                        isShowScanBar={this.state.isShowScanBar}
                        torchMode={true}
                         />
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <StatusBar
                        translucent={false}
                        backgroundColor="#000"
                    />
                    <View style={[styles.center, { flex: 0.4 }]}>
                        <Image source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1505823633509&di=9c36830d8d91876e13522832aa6d1168&imgtype=0&src=http%3A%2F%2Fpic34.photophoto.cn%2F20150308%2F0008020242986763_b.jpg' }}
                            style={styles.topImg}
                        />
                    </View>
                    <View style={styles.mid}>
                        <Text style={{ marginBottom: 20 }}>网址</Text>
                        <Text style={[styles.text, { fontSize: 16, textAlign: 'center' }]}>{this.state.url}</Text>
                    </View>
                    <View style={[styles.center, { flex: 0.2 }]}>
                        <View style={styles.bottom}>
                            <TouchableOpacity style={[styles.center, { marginRight: 50 }]}
                                onPress={() => { this.copy() }}
                            >
                                <Icon name={'clone'} color={'#24B2F4'} size={20} />
                                <Text style={styles.text}>复制</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.center]}
                                onPress={() => { this.jump() }}
                            >
                                <Icon name={'paper-plane-o'} color={'#24B2F4'} size={20} />
                                <Text style={styles.text}>访问网址</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }

    }

    _renderTitleBar() {
        return (
            <View style={styles.titleBarLeft}>
                <View style={[{ flex: 0.15 }, styles.center]}>
                    <TouchableOpacity
                    onPress={()=>{this.props.navigation.goBack(null)}}
                        style={[styles.titleBarLeftBtn, styles.center]}>
                        <Icon name={'angle-left'} size={20} color={'#fff'} />
                    </TouchableOpacity>

                </View>
                <View style={[styles.rowCenter, { flex: 0.7 }]}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ type: 'qrcode', hintText: '将二维码放入框内，即可自动扫描',rectWidth: 200, rectHeight: 200, isShowScanBar:true, })
                        }}
                        style={[styles.titleBarMidLeft,{  backgroundColor: this.state.type == 'qrcode' ? '#000' : '#fff', flexDirection: 'row', alignItems: 'center', }]}>
                        <Icon name={'qrcode'} size={18} color={this.state.type == 'qrcode' ? '#fff' : '#000'} />
                        <Text style={{ fontSize: 16, color: this.state.type == 'qrcode' ? '#fff' : '#000' }}> 二维码 </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { this.setState({ type: 'barcode', hintText: '将商品条形码放入框内，即可自动扫描', rectWidth: 250, rectHeight: 120,  isShowScanBar:false, }) }}
                        style={[styles.titleBarMidRight,{  backgroundColor: this.state.type == 'barcode' ? '#000' : '#fff', flexDirection: 'row', alignItems: 'center', }]}>
                        <Icon name={'barcode'} size={18} color={this.state.type == 'barcode' ? '#fff' : '#000'} />
                        <Text style={{ fontSize: 16, color: this.state.type == 'barcode' ? '#fff' : '#000' }}> 扫条码 </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.15 }}></View>
            </View>
        );
    }

    _renderMenu() {
        return (
            false
        )
    }

    barcodeReceived(e) {
        //Toast.show('Type: ' + e.type + '\nData: ' + e.data);
        //console.log(e)
        if(this.state.type=='qrcode'){
            Linking.canOpenURL(e.data)
            .then((supported) => {
                if (!supported) {
                    Toast.show(
                        '提示:Can\'t handle url: ' + e.data)
                } else {
                    this.setState({ status: false, url: e.data })
                }
            })
            .catch((err) => {
                Toast.show('提示:An error occurred: ' + err)
            });
        }   
    }

    jump() {
        Linking.openURL(this.state.url)
            .catch((err) => {
                console.log('An error occurred', err);
            });
    }


    copy() {
        Clipboard.setString(this.state.url);
        //获取剪贴板内容
        // Clipboard.getString()
        // .then(
        //     (text => this.setState({text: text})))
        // .catch(error => alert(error));
    }

}


const styles = StyleSheet.create({
    // 居中
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    //水平分布居中
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    //水平分布垂直居中
    rowYCenter: {
        flexDirection: 'row', alignItems: 'center',
    },
    //水平两端布局
    rowBetween: {
        flexDirection: 'row', justifyContent: 'space-between', padding: 10,
    },
    text: {
        color: '#24B2F4',
        fontSize: 10
    },
    topImg:{
        height: 100, width: 100, borderRadius: 20
    },
    mid:{
        flex: 0.4, alignItems: 'center', paddingLeft: 30, paddingRight: 30
    },
    bottom:{
        padding: 5, paddingLeft: 30, paddingRight: 30, borderColor: '#ccc', borderWidth: 0.5, flexDirection: 'row', borderRadius: 20 
    },
    titleBarLeft:{
        padding: 10, flexDirection: 'row', backgroundColor: 'transparent'
    },
    titleBarLeftBtn:{
        backgroundColor: '#000', borderRadius: 14, height: 28, width: 28
    },
    titleBarMidLeft:{
        padding: 3, paddingLeft: 15, paddingRight: 15, borderTopLeftRadius: 15, borderBottomLeftRadius: 15,
    },
    titleBarMidRight:{
        padding: 3, paddingLeft: 15, paddingRight: 15, borderTopRightRadius: 15, borderBottomRightRadius: 15,
    }
    
})