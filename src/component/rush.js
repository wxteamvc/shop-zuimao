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

export default class RightBtn extends Component {


    goods({ item }) {
        return (
            <View style={{ alignItems: 'center', }}>
                <Image
                    source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504086674797&di=0d29503646b4c8b79fddf5efc81933eb&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F3bf33a87e950352a05ba82165943fbf2b3118bd1.jpg' }}
                    style={{ width: 100, height: 100 }}
                />
                <Text style={{color:'red'}}>¥258.00</Text>
                <Text style={{ textDecorationLine:'line-through'}}>¥258.00</Text>

            </View>
        )
    }


    render() {
        return (
            <View style={{backgroundColor:'#fff'}}>
                <View style={{flexDirection: 'row', alignItems: 'center',padding:15}}>
                    <View style={{ flex: 0.55 }}>
                        <Image
                        resizeMode={'stretch'}
                            source={require('../assets/images/rush/jijiangdaoshi.png')}
                            style={{ width: 80, height: 35 }}
                        />
                    </View>
                    <View style={{ flex: 0.45,flexDirection: 'row', alignItems: 'center', }}>
                        <Image
                        resizeMode={'stretch'}
                            source={require('../assets/images/rush/shengyushijian.png')}
                            style={{ width: 60, height: 15,marginRight:10 }}
                        />
                        <Text style={styles.runTime}>01</Text>
                        <Text>:</Text>
                        <Text style={styles.runTime}>18</Text>
                        <Text>:</Text>
                        <Text style={styles.runTime}>46</Text>
                    </View>
                </View>
                <FlatList
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
   runTime:{
    padding: 3,
    paddingLeft:6,
    paddingRight:6, 
    backgroundColor: '#ccc',
   color: '#fff' 
   }
})