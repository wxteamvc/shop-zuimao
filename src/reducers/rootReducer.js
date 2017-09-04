import { combineReducers } from 'redux';
import {initReducer} from './initReducer';
import {categoryReducer} from './categoryReducer';
import {loginReducer,memberInfoReducer} from './memberReducer';
import {goodsReducer} from './goodsReducer';
import {cartReducer} from './cartReducer';

const rootReducer = combineReducers({
    initReducer,
    categoryReducer,
    loginReducer,
    memberInfoReducer,
    goodsReducer,
    cartReducer
})

export default rootReducer;