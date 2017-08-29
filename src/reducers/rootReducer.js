import { combineReducers } from 'redux';
import {initReducer} from './initReducer';
import {categoryReducer} from './categoryReducer';
import {loginReducer} from './loginReducer';

const rootReducer = combineReducers({
    initReducer,
    categoryReducer,
    loginReducer,
})

export default rootReducer;