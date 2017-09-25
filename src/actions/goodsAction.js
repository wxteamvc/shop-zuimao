import * as Types from "./actionTypes";
import { GOODS_URL, MYCOUPONSGOODS_URL } from '../common/global';
import Util from '../common/util';

export function goods(params = {}) {
    if (global.isConnected) {
        return (
            dispatch => {
                if(params.page==1){
                dispatch(start(Types.GOODS_BEGIN));
            }
                let url= GOODS_URL;
                if(params.type=='couponGoods'){
                    url = MYCOUPONSGOODS_URL;
                }
                Util.post(url, params,
                    (responseJson) => {
                    if (responseJson.status == 1) {
                        dispatch(start(Types.GOODS_SUCCESS, responseJson, params.page));
                    } else {
                        dispatch(error(Types.GOODS_FAILED, '服务器请求失败！'));
                    }
                },
                    (err) => {
            dispatch(error(Types.GOODS_FAILED, err.message));
        },
                )
    }
        )
}else{
    return (
        dispatch => {
            dispatch(error(Types.GOODS_FAILED, '网络连接失败！'));
        }
    )
}
}

function start(type, data = {}, page = 1) {
    return {
        type,
        data,
        page,
    }
}

function error(type, message = '') {
    return {
        type,
        message,
    }
}