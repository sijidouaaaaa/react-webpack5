//加载依赖
import React from 'react';
import { Provider } from 'react-redux';
import { Routes, Route, } from 'react-router';
import { BrowserRouter } from 'react-router-dom'

// antd 5.x使用 国际化 
import zh_CN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';


import { ConfigProvider } from 'antd';
// import { StyleProvider, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs'; // 兼容360 QQ 浏览器

import { store, history } from './store.js';
import { routeConfig } from './route_init.js';
import { modalUpdate } from './actions/modal.js';

import Layout from './pages/layout.jsx'; //框架
import NotFound from './pages/not_found.jsx'; //404

/**
 * 框架模型
 */
const layoutEnum = {
    default: Layout
};

/**
 * 业务加载
 * 
 * @param {boolean} end 
 */
function loadPage(end) {
    console.log("测试")
    if (end) {
        store.dispatch(modalUpdate({
            loadingPage: false
        }));
    } else {
        store.dispatch(modalUpdate({
            loadingPage: true
        }));
    }
}

/**
 * 获取路由信息
 * 
 * @param {object} route 
 */
function getRouteRender(route) {
    return getRouteView(route, (children) => {
        return Object.keys(children).map((c) => getRouteRender(children[c]));
    });
}

/**
 * 获取路由信息
 * 
 * @param {object} route 
 * @param {fun} childRender 
 */
function getRouteView(route, childRender) {
    // 判断是否有childern信息
    const hasNext = route.children ? true : false;
    // 获取参数信息，判断是否符合自定义compent
    const hasCompent = !route.render;
    if (hasCompent) {
        return (<Route key={route.key} path={route.location} element={route.element}>
            {
                hasNext ? childRender(route.children) : ''
            }
        </Route>);
    }
    // 检查当前的layout设置
    let element;
    if (route.layout) {
        element = layoutEnum[route.layout];
    }
    return (<Route
        key={route.key}
        element={element}
        path={route.location}
        getIndexRoute={(_state, callback) => {
            loadPage();
            route.render((p) => {
                loadPage(true);
                callback(null, {
                    element: p.default
                });
            });
        }}>
        {
            hasNext ? childRender(route.children) : ''
        }
    </Route>);
}

export default (
    <ConfigProvider
        locale={zh_CN}
        componentSize='small' // antd 5.x使用
    >
        {/* {<StyleProvider  hashPriority="high"  transformers={[legacyLogicalPropertiesTransformer]}>
        </StyleProvider>} */}
        <Provider store={store}>
            <BrowserRouter>
                    <Routes>
                        <Route path="client" element={Layout}>
                            <Route element={NotFound} />
                            {
                                Object.keys(routeConfig.client).map((r) => {
                                    const _rt = routeConfig.client[r];
                                    _rt.location = r;
                                    return getRouteRender(routeConfig.client[r]);
                                })
                            }
                            <Route path="demo" getIndexRoute={(_state, callback) => {
                                loadPage();
                                require.ensure([], function (require) {
                                    let loadComponent = require('./pages/demo/index.jsx');
                                    loadPage(true);
                                    callback(null, {
                                        element: loadComponent.default
                                    });
                                }, 'test-index');
                            }} />
                            <Route path="*" element={NotFound} />
                        </Route>
                    </Routes>
            </BrowserRouter>
        </Provider>
    </ConfigProvider>
);