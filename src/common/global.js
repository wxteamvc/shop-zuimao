import { StatusBar, PixelRatio } from 'react-native';
import Dimensions from 'Dimensions';
//屏幕宽和高
export const ScreenWidth = Dimensions.get('window').width;
export const ScreenHeight = Dimensions.get('window').height;
//缩放比例
export const fontSizeScaler = (PixelRatio.get() / PixelRatio.getFontScale()) / PixelRatio.get();
//状态栏高度
export const StatusBarHeight = StatusBar.currentHeight;
//图片域名
export const DOMAIN = 'http://www.zuimaowang.cn/attachment/';
//网站基本地址
export const BASIC_URL = 'http://www.zuimaowang.cn/app/index.php';
//网站首页地址
export const HOME_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile';
//商品分类页地址
export const CATEGORY_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=shop.category';
//签到页面地址
export const SIGNINDEX_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=sign&app=1';
//签到请求地址
export const SIGN_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=sign.dosign';
//签到更换月份地址
export const SIGN_MONTHCHANGE_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=sign.getCalendar&app=1&date='
//签到记录地址
export const SIGNRECORD_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=sign.getrecords';
//登陆请求地址
export const LOGIN_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=account.login';
//优惠券获取地址
export const COUPONS_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=sale.coupon.getlist&mid=3773&page=1&cateid=&_=';
//优惠券详情请求地址
export const COUPONSINFO_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=sale.coupon.detail&mid=3773&app=1'
//会员中心请求地址
export const MEMBER_INFO_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=member';
//注册短信验证地址
export const VERIFY_CODE_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=account.verifycode';
//注册请求地址
export const REGISTER_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=account.register'
//商品列表
export const GOODS_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=goods.get_list';
//购物车请求地址
export const CART_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=member.cart&app=1';
//购物车商品勾选请求地址
export const CART_SELECT_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=member.cart.select';
//购物车商品数量更新请求地址
export const CART_UPDATE_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=member.cart.update';
//购物车商品删除请求地址
export const CART_REMOVE_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=member.cart.remove';
//商品详情请求地址
export const GOODINFO_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=goods.detail&app=1';
//评论统计请求地址
export const GOODCHATCOUNT_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=goods.detail.get_comments&app=1';
//评论列表请求地址
export function GOODCHATLIST_URL(condition = {}) {
    let data = {
        id: '',
        page: '',
        level: '',
        date: '',
    };
    Object.assign(data, condition);
    return (BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=goods.detail.get_comment_list&app=1&id=' + data.id + '&page=' + data.page + '&level=' + data.level + '&getcount=1&_=' + data.date);
}
//加入购物车请求地址
export const ADD_CART_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=member.cart.add';
//商品关注地址
export const FOUCS_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=member.favorite.toggle&mid=3773'
//收货地址管理
export const ADDRESS_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=member.address&app=1';
//收获地址设置默认
export const ADDRESSDEFAULT_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=member.address.setdefault';
//收获地址删除
export const ADDRESSDELETE_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=member.address.delete';
//收获地址编辑
export const ADDRESSEDIT_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=member.address.post';
//创建订单地址
export const ORDERCREATE_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=order.create.caculate&mid=3773'
//收获地址新增或更新
export const ADDRESSUPDATE_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=member.address.submit';
//确认购买前确认
export const BEFOREBUY = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=member.cart.submit';
//签到排行获取
export const SIGNRANK_URL =BASIC_URL +'?i=1&c=entry&m=ice_shop&do=mobile&r=sign.getRank';
//签到积分商城请求地址
export const CREDITSHOP_URL =BASIC_URL +'?i=1&c=entry&m=ice_shop&do=mobile&r=creditshop&mid=3773&app=1';







//分类跳转方法
export function JUMP(link, navigate) {
    let url = null;
    if (IsURL(link)) {
        url = link;
    } else {
        url = 'http://www.zuimaowang.cn/app' + link.substring(1);
    }
    let r = getItem(url, 'r')
    let screen = '';
    let data = {};
    switch (r) {
        case 'article':
            screen = 'WebView';
            data = { url: url };
            break;
        case 'shop.notice.detail':
            screen = 'WebView';
            data = { url: url };
            break;
        case 'shop.category':
            screen = 'Category';
            data = {};
            break;
        case 'goods':
            screen = 'Goods';
            data = { search: { cate: getItem(url, 'cate') } };
            break;
        case 'goods.detail':
            screen = 'GoodsInfo';
            data = { id: getItem(url, 'id') };
            break;
        case 'sale.coupon':
            screen = 'Coupons';
            data = {};
            break;
        default:
            screen = '';
            data = {};
            break;
    }
    navigate.navigate(screen, data);
}

function getItem(url, item) {
    let reg = new RegExp("[^\?&]?" + encodeURI(item) + "=[^&]+");
    let arr = url.match(reg);
    if (arr != null) {
        return (decodeURI(arr[0].substring(arr[0].search("=") + 1)));
    } else {
        return (false);
    }
}

function IsURL(str_url) {
    var strRegex = '(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]'
    var re = new RegExp(strRegex);
    //re.test() 
    if (re.test(str_url)) {
        return (true);
    } else {
        return (false);
    }
}

//订单列表请求地址
export const ORDERLIST_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=order.get_list';
//订单删除
export const ORDERDELETE_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=order.op.delete';
//订单取消
export const ORDERCANCEL_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=order.op.cancel';
//物流信息
export const EXPRESS_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=order.express';
//确认收货
export const ORDERFINISH_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=order.op.finish';
//订单详情
export const ORDERDETAIL_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=order.detail';
//评论
export const COMMENT_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=order.comment';
//上传文件
export const UPLOADER_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=util.uploader';
//提交评价
export const COMMENTSSUB_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=order.comment.submit';
//提交申请退款/售后
export const REFUNDSUB_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=order.refund.submit';