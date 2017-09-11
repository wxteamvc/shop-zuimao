import * as Types from "./actionTypes";
import { CART_URL ,SELECT_URL} from '../common/global';
import Util from '../common/util';
import { NavigationActions } from 'react-navigation';

export function cart(token,navigation) {
    if (global.isConnected){
        return (
            dispatch => {
                var key, value;
                for (i in token) {
                    key = i;
                    value = token[key]
                }
                fetch(CART_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: key + '=' + value
                })
                .then(response => response.json())
                .then(responseJson => {
                    if(responseJson.status==1){
                        navCartNum(responseJson.result.total,navigation);
                        dispatch(start(Types.CART_SUCCESS,responseJson))
                    }else{
                        dispatch(error(Types.CATEGORY_FAILED,'服务器请求失败！'));
                    }
                })
                .catch((errorMsg) => {
                    dispatch(error(Types.CART_FAILED,'服务器请求失败！'));
                });
            }
        )
    }else{
        return (
            dispatch => {
                dispatch(error(Types.CART_FAILED,'网络连接失败！'));
            }
        )
    }
}

function navCartNum(total,navigation){
    let setParamsAction = NavigationActions.setParams({
        params: { num: total},
        key: 'Cart',
        })
    navigation.dispatch(setParamsAction);
}

function start(type,data={}){
    return {
        type,
        data,
    }
}

function error(type,message=''){
    return {
        type,
        message,
    }
}