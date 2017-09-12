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
  RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import { init } from '../actions/initAction'
import Toast from 'react-native-root-toast';
import ScrollViewJumpTop from '../component/scrollViewJumpTop';
import FlatListJumpTop from '../component/flatListJumoTop';
import { COUPONS_URL, ScreenWidth, DOMAIN, StatusBarHeight } from '../common/global';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
import IconTwo from 'react-native-vector-icons/dist/FontAwesome';
import Banner from '../component/banner';
import IconList from '../component/icon';
import Rush from '../component/rush';
import Findgoods from '../component/findGoods';
import Ad from '../component/midAd';
import Loading from '../component/loading';
import WellChosen from '../component/WellChosenGoods'
import Notices from '../component/notice';
import YouLike from '../component/youlike';
import AddToCart from '../component/addToCart';


class HomeView extends Component {

  constructor(...props) {
    super(...props);
    this.state = {
      showModel: false,            //显示加入购物车模态框
      goodsInfo: null,
      isRefreshing: false,           //加入入购物车商品信息
    }
  }

  componentDidMount() {
    this.props.dispatch(init())
  }

  // componentWillReceiveProps() {
  //   if (this.props.homeData.status == 'failed') {
  //     Toast.show(this.props.homeData.message)
  //   }
  // }



  render() {
    if (this.props.homeData.status == 'success') {

      let { advs, cubes, banners, recommands, category, notices, istime, youlike } = this.props.homeData.data.result
      let bannersclone = banners.slice(0);
      let topad = bannersclone.slice(0, 1);
      bannersclone.splice(0, 1);
      let bottomad = bannersclone.slice(-1);
      bannersclone.splice(-1);
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
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Search')
              }}
              style={{ flex: 0.7, height: 35, }}>
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
          <ScrollViewJumpTop
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={() => {
                  this.setState({ isRefreshing: true })
                  this.props.dispatch(init())
                  this.setState({ isRefreshing: false })
                }}
                colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
              />
            }
            range={400}>
            <Banner banner={advs} />
            <Ad ad={topad} />
            <IconList navigation={this.props.navigation} />
            <Notices notices={notices} />
            {istime.length > 0 ? <Rush istime={istime}  {...this.props} /> : false}
            <Findgoods cubes={cubes} />
            <Ad ad={bannersclone} />
            <WellChosen ad={bottomad} recommands={recommands}  {...this.props} category={category} />
            <YouLike youlike={youlike} navigate={this.props.navigation} fun={(item) => this.setState({ goodsInfo: item, showModel: true })} />
          </ScrollViewJumpTop>
          {this.state.showModel ? <AddToCart goodsInfo={this.state.goodsInfo} showModel={this.state.showModel} hide={() => this.setState({ showModel: false })} dispatch={this.props.dispatch} loginData={this.props.loginData} statusBarTranslucent={true} /> : null}
          {this.state.showModel?<AddToCart goodsInfo={this.state.goodsInfo} showModel={this.state.showModel} hide={()=>this.setState({showModel:false})} statusBarTranslucent ={true} navigation={this.props.navigation}/>:null}
        </View>

      );
    } else {
      return (
        <View style={{ flex: 1, }}>
           <StatusBar
            translucent={true}
            backgroundColor="transparent"
          />
          <Loading status={this.props.homeData.status} errmessage={this.props.homeData.errmessage} />
        </View>
      )
    }

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
  top_ad: {
    height: 100, width: ScreenWidth
  },

});

function mapStateToProps(state) {
  return {
    homeData: state.initReducer,
    loginData: state.loginReducer
  }
}

export default connect(mapStateToProps)(HomeView);