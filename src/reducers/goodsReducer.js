import * as Types from '../actions/actionTypes'

const initialState = {
    status: false,
    // data: {},
    total:null,//商品总数量
    list:[],
    message:'',
}

export function goodsReducer(state = initialState, action) {
    switch (action.type) {
        case Types.GOODS_BEGIN:
            return Object.assign({}, state, {
                status: 'begin',
                message:'',
            });
        case Types.GOODS_SUCCESS:
            return Object.assign({}, state, {
                status: 'success',
                // data: action.data,
                total:action.data.result.total,
                list:action.page==1?action.data.result.list:state.list.concat(action.data.result.list),
                message:'',
            });
        case Types.GOODS_FAILED:
            return Object.assign({}, state, {
                status: 'failed',
                message: action.message,
            });    
        default:
            return state;
    }
}