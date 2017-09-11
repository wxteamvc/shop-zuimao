import * as Types from '../actions/actionTypes'

const addressState = {
    status: false,
    data: {},
    message:'',
}

export function addressReducer(state =addressState, action) {
    switch (action.type) {
        case Types.ADDRESS_BEGIN:
            return Object.assign({}, state, {
                status: 'begin',
                message:'',
            });
        case Types.ADDRESS_SUCCESS:
            return Object.assign({}, state, {
                status: 'success',
                data: action.data,
                message:action.data.message,
            });
        case Types.ADDRESS_FAILED:
            return Object.assign({}, state, {
                status: 'failed',
                message: action.message,
            });
        default:
            return state;
    }
}