//注册路由 需要添加组件
import React from 'react';
import { Provider } from 'react-redux';
import { Routes, Route, } from 'react-router';
import { HashRouter as Router } from 'react-router-dom'
// import { BrowserRouter  as Router } from 'react-router-dom'

// antd 5.x使用 国际化 
import zh_CN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';


import { ConfigProvider } from 'antd';
// import { StyleProvider, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs'; // 兼容360 QQ 浏览器

import { store, history } from './store.js';
import { routeConfig } from './route_init.js';
import { modalUpdate } from './actions/modal.js';

import Layout from './pages/layout.jsx'; //框架
import NotFound from './pages/notFound/not_found.jsx'; //404
import Demo from './pages/demo/index.jsx'; //快捷页面
import ListTable from './pages/list_table/index.jsx'; //关于列表页面
import About from './pages/about/index.jsx'; //关于列表页面
import Contact from './pages/contact/index.jsx'; //关联列表页面
import ListTableDeatli from './pages/list_table/detail.jsx'; //关联列表页面



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
        return (<Route key={route.key} path={route.location} element={<route.keyName />} >
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
        element={<route.keyName />}
        path={route.location}
    >
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
            <Layout>
                <Router >
                    <Routes>
                        <Route index path="/client/demo" element={<Demo />}>
                        </Route>
                        <Route path="*" element={<NotFound />} />
                        {/* <Route path="client/demo" element={<Demo />} /> */}

                            {/* {
                                Object.keys(routeConfig.client).map((r) => {
                                    const _rt = routeConfig.client[r];
                                    _rt.location = r;
                                    return getRouteRender(routeConfig.client[r]);
                                })
                            }  */}
                        <Route path="client/list_table" element={<ListTable/>} />
                        <Route path="client/about" element={<About />} />
                        <Route path="client/contact" element={<Contact />} />
                        <Route path="client/list_table/detail" element={<ListTableDeatli />} />
                        </Routes>
                </Router>
            </Layout>

        </Provider>
    </ConfigProvider>

);