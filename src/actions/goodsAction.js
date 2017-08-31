import * as Types from "./actionTypes";
import { GOODS_URL } from '../common/global';
import Util from '../common/util';

export function goods(params={}) {
    if (global.isConnected){
        return (
            dispatch => {
                dispatch(start(Types.GOODS_BEGIN));
                Util.post(GOODS_URL,params,
                    (responseJson)=>{
                        if(responseJson.status==1){
                            dispatch(start(Types.GOODS_SUCCESS,responseJson));
                        }else{
                            
                            dispatch(error(Types.GOODS_FAILED,'服务器请求失败！'));
                        }
                    },
                    (error)=>{
                        dispatch(error(Types.GOODS_FAILED,error.message));
                    },
                )
            }
        )
    }else{
        return (
            dispatch => {
                dispatch(error(Types.GOODS_FAILED,'网络连接失败！'));
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