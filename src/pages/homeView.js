/**
 * Sample React Native App
 * https://github.com/facebook/react-native
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
} from 'react-native';
import { connect } from 'react-redux';
import { init } from '../actions/initAction'
import Toast from 'react-native-root-toast';
import ScrollViewJumpTop from '../component/scrollViewJumpTop';
import FlatListJumpTop from '../component/flatListJumoTop';
import { COUPONS_URL, ScreenWidth } from '../common/global';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
import IconTwo from 'react-native-vector-icons/dist/FontAwesome';
import Banner from '../component/banner';
import IconList from '../component/icon';
import Rush from '../component/rush';
import Findgoods from '../component/findGoods';

class HomeView extends Component {

  constructor(...props) {
    super(...props);
    this.state = {
      img: [
        'http://www.zuimaowang.cn/attachment/images/1/2017/08/b3Le686Ezedn2wBE6dc7zTNDTiWTC3.jpg',
        'http://www.zuimaowang.cn/attachment/images/1/2017/08/Eeh5H4RYygHA2h49AeS4a8E2hHae8S.jpg',
        'http://www.zuimaowang.cn/attachment/images/1/2017/08/Qoo2j8DDsPoSSKPCKPlo5p6mlLlp2h.jpg'
      ]
    }
  }

  componentDidMount() {
    this.props.dispatch(init())

  }

  componentWillReceiveProps() {
    if (this.props.homeData.status == 'failed') {
      Toast.show(this.props.homeData.message)
    }
  }

  render() {
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
        <ScrollView>
          <Banner banner={this.state.img} />
          <View>
            <Image
              source={require('../assets/images/ad.jpg')}
              style={styles.top_ad}
              resizeMode={'stretch'} />
          </View>
          <IconList  navigation={this.props.navigation}/>
          <View style={styles.notice}>
            <Image
              source={require('../assets/images/notice.jpg')}
              style={styles.notice_hotimage}
              resizeMode={'stretch'}
            />
            <View style={styles.notice_mid}>
            <Text style={styles.notice_mid_text1}>：</Text>
            <Text style={styles.notice_mid_text2}>推荐</Text>
            <Text numberOfLines={1} style={{flex:1}}>热烈庆祝无锡欢波信息技术</Text>
            </View>
            <View style={{flex:0.15}}>
            <Text style={styles.notice_right}>更多</Text>
            </View>
          </View>
          <Rush/>
          <Findgoods num={1}/>
        </ScrollView>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  top_ad:{
    height: 100, width: ScreenWidth
  },
  notice:{
    margin: 15, height: 40, borderRadius: 20, backgroundColor: '#fff', flexDirection: "row",alignItems: 'center',
  },
  notice_hotimage:{
    width: 60, height: 25,marginLeft:10
  },
  notice_mid:{
    flex:0.85,flexDirection: "row",alignItems: 'center',
  },
  notice_mid_text1:{
    fontWeight:'bold',color:'#000',marginLeft:5,marginRight:5
  },
  notice_mid_text2:{
    paddingLeft:3,paddingRight:3,borderColor:'#6FDAE2',borderWidth:0.7,color:'#6FDAE2',marginRight:10,fontSize:16
  },
  notice_right:{
    paddingLeft:5,borderBottomColor:'#ccc',borderLeftWidth:0.7
  }
});

function mapStateToProps(state) {
  return {
    homeData: state.initReducer,
  }
}

export default connect(mapStateToProps)(HomeView);