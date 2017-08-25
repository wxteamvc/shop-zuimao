import { StatusBar } from 'react-native';
import Dimensions from 'Dimensions';
//屏幕宽和高
export const ScreenWidth = Dimensions.get('window').width;
export const ScreenHeight = Dimensions.get('window').height;
//状态栏高度
export const  StatusBarHeight = StatusBar.currentHeight;
//网站基本地址
export const BASIC_URL = 'http://www.zuimaowang.cn/app/index.php'; 
//网站首页地址
export const HOME_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile'; 
//商品分类页地址
export const CATEGORY_URL = BASIC_URL + '?i=1&c=entry&m=ice_shop&do=mobile&r=shop.category';