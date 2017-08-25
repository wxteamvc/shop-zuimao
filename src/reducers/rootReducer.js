import { combineReducers } from 'redux';
import {initReducer} from './initReducer';
import {categoryReducer} from './categoryReducer';

const rootReducer = combineReducers({
    initReducer,
    categoryReducer,
})

export default rootReducer;