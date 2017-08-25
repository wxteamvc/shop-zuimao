import * as Types from "./actionTypes";
import { CATEGORY_URL } from '../common/global';
import Util from '../common/util';

export function category() {
    if (global.isConnected){
        return (
            dispatch => {
                dispatch(start(Types.CATEGORY_BEGIN));
                Util.post(CATEGORY_URL,{app:1},
                    (responseJson)=>{
                        if(responseJson.status==1){
                            dispatch(start(Types.CATEGORY_SUCCESS,responseJson));
                        }else{
                            dispatch(error(Types.CATEGORY_FAILED,'服务器请求失败！'));
                        }
                    },
                    (error)=>{
                        dispatch(error(Types.CATEGORY_FAILED,error.message));
                    },
                )
            }
        )
    }else{
        return (
            dispatch => {
                dispatch(error(Types.CATEGORY_FAILED,'网络连接失败！'));
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