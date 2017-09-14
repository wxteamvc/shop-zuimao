import { combineReducers } from 'redux';
import { initReducer } from './initReducer';
import { categoryReducer } from './categoryReducer';
import { loginReducer, memberInfoReducer } from './memberReducer';
import { goodsReducer } from './goodsReducer';
import { cartReducer } from './cartReducer';
import { HistoryReducer } from './historyReducer';
import { addressReducer } from './addressReducer';
import { orderListReducer } from './orderListReducer';

const rootReducer = combineReducers({
    initReducer,
    categoryReducer,
    loginReducer,
    memberInfoReducer,
    goodsReducer,
    cartReducer,
    HistoryReducer,
    addressReducer,
    orderListReducer
})

export default rootReducer;