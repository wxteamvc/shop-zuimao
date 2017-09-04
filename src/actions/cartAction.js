import * as Types from "./actionTypes";
import { CART_URL ,SELECT_URL} from '../common/global';
import Util from '../common/util';

export function cart(token) {
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
                        dispatch(start(Types.CART_SUCCESS,responseJson))
                    }else{
                        dispatch(error(Types.CATEGORY_FAILED,'服务器请求失败！'));
                    }
                })
                .catch((error) => {
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