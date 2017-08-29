/**
 * 我的醉猫页面
 */
"use strict";

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

class Member extends Component {

  constructor(...props) {
    super(...props);
  }

  render() {
    return (
      <View>
        <ScrollView>
          <View style={styles.topView}>
            <View style={styles.conf}>
              <TouchableOpacity>
                <Icon name='cog' color={'white'} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name='commenting-o' color={'white'} style={styles.icon}/>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <View style={styles.userIconView}>
                <Icon name='user-o' color={'#E14135'} size={50}/>
              </View>
              <View style={styles.loginStatus}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')}>
                  <Text style={styles.fontWhite}>登陆/注册 〉</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  row:{
    flexDirection:'row',
  },
  fontWhite:{
    color:'white',
  },
  topView:{
    height:150,
    backgroundColor:'#E14135',
  },
  conf:{
    flexDirection:'row',
    justifyContent:'flex-end',
    padding:15,
  },
  icon:{
    fontSize:18,
    marginLeft:20,
  },
  userIconView:{
    flex:1,
    backgroundColor:'white',
    borderRadius:60,
    padding:10,
    alignItems:'center',
    marginLeft:30
  },
  loginStatus:{
    flex:6,
    marginLeft:20,
    justifyContent:'center',
  }
});

function mapStateToProps(state) {
  return {
    loginData: state.loginReducer,
  }
}

export default connect(mapStateToProps)(Member);