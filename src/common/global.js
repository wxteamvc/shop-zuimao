import { StatusBar } from 'react-native';
import Dimensions from 'Dimensions';
//屏幕宽和高
export const ScreenWidth = Dimensions.get('window').width;
export const ScreenHeight = Dimensions.get('window').height;
//状态栏高度
export const StatusBarHeight = StatusBar.currentHeight;
//获取当前时间戳
export const NOWTIME = Math.round(new Date().getTime()/1000);
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
//签到记录地址
export const SIGNRECORD_URL =BASIC_URL+'?i=1&c=entry&m=ice_shop&do=mobile&r=sign.getrecords'
//登陆请求地址
export const LOGIN_URL = BASIC_URL+'?i=1&c=entry&m=ice_shop&do=mobile&r=account.login';
//会员中心请求地址
export const MEMBER_INFO_URL = BASIC_URL+'?i=1&c=entry&m=ice_shop&do=mobile&r=member'