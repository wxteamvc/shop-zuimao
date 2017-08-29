import * as Types from '../actions/actionTypes'

const initialState = {
    status: false,
    data: {},
    message:'',
}

export function loginReducer(state = initialState, action) {
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