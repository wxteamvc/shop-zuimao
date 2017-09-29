/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native';

var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
import Root from './root'
import Loading from './component/loading';
import { connect } from 'react-redux';
import { init } from './actions/initAction'

class Launch extends Component {

  constructor(...props) {
    super(...props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Loading />
      </View>
    );
  }

  componentWillMount() {
    this.props.dispatch(init());
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.props.navigator.replace({
        title: '首页',
        component: Root,
        //    passProps:{'id':1}传值
      });
    }, 1000)
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
}

function mapStateToProps(state) {
  return {
      // homeData: state.initReducer,
  }
}

export default connect(mapStateToProps)(Launch);