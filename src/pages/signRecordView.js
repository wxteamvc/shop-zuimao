/**
 * 签到记录页面
 * 
 * 
 */
"use strict";


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Util from '../common/util';
import Loading from '../component/loading';
import FlatListJumoTop from '../component/flatListJumoTop'
import { SIGNRECORD_URL, ScreenHeight } from '../common/global'

class SignRecord extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: false,
            infoStatus: 'more',
            page: 1,
            data: [],
        }

    }

    componentDidMount() {
        this.getRecord()
    }

    getRecord() {
        let { loginData } = this.props;
        let token='';
        for(let key in loginData.data.result.token){
           token = '&'+key+'='+loginData.data.result.token[key]
        };
        let url = SIGNRECORD_URL + '&page=' + this.state.page + '&_=' + Math.round(new Date().getTime()/1000) + token
        if (global.isConnected) {
            Util.get(url,
                (resq) => {
                    if (resq.status == 1) {
                        if (resq.result.list.length != 0) {
                            this.setState({
                                status: 'success',
                                data: this.state.data.concat(resq.result.list),
                                page: ++this.state.page,
                            })
                        } else {
                            this.setState({
                                infoStatus: 'nomore',
                            })
                        }
                    } else {
                        this.setState({
                            status: 'faild',
                            errmessage: resq.message,
                        })
                    }
                },
                (error) => {
                    this.setState({
                        status: 'faild',
                        errmessage: error.message,
                    })
                })
        } else {
            this.setState({
                status: 'faild',
                errmessage: '当前没有网络！'
            })
        }
    }



   

    renderRecord({ item }) {
        let text = '';
        switch (item.type) {
            case '0':
                text = '日常签到';
                break;
            case '1':
                text = '连续签到奖励';
                break;
            case '2':
                text = '总签到奖励';
                break;
            default:
                break;
        }
        return (
            <View style={[styles.listchildren,{backgroundColor:'#fff'}]}>
            <View style={{ flex: 0.8 }}>
                <View >
                    <Text style={{ fontSize: 18 }}>{item.log}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Text style={styles.text}>{text}</Text>
                    <Text style={{ marginLeft: 10, fontSize: 15 }}>{item.date}</Text>
                </View>
            </View>
            <View style={[{ flex: 0.2 }, styles.center]}>
                <Text style={{ fontSize: 18, color: '#24b2f4' }}>+ {item.credit}</Text>
            </View>
        </View>
        )
    }
    render() {
        if (this.state.status == 'success') {
            return (
                <View style={{ flex: 1 }}>
                      <StatusBar
                       translucent={false}
                       backgroundColor="#000"
                    />
                    <View style={styles.listcontainer}>         
                        <FlatListJumoTop
                            data={this.state.data}
                            renderItem={this.renderRecord}
                            keyExtractor={(item, index) => index}
                            onEndReachedThreshold={0.3}
                            onEndReached={() => { this.state.infoStatus == 'nomore' ? false : this.getRecord() }}
                            ListFooterComponent={this.state.infoStatus == 'nomore' ? <Text style={{ textAlign: 'center' }}>没有更多内容了</Text> : false}
                        />
                    </View>
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Loading status={this.state.status} errmessage={this.state.errmessage} />
                </View>
            )
        }
    }
}


const styles = StyleSheet.create({

    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    listcontainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderTopWidth: 0.7
    },
    text: {
        backgroundColor: '#04ab02',
        color: '#fff',
        paddingLeft: 5,
        paddingRight: 5
    },
    listchildren: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 0.7,
        borderColor: '#ccc'
    },
})

function mapStateToProps(state) {
    return {
        loginData: state.loginReducer,
    }
}

export default connect(mapStateToProps)(SignRecord);