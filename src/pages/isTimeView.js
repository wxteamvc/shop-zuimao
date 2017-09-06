/**
 * 限时购列表页面
 */
"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput, ActivityIndicator, FlatList, StatusBar } from 'react-native';
import { goods } from '../actions/goodsAction';
import { connect } from 'react-redux';
import { ScreenWidth, ScreenHeight } from '../common/global';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
import IconTwo from 'react-native-vector-icons/dist/FontAwesome';
import FlatListJumoTop from '../component/flatListJumoTop';
import Loading from '../component/loading';

class MyListItem extends React.PureComponent {
    render() {
        let { item } = this.props;
        return (
            <View style={styles.bigView}>
                <View style={styles.bigViewA}>
                    <TouchableOpacity onPress={() => this.props.navigate.navigate('GoodsInfo')}>
                        <Image source={{ uri: item.thumb }} style={styles.bigImg} />
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 5 }}>
                    <View>
                        <TouchableOpacity>
                            <Text numberOfLines={1}>{item.title}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.goodsTitle}>
                        <View style={{ flex: 5 }}>
                            <Text style={{ color: 'red' }}>￥{item.marketprice}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={styles.addCat}>
                                <TouchableOpacity>
                                    <Icon name="shopping-cart" size={15} color={'#fff'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

class IsTime extends Component {

    constructor(...props) {
        super(...props)
        this.state = {
            search: {                    //筛选条件
                keywords: "",
                isrecommand: "",
                ishot: "",
                isnew: "",
                isdiscount: "",
                issendfree: "",
                istime: "",
                cate: "",
                order: "timeend",
                by: "asc",
                merchid: "",
                page: 1,
                _: Math.round(new Date().getTime()),
            }
        }
    }

    componentDidMount() {
        this.setState(Object.assign(
            this.state.search, this.props.navigation.state.params.search
        ))
        this.props.dispatch(goods(this.state.search));
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderSearch()}
                {this.renderGoodsList()}
            </View>
        );
    }

    renderSearch() {
        return (
            <View style={styles.container}>
                <StatusBar
                translucent={true}
                backgroundColor="transparent"
              />
              <View style={styles.search_body}>
                <TouchableOpacity style={styles.serach_leftbtn}>
                  <Icon name={'frame'} size={18} color={'#fff'} />
                  <Text style={styles.sreach_text}>扫一扫</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 0.7, height: 35, }}>
                  <View style={styles.search_mid}>
                  </View>
                  <View style={styles.seearch_mid_content}>
                    <IconTwo name={'search'}
                      size={18}
                      color={'#fff'}
                      style={{ marginLeft: 10, marginRight: 10 }}
                    />
                    <Text style={{ color: '#fff' }}>
                      输入您当前要搜索的商品
            </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.serach_rightbtn}>
                  <Icon name={'bubble'} size={18} color={'#fff'} />
                  <Text style={styles.sreach_text}>消息</Text>
                </TouchableOpacity>
              </View>
            </View>
        )
    }

    //商品列表
    renderGoodsList() {
        // console.log('====================================');
        // console.log(this.props.goodsData);
        // console.log('====================================');

        return (
            <View style={{backgroundColor:'#C10001'}}>
                <Image source={require('../assets/images/is_time_top.jpg')} style={{width: ScreenWidth,height:ScreenWidth*0.5}}/>
                <Text style={{textAlign:'center',padding:25,color:'#fff',fontWeight:'bold',}}>——————距离限时抢购活动结束还剩——————</Text>
                {this.renderTime()}
                {this.renderListA()}
            </View>
        )
    }

    renderListA(){
        return (
            <View style={styles.ListA}>
                <View style={styles.listABox}>
                    <Image source={{uri:'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png'}}
                    style={styles.LAIamg}/>
                    <View style={styles.LATexTBox}>
                        <Text style={styles.LATitle} numberOfLines={2}>title</Text>
                        <Text style={{fontSize:10}}>123人购买</Text>
                        <Text style={styles.LAPrice}>&yen;99&nbsp;&nbsp;&nbsp;<Text style={styles.LAPriceA}>&yen;160</Text></Text>
                    </View>
                    <TouchableOpacity style={{flex:1}}>
                        <Text style={styles.btnMS}>立即秒杀</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderTime(){
        return (
            <View style={styles.timeView}>
                <Text style={styles.timeText}>0</Text>
                <Text style={styles.timeText}>0</Text>
                <Text style={styles.timeTextA}>天</Text>
                <Text style={styles.timeText}>0</Text>
                <Text style={styles.timeText}>0</Text>
                <Text style={styles.timeTextA}>时</Text>
                <Text style={styles.timeText}>0</Text>
                <Text style={styles.timeText}>0</Text>
                <Text style={styles.timeTextA}>分</Text>
                <Text style={styles.timeText}>0</Text>
                <Text style={styles.timeText}>0</Text>
                <Text style={styles.timeTextA}>秒</Text>
                <Text style={styles.timeTextB}>0</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EFEFEF',
    },
    search_body: {
        backgroundColor: '#C10001',
        height: 70,
        width: ScreenWidth,
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingBottom: 10
      },
      serach_leftbtn: {
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center',
      },
      sreach_text: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold'
      },
      search_mid: {
        flex: 1,
        backgroundColor: '#000',
        opacity: 0.2,
        borderRadius: 5
      },
      seearch_mid_content: {
        flexDirection: "row",
        alignItems: 'center',
        position: 'absolute',
        left: 10,
        top: 8
      },
      serach_rightbtn: {
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center',
      },
      timeView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
      },
      timeText:{
        backgroundColor:'#363636',
        borderRadius:5,
        color:'#fff',
        padding:5,
        marginLeft:2
      },
      timeTextA:{
        padding:5,
        color:'#fff'
      },
      timeTextB:{
        backgroundColor:'#FC9503',
        borderRadius:5,
        color:'#fff',
        padding:5,
        marginLeft:2 
      },
      ListA:{
        paddingLeft:10,
        paddingTop:5,
        paddingRight:10,
        paddingBottom:5,
        marginTop:20, 
      },
      listABox:{
        flexDirection:'row',
        backgroundColor:'#fff',
        alignItems:'center',
        padding:10
      },
      LAIamg:{
        flex:1,
        width:100,
        height:100
      },
      LATexTBox:{
        flex:2.5,
        paddingLeft:25
      },
      LATitle:{
        fontSize:18,
        fontWeight:'bold',
        color:'#000'
      },
      LAPrice:{
        paddingTop:10,
        fontSize:18,
        color:'#ED6690'
      },
      LAPriceA:{
        textDecorationLine:'line-through',
        fontSize:12,
        color:'#ccc'
      },
      btnMS:{
        textAlign:'center',
        backgroundColor:'#C10001',
        paddingLeft:10,
        paddingRight:10,
        paddingTop:5,
        paddingBottom:5,
        borderRadius:15,
        color:'#fff'
      }
    
});

function mapStateToProps(state) {
    return {
        goodsData: state.goodsReducer,
    }
}

export default connect(mapStateToProps)(IsTime);