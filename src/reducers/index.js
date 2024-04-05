/**
 * Reducer - index
 * 汇总
 */
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import modal from './modal.js';
import common from './common.js'; // 通用


export default combineReducers({
    modal,
    routing: routerReducer,
    common
});