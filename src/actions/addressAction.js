import * as Types from "./actionTypes";
import { ADDRESS_URL } from '../common/global';
import Util from '../common/util';
import Toast from 'react-native-root-toast';

export function address(params={}) {
    if (global.isConnected){
        return (
            dispatch => {
                dispatch(start(Types.ADDRESS_BEGIN));
                Util.post(ADDRESS_URL,params,
                    (responseJson)=>{
                        if(responseJson.status==1){
                            dispatch(start(Types.ADDRESS_SUCCESS,responseJson));
                        }else{
                            Toast.show(responseJson.message);
                            dispatch(error(Types.ADDRESS_FAILED,responseJson.message));
                        }
                    },
                    (error)=>{
                        dispatch(error(Types.ADDRESS_FAILED,'服务器请求失败！'));
                    },
                )
            }
        )
    }else{
        return (
            dispatch => {
                dispatch(error(Types.ADDRESS_FAILED,'网络连接失败！'));
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