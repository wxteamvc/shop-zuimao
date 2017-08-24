/**
 * 网络请求
 *
 */

'use strict';

import {NetInfo} from 'react-native';

let Util = {
    /**
     * http get 请求简单封装
     * @param url 请求的URL
     * @param successCallback 请求成功回调
     * @param failCallback 请求失败回调
     */
    get: (url, successCallback, failCallback) => {
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            successCallback(responseJson);
        })
        .catch((err) => {
            failCallback(err);
        }); 
    },

    /**
     * http post 请求简单封装
     * @param url 请求的URL
     * @param data post的数据
     * @param successCallback 请求成功回调
     * @param failCallback failCallback 请求失败回调
     */
    post: (url, data, successCallback, failCallback) => {
        let formData = new FormData();
        Object.keys(data).map(function(key) {
            var value = data[key];
            formData.append(key, value);
        });

        let fetchOptions = {
            method: 'POST',
            headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json'
                'Content-Type': 'multipart/form-data',
            },
            body: formData
            // body: JSON.stringify(data)
        };
        fetch(url, fetchOptions)
        .then((response) => response.json())
        .then((responseJson) => {
            successCallback(responseJson);
        })
        .catch((err) => {
            failCallback(err);
        });
    },

    /**
     * 日志打印
     * @param obj
     */
    log: (obj) => {
        var description = "";
        for(let i in obj){
            let property = obj[i];
            description += i + " = " + property + "\n";
        }
        alert(description);
    },
};

export default Util;