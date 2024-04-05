import { createStore, applyMiddleware } from 'redux';

import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history'

import { thunk } from 'redux-thunk';

import reducer from './reducers/index.js';

const browserHistory = createBrowserHistory();

//载入redux debug插件
function configureStore(initialState) {
    let debugMiddlewareStore = createStoreWithMiddleware(reducer, initialState, 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.history()
    );
    return debugMiddlewareStore;
}

//创建历史中间件
const middleware = routerMiddleware(browserHistory);
//插入中间件
let createStoreWithMiddleware = applyMiddleware(
    thunk,
    middleware
)(createStore);

let store;
if(process.env.NODE_ENV === 'production') {
    store = createStoreWithMiddleware(reducer, {});
}
else{
    // Store
    store = configureStore({});
}

// Sync dispatched route actions to the history
const history = syncHistoryWithStore(browserHistory, store);

export { store, history };