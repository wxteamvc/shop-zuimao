import * as Types from "./actionTypes";
import { HOME_URL } from '../common/global';
import Util from '../common/util';

export function init() {
    if (global.isConnected){
        return (
            dispatch => {
                dispatch(start(Types.INIT_BEGIN))
                let url = 'http://www.wxdevelop.com/we7/app/index.php?i=1&c=entry&m=ewei_shopv2&do=mobile&r=goods.get_list&mid=0';
                Util.post(url,{keywords:'rock'},
                    (responseJson)=>{
                        if(responseJson.status==1){
                            dispatch(start(Types.INIT_SUCCESS,responseJson))
                        }else{
                            dispatch(error(Types.INIT_FAILED,'服务器请求失败！'))
                        }
                    },
                    (error)=>{
                        dispatch(error(Types.INIT_FAILED,error.message))
                    },
                )
            }
        )
    }else{
        return (
            dispatch => {
                dispatch(error(Types.INIT_FAILED,'网络连接失败！'))
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