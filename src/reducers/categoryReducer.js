import * as Types from '../actions/actionTypes'

const initialState = {
    status: false,
    data: {},
    message:'',
}

export function categoryReducer(state = initialState, action) {
    switch (action.type) {
        case Types.CATEGORY_BEGIN:
            return Object.assign({}, state, {
                status: 'begin',
                message:'',
            });
        case Types.CATEGORY_SUCCESS:
            return Object.assign({}, state, {
                status: 'success',
                data: action.data,
                message:'',
            });
        case Types.CATEGORY_FAILED:
            return Object.assign({}, state, {
                status: 'failed',
                message: action.message,
            });    
        default:
            return state;
    }
}