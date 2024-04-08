/**
 * 路由配置脚本, 编辑后一定要执行node grant 或者 npm run route
 */


exports.getRouteConfig = function () {
    return routeConfig;
};

const routeConfig = {
    'client': {
        'list_table': {
            'name': '列表页面',
            'key': 'client-list-table',
            'path': './pages/list_table/index.jsx',
            'children': {
                'detail': {
                    'name': '详情页面',
                    'key': 'client-list-table-detail',
                    'path': './pages/list_table/detail.jsx',
                },
            }
        },
        'about': {
            'name': '关于页面',
            'key': 'client-labout',
            'path': './pages/about/index.jsx',
        },
        'contact': {
            'name': '关联页面',
            'key': 'client-contact',
            'path': './pages/contact/index.jsx',
        },
    },

};