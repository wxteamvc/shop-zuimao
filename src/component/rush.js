/**
 * 首页的抢购栏目组件
 *         
 */
"use strict";


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';


export default class RightBtn extends Component {


    goods({ item }) {
        return (
            <View style={{ marginRight: 10 }}>
                <Image
                    source={{ uri: 'http://www.zuimaowang.cn/attachment/images/1/2017/08/rb2IPWi38L2tAiTw28pWaLDHYHFwVF.jpg' }}
                    style={styles.goodImage}
                />
                <Text  style={{ color: 'red' }}>&yen; 258.00</Text>
                <Text  style={styles.oldPrice}>&yen; 258.00</Text>
                <TouchableOpacity style={styles.buycar}>
                   <Icon name={'cart-outline'} color={'red'}  size={14}/>
                </TouchableOpacity>
                  
            </View>
        )
    }


    render() {
        return (
            <View style={{ backgroundColor: '#fff' }}>
                <View style={styles.rush_head}>
                    <View style={{ flex: 0.55 }}>
                        <Image
                            resizeMode={'stretch'}
                            source={require('../assets/images/rush/jijiangdaoshi.png')}
                            style={{ width: 80, height: 35 }}
                        />
                    </View>
                    <View style={styles.rush_head_right}>
                        <Image
                            resizeMode={'stretch'}
                            source={require('../assets/images/rush/shengyushijian.png')}
                            style={{ width: 60, height: 18, marginRight: 10 }}
                        />
                        <Text style={styles.runTime}>01</Text>
                        <Text style={styles.between_runTime}>:</Text>
                        <Text style={styles.runTime}>18</Text>
                        <Text style={styles.between_runTime}>:</Text>
                        <Text style={styles.runTime}>46</Text>
                    </View>
                </View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={[1, 2, 3, 4, 5]}
                    renderItem={this.goods.bind(this)}
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rush_head:{
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 15 
    },
    rush_head_right:{
        flex: 0.45,
         flexDirection: 'row', 
         alignItems: 'center',
    },
    runTime: {
        padding: 3,
        paddingLeft: 6,
        paddingRight: 6,
        backgroundColor: '#595959',
        color: '#fff'
    },
    between_runTime:{
        paddingLeft: 3, paddingRight: 3 ,color:'#000',fontWeight: 'bold'
    },
    goodImage:{
        width: 100, 
        height: 100, 
        borderColor: '#ccc',
         borderWidth: 0.7,
          marginBottom: 5
    },
    oldPrice:{
        textDecorationLine: 'line-through',
        fontSize :12
    },
    buycar:{
        position: 'absolute',bottom:0,right:0,width:22,height:22,borderRadius:11,borderColor:'#ccc',borderWidth:0.7, justifyContent: 'center',alignItems: 'center',
    }
})