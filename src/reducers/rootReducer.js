import { combineReducers } from 'redux';
import {initReducer} from './initReducer';
import {categoryReducer} from './categoryReducer';
import {loginReducer,memberInfoReducer} from './memberReducer';

const rootReducer = combineReducers({
    initReducer,
    categoryReducer,
    loginReducer,
    memberInfoReducer,
})

export default rootReducer;