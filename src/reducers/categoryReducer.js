import * as Types from '../actions/actionTypes'

const initialState = {
    status: false,
    data: {},
    message:'',
}

export function categoryReducer(state = initialState, action) {
    switch (action.type) {
        case Types.INIT_BEGIN:
            return Object.assign({}, state, {
                status: 'begin',
                message:'',
            });
        case Types.INIT_SUCCESS:
            return Object.assign({}, state, {
                status: 'success',
                data: action.data,
                message:'',
            });
        case Types.INIT_FAILED:
            return Object.assign({}, state, {
                status: 'failed',
                message: action.message,
            });    
        default:
            return state;
    }
}