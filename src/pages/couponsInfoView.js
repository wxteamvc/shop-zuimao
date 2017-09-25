/**
 * 优惠券详情页
 */
"use strict";
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import { ScreenWidth, DOMAIN, COUPONSINFO_URL } from '../common/global';
import Util from '../common/util';
import Loading from '../component/loading';

export default class CouponsInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            data: {},
            errmessage: '',
        }
    }

    componentDidMount() {
        let url = COUPONSINFO_URL + '&id=' + this.props.navigation.state.params.id
        Util.get(url,
            (resq) => {
                if (resq.status == 1) {
                    console.log(resq)
                    this.setState({
                        status: 'success',
                        data: resq.result.coupon,

                    })
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
            }
        )
    }

    renderRule() {
        //领取限制
        let getLimit = null;
        if (this.state.data.islimitlevel == '1') {
            if (this.state.data.limitmemberlevels != '' || this.state.data.limitmemberlevels === '0') {
                let rules = [];
                for (let i = 0; i < this.state.data.paramsgroup.level1.length; i++) {
                    rules.push(
                        <Text key={i}>{this.state.data.paramsgroup.level1[i]['levelname']}</Text>
                    )
                }
                getLimit =
                    <View>
                        <Text>用户必须达到以下条件之一 :</Text>
                        <Text>会员:{this.state.data.paramsgroup.meblvname}</Text>
                        {rules}
                    </View>

            } else if ((this.state.data.limitagentlevels != '' || this.state.data.limitagentlevels === '0') && this.state.data.paramsgroup.hascommission) {
                let rules = [];
                for (let i = 0; i < this.state.data.paramsgroup.level2.length; i++) {
                    rules.push(
                        <Text key={i}>{this.state.data.paramsgroup.level2[i]['levelname']}</Text>
                    )
                }
                getLimit =
                    <View>
                        <Text>用户必须达到以下条件之一 :</Text>
                        <Text>{this.state.data.paramsgroup.leveltitle2}:{this.state.data.paramsgroup.in_limitagentlevels ?
                            this.state.data.paramsgroup.commissionname : false} </Text>

                        {rules}
                    </View>
            } else if ((this.state.data.limitpartnerlevels != '' || this.state.data.limitpartnerlevels === '0') && this.state.data.paramsgroup.hasglobonus) {
                let rules = [];
                for (let i = 0; i < this.state.data.paramsgroup.level3.length; i++) {
                    rules.push(
                        <Text key={i}>{this.state.data.paramsgroup.level3[i]['levelname']}</Text>
                    )
                }
                getLimit =
                    <View>
                        <Text>用户必须达到以下条件之一 :</Text>
                        <Text>{this.state.data.paramsgroup.leveltitle3}:{this.state.data.paramsgroup.globonuname} </Text>
                        {rules}
                    </View>
            } else if ((this.state.data.limitaagentlevels != '' || this.state.data.limitaagentlevels === '0') && this.state.data.paramsgroup.hasabonus) {
                let rules = [];
                for (let i = 0; i < this.state.data.paramsgroup.level4.length; i++) {
                    rules.push(
                        <Text key={i}>{this.state.data.paramsgroup.level4[i]['levelname']}</Text>
                    )
                }
                getLimit =
                    <View>
                        <Text>用户必须达到以下条件之一 :</Text>
                        <Text>{this.state.data.paramsgroup.leveltitle4}:{this.state.data.paramsgroup.abonuname} </Text>
                        {rules}
                    </View>
            }
        } else {
            getLimit =
                <View>
                    <Text>无</Text>
                </View>
        }



        //有效期限
        let period = null;
        if (this.state.data.timestr == 0) {
            period = '永久有效';
        } else if (this.state.data.timestr == 1) {
            period = '即' + this.state.data.gettypestr + '日内' + this.state.data.timedays + '天有效';
        } else {
            period = '有效期' + this.state.data.timestr;
        }


        //使用说明
        let instructions = null;
        if (this.state.data.descnoset == '') {
            if (this.state.data.coupontype == '') {
                instructions = <Text>{tthis.state.data.paramsgroup.consumedesc}</Text>
            } else {
                instructions = <Text>{this.state.data.paramsgroup.rechargedesc}</Text>
            }
        } else {
            instructions = <Text>{this.state.data.desc}</Text>
        }

        //使用限制
        let cannotUse = null;
        if (this.state.data.limitdiscounttype == '1') {
            cannotUse = <Text>不允许与促销优惠同时使用</Text>
        } else if (this.state.data.limitdiscounttype == '2') {
            cannotUse = <Text>不允许与会员折扣同时使用</Text>
        } else if (this.state.data.limitdiscounttype == '3') {
            cannotUse = <Text>不允许与促销优惠和会员折扣同时使用</Text>
        }
        //允许以下商品使用
        let goodsUse = null;
        if (this.state.data.limitgoodtype == '1') {
            let goods = [];
            if (this.state.data.paramsgroup.goods.length > 0) {
                for (let i = 0; i < this.state.data.paramsgroup.goods.length; i++) {
                    goods.push(
                        <Text key={i}>{this.state.data.paramsgroup.goods[i]['title']}</Text>
                    )
                }
                goodsUse =
                    <View>
                        <Text>允许以下商品使用 :</Text>
                        {goods}
                    </View>
            }
        }

        //允许以下商品分类使用
        let category = null;
        if (this.state.data.limitgoodtype == '1') {
            let categorys = [];
            if (this.state.data.paramsgroup.category.length > 0) {
                for (let i = 0; i < this.state.data.paramsgroup.category.length; i++) {
                    categorys.push(
                        <Text key={i}>{this.state.data.paramsgroup.category[i]['name']}</Text>
                    )
                }
                category =
                    <View>
                        <Text>允许以下商品分类使用 :</Text>
                        {categorys}
                    </View>
            } else {
                category = null
            }

        }

        let last = null;
        if (this.state.data.limitgoodtype == '0' && this.state.data.limitdiscounttype == '0' && this.state.data.coupontype != '2') {
            last = <Text>无</Text>
        }



        return (
            <View style={{ flex: 1, padding: 15, backgroundColor: '#fff' }}>
                <ScrollView showsVerticalScrollIndicator ={false}>
                    <View style={styles.listView}>
                        <Text style={styles.titleText}>领取限制</Text>
                        {getLimit}
                    </View>
                    <View style={styles.listView}>
                        <Text style={styles.titleText}>有效期限</Text>
                        <Text>{period}</Text>
                        {this.state.data.merchname ?
                            <Text>
                                限购{this.state.data.merchname}店铺商品
                        </Text> :
                            false}
                    </View>
                    <View style={styles.listView}>
                        <Text style={styles.titleText}>使用说明</Text>
                        {instructions}

                    </View>
                    <View style={styles.listView}>
                        <Text style={styles.titleText}>使用限制</Text>
                        {this.state.data.coupontype == '2' ? <Text>本优惠卷只能在收银台中使用</Text> : false}
                        {cannotUse}
                        {goodsUse}
                        {category}
                        {last}
                    </View>
                </ScrollView>
            </View>

        )
    }

    render() {
        if (this.state.status == 'success') {
            let period = '';
            if (this.state.data.timestr == 0) {
                period = '永久有效';
            } else if (this.state.data.timestr == 1) {
                period = '即' + this.state.data.gettypestr + '日内' + this.state.data.timedays + '天有效';
            } else {
                period = '有效期' + this.state.data.timestr;
            }
            let getBtn = null;
            if (this.state.data.canget === false) {
                getBtn =
                    <TouchableOpacity
                        style={[styles.getBtn, { borderColor: '#ccc' }]}
                        disabled={true}
                    >
                        <Text style={{ color: '#ccc' }}>已达到{this.state.data.gettypestr}上限</Text>
                    </TouchableOpacity>
            } else if (this.state.data.paramsgroup.pass) {
                getBtn =
                    <TouchableOpacity
                        style={styles.getBtn}
                    >
                        <Text style={styles.whiteText}>立即{this.state.data.gettypestr}</Text>
                    </TouchableOpacity>
            } else {
                getBtn =
                    <TouchableOpacity
                        style={[styles.getBtn, { borderColor: '#ccc' }]}
                        disabled={true}
                    >
                        <Text style={{ color: '#ccc' }}>未达到{this.state.data.gettypestr}权限</Text>
                    </TouchableOpacity>
            }
            return (
                <View style={{ flex: 1 }}>
                    <Image
                        source={require('../assets/images/coupons/couponBG.jpg')}
                        style={{ width: ScreenWidth, height: 200 }}
                    >
                        <View style={[styles.center, { flex: 1 }]}>
                            <View style={styles.center}>
                                <Text style={[styles.whiteText, { fontSize: 20 }]}>{this.state.data.couponname}
                                </Text>
                            </View>
                            <View style={[styles.rowCenter, { marginTop: 5 }]}>
                                <Text style={[styles.whiteText]}>{period}</Text>
                                {this.state.data.merchname ?
                                    <Text style={[styles.whiteText, { marginLeft: 10 }]}>
                                        限购{this.state.data.merchname}店铺商品
                                    </Text> :
                                    false}
                            </View>
                        </View>
                        <View style={[styles.center, { flex: 1 }]}>
                            <View style={styles.rowCenter}>
                                <Text style={[styles.whiteText, { fontSize: 16 }]}>{this.state.data.title2}</Text>
                                <Text style={[styles.whiteText, { fontSize: 16 }]}>{this.state.data.title3}</Text>
                            </View>
                            {getBtn}
                        </View>
                    </Image>
                    {this.renderRule()}
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
    // 居中
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    //水平分布居中
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    //水平分布垂直居中
    rowYCenter: {
        flexDirection: 'row', alignItems: 'center',
    },
    //水平两端布局
    rowBetween: {
        flexDirection: 'row', justifyContent: 'space-between', padding: 10,
    },
    whiteText: {
        color: '#fff'
    },
    getBtn: {
        padding: 5, paddingLeft: 15, paddingRight: 15, borderColor: '#fff', borderWidth: 0.7, marginTop: 10, borderRadius: 15
    },
    listView: {
        paddingTop: 10, paddingBottom: 10, borderBottomWidth: 0.7, borderColor: '#ccc'
    },
    titleText: {
        color: '#000',
        fontSize: 16,
        marginBottom: 5,
    }
})