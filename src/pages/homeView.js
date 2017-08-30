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
} from 'react-native';
import { connect } from 'react-redux';
import { init } from '../actions/initAction'
import Toast from 'react-native-root-toast';
import ScrollViewJumpTop from '../component/scrollViewJumpTop';
import FlatListJumpTop from '../component/flatListJumoTop';
import { COUPONS_URL, ScreenWidth } from '../common/global';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
import IconTwo from 'react-native-vector-icons/dist/FontAwesome';

class HomeView extends Component {

  constructor(...props) {
    super(...props);
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
          <TouchableOpacity style={ styles.serach_rightbtn }>
            <Icon name={'bubble'} size={18} color={'#fff'} />
            <Text style={styles.sreach_text}>消息</Text>
          </TouchableOpacity>
        </View>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
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
  serach_rightbtn:{
    flex: 0.15, 
    justifyContent: 'center',
    alignItems: 'center',
  }
});

function mapStateToProps(state) {
  return {
    homeData: state.initReducer,
  }
}

export default connect(mapStateToProps)(HomeView);