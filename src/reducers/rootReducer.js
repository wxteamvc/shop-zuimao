import { combineReducers } from 'redux';
import {initReducer} from './initReducer';
import {categoryReducer} from './categoryReducer';
import {loginReducer,memberInfoReducer} from './memberReducer';
import {goodsReducer} from './goodsReducer';
import {cartReducer} from './cartReducer';
import {HistoryReducer} from './historyReducer';


const rootReducer = combineReducers({
    initReducer,
    categoryReducer,
    loginReducer,
    memberInfoReducer,
    goodsReducer,
    cartReducer,
    HistoryReducer,
})

export default rootReducer;