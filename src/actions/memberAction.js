import * as Types from "./actionTypes";
import { LOGIN_URL,MEMBER_INFO_URL } from '../common/global';
import Util from '../common/util';

export function login(params={}) {
    if (global.isConnected){
        return (
            dispatch => {
                dispatch(start(Types.LOGIN_BEGIN));
                Util.post(LOGIN_URL,params,
                    (responseJson)=>{
                        if(responseJson.status==1){
                            dispatch(start(Types.LOGIN_SUCCESS,responseJson));
                        }else{
                            dispatch(error(Types.LOGIN_FAILED,responseJson.message));
                        }
                    },
                    (error)=>{
                        dispatch(error(Types.LOGIN_FAILED,'服务器请求失败！'));
                    },
                )
            }
        )
    }else{
        return (
            dispatch => {
                dispatch(error(Types.LOGIN_FAILED,'网络连接失败！'));
            }
        )
    }
}

export function memberInfo() {
    if (global.isConnected){
        return (
            dispatch => {
                dispatch(start(Types.MEMBER_INFO_BEGIN));
                Util.post(MEMBER_INFO_URL,{app:1},
                    (responseJson)=>{
                        if(responseJson.status==1){
                            dispatch(start(Types.MEMBER_INFO_SUCCESS,responseJson));
                        }else{
                            dispatch(error(Types.MEMBER_INFO_FAILED,responseJson.result.message));
                        }
                    },
                    (error)=>{
                        dispatch(error(Types.MEMBER_INFO_FAILED,'服务器请求失败！'));
                    },
                )
            }
        )
    }else{
        return (
            dispatch => {
                dispatch(error(Types.MEMBER_INFO_FAILED,'网络连接失败！'));
            }
        )
    }
}

export function loginOut() {
    return {
        type: Types.LOGIN_OUT,
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