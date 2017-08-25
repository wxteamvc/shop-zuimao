/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
"use strict";

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { category } from '../actions/categoryAction'
import Toast from 'react-native-root-toast';

class CategoryView extends Component {
  
  constructor(...props){
    super(...props);
  }

  componentWillMount(){
    this.props.dispatch(category())
  }

  componentWillReceiveProps(){
    if(this.props.categoryData.status=='failed'){
      
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          分类
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

function mapStateToProps(state) {
  return {
    categoryData:state.categoryReducer,
  }
}

export default connect(mapStateToProps)(CategoryView);