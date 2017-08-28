//顶部搜索栏组件
"use strict";
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
class Search extends Component{
    render(){
        return (
            <View style={[styles.main]}>
                <TouchableOpacity style={styles.left}>
                    <Text style={{textAlign:'center',color:'#fff'}}>{this.props.lbtn}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.conter,{height:this.props.h}]} onPress={()=>this.props.navigate.navigate(this.props.page)} >
                      <Icon name={'search'}
                      size={16}
                      style={{marginRight:20}}
                      />
                    <Text style={styles.conter_text}>                    
                        {this.props.search}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.right}>
                   <Text style={{textAlign:'center',color:'#fff'}}>{this.props.rbtn}</Text>
                </TouchableOpacity>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    main:{

        flexDirection:"row",
        // height:30,
        backgroundColor:"transparent",
        alignItems: 'center',
        height: 30,
    },
    left:{
        flex:0.15,
    },
    conter:{
        backgroundColor:"#fff",
        // opacity:0.4,
        borderRadius: 3,
        flex:0.7,
        paddingLeft:10,
        flexDirection:"row",
        alignItems: 'center' 
    },
    conter_text:{
        fontSize:14,
        color:'#000',
    },
    right:{
        flex:0.15,
       
       
      
    },
})


module.exports = Search;