import * as Types from '../actions/actionTypes'

const loginState = {
    status: false,
    data: {},
    message: '',
}

const memberInfoState = {
    status: false,
    data: {},
    message: '',
}

export function loginReducer(state = loginState, action) {
    switch (action.type) {
        case Types.LOGIN_BEGIN:
            return Object.assign({}, state, {
                status: 'begin',
                message: '',
            });
        case Types.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                status: 'success',
                data: action.data,
                message: action.data.message,
            });
        case Types.LOGIN_FAILED:
            return Object.assign({}, state, {
                status: 'failed',
                message: action.message,
            });
        case Types.LOGIN_OUT:
            return Object.assign({}, state, {
                status: false,
                data: {},
                message: '',
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
                message: '',
            });
        case Types.MEMBER_INFO_SUCCESS:
            return Object.assign({}, state, {
                status: 'success',
                data: action.data,
                message: '',
            });
        case Types.MEMBER_INFO_FAILED:
            return Object.assign({}, state, {
                status: 'failed',
                message: action.message,
            });
        case Types.LOGIN_OUT:
            return Object.assign({}, state, {
                status: false,
                data: {},
                message: '',
            });
        case Types.UPDATE_MEMBERINFO:
            let m = Object.assign({}, state.data.result.member, action.data);
            let re = Object.assign({}, state.data.result, {member:m});
            let da = Object.assign({}, state.data, {result:{member:m}});
            return Object.assign({}, state, {
                status: 'success',
                data: {result:{member:m}},
                message: '',
            });
        default:
            return state;
    }
}