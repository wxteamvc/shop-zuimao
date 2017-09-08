import * as Types from "./actionTypes";
import { search_url } from "../common/global";

function goodsList(type, data = {}) {
    return {
        type: type,
        data: data
    }
}

export function searchHistory(keyWord) {
    return (
        dispatch => {
            dispatch(saveHistory(Types.SEARCH_HISTORY,keyWord))
        }
    )
}

export function clear() {
    return (
        dispatch => {
            dispatch(saveHistory(Types.CLEAR))
        }
    )
}

function saveHistory(type,keyWord = []) {
    return {
        type:type,
        keyWord:keyWord,
    }
}


