import * as Types from '../actions/actionTypes'

const orderListState = {
    status: false,
    // data: {},
    total: null,//订单总数量
    list: [],
    message: '',
}

export function orderListReducer(state = orderListState, action) {
    switch (action.type) {
        case Types.ORDERLIST_BEGIN:
            return Object.assign({}, state, {
                status: 'begin',
                message: '',
            });
        case Types.ORDERLIST_SUCCESS:
            return Object.assign({}, state, {
                status: 'success',
                // data: action.data,
                total: action.data.result.total,
                list: action.page == 1 ? action.data.result.list : state.list.concat(action.data.result.list),
                message: '',
            });
        case Types.ORDERLIST_FAILED:
            return Object.assign({}, state, {
                status: 'failed',
                message: action.message,
            });
        default:
            return state;
    }
}