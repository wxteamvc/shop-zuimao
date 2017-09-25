import * as Types from "./actionTypes";
import { ORDERLIST_URL } from '../common/global';
import Util from '../common/util';

export function orderList(params={}) {
    if (global.isConnected){
        return (
            dispatch => {
                if(params.page==1){
                    dispatch(start(Types.ORDERLIST_BEGIN));
                }
                Util.post(ORDERLIST_URL,params,
                    (responseJson)=>{
                        if(responseJson.status==1){
                            dispatch(start(Types.ORDERLIST_SUCCESS,responseJson,params.page));
                        }else{
                            dispatch(error(Types.ORDERLIST_FAILED,'服务器请求失败！'));
                        }
                    },
                    (err)=>{
                        dispatch(error(Types.ORDERLIST_FAILED,err.message));
                    },
                )
            }
        )
    }else{
        return (
            dispatch => {
                dispatch(error(Types.ORDERLIST_FAILED,'网络连接失败！'));
            }
        )
    }
}

function start(type,data={},page=1){
    return {
        type,
        data,
        page,
    }
}

function error(type,message=''){
    return {
        type,
        message,
    }
}