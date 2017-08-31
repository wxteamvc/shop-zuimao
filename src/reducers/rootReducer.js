import { combineReducers } from 'redux';
import {initReducer} from './initReducer';
import {categoryReducer} from './categoryReducer';
import {loginReducer,memberInfoReducer} from './memberReducer';
import {goodsReducer} from './goodsReducer';

const rootReducer = combineReducers({
    initReducer,
    categoryReducer,
    loginReducer,
    memberInfoReducer,
    goodsReducer,
})

export default rootReducer;