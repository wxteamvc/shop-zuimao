import { StatusBar, PixelRatio } from 'react-native';
import Dimensions from 'Dimensions';
//屏幕宽和高
export const ScreenWidth = Dimensions.get('window').width;
export const ScreenHeight = Dimensions.get('window').height;
//缩放比例
export const fontSizeScaler = (PixelRatio.get() / PixelRatio.getFontScale())/PixelRatio.get();
//状态栏高度
export const StatusBarHeight = StatusBar.currentHeight;
//图片域名
export const DOMAIN='http://www.zuimaowang.cn/attachment/';
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
export const SIGN_MONTHCHANGE_URL = BASIC_URL+'?i=1&c=entry&m=ice_shop&do=mobile&r=sign.getCalendar&app=1&date='
//签到记录地址
export const SIGNRECORD_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=sign.getrecords';
//登陆请求地址
export const LOGIN_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=account.login';
//优惠券获取地址
export const COUPONS_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=sale.coupon.getlist&mid=3773&page=1&cateid=&_=';
//会员中心请求地址
export const MEMBER_INFO_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=member';
//注册短信验证地址
export const VERIFY_CODE_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=account.verifycode';
//注册请求地址
export const REGISTER_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=account.register'
//商品列表
export const GOODS_URL =  BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=goods.get_list';
//购物车请求地址
export const CART_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=member.cart&app=1';
//购物车商品勾选请求地址
export const CART_SELECT_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=member.cart.select';
//购物车商品数量更新请求地址
export const CART_UPDATE_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=member.cart.update';
//购物车商品删除请求地址
export const CART_REMOVE_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=member.cart.remove';
//商品详情请求地址
export const GOODINFO_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=goods.detail&app=1'