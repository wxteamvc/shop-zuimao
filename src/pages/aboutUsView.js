/**
 * 关于我们页面
 * 
 * 
 */
"use strict"


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Image,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class AboutUs extends Component {

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={[styles.rowCenter, { padding: 10, paddingTop: 30, paddingBottom: 30 }]}>
                      <Image source={require('../assets/images/twelogo.png')} style={{width:60,height:60}}/>
                    <View style={styles.center}>
                        <Text>添维信科技有限公司</Text>
                        <Text>www.twechat.com</Text>
                    </View>
                </View>
                <View style={[styles.main, styles.center]}>
                    <Text>无锡添维信科技有限公司于2017年05月05日成立。公司经营范围包括：网络技术的开发、技术咨询、技术服务；数据处理与存储服务；信息系统集成服务；计算机、软件及辅助设备、电子产品的销售、维修；企业管理咨询等。
                    </Text>
                </View>
                <View>
                    <View>
                        <TouchableOpacity style={[styles.rowBetween, { borderColor: '#ccc', borderBottomWidth: 0.7 }]}>
                            <Text>欢迎页</Text>
                            <Icon name={'angle-right'} size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.rowBetween, { borderColor: '#ccc', borderBottomWidth: 0.7 }]}>
                            <Text>版权信息</Text>
                            <Icon name={'angle-right'} size={25} />
                        </TouchableOpacity>
                        <View style={[styles.center, { paddingTop: 50, paddingBottom: 50 }]}>
                            <Text style={{fontSize:10}}>Copyright  ©2017-2018</Text>
                            <Text style={{fontSize:10}}>无锡添维信科技有限公司</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
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
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 10, paddingBottom: 10
    },
    main: {
        flex: 1, padding: 10, marginLeft: 15, marginRight: 15, borderColor: '#ccc', borderWidth: 0.7
    }
})




