import * as Types from '../actions/actionTypes'

const loginState = {
    status: false,
    data: {},
    message:'',
}

const memberInfoState = {
    status: false,
    data: {},
    message:'',
}

export function loginReducer(state = loginState, action) {
    switch (action.type) {
        case Types.LOGIN_BEGIN:
            return Object.assign({}, state, {
                status: 'begin',
                message:'',
            });
        case Types.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                status: 'success',
                data: action.data,
                message:'',
            });
        case Types.LOGIN_FAILED:
            return Object.assign({}, state, {
                status: 'failed',
                message: action.message,
            });    
        default:
            return state;
    }
}

export function memberInfoReducer(state = memberInfoState, action) {
    switch (action.type) {
        case Types.MEMBER_INFO_BEGIN:
            return Object.assign({}, state, {
                status: 'begin',
                message:'',
            });
        case Types.MEMBER_INFO_SUCCESS:
            return Object.assign({}, state, {
                status: 'success',
                data: action.data,
                message:'',
            });
        case Types.MEMBER_INFO_FAILED:
            return Object.assign({}, state, {
                status: 'failed',
                message: action.message,
            });    
        default:
            return state;
    }
}