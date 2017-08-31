import * as Types from "./actionTypes";
import { HOME_URL } from '../common/global';
import Util from '../common/util';

export function init() {
    if (global.isConnected){
        return (
            dispatch => {
                dispatch(start(Types.INIT_BEGIN))
                let url = HOME_URL;
                Util.post(url,{app:1},
                    (responseJson)=>{
                        if(responseJson.status==1){
                            dispatch(start(Types.INIT_SUCCESS,responseJson))
                        }else{
                            dispatch(error(Types.INIT_FAILED,'服务器请求失败！'))
                        }
                    },
                    (errormsg)=>{
                        dispatch(error(Types.INIT_FAILED,errormsg.message))
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