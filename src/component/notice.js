//首页热点栏目组件
"use strict";
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { ScreenWidth, DOMAIN } from '../common/global';

export default class Notice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
        }

    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                isShow: true,
            })
        }, 0);

    }


    renderNotices() {
        let news = [];
        for (let i = 0; i < this.props.notices.length; i++) {
            news.push(
                <View key={i} style={{ flex: 1, justifyContent: 'center', }}>
                    <TouchableOpacity>
                        <Text numberOfLines={1} >{this.props.notices[i].title}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        return (news)
    }


    render() {
        return (
            <View style={styles.notice}>
                <Image
                    source={require('../assets/images/notice.jpg')}
                    style={styles.notice_hotimage}
                    resizeMode={'stretch'}
                />
                <View style={styles.notice_mid}>
                    <Text style={styles.notice_mid_text1}>：</Text>
                    <Text style={styles.notice_mid_text2}>推荐</Text>
                    <Swiper
                        style={{ flex: 1 }}
                        horizontal={false}
                        autoplay={true}
                        showsPagination={false}

                    >
                        {this.renderNotices()}
                    </Swiper>
                </View>
                <View style={{ flex: 0.15 }}>
                    <TouchableOpacity>
                        <Text style={styles.notice_right}>更多</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    notice: {
        margin: 15, height: 40, borderRadius: 20, backgroundColor: '#fff', flexDirection: "row", alignItems: 'center',
    },
    notice_hotimage: {
        width: 60, height: 25, marginLeft: 10
    },
    notice_mid: {
        flex: 0.85, flexDirection: "row", alignItems: 'center',
    },
    notice_mid_text1: {
        fontWeight: 'bold', color: '#000', marginLeft: 5, marginRight: 5
    },
    notice_mid_text2: {
        paddingLeft: 3, paddingRight: 3, borderColor: '#6FDAE2', borderWidth: 0.7, color: '#6FDAE2', marginRight: 10, fontSize: 16
    },
    notice_right: {
        paddingLeft: 5, borderBottomColor: '#ccc', borderLeftWidth: 0.7
    }
})